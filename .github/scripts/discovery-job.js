#!/usr/bin/env node
'use strict';
// Writes discovery.json — the "Trending now" list Extra Cover's Community tab
// reads — from GameBanana's public download counts. Runs every 6 hours as the
// Discovery workflow (.github/workflows/discovery.yml). This file is mirrored
// from Extra Cover's source; edit it there and copy it here unchanged.
//
//   node discovery-job.js <outDir>
//   env GB_GAME_ID, GB_CATEGORY_ID   which listing to read
//       HISTORY_URL                  the previous run's history.json (404 = first run)
//
// Each run snapshots every listed mod's download count, keeps ten days of
// snapshots in history.json, and ranks mods by downloads gained over the last
// seven days, each gain weighed down by its age (half-life 48 h), so a mod
// that is busy now outranks one that was busy last week. No dependencies:
// Node 20's fetch only. Public, anonymous GameBanana reads, at most four at once.

const fs = require('fs');
const path = require('path');

const API = 'https://gamebanana.com/apiv11';
const PER_PAGE = 50;
const MAX_PAGES = 40;
const CONCURRENCY = 4;
const DAY = 24 * 3600e3;
const KEEP_MS = 10 * DAY;
const WINDOW_MS = 7 * DAY;
const HALF_LIFE_MS = 2 * DAY;
const MIN_GAIN = 3;
const MAX_TRENDING = 50;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url, { allow404 = false } = {}) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': 'ExtraCover-Discovery (+https://gamebanana.com)' } });
      if (allow404 && res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      const data = await res.json();
      if (data && data._sErrorCode) throw new Error(`GameBanana ${data._sErrorCode} for ${url}`);
      return data;
    } catch (err) {
      if (attempt >= 3) throw err;
      await sleep(1500 * attempt);
    }
  }
}

/** Every mod in the listing: [{ id, created }]. */
async function listMods(gameId, categoryId) {
  const mods = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const params = [`_nPerpage=${PER_PAGE}`, `_nPage=${page}`, '_sSort=Generic_Newest', `_aFilters%5BGeneric_Game%5D=${gameId}`];
    if (categoryId) params.push(`_aFilters%5BGeneric_Category%5D=${categoryId}`);
    const data = await getJson(`${API}/Mod/Index?${params.join('&')}`);
    const records = Array.isArray(data?._aRecords) ? data._aRecords : [];
    for (const m of records) {
      if (Number.isSafeInteger(m._idRow) && m._idRow > 0) mods.push({ id: m._idRow, created: (Number(m._tsDateAdded) || 0) * 1000 });
    }
    if (records.length < PER_PAGE || data?._aMetadata?._bIsComplete === true) break;
  }
  return [...new Map(mods.map((m) => [m.id, m])).values()];
}

/** { "<id>": downloads } for the mods whose profile answered. */
async function downloadCounts(ids) {
  const counts = {};
  let next = 0;
  async function worker() {
    while (next < ids.length) {
      const id = ids[next++];
      try {
        const p = await getJson(`${API}/Mod/${id}/ProfilePage`);
        if (Number.isSafeInteger(p?._nDownloadCount) && p._nDownloadCount >= 0) counts[id] = p._nDownloadCount;
      } catch (err) { console.warn(`  skipped ${id}: ${err.message}`); }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return counts;
}

/**
 * Ranks mods by weighted recent gains. `history` is [{ at, counts }] oldest
 * first, ending with the run being written; `created` maps id → upload time.
 * A mod uploaded inside the window counts from zero at its upload, so a new
 * mod's first downloads are trending ones; an older mod first seen in this
 * history only counts once it has two snapshots.
 */
function computeTrending(history, created, now) {
  const latest = history[history.length - 1];
  if (!latest) return [];
  const rows = [];
  for (const key of Object.keys(latest.counts)) {
    const points = history
      .filter((s) => Number.isSafeInteger(s.counts[key]))
      .map((s) => ({ t: Date.parse(s.at), n: s.counts[key] }));
    const born = created[key];
    if (born && now - born <= WINDOW_MS && (!points.length || born < points[0].t)) points.unshift({ t: born, n: 0 });
    let hot = 0, gain = 0;
    for (let i = 1; i < points.length; i++) {
      const { t, n } = points[i];
      if (now - t > WINDOW_MS) continue;
      const d = Math.max(0, n - points[i - 1].n);
      gain += d;
      hot += d * Math.pow(0.5, (now - t) / HALF_LIFE_MS);
    }
    if (gain >= MIN_GAIN) rows.push({ id: Number(key), gain, hot });
  }
  return rows.sort((a, b) => b.hot - a.hot || b.gain - a.gain || b.id - a.id)
    .slice(0, MAX_TRENDING).map(({ id, gain }) => ({ id, gain }));
}

/** Snapshots worth keeping: well-formed, inside KEEP_MS, oldest first. */
function pruneHistory(history, now) {
  return (Array.isArray(history) ? history : [])
    .filter((s) => s && Number.isFinite(Date.parse(s.at)) && s.counts && typeof s.counts === 'object')
    .filter((s) => now - Date.parse(s.at) <= KEEP_MS)
    .sort((a, b) => Date.parse(a.at) - Date.parse(b.at))
    .slice(-60);
}

async function main() {
  const out = process.argv[2];
  const gameId = Number(process.env.GB_GAME_ID);
  const categoryId = Number(process.env.GB_CATEGORY_ID) || 0;
  if (!out || !Number.isSafeInteger(gameId) || gameId <= 0) throw new Error('usage: GB_GAME_ID=<id> [GB_CATEGORY_ID=<id>] node discovery-job.js <outDir>');
  const now = Date.now();
  const previous = process.env.HISTORY_URL ? await getJson(process.env.HISTORY_URL, { allow404: true }) : null;
  const mods = await listMods(gameId, categoryId);
  const counts = await downloadCounts(mods.map((m) => m.id));
  const history = pruneHistory([...(previous?.snapshots || []), { at: new Date(now).toISOString(), counts }], now);
  const created = Object.fromEntries(mods.map((m) => [m.id, m.created]));
  const trending = computeTrending(history, created, now);
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'discovery.json'), JSON.stringify({
    schemaVersion: 1, generatedAt: new Date(now).toISOString(), trending, downloads: counts,
  }) + '\n');
  fs.writeFileSync(path.join(out, 'history.json'), JSON.stringify({ snapshots: history }) + '\n');
  console.log(`${mods.length} mods, ${Object.keys(counts).length} counts, ${history.length} snapshots, ${trending.length} trending`);
}

if (require.main === module) main().catch((err) => { console.error(err); process.exit(1); });

module.exports = { computeTrending, pruneHistory };

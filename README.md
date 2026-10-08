<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.webp">
  <img alt="Extra Cover, the Cricket 26 mod manager" src="assets/banner-light.webp">
</picture>

# Extra Cover: Cricket 26 Mod Manager

**One-click mods for Cricket 26 on PC (Steam).** Install texture and audio mods (stadiums, kits, crowds, menus, sounds), switch them on and off, and get the original game back with one click. No modding knowledge needed.

[![Extra Cover](https://img.shields.io/github/v/release/officialasit/extracover-releases?filter=v*&label=Extra%20Cover&color=4A8BF5)](../../releases/latest)
[![Pack Studio](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fofficialasit%2Fextracover-releases%2Freleases%2Fdownload%2Fpackstudio-beta%2Fupdate.json&query=%24.version&label=Pack%20Studio&color=6BA4FF)](../../releases/tag/packstudio-beta)
[![Downloads](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fofficialasit%2Fextracover-releases%2Fbadges%2Fdownloads.json)](../../releases)
[![Windows 10 | 11](https://img.shields.io/badge/Windows-10%20%7C%2011-0078D6)](#faq)

**[Website](https://officialasit.github.io/extracover-pub/)** · **[Download](../../releases/latest)** · **[Browse mods](https://gamebanana.com/mods/cats/49896)** · **[Make mods](#make-your-own-cricket-26-mods)**

## Download

| | For | Get it |
|---|---|---|
| **Extra Cover** | Players: install and remove Cricket 26 mods | **[Installer (.exe)](../../releases/latest)** |
| **Pack Studio** (beta) | Creators: make your own mod packs | **[packstudio-win-x64.zip](../../releases/download/packstudio-beta/packstudio-win-x64.zip)** |

Needs **Windows 10 or 11** (64-bit) and **Cricket 26 on Steam**. Both apps are free.

## How to install Cricket 26 mods

1. Download and run the **[Extra Cover installer](../../releases/latest)**. If Windows says *"Windows protected your PC"*, choose **More info → Run anyway** (the app is not code-signed).
2. Extra Cover finds Cricket 26 through Steam and reads it once. That takes a few minutes, the first time only.
3. Open **Browse community** and click **Install** on any pack, or double-click a `.c26pack` file you were sent.
4. Close Cricket 26 while installing, then play. **Disable** removes a pack at any time.

Extra Cover updates itself and asks before installing a new version.

## Make your own Cricket 26 mods

1. Download **[Pack Studio](../../releases/download/packstudio-beta/packstudio-win-x64.zip)**, extract the whole ZIP and run `packstudio.exe`. It opens in your browser.
2. Browse or search the game's textures and sounds, and add the ones you want to a pack.
3. Repaint the pictures in any editor (Photoshop, GIMP, Paint.NET, Krita, Photopea) and save them in place, same name and size. Replace sounds with a WAV, MP3, OGG or FLAC.
4. **Build**, **Test in game**, then **Publish**: Pack Studio walks you through uploading to [GameBanana](https://gamebanana.com/mods/cats/49896).

## FAQ

<details>
<summary><b>Is it safe? Can it break my game?</b></summary>

Extra Cover backs up every game file before changing it. **Disable** puts a pack's files back exactly, and **Settings → Disable all mods** restores the whole game. No game content is downloaded or shipped with the app: mods change files already on your PC.
</details>

<details>
<summary><b>How do I remove all mods and restore the original game?</b></summary>

In Extra Cover, use **Settings → Disable all mods**. As a last resort, use Steam → Cricket 26 → **Properties → Installed Files → Verify integrity of game files**, which Extra Cover can start for you from **Settings → Troubleshooting**.
</details>

<details>
<summary><b>What happens when Cricket 26 updates?</b></summary>

Extra Cover notices and refreshes itself. A pack made for the old version may say it *needs an update* until its creator publishes one; you can disable it in the meantime.
</details>

<details>
<summary><b>The game is stuck on its loading screen after installing a pack</b></summary>

Open Extra Cover and **Disable** that pack. If you can't, verify the game files in Steam (see above).
</details>

<details>
<summary><b>Can I use several mods at once?</b></summary>

Yes, as long as they don't change the same thing. Extra Cover tells you if two packs overlap.
</details>

<details>
<summary><b>Extra Cover can't find my game</b></summary>

When it asks, choose your Cricket 26 folder: the one that contains `data`. Only the Steam version on Windows is supported.
</details>

<details>
<summary><b>How do I check a download is genuine?</b></summary>

Each release lists checksums: `latest.yml` (SHA-512) for the installer and a `.sha256` file for Pack Studio. In PowerShell: `Get-FileHash .\packstudio-win-x64.zip`
</details>

Something else? **[Open an issue](../../issues)** and say what you clicked and what happened.

## About

Extra Cover is an **unofficial fan project**, not affiliated with or endorsed by Big Ant Studios, Cricket 26, or any league, team or sponsor. Trademarks belong to their owners. The apps are free but not open source; the mod engine inside them is GPL-3.0-or-later, and its source is attached to each release as `…engine-source….zip`.

<sub>
<a href="../../releases/latest"><img alt="Extra Cover downloads" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fofficialasit%2Fextracover-releases%2Fbadges%2Fextra-cover.json"></a>
<a href="../../releases/tag/packstudio-beta"><img alt="Pack Studio downloads" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fofficialasit%2Fextracover-releases%2Fbadges%2Fpack-studio.json"></a>
<a href="../../blob/badges/assets.json"><img alt="All file downloads" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fofficialasit%2Fextracover-releases%2Fbadges%2Fall-files.json"></a>
<br>Installer and ZIP downloads, updated every six hours. <i>All file downloads</i> also counts the apps' update checks.
</sub>

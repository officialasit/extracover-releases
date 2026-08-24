# Extra Cover — releases

Build artifacts for [Extra Cover](https://officialasit.github.io/extracover-pub/),
a one-click mod tool for Cricket 26.

**Nothing is authored here.** This repository exists to hold downloads and the
update feeds that point at them, and its name is compiled into every build that
ships — so it can never be renamed without permanently breaking auto-update for
everyone already installed.

## What is here

| Release | Holds |
|---|---|
| `v<version>` | The app: installer, blockmap, channel file, and source tarball |
| `packs` | Texture and audio packs, plus `catalogue.json` |
| `packstudio` | Pack Studio, the creator authoring tool |
| `packstudio-beta` | Pack Studio test builds |

App releases come in two channels. A version with a prerelease tag
(`0.2.0-beta.1`) is a beta and carries `beta.yml`; a plain version is stable
and carries `latest.yml`. Turn on **Beta updates** in the app's Settings to
follow the first. Pack Studio works the same way, using the two tags above.

## Source

Extra Cover is licensed under **GPL-3.0**. Every app release carries
`extra-cover-<version>-src.tar.gz` beside its installer — that archive is the
complete corresponding source for that exact build, available to anyone who can
download the binary, as the licence requires.

## Reporting something

Please raise it against the app rather than here; this repository holds files
only and has no code to fix.

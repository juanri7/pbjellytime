# CLAUDE.md

This file provides guidance to Claude when working with Remotion in this repository.

This project uses the **.claude** folder from [remotion-dev/remotion](https://github.com/remotion-dev/remotion):

- **.claude/commands/** — Remotion-specific commands (add-bug, release, upgrade-caniuse, etc.)
- **.claude/skills/** — Skills for CLI options, new packages, docs demos, PRs, video reports, web renderer tests, and writing docs

When working on Remotion video compositions or following Remotion patterns, use the skills in `.claude/skills/` as reference. Note: many paths in those skills refer to the upstream monorepo (`packages/...`); adapt them to this project’s structure (e.g. `src/` for compositions).

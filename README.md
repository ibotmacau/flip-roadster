# Flip Roadster（翻滾敞篷）

Infinite side-view stunt runner: climb the launch wall, stick the lip, flip in the night sky, then survive the obstacle run for a high score.

**Not affiliated with any original wall-flip title.** No original assets or verbatim copy.

## Features

- Canvas 2D + vanilla JS (no build step, no modules; works over `file://`)
- Mobile-first on-screen controls + keyboard (`Z`, `X`, `←`/`C`, `Space`)
- Multi-touch: all four buttons can be held at once (pointer capture)
- Opening launch track: **flat → wall climb → reverse lip → night sky**
- AIR / energy tank: Lift + Stick + Flip spend air; regenerates idle (faster on ground)
- Ground obstacles (pillars, barriers, walls) and air obstacles (blocks, beams)
- Scoring: distance + survival time + **+500 per full aerial flip (2π)** + marble collect / mission bonus
- Wheels-down landing continues the run — crash only on obstacles / severe roll / fall-off
- Car picker: **Cybercab · 特斯拉 3 · 特斯拉 Y · 特斯拉 S** (side-view silhouettes) · 繁｜EN · mute · menu
- Marble mission: denser trails, HUD goal **n/10**, +300 bonus at 10, highlighted on results

## Controls

| Action | Button | Key | Role |
|--------|--------|-----|------|
| Lift | 升 | `Z` | Rise / altitude; burns air |
| Stick | 吸 | `X` | Wall / lip adhesion (hold or peel off); burns air |
| Flip | 翻 | `←` or `C` | Continuous aerial roll; burns air. Lift+Flip = roof thrust soft-land |
| Drive | 前 | `Space` | Forward accelerate |

Starfield = flip / airborne scene. Stick is wall mechanics only — unrelated to the stars.

## Scoring

- Distance × rate + alive time × rate
- Each completed aerial revolution (2π) → **+500** (banner)
- Result screen shows total + breakdown
- Mode: **high score until wipeout**

## Run

See `INSTALL.txt`. Prefer `python3 -m http.server` from this folder.

## Files

- `index.html` — shell, HUD, modals
- `style.css` — mobile-first chrome
- `game.js` — physics, launch track, obstacles, score, render, i18n

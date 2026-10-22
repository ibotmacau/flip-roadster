# Flip Roadster（翻滾敞篷）

Infinite side-view stunt runner: drive right, lift over ground hazards, dodge sky beams, flip for bonus points, survive for a high score.

**Not affiliated with any original wall-flip title.** No original assets or verbatim copy.

## Features

- Canvas 2D + vanilla JS (no build step, no modules; works over `file://`)
- Mobile-first on-screen controls + keyboard (`X`, `←`, `→`, `Space`)
- Multi-touch: all four buttons can be held at once (pointer capture)
- AIR / energy tank: Stick (lift) + thrusters spend air; regenerates idle (faster on ground)
- Ground obstacles (pillars, barriers, walls) and air obstacles (blocks, beams)
- Scoring: distance + survival time + **+500 per full aerial flip (2π)**
- Normal landing continues the run — crash only on obstacles / severe roll / fall-off
- Car picker (4 cars) · 繁｜EN · mute · menu

## Controls

| Action | Button | Key |
|--------|--------|-----|
| Lift / Stick | 吸附 | `X` |
| Left thruster | 左推進 | `←` |
| Right thruster | 右推進 | `→` |
| Drive | 前進 | `Space` |

One thruster rolls; both push “up” relative to the car. Stick lifts you off the ground / boosts altitude.

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
- `game.js` — physics, obstacles, score, render, i18n

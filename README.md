# Flip Roadster（翻滾敞篷）

A static browser stunt game inspired by the *wall-flip / Flip Roadster* spirit: drive a roadster up a night track that rises into a vertical wall and curls into an inverted ceiling, stick to stay on, thruster-roll in the air, and land on your wheels.

**Not affiliated with the original.** No original assets or verbatim copy; clone the *feel*, not the IP.

## Features

- Canvas 2D + vanilla JS (no build step, no modules)
- Mobile-first on-screen controls + keyboard (`X`, `←`, `→`, `Space`)
- Shared AIR tank for Stick + thrusters
- Car picker (4 cars with different mass / accel / air / roll)
- Language switcher: **繁** (default) | **EN**
- Mute toggle (simple beeps)
- Header menu: how-to / pick car / reset

## Cars

| Car | Color | Notes |
|-----|-------|--------|
| Roadster / 敞篷跑車 | Silver | Balanced |
| SUV / 越野休旅 | Green | Heavier, more air, slower |
| Sports / 超跑 | Red | Faster, less stick, less air |
| Kei / 輕自動車 | Cream | Light, stronger roll torque |

## Controls

| Action | Button | Key |
|--------|--------|-----|
| Stick | 吸附 / Stick | `X` |
| Left thruster | 左推進 | `←` |
| Right thruster | 右推進 | `→` |
| Drive | 前進 / Drive | `Space` |

Both thrusters push “up” relative to car orientation. One thruster alone applies roll torque.

## Run

See `INSTALL.txt`. Prefer `python3 -m http.server` from this folder (also works over `file://`).

## Scoring

Rolls + landing quality (tilt & impact). One clean roll is solid; two or more can go beyond “perfect.”

## Physics limitations (vs a polished original)

- Track is a 2D polyline with sampled normals — not a full rigid-body contact solver
- Stick is a binary cling on overhang segments, not tire friction simulation
- Landing uses tilt + vertical speed thresholds, not detailed suspension
- Underside collisions are approximate nearest-segment checks
- Camera is a soft follow; no cinematic replay

## Files

- `index.html` — shell, HUD, modals
- `style.css` — mobile-first chrome
- `game.js` — track, physics, render, i18n
- `INSTALL.txt` — local run steps

/**
 * Flip Roadster — Canvas 2D stunt game (vanilla JS, no modules)
 * Inspired by wall-flip spirit; original assets/text not copied.
 */
(function () {
  "use strict";

  // ---------- i18n ----------
  const STR = {
    tw: {
      htmlLang: "zh-Hant",
      docTitle: "翻滾敞篷｜免費瀏覽器遊戲",
      title: "翻滾敞篷",
      stick: "吸附",
      left: "左推進",
      right: "右推進",
      drive: "前進",
      air: "空氣",
      speed: "時速",
      height: "高度",
      dist: "距離",
      rolls: "旋轉",
      start: "開始",
      pickCar: "選擇車輛",
      confirm: "確定",
      menu: "選單",
      howto: "操作說明",
      reset: "重新開始",
      close: "關閉",
      retry: "再來一次",
      changeCar: "換車",
      mute: "靜音",
      unmute: "開啟音效",
      menuAria: "選單",
      howtoTitle: "怎麼玩",
      howtoSteps: [
        "按住「前進」加速爬牆。反翹處若不按「吸附」會剝落掉下。",
        "從頂端會倒著飛出。左右推進器：單邊會翻滾，兩邊一起朝車頂上推。",
        "輪胎朝下後，兩邊推進一起噴可減速，設法用輪胎着地。",
        "分數看旋轉次數與着地品質。一圈乾淨着地很棒，兩圈以上更強。吸附與推進消耗空氣。"
      ],
      tipPeel: "從牆上剝落了！反翹處請按住「吸附」。",
      tipUpside: "倒過來了！只按一邊推進器來翻滾。",
      tipBrake: "輪胎朝下？兩邊推進一起噴來減速！",
      tipAir: "壓縮空氣用完了！",
      nailed: "着地成功!!",
      crash: "撞毀了!!",
      peeled: "剝落掉下…",
      scoreRolls: "旋轉",
      scoreGrade: "評價",
      landingTilt: "着地傾角",
      impactSpeed: "着地速度",
      grades: { legend: "LEGEND!!!", perfect: "PERFECT!!", great: "GREAT!", good: "GOOD!", ok: "OK", crash: "CRASH" },
      cars: {
        roadster: { name: "敞篷跑車", blurb: "均衡 · 經典" },
        suv: { name: "越野休旅", blurb: "較重 · 空氣多" },
        sports: { name: "超跑", blurb: "更快 · 較難吸附" },
        kei: { name: "輕自動車", blurb: "輕巧 · 好翻滾" }
      }
    },
    en: {
      htmlLang: "en",
      docTitle: "Flip Roadster | Free browser game",
      title: "Flip Roadster",
      stick: "Stick",
      left: "Left thruster",
      right: "Right thruster",
      drive: "Drive",
      air: "AIR",
      speed: "SPEED",
      height: "HEIGHT",
      dist: "DIST",
      rolls: "ROLLS",
      start: "Start",
      pickCar: "Pick a car",
      confirm: "OK",
      menu: "Menu",
      howto: "How to play",
      reset: "Reset",
      close: "Close",
      retry: "Try again",
      changeCar: "Change car",
      mute: "Mute",
      unmute: "Unmute",
      menuAria: "Menu",
      howtoTitle: "How to play",
      howtoSteps: [
        "Hold Drive to climb. On the overhang you peel off unless you hold Stick.",
        "You launch upside down. One thruster rolls you; both push “up” relative to the car.",
        "When wheels face down, fire both thrusters to slow your fall and land on the tires.",
        "Score from rolls + landing quality. One clean roll is solid; two or more go beyond. Stick & thrusters use air."
      ],
      tipPeel: "You peeled off! Keep holding Stick on the overhang.",
      tipUpside: "Upside down! Hold just one thruster to roll.",
      tipBrake: "Wheels down? Fire both thrusters to brake!",
      tipAir: "Out of compressed air!",
      nailed: "NAILED IT!!",
      crash: "CRASH!!",
      peeled: "Peeled off…",
      scoreRolls: "Rolls",
      scoreGrade: "Grade",
      landingTilt: "Landing tilt",
      impactSpeed: "Impact speed",
      grades: { legend: "LEGEND!!!", perfect: "PERFECT!!", great: "GREAT!", good: "GOOD!", ok: "OK", crash: "CRASH" },
      cars: {
        roadster: { name: "Roadster", blurb: "Balanced · classic" },
        suv: { name: "SUV", blurb: "Heavy · more air" },
        sports: { name: "Sports", blurb: "Faster · less stick" },
        kei: { name: "Kei car", blurb: "Light · more roll" }
      }
    }
  };

  // ---------- Cars ----------
  const CARS = {
    roadster: {
      id: "roadster",
      color: "#c8ccd2",
      accent: "#333",
      mass: 1.0,
      accel: 18,
      maxSpeed: 42,
      stickForce: 1.0,
      airCostStick: 8,
      airCostThrust: 14,
      airMax: 100,
      thrust: 22,
      torque: 7.5,
      drag: 0.35,
      body: "roadster"
    },
    suv: {
      id: "suv",
      color: "#3d5c4a",
      accent: "#1a2e22",
      mass: 1.35,
      accel: 14,
      maxSpeed: 34,
      stickForce: 1.15,
      airCostStick: 6,
      airCostThrust: 12,
      airMax: 130,
      thrust: 20,
      torque: 6.2,
      drag: 0.45,
      body: "suv"
    },
    sports: {
      id: "sports",
      color: "#d64545",
      accent: "#2a1010",
      mass: 0.9,
      accel: 24,
      maxSpeed: 52,
      stickForce: 0.75,
      airCostStick: 11,
      airCostThrust: 16,
      airMax: 85,
      thrust: 26,
      torque: 8.2,
      drag: 0.28,
      body: "sports"
    },
    kei: {
      id: "kei",
      color: "#f0e6a8",
      accent: "#5a5030",
      mass: 0.7,
      accel: 16,
      maxSpeed: 36,
      stickForce: 0.95,
      airCostStick: 7,
      airCostThrust: 10,
      airMax: 110,
      thrust: 24,
      torque: 10.5,
      drag: 0.4,
      body: "kei"
    }
  };

  // ---------- DOM ----------
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const $ = (id) => document.getElementById(id);

  let lang = "tw";
  let muted = false;
  let selectedCarId = "roadster";
  let started = false;
  let running = false;

  // ---------- Audio (simple beeps) ----------
  let audioCtx = null;
  function beep(freq, dur, type) {
    if (muted) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = type || "sine";
      o.frequency.value = freq;
      g.gain.value = 0.04;
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      o.stop(audioCtx.currentTime + dur);
    } catch (_) { /* silent stub ok */ }
  }

  // ---------- Track building ----------
  /** Build a side-view track: flat → ramp → vertical → overhang curl. Units ≈ meters. */
  function buildTrack() {
    const pts = [];
    const push = (x, y) => pts.push({ x, y });

    // Flat approach
    for (let i = 0; i <= 40; i++) push(i * 2, 0);
    // Gentle rise into wall (quarter-ish transition)
    const baseX = 80;
    for (let i = 1; i <= 20; i++) {
      const t = i / 20;
      const ang = t * (Math.PI / 2) * 0.55;
      push(baseX + Math.sin(ang) * 18, (1 - Math.cos(ang)) * 18);
    }
    // Vertical climb
    const wallX = pts[pts.length - 1].x;
    let wallY = pts[pts.length - 1].y;
    for (let i = 1; i <= 35; i++) {
      wallY += 1.6;
      push(wallX, wallY);
    }
    // Curl into inverted ceiling (π/2 more → overhang)
    const cx = wallX;
    const cy = wallY;
    const R = 22;
    for (let i = 1; i <= 36; i++) {
      const a = (i / 36) * (Math.PI * 0.95);
      push(cx + Math.sin(a) * R, cy + R - Math.cos(a) * R);
    }
    // Short inverted runway then lip
    const last = pts[pts.length - 1];
    for (let i = 1; i <= 8; i++) {
      push(last.x + i * 1.4, last.y - i * 0.15);
    }

    // Precompute length, tangents, normals
    const segs = [];
    let total = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const dx = pts[i + 1].x - pts[i].x;
      const dy = pts[i + 1].y - pts[i].y;
      const len = Math.hypot(dx, dy) || 0.0001;
      const tx = dx / len;
      const ty = dy / len;
      // outward normal (to the "sky" / left of travel) — rotate tangent 90° CCW
      const nx = -ty;
      const ny = tx;
      segs.push({
        x0: pts[i].x, y0: pts[i].y,
        x1: pts[i + 1].x, y1: pts[i + 1].y,
        len, tx, ty, nx, ny, s0: total
      });
      total += len;
    }
    return { pts, segs, totalLen: total, halfW: 2.4 };
  }

  const TRACK = buildTrack();

  function sampleTrack(s) {
    s = Math.max(0, Math.min(s, TRACK.totalLen - 0.001));
    let seg = TRACK.segs[0];
    for (let i = 0; i < TRACK.segs.length; i++) {
      const g = TRACK.segs[i];
      if (s <= g.s0 + g.len) { seg = g; break; }
      seg = g;
    }
    const u = (s - seg.s0) / seg.len;
    return {
      x: seg.x0 + (seg.x1 - seg.x0) * u,
      y: seg.y0 + (seg.y1 - seg.y0) * u,
      tx: seg.tx, ty: seg.ty,
      nx: seg.nx, ny: seg.ny,
      angle: Math.atan2(seg.ty, seg.tx),
      // stickiness needed when surface normal points downward-ish (overhang)
      needStick: seg.ny < 0.15,
      atEnd: s >= TRACK.totalLen - 1.5
    };
  }

  // Ground plane for landing (y = 0 mostly; soft pad near start)
  function groundY(x) {
    return 0;
  }

  // ---------- Game state ----------
  function carSpec() {
    return CARS[selectedCarId];
  }

  function freshState() {
    const c = carSpec();
    return {
      mode: "track", // track | air | done
      s: 8,
      speed: 0,
      x: 0, y: 0,
      vx: 0, vy: 0,
      angle: 0,
      omega: 0,
      air: c.airMax,
      airMax: c.airMax,
      rolls: 0,
      rollAccum: 0,
      lastAngle: 0,
      stuck: true,
      peelWarned: false,
      upsideWarned: false,
      brakeWarned: false,
      airWarned: false,
      launched: false,
      maxHeight: 0,
      dist: 0,
      result: null,
      camX: 40,
      camY: 20,
      flameL: 0,
      flameR: 0,
      stickOn: false
    };
  }

  let state = freshState();
  const input = { stick: false, left: false, right: false, drive: false };

  // ---------- Physics ----------
  const G = 22;

  function update(dt) {
    if (!running || state.mode === "done") return;
    const c = carSpec();
    const dtClamp = Math.min(dt, 0.033);

    // Air costs
    let airUse = 0;
    if (input.stick && state.air > 0) airUse += c.airCostStick * dtClamp;
    if (input.left && state.air > 0) airUse += c.airCostThrust * dtClamp;
    if (input.right && state.air > 0) airUse += c.airCostThrust * dtClamp;
    state.air = Math.max(0, state.air - airUse);
    if (state.air <= 0 && !state.airWarned) {
      state.airWarned = true;
      showBanner(t().tipAir, 2.2);
      beep(180, 0.15, "square");
    }

    const canStick = input.stick && state.air > 0;
    const canL = input.left && state.air > 0;
    const canR = input.right && state.air > 0;
    state.flameL = canL ? 1 : 0;
    state.flameR = canR ? 1 : 0;
    state.stickOn = canStick;

    if (state.mode === "track") {
      updateOnTrack(dtClamp, c, canStick, canL, canR);
    } else if (state.mode === "air") {
      updateInAir(dtClamp, c, canL, canR);
    }

    // Rolls: integrate absolute rotation in air / after launch
    if (state.launched || state.mode === "air") {
      let dA = state.angle - state.lastAngle;
      while (dA > Math.PI) dA -= Math.PI * 2;
      while (dA < -Math.PI) dA += Math.PI * 2;
      state.rollAccum += Math.abs(dA);
      state.rolls = Math.floor(state.rollAccum / (Math.PI * 2) * 10) / 10;
    }
    state.lastAngle = state.angle;

    state.maxHeight = Math.max(state.maxHeight, state.y);
    state.dist = Math.max(state.dist, state.x);

    // Camera ease
    state.camX += (state.x - state.camX) * Math.min(1, 4 * dtClamp);
    state.camY += (state.y + 8 - state.camY) * Math.min(1, 3 * dtClamp);
  }

  function updateOnTrack(dt, c, canStick, canL, canR) {
    const samp = sampleTrack(state.s);

    // Drive accel along track
    if (input.drive) {
      state.speed += (c.accel / c.mass) * dt;
    }
    // Gravity component along track
    const gAlong = -G * samp.ty; // gravity is (0,-G) in our y-up; wait y is up so g = (0, -G)
    // Force of gravity: (0, -G*mass). Along tangent: dot(g, t) = -G * ty
    state.speed += (-G * samp.ty) * dt;
    // Friction / drag
    state.speed *= Math.exp(-c.drag * 0.15 * dt);
    if (!input.drive && Math.abs(state.speed) < 0.4) state.speed *= 0.9;
    state.speed = Math.max(-8, Math.min(c.maxSpeed, state.speed));

    // Thrusters while on track: both push along normal (peel), one adds torque → peel easier
    if (canL || canR) {
      // Pushing away from surface peels
      if (canL && canR) {
        // peel force
        state.speed *= 0.98;
        leaveTrack("thrust", samp);
        return;
      }
    }

    // Stick / peel check on overhang
    if (samp.needStick) {
      if (!canStick) {
        // peel — gravity wins
        if (!state.peelWarned) {
          state.peelWarned = true;
          showBanner(t().tipPeel, 2);
          beep(220, 0.12, "sawtooth");
        }
        leaveTrack("peel", samp);
        return;
      }
      // stick costs already applied; slight speed bleed
      state.speed *= Math.exp(-0.08 * dt);
    } else if (samp.ny < 0.5 && !canStick && state.speed < 12) {
      // near-vertical: weak stick needed if slow
      const cling = c.stickForce * (state.speed / 20);
      if (cling < 0.55) {
        leaveTrack("peel", samp);
        return;
      }
    }

    state.s += state.speed * dt;
    if (state.s < 0) {
      state.s = 0;
      state.speed = Math.max(0, state.speed);
    }

    if (samp.atEnd || state.s >= TRACK.totalLen - 0.8) {
      // Launch off the lip
      const lip = sampleTrack(Math.min(state.s, TRACK.totalLen - 0.05));
      state.mode = "air";
      state.launched = true;
      state.x = lip.x + lip.nx * 1.2;
      state.y = lip.y + lip.ny * 1.2;
      state.vx = lip.tx * state.speed + lip.nx * 2;
      state.vy = lip.ty * state.speed + lip.ny * 2;
      state.angle = lip.angle + Math.PI; // upside-down feel when launching from inverted
      // Actually lip tangent points roughly "forward" along inverted; car should be wheels toward track
      state.angle = lip.angle;
      state.omega = 0;
      state.stuck = false;
      if (!state.upsideWarned) {
        state.upsideWarned = true;
        showBanner(t().tipUpside, 2.5);
      }
      beep(440, 0.08, "sine");
      return;
    }

    const p = sampleTrack(state.s);
    state.x = p.x + p.nx * 1.15;
    state.y = p.y + p.ny * 1.15;
    state.angle = p.angle;
    state.vx = p.tx * state.speed;
    state.vy = p.ty * state.speed;
  }

  function leaveTrack(reason, samp) {
    state.mode = "air";
    state.stuck = false;
    const p = samp || sampleTrack(state.s);
    state.x = p.x + p.nx * 1.2;
    state.y = p.y + p.ny * 1.2;
    // peel: fall away from surface
    const peel = reason === "peel" ? 4 : 8;
    state.vx = p.tx * state.speed - p.nx * peel * 0.3;
    state.vy = p.ty * state.speed - p.ny * peel;
    state.angle = p.angle;
    state.omega = (reason === "thrust" ? (input.left ? -2 : 2) : 0);
    if (reason === "peel" && p.y > 5) {
      // will likely crash — track peel mid-wall
    }
  }

  function updateInAir(dt, c, canL, canR) {
    // Gravity
    state.vy -= G * dt;

    // Thrusters relative to car orientation
    // Car local "up" (roof) is angle + π/2 from forward (angle = heading of nose)
    // Forward = (cos θ, sin θ); roof = (-sin θ, cos θ)
    const fx = Math.cos(state.angle);
    const fy = Math.sin(state.angle);
    const ux = -fy;
    const uy = fx;

    const thrust = c.thrust / c.mass;
    if (canL && canR) {
      state.vx += ux * thrust * dt;
      state.vy += uy * thrust * dt;
      state.omega *= Math.exp(-1.5 * dt);
      if (!state.brakeWarned && Math.abs(wrapAngle(state.angle - (-Math.PI / 2))) < 0.7) {
        // wheels roughly down: angle ≈ -π/2 means nose left... 
        // wheels down when roof points up: uy world ≈ 1 → angle ≈ 0 if forward is +x
        // Actually wheels contact: car roof should point +Y, so ux≈0, uy≈1 → -sinθ≈0, cosθ≈1 → θ≈0
      }
      const wheelsDown = Math.cos(state.angle) > 0.5; // nose roughly +x, roof +y
      if (wheelsDown && state.vy < -5 && !state.brakeWarned) {
        state.brakeWarned = true;
        showBanner(t().tipBrake, 2.2);
      }
    } else if (canL) {
      // left thruster → roll right (positive omega in our convention)
      state.omega += c.torque / c.mass * dt;
      state.vx += ux * thrust * 0.35 * dt;
      state.vy += uy * thrust * 0.35 * dt;
    } else if (canR) {
      state.omega -= c.torque / c.mass * dt;
      state.vx += ux * thrust * 0.35 * dt;
      state.vy += uy * thrust * 0.35 * dt;
    }

    state.omega *= Math.exp(-0.4 * dt);
    state.angle += state.omega * dt;
    state.vx *= Math.exp(-0.05 * dt);
    state.vy *= Math.exp(-0.02 * dt);

    state.x += state.vx * dt;
    state.y += state.vy * dt;

    // Collision with track (rough): if penetrating overhang from wrong side → crash
    if (hitTrackHard()) {
      finish("crash", { reason: "wall" });
      return;
    }

    // Ground landing
    const gy = groundY(state.x);
    if (state.y < gy + 1.1 && state.vy <= 0) {
      resolveLanding(gy);
    }

    // Fell too far
    if (state.y < -30) {
      finish("crash", { reason: "fall" });
    }
  }

  function wrapAngle(a) {
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    return a;
  }

  function hitTrackHard() {
    // Sample nearest track point; if inside road from underside at high speed
    let best = 1e9;
    let near = null;
    for (let i = 0; i < TRACK.segs.length; i += 2) {
      const g = TRACK.segs[i];
      const mx = (g.x0 + g.x1) * 0.5;
      const my = (g.y0 + g.y1) * 0.5;
      const d = Math.hypot(state.x - mx, state.y - my);
      if (d < best) {
        best = d;
        near = g;
      }
    }
    if (!near || best > TRACK.halfW + 3) return false;
    // relative to segment
    const dx = state.x - near.x0;
    const dy = state.y - near.y0;
    const along = dx * near.tx + dy * near.ty;
    if (along < -2 || along > near.len + 2) return false;
    const side = dx * near.nx + dy * near.ny; // positive = above road (sky side)
    // Hit black underside
    if (side < -0.5 && side > -TRACK.halfW - 2 && Math.hypot(state.vx, state.vy) > 8) {
      return true;
    }
    return false;
  }

  function resolveLanding(gy) {
    state.y = gy + 1.1;
    const speed = Math.hypot(state.vx, state.vy);
    // Wheels-down: roof up → angle near 0 (nose +x)
    const tilt = Math.abs(wrapAngle(state.angle));
    const tiltDeg = tilt * (180 / Math.PI);
    const impact = Math.abs(state.vy) * 3.6; // fake km/h vertical

    if (tiltDeg > 55 || impact > 95 || speed > 55) {
      finish("crash", { tilt: tiltDeg, impact, speed });
      return;
    }

    // Successful-ish landing
    state.vx *= 0.3;
    state.vy = 0;
    state.omega = 0;
    state.angle = 0;
    finish("land", { tilt: tiltDeg, impact, speed, rolls: state.rolls });
  }

  function gradeFor(rolls, tilt, impact, crashed) {
    const g = t().grades;
    if (crashed) return g.crash;
    if (rolls >= 2 && tilt < 15 && impact < 40) return g.legend;
    if (rolls >= 1 && tilt < 20 && impact < 50) return g.perfect;
    if (rolls >= 0.7 && tilt < 35) return g.great;
    if (tilt < 45) return g.good;
    return g.ok;
  }

  function finish(kind, info) {
    state.mode = "done";
    running = false;
    const rolls = state.rolls;
    const tilt = info.tilt || 0;
    const impact = info.impact || 0;
    const crashed = kind !== "land";
    const grade = gradeFor(rolls, tilt, impact, crashed);
    state.result = { kind, rolls, tilt, impact, grade, info };

    if (crashed) {
      showBanner(t().crash, 1.5);
      beep(110, 0.25, "square");
    } else {
      showBanner(t().nailed + "<span class='sub'>" + grade + "</span>", 2);
      beep(523, 0.1, "sine");
      setTimeout(() => beep(659, 0.12, "sine"), 100);
    }

    setTimeout(() => showResult(), 700);
  }

  // ---------- Render ----------
  const stars = Array.from({ length: 48 }, () => ({
    x: Math.random() * 200 - 40,
    y: Math.random() * 120,
    r: Math.random() * 1.2 + 0.3
  }));

  function resizeCanvas() {
    const stage = $("stage");
    const rect = stage.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(280, Math.floor(rect.width));
    const h = Math.max(400, Math.floor(rect.height));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas._cssW = w;
    canvas._cssH = h;
  }

  function worldToScreen(wx, wy) {
    const W = canvas._cssW || 390;
    const H = canvas._cssH || 700;
    const scale = Math.min(W, H) / 55;
    const cx = state.camX;
    const cy = state.camY;
    return {
      x: W * 0.45 + (wx - cx) * scale,
      y: H * 0.62 - (wy - cy) * scale,
      scale
    };
  }

  function draw() {
    const W = canvas._cssW || 390;
    const H = canvas._cssH || 700;
    ctx.clearRect(0, 0, W, H);

    // Night sky
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#050508");
    g.addColorStop(0.55, "#0c0c12");
    g.addColorStop(1, "#12141a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Stars
    ctx.fillStyle = "#ffffff";
    for (const s of stars) {
      const p = worldToScreen(s.x + state.camX * 0.15, s.y + 40);
      ctx.globalAlpha = 0.35 + (s.r / 2) * 0.4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Distant light
    const lamp = worldToScreen(state.camX - 25, 8);
    ctx.fillStyle = "rgba(255,230,180,0.15)";
    ctx.beginPath();
    ctx.arc(lamp.x, lamp.y, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffe9a8";
    ctx.beginPath();
    ctx.arc(lamp.x, lamp.y, 3, 0, Math.PI * 2);
    ctx.fill();

    drawPines();
    drawTrack();
    drawCar();
    updateHUD();
  }

  function drawPines() {
    const positions = [-20, 5, 30, 55, 95];
    for (const px of positions) {
      const base = worldToScreen(px, 0);
      const sc = base.scale;
      ctx.fillStyle = "#1a2a1a";
      ctx.beginPath();
      ctx.moveTo(base.x, base.y);
      ctx.lineTo(base.x - 6 * sc / 8, base.y - 18 * sc / 8);
      ctx.lineTo(base.x + 6 * sc / 8, base.y - 18 * sc / 8);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(base.x, base.y - 10 * sc / 8);
      ctx.lineTo(base.x - 5 * sc / 8, base.y - 28 * sc / 8);
      ctx.lineTo(base.x + 5 * sc / 8, base.y - 28 * sc / 8);
      ctx.closePath();
      ctx.fill();
    }
  }

  function drawTrack() {
    const hw = TRACK.halfW;
    // Underside (black) then top surface
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // Scaffolding under curl
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < TRACK.segs.length; i += 5) {
      const s = TRACK.segs[i];
      if (s.y0 < 8) continue;
      const a = worldToScreen(s.x0 - s.nx * hw, s.y0 - s.ny * hw);
      const b = worldToScreen(s.x0 - s.nx * hw - 2, 0);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    // Black underside path
    ctx.beginPath();
    for (let i = 0; i < TRACK.pts.length; i++) {
      const p = TRACK.pts[i];
      const n = i < TRACK.segs.length ? TRACK.segs[Math.min(i, TRACK.segs.length - 1)] : TRACK.segs[TRACK.segs.length - 1];
      const q = worldToScreen(p.x - n.nx * hw, p.y - n.ny * hw);
      if (i === 0) ctx.moveTo(q.x, q.y);
      else ctx.lineTo(q.x, q.y);
    }
    // close along end then underside reverse... simpler: stroke thick
    ctx.strokeStyle = "#0a0a0a";
    ctx.lineWidth = hw * (worldToScreen(0, 0).scale) * 1.1;
    ctx.stroke();

    // Gray road surface
    ctx.beginPath();
    for (let i = 0; i < TRACK.pts.length; i++) {
      const p = TRACK.pts[i];
      const n = TRACK.segs[Math.min(i, TRACK.segs.length - 1)];
      const q = worldToScreen(p.x + n.nx * 0.15, p.y + n.ny * 0.15);
      if (i === 0) ctx.moveTo(q.x, q.y);
      else ctx.lineTo(q.x, q.y);
    }
    ctx.strokeStyle = "#8a8e94";
    ctx.lineWidth = hw * 2 * worldToScreen(0, 0).scale * 0.92;
    ctx.stroke();

    // Center pale line
    ctx.beginPath();
    for (let i = 0; i < TRACK.pts.length; i++) {
      const p = TRACK.pts[i];
      const q = worldToScreen(p.x, p.y);
      if (i === 0) ctx.moveTo(q.x, q.y);
      else ctx.lineTo(q.x, q.y);
    }
    ctx.strokeStyle = "rgba(230,230,235,0.7)";
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Red dashed edges
    drawEdge(1);
    drawEdge(-1);

    // Ground strip near start
    const g0 = worldToScreen(-30, 0);
    const g1 = worldToScreen(90, 0);
    ctx.fillStyle = "#2a2e28";
    ctx.fillRect(Math.min(g0.x, g1.x), g0.y, Math.abs(g1.x - g0.x), 200);

    // Finish-ish marker on flat
    const m = worldToScreen(70, 0);
    const sc = m.scale;
    ctx.fillStyle = "#111";
    ctx.fillRect(m.x - 2, m.y - 14 * sc / 6, 4, 14 * sc / 6);
  }

  function drawEdge(side) {
    const hw = TRACK.halfW;
    ctx.beginPath();
    for (let i = 0; i < TRACK.pts.length; i++) {
      const p = TRACK.pts[i];
      const n = TRACK.segs[Math.min(i, TRACK.segs.length - 1)];
      const q = worldToScreen(p.x + n.nx * hw * side * 0.95, p.y + n.ny * hw * side * 0.95);
      if (i === 0) ctx.moveTo(q.x, q.y);
      else ctx.lineTo(q.x, q.y);
    }
    ctx.strokeStyle = "#e23b3b";
    ctx.lineWidth = 2.5;
    ctx.setLineDash([8, 7]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawCar() {
    const p = worldToScreen(state.x, state.y);
    const sc = p.scale;
    const c = carSpec();

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(-state.angle); // screen y-down vs world y-up: negate

    // Thruster flames (rear-ish sides, shooting toward roof? "up" relative = roof)
    // Local: +x nose, +y roof (after rotate -angle with y-down screen...)
    // With ctx.rotate(-angle) and world y-up mapped to screen -y, local +x = nose, local -y in canvas = roof
    if (state.flameL) {
      ctx.fillStyle = "rgba(120,200,255,0.85)";
      ctx.beginPath();
      ctx.moveTo(-6 * sc / 6, -4 * sc / 6);
      ctx.lineTo(-10 * sc / 6, -14 * sc / 6);
      ctx.lineTo(-2 * sc / 6, -4 * sc / 6);
      ctx.fill();
    }
    if (state.flameR) {
      ctx.fillStyle = "rgba(120,200,255,0.85)";
      ctx.beginPath();
      ctx.moveTo(6 * sc / 6, -4 * sc / 6);
      ctx.lineTo(10 * sc / 6, -14 * sc / 6);
      ctx.lineTo(2 * sc / 6, -4 * sc / 6);
      ctx.fill();
    }

    // Stick glow
    if (state.stickOn && state.mode === "track") {
      ctx.strokeStyle = "rgba(80,160,255,0.5)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 3 * sc / 6, 12 * sc / 6, 4 * sc / 6, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    drawCarBody(ctx, c, sc / 6);

    ctx.restore();
  }

  function drawCarBody(ctx, c, u) {
    const body = c.body;
    ctx.fillStyle = c.color;
    ctx.strokeStyle = c.accent;
    ctx.lineWidth = 1.2;

    if (body === "suv") {
      roundRect(ctx, -11 * u, -7 * u, 22 * u, 10 * u, 2 * u);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(40,60,80,0.45)";
      roundRect(ctx, -6 * u, -10 * u, 12 * u, 5 * u, 1.5 * u);
      ctx.fill();
    } else if (body === "sports") {
      ctx.beginPath();
      ctx.moveTo(-12 * u, 2 * u);
      ctx.lineTo(-10 * u, -3 * u);
      ctx.lineTo(2 * u, -5 * u);
      ctx.lineTo(12 * u, -1 * u);
      ctx.lineTo(11 * u, 3 * u);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(30,40,60,0.4)";
      ctx.beginPath();
      ctx.moveTo(-2 * u, -4.5 * u);
      ctx.lineTo(4 * u, -4.5 * u);
      ctx.lineTo(6 * u, -1.5 * u);
      ctx.lineTo(-3 * u, -1.5 * u);
      ctx.closePath();
      ctx.fill();
    } else if (body === "kei") {
      roundRect(ctx, -9 * u, -6 * u, 18 * u, 9 * u, 2.5 * u);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(60,80,100,0.35)";
      roundRect(ctx, -5 * u, -9 * u, 10 * u, 4.5 * u, 1.5 * u);
      ctx.fill();
    } else {
      // roadster
      ctx.beginPath();
      ctx.moveTo(-11 * u, 2 * u);
      ctx.quadraticCurveTo(-11 * u, -4 * u, -4 * u, -5 * u);
      ctx.lineTo(6 * u, -4 * u);
      ctx.quadraticCurveTo(12 * u, -3 * u, 12 * u, 2 * u);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(40,50,70,0.35)";
      ctx.beginPath();
      ctx.moveTo(-2 * u, -4.5 * u);
      ctx.lineTo(5 * u, -4 * u);
      ctx.lineTo(5 * u, -1 * u);
      ctx.lineTo(-3 * u, -1 * u);
      ctx.closePath();
      ctx.fill();
    }

    // Wheels
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.arc(-6 * u, 3.2 * u, 2.6 * u, 0, Math.PI * 2);
    ctx.arc(6.5 * u, 3.2 * u, 2.6 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#888";
    ctx.beginPath();
    ctx.arc(-6 * u, 3.2 * u, 1.1 * u, 0, Math.PI * 2);
    ctx.arc(6.5 * u, 3.2 * u, 1.1 * u, 0, Math.PI * 2);
    ctx.fill();
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function updateHUD() {
    const c = carSpec();
    const st = t();
    $("hudCarName").textContent = st.cars[c.id].name;
    const airPct = (state.air / state.airMax) * 100;
    $("airFill").style.width = airPct + "%";
    $("airVal").textContent = String(Math.round(state.air));
    $("airBar").setAttribute("aria-valuenow", String(Math.round(airPct)));
    const spd = Math.round(Math.hypot(state.vx, state.vy) * 3.6);
    // prefer track speed when on track
    const showSpd = state.mode === "track" ? Math.round(Math.abs(state.speed) * 3.6) : spd;
    $("hudSpeed").textContent = String(showSpd);
    $("hudHeight").textContent = state.maxHeight.toFixed(1);
    $("hudDist").textContent = String(Math.round(state.dist));
    $("hudRolls").textContent = state.rolls.toFixed(1);
  }

  // ---------- Banner ----------
  let bannerTimer = null;
  function showBanner(html, sec) {
    const el = $("banner");
    el.innerHTML = html;
    el.classList.add("show");
    clearTimeout(bannerTimer);
    bannerTimer = setTimeout(() => el.classList.remove("show"), (sec || 2) * 1000);
  }

  // ---------- i18n apply ----------
  function t() {
    return STR[lang];
  }

  function applyI18n() {
    const s = t();
    document.documentElement.lang = s.htmlLang;
    document.title = s.docTitle;
    $("titleText").textContent = s.title;
    $("lblStick").textContent = s.stick;
    $("lblLeft").textContent = s.left;
    $("lblRight").textContent = s.right;
    $("lblDrive").textContent = s.drive;
    $("lblAir").textContent = s.air;
    $("lblSpeed").textContent = s.speed;
    $("lblHeight").textContent = s.height;
    $("lblDist").textContent = s.dist;
    $("lblRolls").textContent = s.rolls;
    $("btnStart").textContent = s.start;
    $("btnPickCarFromStart").textContent = s.pickCar;
    $("btnConfirmCar").textContent = s.confirm;
    $("startTitle").textContent = s.howtoTitle;
    $("carTitle").textContent = s.pickCar;
    $("menuTitle").textContent = s.menu;
    $("menuHowto").textContent = s.howto;
    $("menuCars").textContent = s.pickCar;
    $("menuReset").textContent = s.reset;
    $("menuClose").textContent = s.close;
    $("btnRetry").textContent = s.retry;
    $("btnResultCars").textContent = s.changeCar;
    $("btnMute").setAttribute("aria-label", muted ? s.unmute : s.mute);
    $("btnMenu").setAttribute("aria-label", s.menuAria);

    const items = $("howtoList").querySelectorAll("li");
    s.howtoSteps.forEach((text, i) => {
      if (items[i]) items[i].textContent = text;
    });

    $("langTW").setAttribute("aria-pressed", lang === "tw" ? "true" : "false");
    $("langEN").setAttribute("aria-pressed", lang === "en" ? "true" : "false");

    renderCarGrid();
    updateHUD();
  }

  function renderCarGrid() {
    const grid = $("carGrid");
    grid.innerHTML = "";
    const s = t();
    Object.keys(CARS).forEach((id) => {
      const car = CARS[id];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "car-card";
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-pressed", id === selectedCarId ? "true" : "false");
      btn.innerHTML =
        '<div class="car-swatch" style="background:' + car.color + ';border:1px solid ' + car.accent + '"></div>' +
        "<strong>" + s.cars[id].name + "</strong>" +
        "<small>" + s.cars[id].blurb + "</small>";
      btn.addEventListener("click", () => {
        selectedCarId = id;
        renderCarGrid();
        updateHUD();
        beep(600, 0.05, "sine");
      });
      grid.appendChild(btn);
    });
  }

  // ---------- Overlays ----------
  function openOverlay(id) {
    $(id).hidden = false;
  }
  function closeOverlay(id) {
    $(id).hidden = true;
  }

  function showResult() {
    const r = state.result;
    if (!r) return;
    const s = t();
    if (r.kind === "land") {
      $("resultTitle").textContent = s.nailed;
      $("resultBody").innerHTML =
        "<strong>" + r.grade + "</strong><br>" +
        s.scoreRolls + ": " + r.rolls.toFixed(1) + "<br>" +
        s.landingTilt + ": " + r.tilt.toFixed(0) + "°<br>" +
        s.impactSpeed + ": " + r.impact.toFixed(0) + " km/h";
    } else {
      $("resultTitle").textContent = s.crash;
      let extra = "";
      if (r.info && r.info.reason === "wall") extra = s.tipPeel;
      else if (r.tilt) extra = s.landingTilt + " " + r.tilt.toFixed(0) + "° · " + s.impactSpeed + " " + r.impact.toFixed(0) + " km/h";
      $("resultBody").textContent = extra || s.peeled;
    }
    openOverlay("resultOverlay");
  }

  function resetGame(andStart) {
    state = freshState();
    const p = sampleTrack(state.s);
    state.x = p.x + p.nx * 1.15;
    state.y = p.y + p.ny * 1.15;
    state.angle = p.angle;
    state.camX = state.x;
    state.camY = state.y + 8;
    closeOverlay("resultOverlay");
    $("banner").classList.remove("show");
    if (andStart) {
      started = true;
      running = true;
      closeOverlay("startOverlay");
      closeOverlay("carOverlay");
      closeOverlay("menuOverlay");
    }
    updateHUD();
  }

  // ---------- Input ----------
  function setAction(name, down) {
    if (!(name in input)) return;
    input[name] = down;
    const map = { stick: "btnStick", left: "btnLeft", right: "btnRight", drive: "btnDrive" };
    const btn = $(map[name]);
    if (btn) {
      btn.classList.toggle("is-down", down);
      btn.setAttribute("aria-pressed", down ? "true" : "false");
    }
  }

  function bindPointer(btn, action) {
    const on = (e) => {
      e.preventDefault();
      setAction(action, true);
    };
    const off = (e) => {
      e.preventDefault();
      setAction(action, false);
    };
    btn.addEventListener("pointerdown", on);
    btn.addEventListener("pointerup", off);
    btn.addEventListener("pointerleave", off);
    btn.addEventListener("pointercancel", off);
    btn.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  bindPointer($("btnStick"), "stick");
  bindPointer($("btnLeft"), "left");
  bindPointer($("btnRight"), "right");
  bindPointer($("btnDrive"), "drive");

  window.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    if (e.code === "KeyX") setAction("stick", true);
    if (e.code === "ArrowLeft") { e.preventDefault(); setAction("left", true); }
    if (e.code === "ArrowRight") { e.preventDefault(); setAction("right", true); }
    if (e.code === "Space") { e.preventDefault(); setAction("drive", true); }
  });
  window.addEventListener("keyup", (e) => {
    if (e.code === "KeyX") setAction("stick", false);
    if (e.code === "ArrowLeft") setAction("left", false);
    if (e.code === "ArrowRight") setAction("right", false);
    if (e.code === "Space") setAction("drive", false);
  });

  // ---------- UI wiring ----------
  $("langTW").addEventListener("click", () => { lang = "tw"; applyI18n(); });
  $("langEN").addEventListener("click", () => { lang = "en"; applyI18n(); });

  $("btnMute").addEventListener("click", () => {
    muted = !muted;
    $("btnMute").textContent = muted ? "🔇" : "🔊";
    $("btnMute").setAttribute("aria-pressed", muted ? "true" : "false");
    $("btnMute").setAttribute("aria-label", muted ? t().unmute : t().mute);
  });

  $("btnMenu").addEventListener("click", () => {
    openOverlay("menuOverlay");
    $("btnMenu").setAttribute("aria-expanded", "true");
  });
  $("menuClose").addEventListener("click", () => {
    closeOverlay("menuOverlay");
    $("btnMenu").setAttribute("aria-expanded", "false");
  });
  $("menuHowto").addEventListener("click", () => {
    closeOverlay("menuOverlay");
    $("startTitle").textContent = t().howtoTitle;
    openOverlay("startOverlay");
  });
  $("menuCars").addEventListener("click", () => {
    closeOverlay("menuOverlay");
    openOverlay("carOverlay");
  });
  $("menuReset").addEventListener("click", () => {
    closeOverlay("menuOverlay");
    resetGame(true);
    beep(400, 0.06, "sine");
  });

  $("btnStart").addEventListener("click", () => {
    resetGame(true);
    beep(520, 0.08, "sine");
  });
  $("btnPickCarFromStart").addEventListener("click", () => {
    closeOverlay("startOverlay");
    openOverlay("carOverlay");
  });
  $("btnConfirmCar").addEventListener("click", () => {
    closeOverlay("carOverlay");
    state.air = carSpec().airMax;
    state.airMax = carSpec().airMax;
    updateHUD();
    if (!started) openOverlay("startOverlay");
    else resetGame(true);
  });
  $("btnRetry").addEventListener("click", () => resetGame(true));
  $("btnResultCars").addEventListener("click", () => {
    closeOverlay("resultOverlay");
    openOverlay("carOverlay");
  });

  // ---------- Loop ----------
  let last = performance.now();
  function frame(now) {
    const dt = (now - last) / 1000;
    last = now;
    update(dt);
    draw();
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  applyI18n();
  resetGame(false);
  openOverlay("startOverlay");
  requestAnimationFrame(frame);
})();

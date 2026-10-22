/**
 * Flip Roadster — infinite side-view stunt runner (vanilla JS IIFE, no modules)
 * Drive right, jump ground hazards, duck air beams, flip for bonus. Survive for score.
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
      score: "分數",
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
        "按住「前進」向右衝刺。前方有石柱、路障、矮牆——用「吸附」升起飛過。",
        "飛太高會撞到懸浮塊／橫樑，記得用單邊推進翻滾或降高度。",
        "空中完成完整 1 圈（2π）立刻加 bonus；多圈再加。正常落地可繼續開，唔會即輸。",
        "吸附與推進消耗空氣；唔用掣時會緩慢回充，地面行時回充更快。空氣空咗就升唔起。",
        "撞障礙、翻車太嚴重、或掉出地圖先 Game Over。目標：死為止攞最高分。"
      ],
      tipLift: "按住「吸附」升起避開地面障礙！",
      tipAirObs: "小心天上橫樑！飛太高會撞到。",
      tipAir: "壓縮空氣用完了！落地回充吧。",
      tipFlip: "空中翻滾攞 bonus！",
      flipBonus: "空中翻轉",
      crash: "撞毀了!!",
      gameOver: "遊戲結束",
      totalScore: "總分",
      distScore: "距離分",
      flipScore: "翻轉 bonus",
      timeScore: "存活分",
      flipsDone: "完整圈數",
      reasonHit: "撞到障礙物",
      reasonFlip: "翻車失控",
      reasonFall: "掉出地圖",
      cars: {
        roadster: { name: "敞篷跑車", blurb: "均衡 · 經典" },
        suv: { name: "越野休旅", blurb: "較重 · 空氣多" },
        sports: { name: "超跑", blurb: "更快 · 較耗氣" },
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
      score: "SCORE",
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
        "Hold Drive to race right. Pillars, barriers, and low walls ahead — hold Stick to lift over them.",
        "Fly too high and you hit floating blocks / beams. Roll with one thruster or drop altitude.",
        "A full aerial flip (2π) awards an instant bonus; each extra flip adds more. Normal landings continue the run.",
        "Stick & thrusters burn air. Air refills slowly when idle, faster on the ground. Empty air = no lift.",
        "Crash into obstacles, flip too hard, or fall off the map to end. Goal: highest score until you wipe out."
      ],
      tipLift: "Hold Stick to lift over ground hazards!",
      tipAirObs: "Watch the sky beams — don't fly too high!",
      tipAir: "Out of compressed air! Land to recharge.",
      tipFlip: "Flip in the air for bonus points!",
      flipBonus: "FLIP",
      crash: "CRASH!!",
      gameOver: "Game Over",
      totalScore: "Total score",
      distScore: "Distance",
      flipScore: "Flip bonus",
      timeScore: "Survival",
      flipsDone: "Full flips",
      reasonHit: "Hit an obstacle",
      reasonFlip: "Rolled over",
      reasonFall: "Fell off the map",
      cars: {
        roadster: { name: "Roadster", blurb: "Balanced · classic" },
        suv: { name: "SUV", blurb: "Heavy · more air" },
        sports: { name: "Sports", blurb: "Faster · thirstier" },
        kei: { name: "Kei car", blurb: "Light · more roll" }
      }
    }
  };

  // ---------- Cars ----------
  const CARS = {
    roadster: {
      id: "roadster", color: "#c8ccd2", accent: "#333",
      mass: 1.0, accel: 28, maxSpeed: 48, lift: 38,
      airCostStick: 18, airCostThrust: 14, airMax: 100,
      thrust: 22, torque: 7.5, drag: 0.32, body: "roadster",
      regenGround: 22, regenAir: 8
    },
    suv: {
      id: "suv", color: "#3d5c4a", accent: "#1a2e22",
      mass: 1.35, accel: 22, maxSpeed: 40, lift: 34,
      airCostStick: 14, airCostThrust: 12, airMax: 130,
      thrust: 20, torque: 6.2, drag: 0.42, body: "suv",
      regenGround: 26, regenAir: 9
    },
    sports: {
      id: "sports", color: "#d64545", accent: "#2a1010",
      mass: 0.9, accel: 36, maxSpeed: 58, lift: 42,
      airCostStick: 22, airCostThrust: 16, airMax: 85,
      thrust: 26, torque: 8.2, drag: 0.26, body: "sports",
      regenGround: 18, regenAir: 6
    },
    kei: {
      id: "kei", color: "#f0e6a8", accent: "#5a5030",
      mass: 0.7, accel: 26, maxSpeed: 42, lift: 44,
      airCostStick: 16, airCostThrust: 10, airMax: 110,
      thrust: 24, torque: 10.5, drag: 0.38, body: "kei",
      regenGround: 24, regenAir: 10
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

  // ---------- Audio ----------
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
    } catch (_) { /* ok */ }
  }

  // ---------- Constants ----------
  const G = 26;
  const GROUND_Y = 0;
  const CAR_HALF_H = 1.15;
  const CAR_HALF_W = 1.7;
  const FLIP_BONUS = 500;
  const DIST_SCORE_RATE = 2.5; // per meter of progress
  const TIME_SCORE_RATE = 8;   // per second alive
  const SPAWN_AHEAD = 90;
  const DESPAWN_BEHIND = 40;

  // ---------- Obstacles ----------
  /** kind: ground_pillar | ground_barrier | ground_wall | air_block | air_beam */
  function makeObstacle(kind, x) {
    if (kind === "ground_pillar") {
      return { kind, x, y: 0, w: 1.4, h: 3.2, color: "#6b7280" };
    }
    if (kind === "ground_barrier") {
      return { kind, x, y: 0, w: 2.6, h: 1.5, color: "#f59e0b" };
    }
    if (kind === "ground_wall") {
      return { kind, x, y: 0, w: 3.4, h: 2.2, color: "#78716c" };
    }
    if (kind === "air_block") {
      const gap = 4.5 + Math.random() * 3.5;
      return { kind, x, y: gap, w: 2.2, h: 1.8, color: "#a78bfa" };
    }
    // air_beam — wide thin bar high up
    const y = 6.5 + Math.random() * 3;
    return { kind, x, y: y, w: 5.5 + Math.random() * 2, h: 0.9, color: "#38bdf8" };
  }

  const GROUND_KINDS = ["ground_pillar", "ground_barrier", "ground_wall"];
  const AIR_KINDS = ["air_block", "air_beam"];

  // ---------- State ----------
  function carSpec() {
    return CARS[selectedCarId];
  }

  function freshState() {
    const c = carSpec();
    return {
      mode: "drive", // drive | air | done
      x: 8,
      y: CAR_HALF_H,
      vx: 0,
      vy: 0,
      angle: 0,
      omega: 0,
      air: c.airMax,
      airMax: c.airMax,
      rolls: 0,
      rollAccum: 0,
      flipsComplete: 0,
      lastAngle: 0,
      score: 0,
      flipBonusTotal: 0,
      distScore: 0,
      timeScore: 0,
      aliveTime: 0,
      maxHeight: 0,
      dist: 0,
      startX: 8,
      result: null,
      camX: 20,
      camY: 10,
      flameL: 0,
      flameR: 0,
      liftOn: false,
      obstacles: [],
      nextSpawnX: 35,
      tipLiftShown: false,
      tipAirShown: false,
      tipFlipShown: false,
      airWarned: false,
      groundedFrames: 0
    };
  }

  let state = freshState();
  const input = { stick: false, left: false, right: false, drive: false };
  // Multi-touch: each action can be held by multiple pointer ids
  const pointerMap = new Map(); // pointerId -> action

  // ---------- Spawn ----------
  function spawnObstacles() {
    while (state.nextSpawnX < state.x + SPAWN_AHEAD) {
      const roll = Math.random();
      const gap = 14 + Math.random() * 10 + Math.min(18, state.dist * 0.02);
      const x = state.nextSpawnX + gap;

      if (roll < 0.55) {
        const kind = GROUND_KINDS[(Math.random() * GROUND_KINDS.length) | 0];
        state.obstacles.push(makeObstacle(kind, x));
        // sometimes pair with an air obstacle a bit further
        if (Math.random() < 0.45) {
          const ak = AIR_KINDS[(Math.random() * AIR_KINDS.length) | 0];
          state.obstacles.push(makeObstacle(ak, x + 6 + Math.random() * 8));
        }
      } else if (roll < 0.82) {
        const ak = AIR_KINDS[(Math.random() * AIR_KINDS.length) | 0];
        state.obstacles.push(makeObstacle(ak, x));
      } else {
        // combo: low wall + high beam
        state.obstacles.push(makeObstacle("ground_wall", x));
        state.obstacles.push(makeObstacle("air_beam", x + 3));
      }

      state.nextSpawnX = x;
      if (!state.tipLiftShown && state.obstacles.some((o) => o.kind.indexOf("ground") === 0)) {
        state.tipLiftShown = true;
        showBanner(t().tipLift, 2.4);
      }
    }
    // despawn
    state.obstacles = state.obstacles.filter((o) => o.x > state.x - DESPAWN_BEHIND);
  }

  // ---------- Physics ----------
  function update(dt) {
    if (!running || state.mode === "done") return;
    const c = carSpec();
    const dtClamp = Math.min(dt, 0.033);
    state.aliveTime += dtClamp;

    // Air spend / regen
    let airUse = 0;
    if (input.stick && state.air > 0) airUse += c.airCostStick * dtClamp;
    if (input.left && state.air > 0) airUse += c.airCostThrust * dtClamp;
    if (input.right && state.air > 0) airUse += c.airCostThrust * dtClamp;

    if (airUse > 0) {
      state.air = Math.max(0, state.air - airUse);
    } else {
      const regen = state.mode === "drive" ? c.regenGround : c.regenAir;
      state.air = Math.min(state.airMax, state.air + regen * dtClamp);
    }
    if (state.air <= 0 && !state.airWarned) {
      state.airWarned = true;
      showBanner(t().tipAir, 2.2);
      beep(180, 0.15, "square");
    }
    if (state.air > 5) state.airWarned = false;

    const canLift = input.stick && state.air > 0;
    const canL = input.left && state.air > 0;
    const canR = input.right && state.air > 0;
    state.flameL = canL ? 1 : 0;
    state.flameR = canR ? 1 : 0;
    state.liftOn = canLift;

    if (state.mode === "drive") {
      updateGround(dtClamp, c, canLift, canL, canR);
    } else if (state.mode === "air") {
      updateAir(dtClamp, c, canLift, canL, canR);
    }

    // Flip tracking (in air)
    if (state.mode === "air") {
      let dA = state.angle - state.lastAngle;
      while (dA > Math.PI) dA -= Math.PI * 2;
      while (dA < -Math.PI) dA += Math.PI * 2;
      state.rollAccum += Math.abs(dA);
      const flips = Math.floor(state.rollAccum / (Math.PI * 2));
      if (flips > state.flipsComplete) {
        const gained = flips - state.flipsComplete;
        state.flipsComplete = flips;
        const bonus = gained * FLIP_BONUS;
        state.flipBonusTotal += bonus;
        showBanner(
          "<span style='color:#fde68a'>+" + bonus + "</span><span class='sub'>" + t().flipBonus + "</span>",
          1.2
        );
        beep(660, 0.08, "sine");
        setTimeout(function () { beep(880, 0.1, "sine"); }, 80);
        if (!state.tipFlipShown) {
          state.tipFlipShown = true;
        }
      }
      state.rolls = Math.floor(state.rollAccum / (Math.PI * 2) * 10) / 10;
    }
    state.lastAngle = state.angle;

    state.maxHeight = Math.max(state.maxHeight, state.y);
    state.dist = Math.max(0, state.x - state.startX);

    // Score: distance + survival time + flip bonuses (flip already banked)
    state.distScore = Math.floor(state.dist * DIST_SCORE_RATE);
    state.timeScore = Math.floor(state.aliveTime * TIME_SCORE_RATE);
    state.score = state.distScore + state.timeScore + state.flipBonusTotal;

    spawnObstacles();
    checkObstacleHits();

    // Fall off map
    if (state.y < -25) {
      finish("fall");
      return;
    }

    // Camera
    state.camX += (state.x + 8 - state.camX) * Math.min(1, 5 * dtClamp);
    const targetCamY = Math.max(6, state.y + 4);
    state.camY += (targetCamY - state.camY) * Math.min(1, 3 * dtClamp);
  }

  function updateGround(dt, c, canLift, canL, canR) {
    // Drive
    if (input.drive) {
      state.vx += (c.accel / c.mass) * dt;
    } else {
      state.vx *= Math.exp(-c.drag * 1.2 * dt);
    }
    state.vx = Math.max(0, Math.min(c.maxSpeed, state.vx));
    state.vx *= Math.exp(-c.drag * 0.08 * dt);

    // Lift takes off
    if (canLift) {
      state.mode = "air";
      state.vy = Math.max(state.vy, c.lift / c.mass * 0.35);
      state.groundedFrames = 0;
      if (!state.tipFlipShown) {
        // soft tip once airborne a bit — handled in air
      }
    }

    // Single thruster on ground: small hop + roll (helps clear low barriers)
    if (canL || canR) {
      if (canL && canR) {
        state.mode = "air";
        state.vy = Math.max(state.vy, c.thrust / c.mass * 0.55);
      } else {
        state.omega += (canL ? 1 : -1) * (c.torque / c.mass) * 0.4 * dt;
        state.angle += state.omega * dt;
      }
    } else {
      // settle angle toward 0 on ground
      state.angle += (0 - state.angle) * Math.min(1, 8 * dt);
      state.omega *= 0.85;
    }

    state.x += state.vx * dt;
    state.y = CAR_HALF_H;
    state.vy = 0;
    state.groundedFrames++;

    // Tip over while grounded if angle too wild
    const tilt = Math.abs(wrapAngle(state.angle));
    if (tilt > 1.15) {
      finish("flip", { tilt: tilt * (180 / Math.PI) });
    }
  }

  function updateAir(dt, c, canLift, canL, canR) {
    state.vy -= G * dt;

    const fx = Math.cos(state.angle);
    const fy = Math.sin(state.angle);
    const ux = -fy;
    const uy = fx;

    const thrust = c.thrust / c.mass;
    const lift = c.lift / c.mass;

    // Stick = strong world-up / roof lift
    if (canLift) {
      state.vy += lift * dt;
      // slight forward help so you keep moving
      if (input.drive) state.vx += (c.accel / c.mass) * 0.35 * dt;
    }

    if (canL && canR) {
      state.vx += ux * thrust * dt;
      state.vy += uy * thrust * dt;
      state.omega *= Math.exp(-1.6 * dt);
    } else if (canL) {
      state.omega += (c.torque / c.mass) * dt;
      state.vx += ux * thrust * 0.3 * dt;
      state.vy += uy * thrust * 0.3 * dt;
    } else if (canR) {
      state.omega -= (c.torque / c.mass) * dt;
      state.vx += ux * thrust * 0.3 * dt;
      state.vy += uy * thrust * 0.3 * dt;
    }

    if (input.drive && !canLift) {
      state.vx += (c.accel / c.mass) * 0.25 * dt;
    }

    state.omega *= Math.exp(-0.35 * dt);
    state.angle += state.omega * dt;
    state.vx *= Math.exp(-0.04 * dt);
    state.vy *= Math.exp(-0.015 * dt);
    state.vx = Math.max(-6, Math.min(c.maxSpeed * 1.05, state.vx));

    state.x += state.vx * dt;
    state.y += state.vy * dt;

    // Soft ceiling soft-cap (not fatal alone — air obstacles handle height)
    if (state.y > 22) {
      state.y = 22;
      if (state.vy > 0) state.vy *= 0.4;
    }

    // Landing — continue run if wheels-ish down and impact OK
    if (state.y <= CAR_HALF_H && state.vy <= 0) {
      resolveLanding();
    }
  }

  function wrapAngle(a) {
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    return a;
  }

  function resolveLanding() {
    const tilt = Math.abs(wrapAngle(state.angle));
    const tiltDeg = tilt * (180 / Math.PI);
    const impact = Math.abs(state.vy);

    // Severe wipeout
    if (tiltDeg > 70 || impact > 28) {
      state.y = CAR_HALF_H;
      finish("flip", { tilt: tiltDeg, impact: impact * 3.6 });
      return;
    }

    // Soft / OK landing — keep going
    state.mode = "drive";
    state.y = CAR_HALF_H;
    state.vy = 0;
    state.vx *= 0.92;
    // bleed remaining roll into settle if mild
    if (tiltDeg < 45) {
      state.angle = 0;
      state.omega = 0;
    } else {
      // awkward but recoverable
      state.angle *= 0.3;
      state.omega *= 0.2;
    }
    // Keep rollAccum so flips stay counted; don't reset flip meter mid-run
    beep(320, 0.05, "triangle");
  }

  function carAABB() {
    // Approximate axis-aligned box (generous for gameplay)
    const cos = Math.abs(Math.cos(state.angle));
    const sin = Math.abs(Math.sin(state.angle));
    const hw = CAR_HALF_W * cos + CAR_HALF_H * sin;
    const hh = CAR_HALF_W * sin + CAR_HALF_H * cos;
    return {
      x0: state.x - hw * 0.85,
      x1: state.x + hw * 0.85,
      y0: state.y - hh * 0.85,
      y1: state.y + hh * 0.85
    };
  }

  function checkObstacleHits() {
    const box = carAABB();
    for (let i = 0; i < state.obstacles.length; i++) {
      const o = state.obstacles[i];
      const ox0 = o.x - o.w / 2;
      const ox1 = o.x + o.w / 2;
      const oy0 = o.y;
      const oy1 = o.y + o.h;
      if (box.x1 > ox0 && box.x0 < ox1 && box.y1 > oy0 && box.y0 < oy1) {
        finish("hit", { kind: o.kind });
        return;
      }
    }
    // tip for air obstacles approaching
    if (!state.tipAirShown) {
      for (let i = 0; i < state.obstacles.length; i++) {
        const o = state.obstacles[i];
        if (o.kind.indexOf("air") === 0 && o.x - state.x < 25 && o.x > state.x) {
          state.tipAirShown = true;
          showBanner(t().tipAirObs, 2.2);
          break;
        }
      }
    }
  }

  function finish(reason, info) {
    state.mode = "done";
    running = false;
    state.result = {
      reason: reason || "hit",
      info: info || {},
      score: state.score,
      distScore: state.distScore,
      timeScore: state.timeScore,
      flipBonusTotal: state.flipBonusTotal,
      flips: state.flipsComplete,
      dist: state.dist,
      rolls: state.rolls
    };
    showBanner(t().crash, 1.4);
    beep(110, 0.25, "square");
    setTimeout(function () { showResult(); }, 650);
  }

  // ---------- Render ----------
  const stars = Array.from({ length: 56 }, function () {
    return { x: Math.random() * 400, y: Math.random() * 140, r: Math.random() * 1.2 + 0.3 };
  });

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
    const scale = Math.min(W, H) / 42;
    return {
      x: W * 0.32 + (wx - state.camX) * scale,
      y: H * 0.72 - (wy - state.camY) * scale,
      scale: scale
    };
  }

  function draw() {
    const W = canvas._cssW || 390;
    const H = canvas._cssH || 700;
    ctx.clearRect(0, 0, W, H);

    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#050508");
    g.addColorStop(0.55, "#0c0c14");
    g.addColorStop(1, "#141820");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Stars (parallax)
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const px = ((s.x - state.camX * 0.12) % 400 + 400) % 400;
      const p = worldToScreen(state.camX - 30 + px * 0.15, 30 + s.y * 0.25);
      ctx.globalAlpha = 0.3 + (s.r / 2) * 0.4;
      ctx.beginPath();
      ctx.arc((px / 400) * W, (s.y / 140) * H * 0.45, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    drawGround();
    drawObstacles();
    drawCar();
    updateHUD();
  }

  function drawGround() {
    const g0 = worldToScreen(state.camX - 50, GROUND_Y);
    const g1 = worldToScreen(state.camX + 80, GROUND_Y);
    const sc = g0.scale;

    // Dirt strip
    ctx.fillStyle = "#1e241c";
    ctx.fillRect(0, g0.y, canvas._cssW || 390, (canvas._cssH || 700) - g0.y + 4);

    // Road surface
    ctx.fillStyle = "#3f4450";
    ctx.fillRect(0, g0.y - 2 * sc / 6, canvas._cssW || 390, 3.2 * sc / 6);

    // Dashed center line
    ctx.strokeStyle = "rgba(230,230,235,0.55)";
    ctx.lineWidth = 2;
    ctx.setLineDash([12, 14]);
    ctx.beginPath();
    ctx.moveTo(0, g0.y - 0.4 * sc / 6);
    ctx.lineTo(canvas._cssW || 390, g0.y - 0.4 * sc / 6);
    ctx.stroke();
    ctx.setLineDash([]);

    // Red edge dashes scrolling
    const dashOff = -(state.camX * sc) % 30;
    ctx.strokeStyle = "#e23b3b";
    ctx.lineWidth = 2.5;
    ctx.setLineDash([8, 10]);
    ctx.lineDashOffset = dashOff;
    ctx.beginPath();
    ctx.moveTo(0, g0.y - 2.4 * sc / 6);
    ctx.lineTo(canvas._cssW || 390, g0.y - 2.4 * sc / 6);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;

    // Distant pines (parallax)
    for (let i = -2; i < 12; i++) {
      const wx = Math.floor(state.camX / 28) * 28 + i * 28;
      const base = worldToScreen(wx, 0);
      const u = base.scale / 6;
      ctx.fillStyle = "#152015";
      ctx.beginPath();
      ctx.moveTo(base.x, base.y);
      ctx.lineTo(base.x - 7 * u, base.y - 20 * u);
      ctx.lineTo(base.x + 7 * u, base.y - 20 * u);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(base.x, base.y - 12 * u);
      ctx.lineTo(base.x - 5 * u, base.y - 32 * u);
      ctx.lineTo(base.x + 5 * u, base.y - 32 * u);
      ctx.closePath();
      ctx.fill();
    }
  }

  function drawObstacles() {
    for (let i = 0; i < state.obstacles.length; i++) {
      const o = state.obstacles[i];
      const a = worldToScreen(o.x - o.w / 2, o.y + o.h);
      const b = worldToScreen(o.x + o.w / 2, o.y);
      const x = Math.min(a.x, b.x);
      const y = Math.min(a.y, b.y);
      const w = Math.abs(b.x - a.x);
      const h = Math.abs(b.y - a.y);

      ctx.fillStyle = o.color;
      if (o.kind === "ground_pillar") {
        roundRectPath(ctx, x, y, w, h, 3);
        ctx.fill();
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.fillRect(x + w * 0.15, y, w * 0.2, h);
      } else if (o.kind === "ground_barrier") {
        ctx.fillStyle = "#f59e0b";
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = "#111";
        for (let s = 0; s < 3; s++) {
          ctx.fillRect(x + w * (0.15 + s * 0.28), y, w * 0.12, h);
        }
      } else if (o.kind === "ground_wall") {
        ctx.fillStyle = "#78716c";
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = "#44403c";
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
      } else if (o.kind === "air_block") {
        ctx.fillStyle = "#a78bfa";
        roundRectPath(ctx, x, y, w, h, 4);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.fillRect(x + 3, y + 3, w * 0.35, 4);
      } else {
        // beam
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fillRect(x, y + h * 0.25, w, h * 0.2);
      }
    }
  }

  function roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawCar() {
    const p = worldToScreen(state.x, state.y);
    const sc = p.scale;
    const c = carSpec();

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(-state.angle);

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
    if (state.liftOn) {
      ctx.fillStyle = "rgba(96,165,250,0.55)";
      ctx.beginPath();
      ctx.ellipse(0, 5 * sc / 6, 10 * sc / 6, 4 * sc / 6, 0, 0, Math.PI * 2);
      ctx.fill();
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
      roundRectPath(ctx, -11 * u, -7 * u, 22 * u, 10 * u, 2 * u);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(40,60,80,0.45)";
      roundRectPath(ctx, -6 * u, -10 * u, 12 * u, 5 * u, 1.5 * u);
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
      roundRectPath(ctx, -9 * u, -6 * u, 18 * u, 9 * u, 2.5 * u);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(60,80,100,0.35)";
      roundRectPath(ctx, -5 * u, -9 * u, 10 * u, 4.5 * u, 1.5 * u);
      ctx.fill();
    } else {
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

  function updateHUD() {
    const c = carSpec();
    const st = t();
    $("hudCarName").textContent = st.cars[c.id].name;
    const airPct = (state.air / state.airMax) * 100;
    $("airFill").style.width = airPct + "%";
    $("airFill").style.background = airPct < 25
      ? "linear-gradient(90deg, #dc2626, #f97316)"
      : "linear-gradient(90deg, #16a34a, #4ade80)";
    $("airVal").textContent = String(Math.round(state.air));
    $("airBar").setAttribute("aria-valuenow", String(Math.round(airPct)));
    const spd = state.mode === "drive"
      ? Math.round(Math.abs(state.vx) * 3.6)
      : Math.round(Math.hypot(state.vx, state.vy) * 3.6);
    $("hudSpeed").textContent = String(spd);
    $("hudHeight").textContent = Math.max(0, state.y - CAR_HALF_H).toFixed(1);
    $("hudDist").textContent = String(Math.round(state.dist));
    $("hudRolls").textContent = state.rolls.toFixed(1);
    if ($("hudScore")) $("hudScore").textContent = String(Math.floor(state.score));
  }

  // ---------- Banner ----------
  let bannerTimer = null;
  function showBanner(html, sec) {
    const el = $("banner");
    el.innerHTML = html;
    el.classList.add("show");
    clearTimeout(bannerTimer);
    bannerTimer = setTimeout(function () { el.classList.remove("show"); }, (sec || 2) * 1000);
  }

  // ---------- i18n ----------
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
    if ($("lblScore")) $("lblScore").textContent = s.score;
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
    s.howtoSteps.forEach(function (text, i) {
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
    Object.keys(CARS).forEach(function (id) {
      const car = CARS[id];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "car-card";
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-pressed", id === selectedCarId ? "true" : "false");
      btn.innerHTML =
        '<div class="car-swatch" style="background:' + car.color + ";border:1px solid " + car.accent + '"></div>' +
        "<strong>" + s.cars[id].name + "</strong>" +
        "<small>" + s.cars[id].blurb + "</small>";
      btn.addEventListener("click", function () {
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
    $("resultTitle").textContent = s.gameOver;
    let reason = s.reasonHit;
    if (r.reason === "flip") reason = s.reasonFlip;
    else if (r.reason === "fall") reason = s.reasonFall;

    $("resultBody").innerHTML =
      "<strong style='font-size:22px'>" + Math.floor(r.score) + "</strong><br>" +
      s.totalScore + "<br><br>" +
      reason + "<br>" +
      s.distScore + ": " + r.distScore + " (" + Math.round(r.dist) + " m)<br>" +
      s.timeScore + ": " + r.timeScore + "<br>" +
      s.flipScore + ": " + r.flipBonusTotal + " (" + s.flipsDone + " " + r.flips + ")<br>" +
      s.rolls + ": " + r.rolls.toFixed(1);
    openOverlay("resultOverlay");
  }

  function resetGame(andStart) {
    state = freshState();
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

  // ---------- Input (multi-touch safe via pointer capture + pointerId map) ----------
  function refreshActionFromPointers(action) {
    let down = false;
    pointerMap.forEach(function (a) {
      if (a === action) down = true;
    });
    // also respect keyboard (stored separately via setActionKeyboard)
    if (keyHeld[action]) down = true;
    input[action] = down;
    const map = { stick: "btnStick", left: "btnLeft", right: "btnRight", drive: "btnDrive" };
    const btn = $(map[action]);
    if (btn) {
      btn.classList.toggle("is-down", down);
      btn.setAttribute("aria-pressed", down ? "true" : "false");
    }
  }

  const keyHeld = { stick: false, left: false, right: false, drive: false };

  function bindPointer(btn, action) {
    btn.addEventListener("pointerdown", function (e) {
      if (e.button != null && e.button !== 0) return;
      e.preventDefault();
      pointerMap.set(e.pointerId, action);
      try { btn.setPointerCapture(e.pointerId); } catch (_) { /* ok */ }
      refreshActionFromPointers(action);
    });
    function release(e) {
      if (!pointerMap.has(e.pointerId)) return;
      e.preventDefault();
      pointerMap.delete(e.pointerId);
      refreshActionFromPointers(action);
    }
    btn.addEventListener("pointerup", release);
    btn.addEventListener("pointercancel", release);
    btn.addEventListener("lostpointercapture", function (e) {
      if (pointerMap.get(e.pointerId) === action) {
        pointerMap.delete(e.pointerId);
        refreshActionFromPointers(action);
      }
    });
    btn.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  }

  bindPointer($("btnStick"), "stick");
  bindPointer($("btnLeft"), "left");
  bindPointer($("btnRight"), "right");
  bindPointer($("btnDrive"), "drive");

  window.addEventListener("keydown", function (e) {
    if (e.repeat) return;
    let action = null;
    if (e.code === "KeyX") action = "stick";
    if (e.code === "ArrowLeft") { e.preventDefault(); action = "left"; }
    if (e.code === "ArrowRight") { e.preventDefault(); action = "right"; }
    if (e.code === "Space") { e.preventDefault(); action = "drive"; }
    if (action) {
      keyHeld[action] = true;
      refreshActionFromPointers(action);
    }
  });
  window.addEventListener("keyup", function (e) {
    let action = null;
    if (e.code === "KeyX") action = "stick";
    if (e.code === "ArrowLeft") action = "left";
    if (e.code === "ArrowRight") action = "right";
    if (e.code === "Space") action = "drive";
    if (action) {
      keyHeld[action] = false;
      refreshActionFromPointers(action);
    }
  });

  // ---------- UI wiring ----------
  $("langTW").addEventListener("click", function () { lang = "tw"; applyI18n(); });
  $("langEN").addEventListener("click", function () { lang = "en"; applyI18n(); });

  $("btnMute").addEventListener("click", function () {
    muted = !muted;
    $("btnMute").textContent = muted ? "🔇" : "🔊";
    $("btnMute").setAttribute("aria-pressed", muted ? "true" : "false");
    $("btnMute").setAttribute("aria-label", muted ? t().unmute : t().mute);
  });

  $("btnMenu").addEventListener("click", function () {
    openOverlay("menuOverlay");
    $("btnMenu").setAttribute("aria-expanded", "true");
  });
  $("menuClose").addEventListener("click", function () {
    closeOverlay("menuOverlay");
    $("btnMenu").setAttribute("aria-expanded", "false");
  });
  $("menuHowto").addEventListener("click", function () {
    closeOverlay("menuOverlay");
    $("startTitle").textContent = t().howtoTitle;
    openOverlay("startOverlay");
  });
  $("menuCars").addEventListener("click", function () {
    closeOverlay("menuOverlay");
    openOverlay("carOverlay");
  });
  $("menuReset").addEventListener("click", function () {
    closeOverlay("menuOverlay");
    resetGame(true);
    beep(400, 0.06, "sine");
  });

  $("btnStart").addEventListener("click", function () {
    resetGame(true);
    beep(520, 0.08, "sine");
  });
  $("btnPickCarFromStart").addEventListener("click", function () {
    closeOverlay("startOverlay");
    openOverlay("carOverlay");
  });
  $("btnConfirmCar").addEventListener("click", function () {
    closeOverlay("carOverlay");
    state.air = carSpec().airMax;
    state.airMax = carSpec().airMax;
    updateHUD();
    if (!started) openOverlay("startOverlay");
    else resetGame(true);
  });
  $("btnRetry").addEventListener("click", function () { resetGame(true); });
  $("btnResultCars").addEventListener("click", function () {
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

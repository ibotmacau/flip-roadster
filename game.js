/**
 * Flip Roadster — infinite side-view stunt runner (vanilla JS IIFE, no modules)
 * Flat → climb wall (Stick) → lip → night-sky flips. Lift / Stick / Flip / Drive.
 */
(function () {
  "use strict";

  // ---------- i18n ----------
  const STR = {
    tw: {
      htmlLang: "zh-Hant",
      docTitle: "翻滾敞篷｜免費瀏覽器遊戲",
      title: "翻滾敞篷",
      lift: "升",
      stick: "吸",
      flip: "翻",
      drive: "前",
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
        "開局：平路 → 爬牆 → 反翹／唇 → 倒飛入夜空。牆上／反翹要按住「吸」先唔剝落（唔係「升」）。",
        "「升」升起／調高度避開地面障礙；「翻」空中翻滾攞 bonus；「前」前進加速。升+翻可相對車頂推力減速着地。",
        "飛出後係夜空星星場景畀你翻滾；吸附只係牆面機械，同星空無關。空中完整 1 圈（2π）+500。",
        "升／吸／翻耗氣；唔用掣會回充，地面更快。空氣空咗就升唔起、吸唔住。",
        "平面落地（輪胎朝下）可繼續開。只喺撞障礙、嚴重翻車、掉出地圖先 Game Over。",
        "沿途有彩色玻璃波子路線：撞到即收集得分（唔會死）。本局目標收集 10 粒有任務獎勵；結果畫面會顯示波子分。"
      ],
      tipLift: "按住「升」升起避開地面障礙！",
      tipStick: "牆上／反翹按住「吸」唔好鬆！",
      tipAirObs: "小心天上橫樑！飛太高會撞到。",
      tipAir: "壓縮空氣用完了！落地回充吧。",
      tipFlip: "空中按「翻」翻滾攞 bonus！",
      tipLaunch: "起飛！用翻／升／前喺夜空耍技。",
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
        cybercab: { name: "無人計程車", blurb: "香檳金 · 兩座無方向盤" },
        model3: { name: "特斯拉 3", blurb: "低趴轎跑 · 更快" },
        modely: { name: "特斯拉 Y", blurb: "跨界休旅 · 空氣多" },
        models: { name: "特斯拉 S", blurb: "豪華長軸 · 流暢" }
      },
      marbles: "波子",
      marbleBonus: "收集波子",
      marbleScore: "波子分",
      marbleMission: "波子任務",
      marbleMissionGoal: "目標",
      marbleMissionDone: "波子任務完成！",
      marbleMissionBonus: "任務獎勵",
      tipMarble: "沿波子路線飛高收集！目標 10 粒有 bonus！"
    },
    en: {
      htmlLang: "en",
      docTitle: "Flip Roadster | Free browser game",
      title: "Flip Roadster",
      lift: "Lift",
      stick: "Stick",
      flip: "Flip",
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
        "Opening: flat road → climb the wall → reverse lip → inverted into the night sky. Hold Stick on the wall/lip (not Lift) or you peel off.",
        "Lift raises altitude over ground hazards. Flip rolls in the air for bonus. Drive accelerates. Lift+Flip adds roof-relative thrust to soften landings.",
        "After launch you're in a starry night sky for flipping — Stick is wall adhesion only, unrelated to the stars. Full aerial flip (2π) → +500.",
        "Lift, Stick & Flip burn air. Air refills when idle, faster on the ground. Empty air = no lift / no stick.",
        "Wheels-down landings continue the run. Only obstacle hits, severe rollovers, or falling off the map end the game.",
        "Glass marbles form collectible trails — touch for score (never lethal). Grab 10 in a run for a mission bonus; results highlight marble score."
      ],
      tipLift: "Hold Lift to rise over ground hazards!",
      tipStick: "Hold Stick on the wall / lip — don't let go!",
      tipAirObs: "Watch the sky beams — don't fly too high!",
      tipAir: "Out of compressed air! Land to recharge.",
      tipFlip: "Hold Flip in the air for bonus points!",
      tipLaunch: "Airborne! Flip / Lift / Drive in the night sky.",
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
        cybercab: { name: "Cybercab", blurb: "Champagne · two-seat robotaxi" },
        model3: { name: "Model 3", blurb: "Low sedan · quicker" },
        modely: { name: "Model Y", blurb: "Crossover · more air" },
        models: { name: "Model S", blurb: "Long luxury · smooth" }
      },
      marbles: "Marbles",
      marbleBonus: "Marble!",
      marbleScore: "Marble score",
      marbleMission: "Marble mission",
      marbleMissionGoal: "Goal",
      marbleMissionDone: "Marble mission complete!",
      marbleMissionBonus: "Mission bonus",
      tipMarble: "Follow the marble trail! Collect 10 for a bonus!"
    }
  };

  // ---------- Cars ----------
  const CARS = {
    cybercab: {
      id: "cybercab", color: "#c9b48a", accent: "#5c4e36",
      mass: 1.0, accel: 30, maxSpeed: 50, lift: 40,
      airCostLift: 17, airCostStick: 15, airCostFlip: 11, airMax: 105,
      roofThrust: 21, torque: 8.8, drag: 0.28, body: "cybercab",
      regenGround: 23, regenAir: 8
    },
    model3: {
      id: "model3", color: "#e5e7eb", accent: "#1f2937",
      mass: 0.95, accel: 35, maxSpeed: 56, lift: 41,
      airCostLift: 20, airCostStick: 17, airCostFlip: 13, airMax: 90,
      roofThrust: 23, torque: 9.0, drag: 0.25, body: "model3",
      regenGround: 19, regenAir: 6.5
    },
    modely: {
      id: "modely", color: "#1e3a5f", accent: "#0f172a",
      mass: 1.25, accel: 24, maxSpeed: 44, lift: 36,
      airCostLift: 15, airCostStick: 13, airCostFlip: 10, airMax: 125,
      roofThrust: 19, torque: 7.4, drag: 0.38, body: "modely",
      regenGround: 25, regenAir: 8.5
    },
    models: {
      id: "models", color: "#374151", accent: "#111827",
      mass: 1.08, accel: 33, maxSpeed: 54, lift: 39,
      airCostLift: 18, airCostStick: 15, airCostFlip: 12, airMax: 100,
      roofThrust: 22, torque: 8.5, drag: 0.24, body: "models",
      regenGround: 21, regenAir: 7
    }
  };

  // ---------- DOM ----------
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const $ = (id) => document.getElementById(id);

  let lang = "tw";
  let muted = false;
  let selectedCarId = "cybercab";
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
  const CAR_HALF_H = 1.38; // ~20% larger (was 1.15) — match visual scale
  const CAR_HALF_W = 2.04; // ~20% larger (was 1.7)
  const CAR_DRAW_SCALE = 1.2; // visual body scale vs base unit
  const FLIP_BONUS = 500;
  const DIST_SCORE_RATE = 2.5;
  const TIME_SCORE_RATE = 8;
  const SPAWN_AHEAD = 90;
  const DESPAWN_BEHIND = 40;
  const MARBLE_SCORE_MIN = 50;
  const MARBLE_SCORE_MAX = 100;
  const MARBLE_MISSION_GOAL = 10;
  const MARBLE_MISSION_BONUS = 300;
  const MARBLE_COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ec4899", "#06b6d4", "#f97316"];
  const LAND_TILT_FAIL = 95; // degrees — only severe rollover
  const LAND_IMPACT_FAIL = 36;

  // ---------- Launch track: flat → wall → lip → sky ----------
  function buildLaunchPath() {
    const pts = [];
    function add(x, y, sticky, seg) {
      pts.push({ x: x, y: y, sticky: !!sticky, seg: seg || "flat" });
    }
    // Flat road
    for (let x = 0; x <= 20; x += 0.5) add(x, 0, false, "flat");
    // Corner into wall
    add(21.2, 0.15, true, "wall");
    add(21.6, 0.6, true, "wall");
    // Vertical wall climb
    for (let y = 1; y <= 13.5; y += 0.45) add(21.8, y, true, "wall");
    // Reverse lip / overhang (curl left, invert)
    const cx = 21.8, cy = 13.5, R = 5.2;
    for (let a = Math.PI; a <= Math.PI + 2.55; a += 0.09) {
      const px = cx + R * Math.cos(a);
      const py = cy + R * Math.sin(a);
      add(px, py, true, "lip");
    }
    // Launch tip (last sticky) — exit into night sky
    const last = pts[pts.length - 1];
    add(last.x - 0.8, last.y + 0.6, true, "lip");
    add(last.x - 1.4, last.y + 1.4, false, "launch");
    return pts;
  }

  const LAUNCH_PATH = buildLaunchPath();
  const LAUNCH_CUM = (function () {
    const c = [0];
    for (let i = 1; i < LAUNCH_PATH.length; i++) {
      const a = LAUNCH_PATH[i - 1], b = LAUNCH_PATH[i];
      const d = Math.hypot(b.x - a.x, b.y - a.y);
      c.push(c[i - 1] + d);
    }
    return c;
  })();
  const LAUNCH_LEN = LAUNCH_CUM[LAUNCH_CUM.length - 1];

  function samplePath(s) {
    const sClamped = Math.max(0, Math.min(LAUNCH_LEN, s));
    let i = 1;
    while (i < LAUNCH_CUM.length - 1 && LAUNCH_CUM[i] < sClamped) i++;
    const s0 = LAUNCH_CUM[i - 1], s1 = LAUNCH_CUM[i];
    const t = s1 > s0 ? (sClamped - s0) / (s1 - s0) : 0;
    const a = LAUNCH_PATH[i - 1], b = LAUNCH_PATH[i];
    const x = a.x + (b.x - a.x) * t;
    const y = a.y + (b.y - a.y) * t;
    const dx = b.x - a.x, dy = b.y - a.y;
    const ang = Math.atan2(dy, dx);
    const sticky = t < 0.5 ? a.sticky : b.sticky;
    const seg = t < 0.5 ? a.seg : b.seg;
    return { x: x, y: y, angle: ang, sticky: sticky, seg: seg, i: i };
  }

  // ---------- Obstacles ----------
  function makeObstacle(kind, x) {
    if (kind === "ground_pillar") {
      return { kind: kind, x: x, y: 0, w: 1.4, h: 3.2, color: "#6b7280" };
    }
    if (kind === "ground_barrier") {
      return { kind: kind, x: x, y: 0, w: 2.6, h: 1.5, color: "#f59e0b" };
    }
    if (kind === "ground_wall") {
      return { kind: kind, x: x, y: 0, w: 3.4, h: 2.2, color: "#78716c" };
    }
    if (kind === "air_block") {
      const gap = 4.5 + Math.random() * 3.5;
      return { kind: kind, x: x, y: gap, w: 2.2, h: 1.8, color: "#a78bfa" };
    }
    const y = 6.5 + Math.random() * 3;
    return { kind: kind, x: x, y: y, w: 5.5 + Math.random() * 2, h: 0.9, color: "#38bdf8" };
  }

  const GROUND_KINDS = ["ground_pillar", "ground_barrier", "ground_wall"];
  const AIR_KINDS = ["air_block", "air_beam"];

  // ---------- State ----------
  function carSpec() {
    return CARS[selectedCarId];
  }

  function freshState() {
    const c = carSpec();
    const p0 = samplePath(0);
    return {
      mode: "track", // track | drive | air | done
      x: p0.x,
      y: p0.y + CAR_HALF_H,
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
      startX: p0.x,
      result: null,
      camX: 14,
      camY: 8,
      flameFlip: 0,
      liftOn: false,
      stickOn: false,
      obstacles: [],
      marbles: [],
      nextSpawnX: 55,
      nextMarbleX: 58,
      marbleCount: 0,
      marbleScore: 0,
      marbleMissionDone: false,
      tipLiftShown: false,
      tipMarbleShown: false,
      tipStickShown: false,
      tipAirShown: false,
      tipFlipShown: false,
      tipLaunchShown: false,
      airWarned: false,
      groundedFrames: 0,
      trackS: 0,
      trackSpeed: 0,
      launchDone: false,
      peeling: false
    };
  }

  let state = freshState();
  const input = { lift: false, stick: false, flip: false, drive: false };
  const pointerMap = new Map();

  // ---------- Spawn (only after launch) ----------
  function spawnObstacles() {
    if (!state.launchDone) return;
    while (state.nextSpawnX < state.x + SPAWN_AHEAD) {
      const roll = Math.random();
      const gap = 14 + Math.random() * 10 + Math.min(18, state.dist * 0.02);
      const x = state.nextSpawnX + gap;

      if (roll < 0.55) {
        const kind = GROUND_KINDS[(Math.random() * GROUND_KINDS.length) | 0];
        state.obstacles.push(makeObstacle(kind, x));
        if (Math.random() < 0.45) {
          const ak = AIR_KINDS[(Math.random() * AIR_KINDS.length) | 0];
          state.obstacles.push(makeObstacle(ak, x + 6 + Math.random() * 8));
        }
      } else if (roll < 0.82) {
        const ak = AIR_KINDS[(Math.random() * AIR_KINDS.length) | 0];
        state.obstacles.push(makeObstacle(ak, x));
      } else {
        state.obstacles.push(makeObstacle("ground_wall", x));
        state.obstacles.push(makeObstacle("air_beam", x + 3));
      }

      state.nextSpawnX = x;
      if (!state.tipLiftShown && state.obstacles.some(function (o) { return o.kind.indexOf("ground") === 0; })) {
        state.tipLiftShown = true;
        showBanner(t().tipLift, 2.4);
      }
    }
    state.obstacles = state.obstacles.filter(function (o) { return o.x > state.x - DESPAWN_BEHIND; });
  }

  function makeMarble(x, y) {
    const value = MARBLE_SCORE_MIN + ((Math.random() * (MARBLE_SCORE_MAX - MARBLE_SCORE_MIN + 1)) | 0);
    return {
      x: x,
      y: y,
      r: 0.52 + Math.random() * 0.12,
      color: MARBLE_COLORS[(Math.random() * MARBLE_COLORS.length) | 0],
      bob: Math.random() * Math.PI * 2,
      value: value
    };
  }

  function avoidObstacleY(x, y) {
    let yy = y;
    for (let i = 0; i < state.obstacles.length; i++) {
      const o = state.obstacles[i];
      if (Math.abs(o.x - x) < 3.2) {
        const oc = o.y + o.h * 0.5;
        if (Math.abs(oc - yy) < (o.h * 0.55 + 1.2)) {
          yy = o.y + o.h + 1.4 + Math.random() * 1.5;
        }
      }
    }
    return Math.min(16.5, Math.max(1.8, yy));
  }

  function spawnMarbles() {
    if (!state.launchDone) return;
    while (state.nextMarbleX < state.x + SPAWN_AHEAD) {
      // Denser trails: shorter gaps + clear route arcs to chase
      const gap = 9 + Math.random() * 8;
      const x0 = state.nextMarbleX + gap;
      const routeRoll = Math.random();
      let baseY;
      if (routeRoll < 0.45) {
        baseY = 8.0 + Math.random() * 5.5; // high flip trail
      } else if (routeRoll < 0.8) {
        baseY = 3.0 + Math.random() * 3.2; // mid lane
      } else {
        baseY = 5.5 + Math.random() * 3.5; // bridging lane
      }
      const trailLen = 3 + ((Math.random() * 3) | 0); // 3–5 marbles in a row
      const amp = 0.9 + Math.random() * 1.4;
      const step = 1.55 + Math.random() * 0.45;
      let lastX = x0;
      for (let t = 0; t < trailLen; t++) {
        const x = x0 + t * step;
        const y = avoidObstacleY(x, baseY + Math.sin(t * 0.95 + x0 * 0.08) * amp);
        state.marbles.push(makeMarble(x, y));
        lastX = x;
      }
      // occasional bonus cluster above the trail
      if (Math.random() < 0.28) {
        const cx = x0 + step * (trailLen * 0.5);
        state.marbles.push(makeMarble(cx, avoidObstacleY(cx, Math.min(16, baseY + 2.4 + Math.random() * 1.8))));
      }
      state.nextMarbleX = lastX;
      if (!state.tipMarbleShown) {
        state.tipMarbleShown = true;
        showBanner(t().tipMarble, 2.6);
      }
    }
    state.marbles = state.marbles.filter(function (m) { return m.x > state.x - DESPAWN_BEHIND; });
  }

  function checkMarbleCollect() {
    if (!state.launchDone && state.mode === "track") return;
    const box = carAABB();
    const kept = [];
    for (let i = 0; i < state.marbles.length; i++) {
      const m = state.marbles[i];
      const mx0 = m.x - m.r;
      const mx1 = m.x + m.r;
      const my0 = m.y - m.r;
      const my1 = m.y + m.r;
      if (box.x1 > mx0 && box.x0 < mx1 && box.y1 > my0 && box.y0 < my1) {
        state.marbleCount += 1;
        state.marbleScore += m.value;
        showBanner(
          "<span style='color:#fde68a'>+" + m.value + "</span><span class='sub'>" + t().marbleBonus +
          " · " + state.marbleCount + "/" + MARBLE_MISSION_GOAL + "</span>",
          0.9
        );
        beep(740, 0.06, "sine");
        setTimeout(function () { beep(980, 0.07, "sine"); }, 55);
        if (!state.marbleMissionDone && state.marbleCount >= MARBLE_MISSION_GOAL) {
          state.marbleMissionDone = true;
          state.marbleScore += MARBLE_MISSION_BONUS;
          showBanner(
            "<span style='color:#fde68a'>+" + MARBLE_MISSION_BONUS + "</span><span class='sub'>" +
            t().marbleMissionDone + "</span>",
            2.4
          );
          beep(520, 0.08, "triangle");
          setTimeout(function () { beep(780, 0.1, "triangle"); }, 80);
          setTimeout(function () { beep(1040, 0.12, "triangle"); }, 160);
        }
      } else {
        kept.push(m);
      }
    }
    state.marbles = kept;
  }

  // ---------- Physics ----------
  function update(dt) {
    if (!running || state.mode === "done") return;
    const c = carSpec();
    const dtClamp = Math.min(dt, 0.033);
    state.aliveTime += dtClamp;

    // Air spend / regen
    let airUse = 0;
    if (input.lift && state.air > 0) airUse += c.airCostLift * dtClamp;
    if (input.stick && state.air > 0) airUse += c.airCostStick * dtClamp;
    if (input.flip && state.air > 0) airUse += c.airCostFlip * dtClamp;

    if (airUse > 0) {
      state.air = Math.max(0, state.air - airUse);
    } else {
      const regen = (state.mode === "drive" || (state.mode === "track" && !samplePath(state.trackS).sticky))
        ? c.regenGround : c.regenAir;
      state.air = Math.min(state.airMax, state.air + regen * dtClamp);
    }
    if (state.air <= 0 && !state.airWarned) {
      state.airWarned = true;
      showBanner(t().tipAir, 2.2);
      beep(180, 0.15, "square");
    }
    if (state.air > 5) state.airWarned = false;

    const canLift = input.lift && state.air > 0;
    const canStick = input.stick && state.air > 0;
    const canFlip = input.flip && state.air > 0;
    state.flameFlip = canFlip ? 1 : 0;
    state.liftOn = canLift;
    state.stickOn = canStick;

    if (state.mode === "track") {
      updateTrack(dtClamp, c, canLift, canStick, canFlip);
    } else if (state.mode === "drive") {
      updateGround(dtClamp, c, canLift, canStick, canFlip);
    } else if (state.mode === "air") {
      updateAir(dtClamp, c, canLift, canStick, canFlip);
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
        state.tipFlipShown = true;
      }
      state.rolls = Math.floor(state.rollAccum / (Math.PI * 2) * 10) / 10;
    }
    state.lastAngle = state.angle;

    state.maxHeight = Math.max(state.maxHeight, state.y);
    state.dist = Math.max(0, state.x - state.startX);

    state.distScore = Math.floor(state.dist * DIST_SCORE_RATE);
    state.timeScore = Math.floor(state.aliveTime * TIME_SCORE_RATE);
    state.score = state.distScore + state.timeScore + state.flipBonusTotal + state.marbleScore;

    spawnObstacles();
    spawnMarbles();
    checkObstacleHits();
    checkMarbleCollect();

    if (state.y < -25) {
      finish("fall");
      return;
    }

    state.camX += (state.x + 8 - state.camX) * Math.min(1, 5 * dtClamp);
    const targetCamY = Math.max(6, state.y + 4);
    state.camY += (targetCamY - state.camY) * Math.min(1, 3 * dtClamp);
  }

  function detachToAir(exitBoost) {
    const p = samplePath(Math.min(state.trackS, LAUNCH_LEN));
    const tang = p.angle;
    const speed = Math.max(state.trackSpeed, 18);
    state.mode = "air";
    state.launchDone = true;
    state.peeling = false;
    state.vx = Math.cos(tang) * speed + (exitBoost ? 6 : 2);
    state.vy = Math.sin(tang) * speed + (exitBoost ? 10 : 4);
    state.angle = tang;
    state.omega = exitBoost ? 2.2 : 0.6;
    state.y = p.y + CAR_HALF_H * 0.4;
    state.x = p.x;
    state.nextSpawnX = Math.max(state.nextSpawnX, state.x + 35);
    state.nextMarbleX = Math.max(state.nextMarbleX, state.x + 28);
    if (!state.tipLaunchShown) {
      state.tipLaunchShown = true;
      showBanner(t().tipLaunch, 2.6);
    }
    beep(520, 0.1, "sine");
  }

  function peelOffTrack() {
    const p = samplePath(state.trackS);
    state.mode = "air";
    state.peeling = true;
    state.vx = Math.cos(p.angle) * state.trackSpeed * 0.4;
    state.vy = Math.sin(p.angle) * state.trackSpeed * 0.2 - 2;
    state.angle = p.angle;
    state.omega = 0;
    state.x = p.x;
    state.y = p.y + CAR_HALF_H;
    // If peeled before launch tip, can still fall onto flat or die
    if (p.seg === "lip" || p.seg === "wall") {
      // free fall — may land on flat if early, or fall off
    }
  }

  function updateTrack(dt, c, canLift, canStick, canFlip) {
    const p = samplePath(state.trackS);

    // Stick tip once on wall
    if (p.sticky && p.seg === "wall" && !state.tipStickShown) {
      state.tipStickShown = true;
      showBanner(t().tipStick, 2.8);
    }

    // Drive along track
    if (input.drive) {
      state.trackSpeed += (c.accel / c.mass) * dt;
    } else {
      state.trackSpeed *= Math.exp(-c.drag * 1.1 * dt);
    }
    state.trackSpeed = Math.max(0, Math.min(c.maxSpeed * 0.95, state.trackSpeed));

    // Lift on flat portion of track = early takeoff into air (optional hop)
    if (canLift && !p.sticky && state.trackS < 18) {
      state.mode = "air";
      state.vy = c.lift / c.mass * 0.4;
      state.vx = state.trackSpeed;
      state.x = p.x;
      state.y = p.y + CAR_HALF_H;
      state.angle = 0;
      return;
    }

    // Must hold Stick on sticky surfaces
    if (p.sticky && !canStick) {
      peelOffTrack();
      return;
    }

    state.trackS += state.trackSpeed * dt;

    // Reached launch tip
    if (state.trackS >= LAUNCH_LEN - 0.05) {
      detachToAir(true);
      return;
    }

    const np = samplePath(state.trackS);
    // Offset car "above" surface along outward normal
    const nxx = -Math.sin(np.angle);
    const nyy = Math.cos(np.angle);
    state.x = np.x + nxx * CAR_HALF_H * 0.15;
    state.y = np.y + nyy * CAR_HALF_H * 0.9;
    state.angle = np.angle;
    state.vx = Math.cos(np.angle) * state.trackSpeed;
    state.vy = Math.sin(np.angle) * state.trackSpeed;
    state.omega = 0;

    // Flip on track: small spin assist (mostly for feel)
    if (canFlip) {
      state.omega = c.torque / c.mass * 0.3;
    }
  }

  function updateGround(dt, c, canLift, canStick, canFlip) {
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
    }

    // Flip on ground: small hop-roll
    if (canFlip) {
      state.omega -= (c.torque / c.mass) * 0.5 * dt;
      state.angle += state.omega * dt;
    } else {
      state.angle += (0 - state.angle) * Math.min(1, 8 * dt);
      state.omega *= 0.85;
    }

    state.x += state.vx * dt;
    state.y = CAR_HALF_H;
    state.vy = 0;
    state.groundedFrames++;

    // Only severe tilt while grounded ends the run
    const tilt = Math.abs(wrapAngle(state.angle));
    if (tilt > (LAND_TILT_FAIL * Math.PI / 180)) {
      finish("flip", { tilt: tilt * (180 / Math.PI) });
    }
  }

  function updateAir(dt, c, canLift, canStick, canFlip) {
    state.vy -= G * dt;

    const fx = Math.cos(state.angle);
    const fy = Math.sin(state.angle);
    // Roof / "up" relative to car
    const ux = -fy;
    const uy = fx;

    const lift = c.lift / c.mass;
    const roof = c.roofThrust / c.mass;

    // Lift = world-up altitude
    if (canLift) {
      state.vy += lift * dt;
      if (input.drive) state.vx += (c.accel / c.mass) * 0.35 * dt;
    }

    // Flip = continuous roll one direction (torque)
    if (canFlip) {
      state.omega -= (c.torque / c.mass) * dt;
    }

    // Lift + Flip: roof-relative thrust to help soften / control landing
    if (canLift && canFlip) {
      state.vx += ux * roof * 0.85 * dt;
      state.vy += uy * roof * 0.85 * dt;
      state.omega *= Math.exp(-1.2 * dt);
    }

    // Stick in free air does nothing mechanical (wall-only); cost already applied
    void canStick;

    if (input.drive && !canLift) {
      state.vx += (c.accel / c.mass) * 0.28 * dt;
    }

    state.omega *= Math.exp(-0.28 * dt);
    state.angle += state.omega * dt;
    state.vx *= Math.exp(-0.04 * dt);
    state.vy *= Math.exp(-0.015 * dt);
    state.vx = Math.max(-10, Math.min(c.maxSpeed * 1.1, state.vx));

    state.x += state.vx * dt;
    state.y += state.vy * dt;

    if (state.y > 28) {
      state.y = 28;
      if (state.vy > 0) state.vy *= 0.4;
    }

    // Landing on flat ground plane
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

    // Severe wipeout only — flat / mild landings continue
    if (tiltDeg > LAND_TILT_FAIL || impact > LAND_IMPACT_FAIL) {
      state.y = CAR_HALF_H;
      finish("flip", { tilt: tiltDeg, impact: impact * 3.6 });
      return;
    }

    state.mode = "drive";
    state.launchDone = true;
    state.peeling = false;
    state.y = CAR_HALF_H;
    state.vy = 0;
    state.vx = Math.max(state.vx * 0.92, 4);
    if (tiltDeg < 50) {
      state.angle = 0;
      state.omega = 0;
    } else {
      state.angle *= 0.25;
      state.omega *= 0.15;
    }
    if (state.nextSpawnX < state.x + 20) {
      state.nextSpawnX = state.x + 28;
    }
    if (state.nextMarbleX < state.x + 16) {
      state.nextMarbleX = state.x + 22;
    }
    beep(320, 0.05, "triangle");
  }

  function carAABB() {
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
    if (!state.launchDone && state.mode === "track") return;
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
      marbleScore: state.marbleScore,
      marbleCount: state.marbleCount,
      marbleMissionDone: state.marbleMissionDone,
      flips: state.flipsComplete,
      dist: state.dist,
      rolls: state.rolls
    };
    showBanner(t().crash, 1.4);
    beep(110, 0.25, "square");
    setTimeout(function () { showResult(); }, 650);
  }

  // ---------- Render ----------
  const stars = Array.from({ length: 90 }, function () {
    return {
      x: Math.random() * 400,
      y: Math.random() * 160,
      r: Math.random() * 1.4 + 0.25,
      tw: Math.random() * Math.PI * 2
    };
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

    // Sky: darker night when high / airborne (starfield for flips); dimmer near runway
    const alt = Math.max(0, state.y - CAR_HALF_H);
    const skyAmt = Math.min(1, Math.max(0, (alt - 1.5) / 10));
    const airborne = state.mode === "air" || (state.mode === "track" && samplePath(state.trackS).seg !== "flat");
    const night = Math.max(skyAmt, airborne ? 0.55 : 0.15);

    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, lerpColor("#050510", "#020208", night));
    g.addColorStop(0.45, lerpColor("#10182a", "#06060e", night));
    g.addColorStop(1, lerpColor("#1a2030", "#0c1018", night));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Stars — bright in air / after takeoff; muted near ground runway
    const starAlpha = 0.12 + night * 0.88;
    const tNow = performance.now() / 1000;
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const px = ((s.x - state.camX * 0.1) % 400 + 400) % 400;
      const twinkle = 0.65 + 0.35 * Math.sin(tNow * 2.2 + s.tw);
      ctx.globalAlpha = starAlpha * twinkle * (0.35 + s.r / 2.2);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc((px / 400) * W, (s.y / 160) * H * (0.38 + night * 0.12), s.r * (0.7 + night * 0.5), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    drawLaunchTrack();
    drawGround();
    drawObstacles();
    drawMarbles();
    drawCar();
    updateHUD();
  }

  function lerpColor(a, b, t) {
    // simple mix toward b as t→1 by picking stops; return b-ish hex via opacity blend fallback
    return t > 0.5 ? b : a;
  }

  function drawLaunchTrack() {
    if (state.launchDone && state.x > 50) return;
    const sc = worldToScreen(0, 0).scale;
    ctx.lineWidth = Math.max(6, sc * 1.1);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // Road ribbon
    ctx.beginPath();
    let startedPath = false;
    for (let i = 0; i < LAUNCH_PATH.length; i++) {
      const pt = LAUNCH_PATH[i];
      const s = worldToScreen(pt.x, pt.y);
      if (!startedPath) { ctx.moveTo(s.x, s.y); startedPath = true; }
      else ctx.lineTo(s.x, s.y);
    }
    ctx.strokeStyle = "#3f4450";
    ctx.stroke();

    // Sticky highlight (wall / lip)
    ctx.beginPath();
    startedPath = false;
    for (let i = 0; i < LAUNCH_PATH.length; i++) {
      const pt = LAUNCH_PATH[i];
      if (!pt.sticky) { startedPath = false; continue; }
      const s = worldToScreen(pt.x, pt.y);
      if (!startedPath) { ctx.moveTo(s.x, s.y); startedPath = true; }
      else ctx.lineTo(s.x, s.y);
    }
    ctx.strokeStyle = "rgba(14,165,233,0.55)";
    ctx.lineWidth = Math.max(4, sc * 0.7);
    ctx.stroke();

    // Wall face block for readability
    const wallBase = worldToScreen(20.5, 0);
    const wallTop = worldToScreen(23.5, 14);
    const x0 = Math.min(wallBase.x, wallTop.x);
    const y0 = Math.min(wallBase.y, wallTop.y);
    const ww = Math.abs(wallTop.x - wallBase.x) + sc * 0.8;
    const wh = Math.abs(wallTop.y - wallBase.y);
    ctx.fillStyle = "rgba(70,75,85,0.85)";
    ctx.fillRect(x0, y0, ww, wh);
    ctx.fillStyle = "rgba(14,165,233,0.2)";
    ctx.fillRect(x0 + ww * 0.15, y0, ww * 0.2, wh);
  }

  function drawGround() {
    const g0 = worldToScreen(state.camX - 50, GROUND_Y);
    const sc = g0.scale;
    const W = canvas._cssW || 390;
    const H = canvas._cssH || 700;

    ctx.fillStyle = "#1e241c";
    ctx.fillRect(0, g0.y, W, H - g0.y + 4);

    ctx.fillStyle = "#3f4450";
    ctx.fillRect(0, g0.y - 2 * sc / 6, W, 3.2 * sc / 6);

    ctx.strokeStyle = "rgba(230,230,235,0.55)";
    ctx.lineWidth = 2;
    ctx.setLineDash([12, 14]);
    ctx.beginPath();
    ctx.moveTo(0, g0.y - 0.4 * sc / 6);
    ctx.lineTo(W, g0.y - 0.4 * sc / 6);
    ctx.stroke();
    ctx.setLineDash([]);

    const dashOff = -(state.camX * sc) % 30;
    ctx.strokeStyle = "#e23b3b";
    ctx.lineWidth = 2.5;
    ctx.setLineDash([8, 10]);
    ctx.lineDashOffset = dashOff;
    ctx.beginPath();
    ctx.moveTo(0, g0.y - 2.4 * sc / 6);
    ctx.lineTo(W, g0.y - 2.4 * sc / 6);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;

    // Distant pines (near ground only feel)
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

      if (o.kind === "ground_pillar") {
        ctx.fillStyle = o.color;
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
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fillRect(x, y + h * 0.25, w, h * 0.2);
      }
    }
  }

  function roundRectPath(ctx2, x, y, w, h, r) {
    ctx2.beginPath();
    ctx2.moveTo(x + r, y);
    ctx2.arcTo(x + w, y, x + w, y + h, r);
    ctx2.arcTo(x + w, y + h, x, y + h, r);
    ctx2.arcTo(x, y + h, x, y, r);
    ctx2.arcTo(x, y, x + w, y, r);
    ctx2.closePath();
  }

  function drawMarbles() {
    const tNow = performance.now() / 1000;
    for (let i = 0; i < state.marbles.length; i++) {
      const m = state.marbles[i];
      const bobY = m.y + Math.sin(tNow * 2.4 + m.bob) * 0.22;
      const p = worldToScreen(m.x, bobY);
      const r = Math.max(4, m.r * p.scale);
      const g = ctx.createRadialGradient(
        p.x - r * 0.35, p.y - r * 0.4, r * 0.1,
        p.x, p.y, r
      );
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.22, m.color);
      g.addColorStop(0.75, m.color);
      g.addColorStop(1, "rgba(0,0,0,0.35)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      ctx.ellipse(p.x - r * 0.32, p.y - r * 0.38, r * 0.28, r * 0.18, -0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r - 0.5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function drawCar() {
    const p = worldToScreen(state.x, state.y);
    const sc = p.scale;
    const c = carSpec();

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(-state.angle);

    if (state.flameFlip) {
      ctx.fillStyle = "rgba(192,132,252,0.9)";
      ctx.beginPath();
      ctx.moveTo(-5 * sc / 6, -3 * sc / 6);
      ctx.lineTo(0, -14 * sc / 6);
      ctx.lineTo(5 * sc / 6, -3 * sc / 6);
      ctx.fill();
    }
    if (state.liftOn) {
      ctx.fillStyle = "rgba(96,165,250,0.55)";
      ctx.beginPath();
      ctx.ellipse(0, 5 * sc / 6, 10 * sc / 6, 4 * sc / 6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    if (state.stickOn) {
      ctx.strokeStyle = "rgba(14,165,233,0.75)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 6 * sc / 6, 11 * sc / 6, 3.2 * sc / 6, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    drawCarBody(ctx, c, (sc / 6) * CAR_DRAW_SCALE);
    ctx.restore();
  }

  function drawWheel(ctx2, cx, cy, r, spokes) {
    // tire
    ctx2.beginPath();
    ctx2.arc(cx, cy, r, 0, Math.PI * 2);
    ctx2.fillStyle = "#141414";
    ctx2.fill();
    // rim disc
    ctx2.beginPath();
    ctx2.arc(cx, cy, r * 0.72, 0, Math.PI * 2);
    ctx2.fillStyle = "#2a2a2e";
    ctx2.fill();
    ctx2.strokeStyle = "#6b7280";
    ctx2.lineWidth = Math.max(0.6, r * 0.08);
    ctx2.stroke();
    // multi-spoke
    const n = spokes || 7;
    ctx2.strokeStyle = "#9ca3af";
    ctx2.lineWidth = Math.max(0.5, r * 0.1);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      ctx2.beginPath();
      ctx2.moveTo(cx + Math.cos(a) * r * 0.18, cy + Math.sin(a) * r * 0.18);
      ctx2.lineTo(cx + Math.cos(a) * r * 0.62, cy + Math.sin(a) * r * 0.62);
      ctx2.stroke();
    }
    // hub
    ctx2.beginPath();
    ctx2.arc(cx, cy, r * 0.2, 0, Math.PI * 2);
    ctx2.fillStyle = "#d1d5db";
    ctx2.fill();
  }

  function drawCarBody(ctx2, c, u) {
    const body = c.body;
    ctx2.lineWidth = 1.15;

    // soft underbody shadow (all cars)
    ctx2.fillStyle = "rgba(0,0,0,0.22)";
    ctx2.beginPath();
    ctx2.ellipse(0, 4.6 * u, 11 * u, 1.15 * u, 0, 0, Math.PI * 2);
    ctx2.fill();

    if (body === "cybercab") {
      // Champagne-gold Cybercab-inspired two-seat robotaxi (side view homage; no logos)
      const paint = ctx2.createLinearGradient(-12 * u, -6 * u, 12 * u, 4 * u);
      paint.addColorStop(0, "#a89268");
      paint.addColorStop(0.35, "#d4c19a");
      paint.addColorStop(0.7, "#c9b48a");
      paint.addColorStop(1, "#8f7a52");

      // rounded wedge / smooth coupe silhouette
      ctx2.beginPath();
      ctx2.moveTo(-12.2 * u, 2.4 * u);
      ctx2.quadraticCurveTo(-12.4 * u, 0.2 * u, -11.2 * u, -1.6 * u);
      ctx2.quadraticCurveTo(-9.5 * u, -3.8 * u, -5.5 * u, -4.6 * u);
      ctx2.quadraticCurveTo(-1.5 * u, -5.4 * u, 2.5 * u, -5.2 * u);
      ctx2.quadraticCurveTo(7.5 * u, -4.8 * u, 10.8 * u, -2.6 * u);
      ctx2.quadraticCurveTo(12.6 * u, -1.2 * u, 12.4 * u, 1.2 * u);
      ctx2.quadraticCurveTo(12.2 * u, 3.0 * u, 10.5 * u, 3.4 * u);
      ctx2.lineTo(-10.2 * u, 3.4 * u);
      ctx2.quadraticCurveTo(-12.0 * u, 3.3 * u, -12.2 * u, 2.4 * u);
      ctx2.closePath();
      ctx2.fillStyle = paint;
      ctx2.fill();
      ctx2.strokeStyle = "#5c4e36";
      ctx2.stroke();

      // dark glass canopy (closed cabin, no steering-wheel cut)
      const glass = ctx2.createLinearGradient(-4 * u, -5.2 * u, 6 * u, -0.5 * u);
      glass.addColorStop(0, "rgba(18, 24, 36, 0.92)");
      glass.addColorStop(0.45, "rgba(40, 52, 72, 0.78)");
      glass.addColorStop(1, "rgba(12, 16, 28, 0.9)");
      ctx2.beginPath();
      ctx2.moveTo(-4.8 * u, -1.2 * u);
      ctx2.quadraticCurveTo(-4.2 * u, -4.8 * u, -0.5 * u, -5.05 * u);
      ctx2.quadraticCurveTo(3.2 * u, -5.15 * u, 6.4 * u, -3.6 * u);
      ctx2.quadraticCurveTo(7.6 * u, -2.6 * u, 7.2 * u, -1.0 * u);
      ctx2.quadraticCurveTo(2 * u, -0.7 * u, -4.8 * u, -1.2 * u);
      ctx2.closePath();
      ctx2.fillStyle = glass;
      ctx2.fill();
      // canopy highlight
      ctx2.strokeStyle = "rgba(180,200,230,0.35)";
      ctx2.lineWidth = 0.9;
      ctx2.beginPath();
      ctx2.moveTo(-3.2 * u, -4.2 * u);
      ctx2.quadraticCurveTo(1.5 * u, -4.9 * u, 5.5 * u, -3.4 * u);
      ctx2.stroke();

      // door seam
      ctx2.strokeStyle = "rgba(60,50,35,0.45)";
      ctx2.lineWidth = 0.85;
      ctx2.beginPath();
      ctx2.moveTo(0.4 * u, -1.0 * u);
      ctx2.lineTo(0.55 * u, 3.2 * u);
      ctx2.stroke();
      // rocker / lower crease
      ctx2.beginPath();
      ctx2.moveTo(-10.5 * u, 2.55 * u);
      ctx2.quadraticCurveTo(0, 2.9 * u, 10.2 * u, 2.55 * u);
      ctx2.strokeStyle = "rgba(255,255,255,0.18)";
      ctx2.stroke();

      // front LED light bar (nose, facing +x drive direction ≈ right)
      ctx2.fillStyle = "#e8f4ff";
      ctx2.shadowColor = "rgba(125, 211, 252, 0.95)";
      ctx2.shadowBlur = 6 * u;
      roundRectPath(ctx2, 11.0 * u, -0.55 * u, 1.35 * u, 1.5 * u, 0.35 * u);
      ctx2.fill();
      ctx2.shadowBlur = 0;
      ctx2.fillStyle = "rgba(56,189,248,0.55)";
      roundRectPath(ctx2, 11.15 * u, -0.35 * u, 0.9 * u, 1.1 * u, 0.25 * u);
      ctx2.fill();

      // rear LED light bar
      ctx2.fillStyle = "#fecaca";
      ctx2.shadowColor = "rgba(248, 113, 113, 0.9)";
      ctx2.shadowBlur = 5 * u;
      roundRectPath(ctx2, -12.35 * u, -0.45 * u, 1.15 * u, 1.35 * u, 0.3 * u);
      ctx2.fill();
      ctx2.shadowBlur = 0;
      ctx2.fillStyle = "rgba(239,68,68,0.65)";
      roundRectPath(ctx2, -12.15 * u, -0.25 * u, 0.75 * u, 0.95 * u, 0.2 * u);
      ctx2.fill();

      // subtle side light strip under glass
      ctx2.fillStyle = "rgba(253, 230, 138, 0.35)";
      roundRectPath(ctx2, -3.5 * u, -0.15 * u, 8 * u, 0.35 * u, 0.15 * u);
      ctx2.fill();

      // camera / sensor pod (no traditional side mirror)
      ctx2.fillStyle = "#3f3a32";
      roundRectPath(ctx2, 5.6 * u, -1.55 * u, 1.35 * u, 0.55 * u, 0.2 * u);
      ctx2.fill();
      ctx2.fillStyle = "rgba(125,211,252,0.7)";
      ctx2.beginPath();
      ctx2.arc(6.55 * u, -1.28 * u, 0.22 * u, 0, Math.PI * 2);
      ctx2.fill();

      drawWheel(ctx2, -6.2 * u, 3.35 * u, 2.75 * u, 8);
      drawWheel(ctx2, 6.4 * u, 3.35 * u, 2.75 * u, 8);
      return;
    }

    if (body === "model3") {
      // Model 3 — low sedan, short nose, smooth roof, slim lamps, flush handles (no logos)
      const paint = ctx2.createLinearGradient(-12 * u, -5 * u, 12 * u, 3 * u);
      paint.addColorStop(0, "#9ca3af");
      paint.addColorStop(0.35, "#f3f4f6");
      paint.addColorStop(0.7, "#e5e7eb");
      paint.addColorStop(1, "#6b7280");
      ctx2.beginPath();
      ctx2.moveTo(-11.6 * u, 2.5 * u);
      ctx2.quadraticCurveTo(-11.8 * u, 0.6 * u, -10.8 * u, -0.8 * u);
      ctx2.quadraticCurveTo(-9.2 * u, -2.4 * u, -5.8 * u, -3.2 * u);
      ctx2.quadraticCurveTo(-2.2 * u, -4.0 * u, 1.8 * u, -3.85 * u);
      ctx2.quadraticCurveTo(6.2 * u, -3.5 * u, 9.8 * u, -1.6 * u);
      ctx2.quadraticCurveTo(11.8 * u, -0.4 * u, 12.0 * u, 1.4 * u);
      ctx2.quadraticCurveTo(11.9 * u, 2.8 * u, 10.2 * u, 3.15 * u);
      ctx2.lineTo(-9.8 * u, 3.15 * u);
      ctx2.quadraticCurveTo(-11.4 * u, 3.05 * u, -11.6 * u, 2.5 * u);
      ctx2.closePath();
      ctx2.fillStyle = paint;
      ctx2.fill();
      ctx2.strokeStyle = "#1f2937";
      ctx2.stroke();

      // greenhouse — low continuous roof glass
      const glass = ctx2.createLinearGradient(-3 * u, -3.8 * u, 6 * u, -0.5 * u);
      glass.addColorStop(0, "rgba(15,23,42,0.88)");
      glass.addColorStop(0.5, "rgba(51,65,85,0.55)");
      glass.addColorStop(1, "rgba(15,23,42,0.82)");
      ctx2.beginPath();
      ctx2.moveTo(-4.2 * u, -0.9 * u);
      ctx2.quadraticCurveTo(-3.6 * u, -3.55 * u, -0.4 * u, -3.75 * u);
      ctx2.quadraticCurveTo(3.0 * u, -3.7 * u, 5.8 * u, -2.4 * u);
      ctx2.quadraticCurveTo(6.6 * u, -1.6 * u, 6.2 * u, -0.75 * u);
      ctx2.quadraticCurveTo(1.2 * u, -0.55 * u, -4.2 * u, -0.9 * u);
      ctx2.closePath();
      ctx2.fillStyle = glass;
      ctx2.fill();
      // B-pillar hint
      ctx2.strokeStyle = "rgba(255,255,255,0.12)";
      ctx2.lineWidth = 0.9;
      ctx2.beginPath();
      ctx2.moveTo(1.0 * u, -3.5 * u);
      ctx2.lineTo(1.15 * u, -0.7 * u);
      ctx2.stroke();
      // flush door-handle score
      ctx2.strokeStyle = "rgba(31,41,55,0.45)";
      ctx2.lineWidth = 1.1;
      ctx2.beginPath();
      ctx2.moveTo(2.4 * u, 0.55 * u);
      ctx2.lineTo(3.9 * u, 0.55 * u);
      ctx2.stroke();
      // character line
      ctx2.strokeStyle = "rgba(255,255,255,0.2)";
      ctx2.beginPath();
      ctx2.moveTo(-9.5 * u, 1.55 * u);
      ctx2.quadraticCurveTo(0, 1.85 * u, 9.8 * u, 1.55 * u);
      ctx2.stroke();

      // slim horizontal headlamp
      ctx2.fillStyle = "#f8fafc";
      ctx2.shadowColor = "rgba(191,219,254,0.95)";
      ctx2.shadowBlur = 5 * u;
      roundRectPath(ctx2, 10.55 * u, -0.35 * u, 1.55 * u, 0.72 * u, 0.28 * u);
      ctx2.fill();
      ctx2.shadowBlur = 0;
      ctx2.fillStyle = "rgba(147,197,253,0.55)";
      roundRectPath(ctx2, 10.7 * u, -0.2 * u, 1.15 * u, 0.4 * u, 0.15 * u);
      ctx2.fill();
      // slim taillight
      ctx2.fillStyle = "#fecaca";
      ctx2.shadowColor = "rgba(248,113,113,0.85)";
      ctx2.shadowBlur = 4 * u;
      roundRectPath(ctx2, -11.85 * u, -0.25 * u, 1.25 * u, 0.7 * u, 0.22 * u);
      ctx2.fill();
      ctx2.shadowBlur = 0;

      drawWheel(ctx2, -5.9 * u, 3.2 * u, 2.65 * u, 5);
      drawWheel(ctx2, 6.1 * u, 3.2 * u, 2.65 * u, 5);
      return;
    }

    if (body === "modely") {
      // Model Y — taller crossover, bigger glass, kicked-up rear, family lamps
      const paint = ctx2.createLinearGradient(-12 * u, -7 * u, 11 * u, 3 * u);
      paint.addColorStop(0, "#0f2744");
      paint.addColorStop(0.4, "#1e3a5f");
      paint.addColorStop(0.75, "#2563eb");
      paint.addColorStop(1, "#0b1c33");
      ctx2.beginPath();
      ctx2.moveTo(-11.4 * u, 2.6 * u);
      ctx2.quadraticCurveTo(-11.6 * u, 0.4 * u, -10.4 * u, -1.4 * u);
      ctx2.quadraticCurveTo(-8.6 * u, -3.6 * u, -4.8 * u, -4.8 * u);
      ctx2.quadraticCurveTo(-1.2 * u, -5.6 * u, 2.6 * u, -5.35 * u);
      ctx2.quadraticCurveTo(6.8 * u, -4.9 * u, 9.6 * u, -2.8 * u);
      ctx2.quadraticCurveTo(11.4 * u, -1.4 * u, 11.6 * u, 0.8 * u);
      ctx2.quadraticCurveTo(11.5 * u, 2.6 * u, 9.8 * u, 3.2 * u);
      ctx2.lineTo(-9.6 * u, 3.2 * u);
      ctx2.quadraticCurveTo(-11.2 * u, 3.1 * u, -11.4 * u, 2.6 * u);
      ctx2.closePath();
      ctx2.fillStyle = paint;
      ctx2.fill();
      ctx2.strokeStyle = "#0f172a";
      ctx2.stroke();

      // larger DLO / windows + kicked rear glass
      const glass = ctx2.createLinearGradient(-4 * u, -5.4 * u, 6 * u, -0.4 * u);
      glass.addColorStop(0, "rgba(15,23,42,0.9)");
      glass.addColorStop(0.45, "rgba(56,78,110,0.55)");
      glass.addColorStop(1, "rgba(15,23,42,0.85)");
      ctx2.beginPath();
      ctx2.moveTo(-4.6 * u, -1.0 * u);
      ctx2.quadraticCurveTo(-4.0 * u, -4.7 * u, -0.6 * u, -5.2 * u);
      ctx2.quadraticCurveTo(2.8 * u, -5.25 * u, 5.4 * u, -3.9 * u);
      ctx2.quadraticCurveTo(6.6 * u, -3.0 * u, 6.9 * u, -1.55 * u); // kicked-up rear
      ctx2.quadraticCurveTo(2.2 * u, -0.7 * u, -4.6 * u, -1.0 * u);
      ctx2.closePath();
      ctx2.fillStyle = glass;
      ctx2.fill();
      // window splits (3 panes feel)
      ctx2.strokeStyle = "rgba(255,255,255,0.14)";
      ctx2.lineWidth = 0.85;
      ctx2.beginPath();
      ctx2.moveTo(-0.6 * u, -5.0 * u);
      ctx2.lineTo(-0.4 * u, -0.95 * u);
      ctx2.moveTo(3.0 * u, -4.7 * u);
      ctx2.lineTo(3.2 * u, -1.1 * u);
      ctx2.stroke();
      // roof spoiler lip
      ctx2.strokeStyle = "rgba(148,163,184,0.55)";
      ctx2.lineWidth = 1.2;
      ctx2.beginPath();
      ctx2.moveTo(5.2 * u, -5.15 * u);
      ctx2.quadraticCurveTo(6.6 * u, -5.05 * u, 7.15 * u, -4.2 * u);
      ctx2.stroke();
      // rocker
      ctx2.strokeStyle = "rgba(255,255,255,0.16)";
      ctx2.beginPath();
      ctx2.moveTo(-9.8 * u, 1.9 * u);
      ctx2.quadraticCurveTo(0, 2.25 * u, 9.4 * u, 1.9 * u);
      ctx2.stroke();

      // headlamp — slightly taller/angled vs Model 3
      ctx2.fillStyle = "#e0f2fe";
      ctx2.shadowColor = "rgba(125,211,252,0.9)";
      ctx2.shadowBlur = 5 * u;
      ctx2.beginPath();
      ctx2.moveTo(10.2 * u, -0.85 * u);
      ctx2.lineTo(11.55 * u, -0.55 * u);
      ctx2.lineTo(11.55 * u, 0.55 * u);
      ctx2.lineTo(10.15 * u, 0.35 * u);
      ctx2.closePath();
      ctx2.fill();
      ctx2.shadowBlur = 0;
      // full-width-ish taillight bar feel
      ctx2.fillStyle = "#fca5a5";
      ctx2.shadowColor = "rgba(248,113,113,0.85)";
      ctx2.shadowBlur = 4 * u;
      roundRectPath(ctx2, -11.7 * u, -0.55 * u, 1.35 * u, 1.15 * u, 0.25 * u);
      ctx2.fill();
      ctx2.shadowBlur = 0;

      drawWheel(ctx2, -5.7 * u, 3.25 * u, 2.85 * u, 5);
      drawWheel(ctx2, 5.9 * u, 3.25 * u, 2.85 * u, 5);
      return;
    }

    if (body === "models") {
      // Model S — longer luxury sedan, flowing roof, long wheelbase, unique lamp lines
      const paint = ctx2.createLinearGradient(-14 * u, -5 * u, 13 * u, 3 * u);
      paint.addColorStop(0, "#111827");
      paint.addColorStop(0.3, "#4b5563");
      paint.addColorStop(0.65, "#6b7280");
      paint.addColorStop(1, "#1f2937");
      ctx2.beginPath();
      ctx2.moveTo(-13.2 * u, 2.45 * u);
      ctx2.quadraticCurveTo(-13.4 * u, 0.5 * u, -12.2 * u, -1.0 * u);
      ctx2.quadraticCurveTo(-10.2 * u, -2.8 * u, -6.0 * u, -3.6 * u);
      ctx2.quadraticCurveTo(-1.5 * u, -4.35 * u, 3.2 * u, -4.15 * u);
      ctx2.quadraticCurveTo(8.0 * u, -3.8 * u, 11.4 * u, -1.9 * u);
      ctx2.quadraticCurveTo(13.2 * u, -0.7 * u, 13.3 * u, 1.2 * u);
      ctx2.quadraticCurveTo(13.2 * u, 2.7 * u, 11.4 * u, 3.1 * u);
      ctx2.lineTo(-11.4 * u, 3.1 * u);
      ctx2.quadraticCurveTo(-13.0 * u, 3.0 * u, -13.2 * u, 2.45 * u);
      ctx2.closePath();
      ctx2.fillStyle = paint;
      ctx2.fill();
      ctx2.strokeStyle = "#0b1220";
      ctx2.stroke();

      // long flowing greenhouse
      const glass = ctx2.createLinearGradient(-5 * u, -4.2 * u, 8 * u, -0.4 * u);
      glass.addColorStop(0, "rgba(15,23,42,0.9)");
      glass.addColorStop(0.5, "rgba(71,85,105,0.5)");
      glass.addColorStop(1, "rgba(15,23,42,0.85)");
      ctx2.beginPath();
      ctx2.moveTo(-5.4 * u, -0.95 * u);
      ctx2.quadraticCurveTo(-4.6 * u, -3.7 * u, -0.8 * u, -4.05 * u);
      ctx2.quadraticCurveTo(3.5 * u, -4.15 * u, 7.2 * u, -3.0 * u);
      ctx2.quadraticCurveTo(8.4 * u, -2.2 * u, 8.0 * u, -0.8 * u);
      ctx2.quadraticCurveTo(1.5 * u, -0.5 * u, -5.4 * u, -0.95 * u);
      ctx2.closePath();
      ctx2.fillStyle = glass;
      ctx2.fill();
      // chrome-ish roof highlight
      ctx2.strokeStyle = "rgba(226,232,240,0.28)";
      ctx2.lineWidth = 1.0;
      ctx2.beginPath();
      ctx2.moveTo(-4.2 * u, -3.5 * u);
      ctx2.quadraticCurveTo(2.0 * u, -4.15 * u, 7.0 * u, -2.7 * u);
      ctx2.stroke();
      // long character line
      ctx2.strokeStyle = "rgba(255,255,255,0.18)";
      ctx2.beginPath();
      ctx2.moveTo(-11.5 * u, 1.45 * u);
      ctx2.quadraticCurveTo(0, 1.75 * u, 11.2 * u, 1.4 * u);
      ctx2.stroke();
      // flush handles
      ctx2.strokeStyle = "rgba(209,213,219,0.35)";
      ctx2.lineWidth = 1.05;
      ctx2.beginPath();
      ctx2.moveTo(0.2 * u, 0.45 * u);
      ctx2.lineTo(1.6 * u, 0.45 * u);
      ctx2.moveTo(3.4 * u, 0.45 * u);
      ctx2.lineTo(4.8 * u, 0.45 * u);
      ctx2.stroke();

      // unique swept headlamp
      ctx2.fillStyle = "#f1f5f9";
      ctx2.shadowColor = "rgba(186,230,253,0.95)";
      ctx2.shadowBlur = 5 * u;
      ctx2.beginPath();
      ctx2.moveTo(11.0 * u, -0.95 * u);
      ctx2.quadraticCurveTo(12.6 * u, -0.7 * u, 13.05 * u, -0.15 * u);
      ctx2.lineTo(13.0 * u, 0.45 * u);
      ctx2.quadraticCurveTo(12.2 * u, 0.35 * u, 11.0 * u, 0.15 * u);
      ctx2.closePath();
      ctx2.fill();
      ctx2.shadowBlur = 0;
      // long horizontal taillight
      ctx2.fillStyle = "#fda4af";
      ctx2.shadowColor = "rgba(244,63,94,0.85)";
      ctx2.shadowBlur = 4 * u;
      roundRectPath(ctx2, -13.35 * u, -0.35 * u, 1.55 * u, 0.75 * u, 0.25 * u);
      ctx2.fill();
      ctx2.shadowBlur = 0;
      ctx2.fillStyle = "rgba(251,113,133,0.55)";
      roundRectPath(ctx2, -13.15 * u, -0.15 * u, 1.1 * u, 0.35 * u, 0.12 * u);
      ctx2.fill();

      // longer wheelbase placement
      drawWheel(ctx2, -6.8 * u, 3.15 * u, 2.7 * u, 7);
      drawWheel(ctx2, 6.9 * u, 3.15 * u, 2.7 * u, 7);
      return;
    }

    // fallback coupe
    ctx2.fillStyle = c.color;
    ctx2.strokeStyle = c.accent;
    ctx2.beginPath();
    ctx2.moveTo(-11 * u, 2 * u);
    ctx2.quadraticCurveTo(-11 * u, -4 * u, -4 * u, -5 * u);
    ctx2.lineTo(6 * u, -4 * u);
    ctx2.quadraticCurveTo(12 * u, -3 * u, 12 * u, 2 * u);
    ctx2.closePath();
    ctx2.fill();
    ctx2.stroke();
    ctx2.fillStyle = "rgba(40,50,70,0.35)";
    ctx2.beginPath();
    ctx2.moveTo(-2 * u, -4.5 * u);
    ctx2.lineTo(5 * u, -4 * u);
    ctx2.lineTo(5 * u, -1 * u);
    ctx2.lineTo(-3 * u, -1 * u);
    ctx2.closePath();
    ctx2.fill();
    drawWheel(ctx2, -6 * u, 3.2 * u, 2.6 * u, 6);
    drawWheel(ctx2, 6.5 * u, 3.2 * u, 2.6 * u, 6);
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
    const spd = state.mode === "drive" || state.mode === "track"
      ? Math.round(Math.abs(state.mode === "track" ? state.trackSpeed : state.vx) * 3.6)
      : Math.round(Math.hypot(state.vx, state.vy) * 3.6);
    $("hudSpeed").textContent = String(spd);
    $("hudHeight").textContent = Math.max(0, state.y - CAR_HALF_H).toFixed(1);
    $("hudDist").textContent = String(Math.round(state.dist));
    $("hudRolls").textContent = state.rolls.toFixed(1);
    if ($("hudScore")) $("hudScore").textContent = String(Math.floor(state.score));
    if ($("hudMarbles")) {
      $("hudMarbles").textContent = state.marbleCount + "/" + MARBLE_MISSION_GOAL;
      const pill = $("hudMarbles").closest(".stat-pill");
      if (pill) pill.classList.toggle("mission-done", !!state.marbleMissionDone);
    }
    if ($("lblMarbles")) $("lblMarbles").textContent = st.marbles;
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
    $("lblLift").textContent = s.lift;
    $("lblStick").textContent = s.stick;
    $("lblFlip").textContent = s.flip;
    $("lblDrive").textContent = s.drive;
    $("lblAir").textContent = s.air;
    $("lblSpeed").textContent = s.speed;
    $("lblHeight").textContent = s.height;
    $("lblDist").textContent = s.dist;
    $("lblRolls").textContent = s.rolls;
    if ($("lblScore")) $("lblScore").textContent = s.score;
    if ($("lblMarbles")) $("lblMarbles").textContent = s.marbles;
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

    const mDone = r.marbleMissionDone
      ? " · <span style='color:#4ade80'>" + s.marbleMissionDone + "</span>"
      : " · " + s.marbleMissionGoal + " " + MARBLE_MISSION_GOAL;
    $("resultBody").innerHTML =
      "<strong style='font-size:22px'>" + Math.floor(r.score) + "</strong><br>" +
      s.totalScore + "<br><br>" +
      reason + "<br>" +
      s.distScore + ": " + r.distScore + " (" + Math.round(r.dist) + " m)<br>" +
      s.timeScore + ": " + r.timeScore + "<br>" +
      s.flipScore + ": " + r.flipBonusTotal + " (" + s.flipsDone + " " + r.flips + ")<br>" +
      "<span style='display:inline-block;margin-top:6px;padding:6px 10px;border-radius:10px;" +
      "background:rgba(250,204,21,0.18);border:1px solid rgba(250,204,21,0.45)'>" +
      "<strong style='color:#fde68a'>" + s.marbleScore + ": " + (r.marbleScore || 0) + "</strong>" +
      " · " + (r.marbleCount || 0) + " " + s.marbles + mDone + "</span><br>" +
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

  // ---------- Input ----------
  function refreshActionFromPointers(action) {
    let down = false;
    pointerMap.forEach(function (a) {
      if (a === action) down = true;
    });
    if (keyHeld[action]) down = true;
    input[action] = down;
    const map = { lift: "btnLift", stick: "btnStick", flip: "btnFlip", drive: "btnDrive" };
    const btn = $(map[action]);
    if (btn) {
      btn.classList.toggle("is-down", down);
      btn.setAttribute("aria-pressed", down ? "true" : "false");
    }
  }

  const keyHeld = { lift: false, stick: false, flip: false, drive: false };

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

  bindPointer($("btnLift"), "lift");
  bindPointer($("btnStick"), "stick");
  bindPointer($("btnFlip"), "flip");
  bindPointer($("btnDrive"), "drive");

  window.addEventListener("keydown", function (e) {
    if (e.repeat) return;
    let action = null;
    if (e.code === "KeyZ") action = "lift";
    if (e.code === "KeyX") action = "stick";
    if (e.code === "ArrowLeft" || e.code === "KeyC") { e.preventDefault(); action = "flip"; }
    if (e.code === "Space") { e.preventDefault(); action = "drive"; }
    if (action) {
      keyHeld[action] = true;
      refreshActionFromPointers(action);
    }
  });
  window.addEventListener("keyup", function (e) {
    let action = null;
    if (e.code === "KeyZ") action = "lift";
    if (e.code === "KeyX") action = "stick";
    if (e.code === "ArrowLeft" || e.code === "KeyC") action = "flip";
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

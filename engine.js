/* SailMath engine - honest sailboat math. */
(function (root) {
  "use strict";

  /* Theoretical hull speed in knots: 1.34 * sqrt(waterline feet). */
  function hullSpeed(lwlFt) {
    if (lwlFt <= 0) return 0;
    return Math.round(1.34 * Math.sqrt(lwlFt) * 100) / 100;
  }

  /* Honest cruise: most cruising boats average 70-80% of hull speed
     over a long passage. Return 75%. */
  function cruiseKnots(lwlFt) {
    return Math.round(hullSpeed(lwlFt) * 0.75 * 100) / 100;
  }

  /* Passage days at an honest cruise, sailing hoursPerDay (24 for offshore). */
  function passageDays(nm, lwlFt, hoursPerDay) {
    var k = cruiseKnots(lwlFt);
    var h = typeof hoursPerDay === "number" && hoursPerDay > 0 ? hoursPerDay : 24;
    if (k <= 0) return Infinity;
    return Math.round((nm / (k * h)) * 10) / 10;
  }

  /* Sail area / displacement ratio: SA(ft^2) / (disp/64)^(2/3).
     <14 motorsailor, 14-18 cruiser, 18-22 racer/cruiser, >22 race. */
  function saDisp(sailAreaFt2, dispLb) {
    if (dispLb <= 0) return 0;
    var v = Math.pow(dispLb / 64, 2 / 3);
    return Math.round((sailAreaFt2 / v) * 10) / 10;
  }

  function saDispVerdict(r) {
    if (r < 14) return "motorsailor - underpowered in light air";
    if (r < 18) return "cruiser canvas - manageable and forgiving";
    if (r < 22) return "racer-cruiser - lively, needs reefing discipline";
    return "race-boat power - exhilarating and demanding";
  }

  /* Capsize screening factor: beam / (disp/64)^(1/3). Under 2.0 passes. */
  function capsizeScreen(beamFt, dispLb) {
    if (dispLb <= 0) return Infinity;
    var v = Math.pow(dispLb / 64, 1 / 3);
    return Math.round((beamFt / v) * 100) / 100;
  }

  function capsizeVerdict(c) {
    if (c < 2.0) return "passes the offshore screen (under 2.0)";
    return "fails the 2.0 offshore screen - coastal only by this rule";
  }

  /* Brewer comfort ratio: disp / (0.65 * (0.7*LWL + 0.3*LOA) * beam^1.333).
     20-30 coastal, 30-40 cruiser, 40+ heavy offshore. */
  function comfortRatio(dispLb, loaFt, lwlFt, beamFt) {
    var denom = 0.65 * (0.7 * lwlFt + 0.3 * loaFt) * Math.pow(beamFt, 1.333);
    if (denom <= 0) return 0;
    return Math.round((dispLb / denom) * 10) / 10;
  }

  function comfortVerdict(r) {
    if (r < 20) return "light and lively - you will feel every wave";
    if (r < 30) return "coastal cruiser comfort";
    if (r < 40) return "comfortable offshore cruiser";
    return "heavy offshore motion - slow to start, kind in a seaway";
  }

  /* Anchor rode: (depth + freeboard) * scope. Scope 5 for a lunch stop,
     7 overnight, 10 in a blow. Returns feet. */
  function anchorRode(depthFt, freeboardFt, scope) {
    var s = typeof scope === "number" && scope > 0 ? scope : 7;
    return Math.round((depthFt + freeboardFt) * s);
  }

  /* Chain recommendation: at least one boat length of chain before rope,
     or all-chain past 30ft LOA. Returns plain verdict text. */
  function chainVerdict(loaFt) {
    if (loaFt >= 30) return "all-chain rode is the norm at this size";
    return "at least " + Math.ceil(loaFt) + " ft of chain before the rope";
  }

  /* Reef planning: apparent-wind heuristic. Wind (true, knots) where a
     cruiser should have the first reef in: base 16, stiffer for heavy
     canvas, earlier for tender boats (low comfort). */
  function firstReefKnots(saDispRatio, comfort) {
    var base = 16;
    if (saDispRatio >= 20) base -= 2;
    if (saDispRatio < 14) base += 2;
    if (comfort < 20) base -= 1;
    if (comfort >= 35) base += 1;
    return base;
  }

  var api = {
    hullSpeed: hullSpeed,
    cruiseKnots: cruiseKnots,
    passageDays: passageDays,
    saDisp: saDisp,
    saDispVerdict: saDispVerdict,
    capsizeScreen: capsizeScreen,
    capsizeVerdict: capsizeVerdict,
    comfortRatio: comfortRatio,
    comfortVerdict: comfortVerdict,
    anchorRode: anchorRode,
    chainVerdict: chainVerdict,
    firstReefKnots: firstReefKnots
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SailMath = api;
})(typeof window !== "undefined" ? window : globalThis);

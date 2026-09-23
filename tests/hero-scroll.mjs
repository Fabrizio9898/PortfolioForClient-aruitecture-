import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

// Ejecuta los scripts reales de Astro con geometría controlada, sin dependencias de navegador.
function loadScript(file, document) {
  const source = readFileSync(new URL(`../src/components/Hero/${file}`, import.meta.url), 'utf8');
  const script = source.match(/<script>([\s\S]*?)<\/script>/)[1];
  const listeners = {};
  let frame;
  runInNewContext(ts.transpile(script), {
    document,
    window: { addEventListener: (event, callback) => { listeners[event] = callback; } },
    requestAnimationFrame: (callback) => { frame = callback; return 1; },
    ResizeObserver: class { observe() {} },
  });
  return (event = 'scroll') => { listeners[event](); frame(); };
}

let scroll = 0;
const sequence = { offsetHeight: 1600, getBoundingClientRect: () => ({ top: -scroll }) };
const stage = { offsetHeight: 800 };
const slots = Array.from({ length: 4 }, (_, index) => {
  const track = { style: {} };
  return { clientHeight: index === 3 ? 0 : 352, track, querySelector: () => track };
});
const grid = {
  querySelectorAll: () => slots,
  closest: (selector) => selector === '[data-hero-sequence]' ? sequence : stage,
};
const updateGrid = loadScript('HeroGrid.astro', { querySelector: () => grid });
function expectProgress(expected) {
  expected.forEach((progress, index) => {
    const y = Number(slots[index].track.style.transform.match(/, (-?[\d.]+)px/)[1]);
    assert.ok(Math.abs(y + slots[index].clientHeight * progress) < 0.001);
  });
}
expectProgress([0, 0, 0]);
for (let index = 0; index < 3; index++) {
  scroll = (index + 0.5) * 800 / 3;
  updateGrid();
  expectProgress([0, 1, 2].map((i) => i < index ? 1 : i === index ? 0.5 : 0));
}
scroll = 1200;
updateGrid();
expectProgress([1, 1, 1]);
slots.forEach((slot) => { slot.clientHeight = 192; });
scroll = 500;
updateGrid('resize');
expectProgress([1, 1, 0.5, 0]);
scroll = 800;
updateGrid();
expectProgress([1, 1, 1, 1]);
scroll = 0;
updateGrid();
expectProgress([0, 0, 0, 0]);

let fixed = false;
const header = { offsetHeight: 56, classList: { toggle: (_, value) => { fixed = value; } } };
const anchor = { style: {}, getBoundingClientRect: () => ({ top: 352 - Math.max(0, scroll - 800) }) };
const updateHeader = loadScript('Hero.astro', {
  querySelector: (selector) => selector === '[data-site-header]' ? header : anchor,
});
for (const [position, expected] of [[0, false], [800, false], [1151, false], [1152, true], [2000, true], [0, false]]) {
  scroll = position;
  updateHeader();
  assert.equal(fixed, expected);
  assert.equal(anchor.style.height, '56px');
}
header.offsetHeight = 72;
updateHeader('resize');
assert.equal(anchor.style.height, '72px');
console.log('OK: secuencia desktop/móvil, reversa, límites y header fijo con espacio reservado.');

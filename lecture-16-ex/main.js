import confetti from 'canvas-confetti';
document.querySelector('button').addEventListener('click', () => {
const end = Date.now() + (15 * 1000);
// Go Blue!
// https://brand.umich.edu/design-resources/colors/
const colors = ['#FFCB05', '#00274C'];
(function frame() {
confetti({
particleCount: 2,
angle: 60,
spread: 55,
origin: { x: 0 },
colors: colors
});
confetti({
particleCount: 2,
angle: 120,
spread: 55,
origin: { x: 1 },
colors: colors
});
if (Date.now() < end) {
requestAnimationFrame(frame);
}
}());
});
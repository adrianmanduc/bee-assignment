export function randomNumber(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

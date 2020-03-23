export const randomChoice = (a, n) => new Array(n)
  .fill(null)
  .map(() => a[Math.floor(Math.random() * a.length)]);

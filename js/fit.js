export function harmonicFit(td, x, y, k, periods) {
  const usedPeriods = periods.slice(0, k);
  const omegas = usedPeriods.map(p => 2 * Math.PI / p);

  const N = td.length;
  const M = 2 * omegas.length;

  // Build design matrix A (N x M)
  const A = math.zeros(N, M);
  for (let i = 0; i < N; i++) {
    const t = td[i];
    for (let j = 0; j < omegas.length; j++) {
      const w = omegas[j];
      A.set([i, 2 * j], Math.cos(w * t));
      A.set([i, 2 * j + 1], Math.sin(w * t));
    }
  }

  // Least squares via normal equations (A^T A)c = (A^T b)
  const AT = math.transpose(A);
  const ATA = math.multiply(AT, A);

  const bx = math.matrix(x).reshape([N, 1]);
  const by = math.matrix(y).reshape([N, 1]);

  const ATbx = math.multiply(AT, bx);
  const ATby = math.multiply(AT, by);

  const cxMat = math.lusolve(ATA, ATbx); // (M x 1)
  const cyMat = math.lusolve(ATA, ATby); // (M x 1)

  // Convert to plain 1D arrays for easy indexing
  const cx = cxMat.toArray().map(r => r[0]);
  const cy = cyMat.toArray().map(r => r[0]);

  // Predict fitted track
  const xh = new Array(N);
  const yh = new Array(N);

  for (let i = 0; i < N; i++) {
    const t = td[i];
    let sx = 0, sy = 0;
    for (let j = 0; j < omegas.length; j++) {
      const w = omegas[j];
      const c = Math.cos(w * t);
      const s = Math.sin(w * t);
      sx += cx[2 * j] * c + cx[2 * j + 1] * s;
      sy += cy[2 * j] * c + cy[2 * j + 1] * s;
    }
    xh[i] = sx;
    yh[i] = sy;
  }

  return { cx, cy, xh, yh, omegas, usedPeriods };
}

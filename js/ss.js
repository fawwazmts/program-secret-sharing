// Mencari hasil n modulo m, n % m
const mod = (n, m) => {
  let r = n % m;
  return r >= 0 ? r : r + m;
};

// Menghitung nilai polinom
const f = (x, p, coef) => {
  let sum = 0;
  for (let i = 0; i < coef.length; i++) {
    sum += coef[i] * x ** i;
  }
  return mod(sum, p);
};

// Cek bilangan prima
const isPrime = (x) => {
  if (x > 1) {
    for (let i = 2; i < m; i++) {
      if (x % i == 0) {
        return false;
      }
    }
    return true;
  }
  return false;
};

// Menghitung invers modulo p
const inv = (x, p) => {
  for (let i = 1; i < p; i++) {
    if (mod(x * i, p) == 1) {
      return i;
    }
  }
};

const reconstruct_secret = (arrX, arrY, p) => {
  let x = 0,
    f = 0;
  if (arrX.length == arrY.length) {
    t = arrX.length;
    for (let j = 0; j < t; j++) {
      let fTop = arrY[j],
        fBottom = 1;
      for (let i = 0; i < t; i++) {
        if (i != j) {
          fTop = fTop * (x - arrX[i]);
          fBottom = fBottom * (arrX[j] - arrX[i]);
        }
      }
      f = mod(f + mod(fTop * inv(fBottom, p), p), p);
    }
    return f;
  }
};

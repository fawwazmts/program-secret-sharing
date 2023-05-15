const mod = function (n, m) {
  let remain = n % m;
  return remain >= 0 ? remain : remain + m;
};

// mencari invers modulo
const invMod = (x, p) => {
  for (let i = 0; i < p; i++) {
    if (mod(x * i, p) == 1) {
      return i;
    }
  }
};

// Menentukan semua himpunan persamaan kurva eliptik
const ecSet = (a, b, p) => {
  (a = Number(a)), (b = Number(b)), (p = Number(p));
  let ecSetArr = [];

  for (let x = 0; x < p; x++) {
    let tmp1 = mod(x ** 3 + a * x + b, p);

    for (let y = 0; y < p; y++) {
      let tmp2 = mod(y ** 2, p);

      if (tmp2 == tmp1) {
        ecSetArr.push([x, y]);
      }
    }
  }
  return ecSetArr;
};

// Penjumlahan dua titik yang berbeda pada kurva eliptik
const pPlusQ = (z1, z2, p) => {
  if (z1[0] == z2[0]) {
    return "O";
  }
  let m = mod((z1[1] - z2[1]) * invMod(z1[0] - z2[0], p), p);
  let x = mod(m ** 2 - z1[0] - z2[0], p);
  let y = mod(m * (z1[0] - x) - z1[1], p);
  return [x, y];
};

// Penjumlahan dua titik yang sama pada kurva eliptik
const pPlusP = (z, a, p) => {
  if (z[1] == 0) {
    return "O";
  }
  let m = mod((3 * z[0] ** 2 + a) * invMod(2 * z[1], p), p);
  let x = mod(m ** 2 - 2 * z[0], p);
  let y = mod(m * (z[0] - x) - z[1], p);
  return [x, y];
};

// Penjumlahan dua titik pada kurva eliptik, baik sama atau beda
const sum = (z1, z2, a, p) => {
  let O = ["0", "inf"];
  a = Number(a);
  p = Number(p);
  let result = null;
  if (z1[0] == O[0] && z1[1] == O[1]) {
    result = z2;
  } else if (z2[0] == O[0] && z2[1] == O[1]) {
    result = z1;
  } else if (z1[0] == z2[0] && z1[1] == z2[1]) {
    result = pPlusP(z1, a, p);
  } else {
    result = pPlusQ(z1, z2, p);
  }
  return result;
};

// Menghitung pelelaran titik
const stretch = (z, k, a, p) => {
  (a = Number(a)), (p = Number(p)), (k = Number(k));
  let temp = z;
  for (let i = 0; i < k - 1; i++) {
    if (temp == "O") {
      temp = z;
    } else {
      temp = sum(temp, z, a, p);
    }
  }
  return temp;
};

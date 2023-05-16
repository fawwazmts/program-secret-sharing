// Mencari hasil n modulo m, n % m
const mod = (n, m) => {
  let r = n % m;
  return r >= 0 ? r : r + m;
};

// Menghitung nilai polinom
const f = (x, p, coef) => {
  let sum = 0;
  for (let i = 0; i < coef.length; i++) {
    sum += coef[i] * x ** k;
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
  let result = null;

  for (let i = 0; i < p; i++) {
    if (mod(x * i, p) == 1) {
      result = i;
    }
  }
  return result;
};

// Mencari interpolasi lagrange
// def Polinom_Lagrange(X,Y,P,t):
//     x=0
//     f=0
//     for j in range(t):
//         f_atas=Y[j]
//         f_bawah=1
//         for i in range(t):
//             if i!=j:
//                 f_atas=f_atas*(x-X[i])
//                 f_bawah=f_bawah*(X[j]-X[i])
//         f=(f+(f_atas*invers(f_bawah,P))%P)%P
//     return f

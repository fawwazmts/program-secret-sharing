// Halaman Utama
// Variabel Global
let mGlobal, tGlobal, wGlobal, pGlobal, sGlobal;

// Custom function
// Merubah "(1,2);(3,4)"" menjadi [[1,3],[2,4]]
const getXY = (str) => {
  let newStr = str.split(",");
  let x = Number(newStr[0].replace(/\D/g, "")),
    y = Number(newStr[1].replace(/\D/g, ""));
  return [x, y];
};

const separateXY = (arr) => {
  let x, y;
  let arrX = [],
    arrY = [];
  for (let i = 0; i < arr.length; i++) {
    x = arr[i][0];
    arrX.push(x);
    y = arr[i][1];
    arrY.push(y);
  }
  return [arrX, arrY];
};

// Membuat feature di halaman utama dapat diklik
const featureList = document.querySelectorAll(".feature-list");

for (let i = 0; i < featureList.length; i++) {
  const e = featureList[i];
  e.addEventListener(
    "click",
    function () {
      window.location = this.querySelectorAll("a")[0].href;
    },
    false
  );
}

// Membuat petunjuk pengisian muncul
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

// Konstruksi Share
// Memilih M, w, t
const btnSaveM = document.querySelector("#btnSaveM");

if (btnSaveM) {
  btnSaveM.addEventListener("click", () => {
    let M = Number(document.querySelector("#mValue").value),
      t = Number(document.querySelector("#tValue").value),
      w = Number(document.querySelector("#wValue").value);

    let outputSaveM = document.querySelector("#outputSaveM"),
      resultSaveM = document.querySelector("#resultSaveM");

    if (M == "" || t == "" || w == "") {
      stringResult = "Pastikan masukan M, t, dan w telah diisi semua!";
      outputSaveM.classList.remove("alert-success");
      outputSaveM.classList.add("alert-danger");
    } else {
      mGlobal = M;
      tGlobal = t;
      wGlobal = w;
      stringResult = `Nilai rahasia ${M} akan dibagikan kepada ${w} orang. Diperlukan minimal ${t} orang untuk merekonstruksi kembali nilai rahasia ${M}.`;
      outputSaveM.classList.remove("alert-danger");
      outputSaveM.classList.add("alert-success");
    }
    resultSaveM.innerHTML = stringResult;
    outputSaveM.classList.remove("visually-hidden");
  });
}

// Memilih polinom
const btnProcessShare = document.querySelector("#btnProcessShare");

if (btnProcessShare) {
  btnProcessShare.addEventListener("click", () => {
    let p = Number(document.querySelector("#pValue").value),
      s = document.querySelector("#sValue").value,
      x = document.querySelector("#xValue").value;

    let outputProcessShare = document.querySelector("#outputProcessShare"),
      resultProcessShare = document.querySelector("#resultProcessShare");

    if (p == "" || s == "") {
      stringResult = "Pastikan masukan p dan s telah diisi semua!";
      outputProcessShare.classList.remove("alert-success");
      outputProcessShare.classList.add("alert-danger");
    } else {
      t = tGlobal;
      s = s.split(",").map(Number);
      x = x.split(",").map(Number);
      w = wGlobal;
      M = mGlobal;

      // Menulis polinom yang dipilih
      let polinom = `f(x) = ${mGlobal} + `;
      for (let i = 0; i < t - 1; i++) {
        if (i < t - 2) {
          polinom += `${s[i]} x<sup>${i + 1}</sup> + `;
        } else {
          polinom += `${s[i]} x<sup>${i + 1}</sup> (mod ${p})`;
        }
      }

      // Menghitung share
      let shares = [];
      coef = [...[M], ...s];
      for (let i = 0; i < w; i++) {
        share = [x[i], f(x[i], p, coef)];
        shares.push(share);
      }

      // Menulis shares yang diperoleh ke dalam tabel
      let th = `<tr>
        <th>Share i</th>
        <th>Nilai Share (x<sub>i</sub>, y<sub>i</sub>)</th>
      </tr>`;

      let td = "";
      for (let i = 0; i < shares.length; i++) {
        td += `<tr>
          <td>Share ${i + 1}</td>
          <td>(${shares[i][0]}, ${shares[i][1]})</td>
        </tr>`;
      }

      tableContent = `<table class="mt-2 mb-4">${th}${td}</table>`;

      stringResult = `<p>Polinom yang dipilih adalah ${polinom}.</p><p>Diperoleh ${w} buah share yang dapat dibagikan ke ${w} orang.</p>${tableContent}`;
      outputProcessShare.classList.remove("alert-danger");
      outputProcessShare.classList.add("alert-success");
    }
    resultProcessShare.innerHTML = stringResult;
    outputProcessShare.classList.remove("visually-hidden");
  });
}

// Rekonstruksi Nilai Rahasia
const btnProcessM = document.querySelector("#btnProcessM");

if (btnProcessM) {
  btnProcessM.addEventListener("click", () => {
    let p = Number(document.querySelector("#pValue").value),
      s = document.querySelector("#sValue").value;

    let outputProcessM = document.querySelector("#outputProcessM"),
      resultProcessM = document.querySelector("#resultProcessM");

    if (p == "" || s == "") {
      stringResult = "Pastikan masukan p dan s telah diisi semua!";
      outputProcessM.classList.remove("alert-success");
      outputProcessM.classList.add("alert-danger");
    } else {
      s = s.split(";").map(getXY);
      s = separateXY(s);
      let M = reconstruct_secret(s[0], s[1], p);

      // Menulis shares yang diperoleh ke dalam tabel
      let th = `<tr>
        <th>Share i</th>
        <th>Nilai Share (x<sub>i</sub>, y<sub>i</sub>)</th>
      </tr>`;

      let td = "";
      for (let i = 0; i < s[0].length; i++) {
        td += `<tr>
          <td>Share ${s[0][i]}</td>
          <td>(${s[0][i]}, ${s[1][i]})</td>
        </tr>`;
      }

      tableContent = `<table class="mt-2 mb-2">${th}${td}</table>`;

      stringResult = `<p>Nilai p yang dimasukkan adalah ${p}. Share yang dimasukkan yaitu:</p> ${tableContent}<p>Berdasarkan share tersebut diperoleh nilai rahasia ${M}.</p>`;
      outputProcessM.classList.remove("alert-danger");
      outputProcessM.classList.add("alert-success");
    }
    resultProcessM.innerHTML = stringResult;
    outputProcessM.classList.remove("visually-hidden");
  });
}

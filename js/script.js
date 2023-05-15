let aGlobal = null,
  bGlobal = null,
  pGlobal = null;

const arrToStr = (arr) => {
  return `(${arr[0]}, ${arr[1]})`;
};

// Halaman Utama
// Membuat feature di halaman pertama dapat diklik
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

// Titik Kurva
// Membuah petunjuk pengisian muncul
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

// Menghitung himpunan titik persamaan kurva eliptik pada Galois Field
const btnPointSet = document.querySelector("#btnPointSet");
const outputPointSet = document.querySelector("#outputPointSet");

if (btnPointSet) {
  btnPointSet.addEventListener("click", () => {
    const a = document.querySelector("#aValue").value;
    const b = document.querySelector("#bValue").value;
    const p = document.querySelector("#pValue").value;
    const pointSetResult = document.querySelector("#pointSetResult");

    newArr = ecSet(a, b, p).map(arrToStr);
    pointSet = newArr.join(", ");
    let stringResult = "";

    if (a == "" || b == "" || p == "") {
      stringResult =
        "Pastikan semua masukan fungsi kurva eliptik diisi terlebih dahulu!";
      outputPointSet.classList.remove("alert-success");
      outputPointSet.classList.add("alert-danger");
    } else {
      stringResult = `Titik-titik yang menuhi persamaan kurva eliptik y<sup>2</sup> &#x2630; x<sup>3</sup> + ${a}x + ${b} (mod ${p}), yaitu:</br>
                {${pointSet}}`;
      outputPointSet.classList.remove("alert-danger");
      outputPointSet.classList.add("alert-success");
    }
    pointSetResult.innerHTML = stringResult;
    outputPointSet.classList.remove("visually-hidden");

    (aGlobal = a), (bGlobal = b), (pGlobal = p);
  });
}

// Menjumlahkan dua titik persamaan kurva eliptik pada Galois Field
const btnSumPoint = document.querySelector("#btnSumPoint");

if (btnSumPoint) {
  btnSumPoint.addEventListener("click", () => {
    let xp = document.querySelector("#xpValue").value,
      yp = document.querySelector("#ypValue").value,
      xq = document.querySelector("#xqValue").value,
      yq = document.querySelector("#yqValue").value;

    let pointSumResult = document.querySelector("#pointSumResult"),
      outputSumPoint = document.querySelector("#outputSumPoint");

    let z1 = [xp, yp],
      z2 = [xq, yq];

    let result = sum(z1, z2, aGlobal, pGlobal);

    if (xp == "" || yp == "" || xq == "" || yq == "") {
      stringResult =
        "Pastikan semua masukan x<sub>p</sub>, y<sub>p</sub>, x<sub>q</sub>, y<sub>q</sub> diisi terlebih dahulu!";
      outputSumPoint.classList.remove("alert-success");
      outputSumPoint.classList.add("alert-danger");
    } else {
      if (yp == "inf") {
        yp = "∞";
      }

      if (yq == "inf") {
        yq = "∞";
      }

      if (result[1] == "inf") {
        result[1] = "∞";
      }

      stringResult = `Hasil penjumlahan titik persamaan kurva eliptik y<sup>2</sup> &#x2630; x<sup>3</sup> + ${aGlobal}x + ${bGlobal} (mod ${pGlobal}), yaitu:</br>
              (${xp},${yp}) + (${xq},${yq}) = (${result[0]},${result[1]})`;
      outputSumPoint.classList.remove("alert-danger");
      outputSumPoint.classList.add("alert-success");
    }
    pointSumResult.innerHTML = stringResult;
    outputSumPoint.classList.remove("visually-hidden");
  });
}

// Melelarkan titik P menjadi kP
const btnStretchPoint = document.querySelector("#btnStretchPoint");

if (btnStretchPoint) {
  btnStretchPoint.addEventListener("click", () => {
    let xp = document.querySelector("#xpValue").value,
      yp = document.querySelector("#ypValue").value,
      k = document.querySelector("#kValue").value;

    let outputStretchPoint = document.querySelector("#outputStretchPoint"),
      pointStretchResult = document.querySelector("#pointStretchResult"),
      z = [xp, yp];

    let result = stretch(z, k, aGlobal, pGlobal);

    if (xp == "" || yp == "" || k == "") {
      console.log(yp, result[1]);

      stringResult =
        "Pastikan semua masukan x<sub>p</sub>, y<sub>p</sub>, k diisi terlebih dahulu!";
      outputStretchPoint.classList.remove("alert-success");
      outputStretchPoint.classList.add("alert-danger");
    } else {
      if (yp == "inf") {
        yp = "∞";
      }

      if (result[1] == "inf") {
        result[1] = "∞";
      }

      stringResult = `Hasil pelelaran titik persamaan kurva eliptik y<sup>2</sup> &#x2630; x<sup>3</sup> + ${aGlobal}x + ${bGlobal} (mod ${pGlobal}), yaitu:</br>
              ${k}.(${xp},${yp}) = (${result[0]},${result[1]})`;
      outputStretchPoint.classList.remove("alert-danger");
      outputStretchPoint.classList.add("alert-success");
    }
    pointStretchResult.innerHTML = stringResult;
    outputStretchPoint.classList.remove("visually-hidden");
  });
}

// Melelarkan titik Q menjadi 1Q, 2Q, 3Q, ..., mQ
const btnAllStretchPoint = document.querySelector("#btnAllStretchPoint");

if (btnAllStretchPoint) {
  btnAllStretchPoint.addEventListener("click", () => {
    let xq = document.querySelector("#xqValue").value,
      yq = document.querySelector("#yqValue").value,
      m = document.querySelector("#mValue").value;

    let outputAllStretchPoint = document.querySelector(
        "#outputAllStretchPoint"
      ),
      pointStretchResult = document.querySelector("#pointStretchResult"),
      z = [xq, yq];

    let result = null,
      resultArr = [];
    for (let i = 0; i < m; i++) {
      result = stretch(z, i + 1, aGlobal, pGlobal);
      resultArr.push(result);
    }

    let tableContent = `<tr>
      <th scope="col">k</th>
      <th scope="col">kQ</th>
    </tr>`,
      tableRow = "";

    for (let i = 0; i < resultArr.length; i++) {
      let e = resultArr[i];

      if (e == "O" || (e[0] == 0 && e[1] == "inf")) {
        tableRow = `<tr>
        <td scope="row">${i + 1}</td>
        <td>(0,∞)</th>
      </tr>`;
      } else {
        tableRow = `<tr>
        <td scope="row">${i + 1}</td>
        <td>(${e[0]},${e[1]})</th>
      </tr>`;
      }

      tableContent += tableRow;
    }

    let table = `<table class="my-table">${tableContent}</table>`;

    if (xq == "" || yq == "" || m == "") {
      stringResult =
        "<p>Pastikan semua masukan x<sub>q</sub>, y<sub>q</sub>, m diisi terlebih dahulu!</p>";
      outputAllStretchPoint.classList.remove("alert-success");
      outputAllStretchPoint.classList.add("alert-danger");
    } else {
      stringResult =
        `<p>Hasil pelelaran titik persamaan kurva eliptik y<sup>2</sup> &#x2630; x<sup>3</sup> + ${aGlobal}x + ${bGlobal} (mod ${pGlobal}), yaitu:</p>` +
        table;
      outputAllStretchPoint.classList.remove("alert-danger");
      outputAllStretchPoint.classList.add("alert-success");
    }
    pointAllStretchResult.innerHTML = stringResult;
    outputAllStretchPoint.classList.remove("visually-hidden");
  });
}

// Menghitung kunci publik P(xp,yp) = x. B(xb,yb)
const btnPublicKey = document.querySelector("#btnPublicKey");

if (btnPublicKey) {
  btnPublicKey.addEventListener("click", () => {
    let xb = document.querySelector("#xbValue").value,
      yb = document.querySelector("#ybValue").value,
      x = document.querySelector("#xValue").value;

    let outputPublicKey = document.querySelector("#outputPublicKey"),
      pointPublicKeyResult = document.querySelector("#pointPublicKeyResult"),
      z = [xb, yb];

    let result = stretch(z, x, aGlobal, pGlobal);

    if (xb == "" || yb == "" || x == "") {
      stringResult =
        "Pastikan semua masukan x<sub>b</sub>, y<sub>b</sub>, x diisi terlebih dahulu!";
      outputPublicKey.classList.remove("alert-success");
      outputPublicKey.classList.add("alert-danger");
    } else {
      if (yb == "inf") {
        yb = "∞";
      }

      if (result[1] == "inf") {
        result[1] = "∞";
      }
      stringResult = `Hasil perhitungan kunci publik P(x<sub>p</sub>,y<sub>p</sub>) persamaan kurva eliptik y<sup>2</sup> &#x2630; x<sup>3</sup> + ${aGlobal}x + ${bGlobal} (mod ${pGlobal}), yaitu:</br>
                P(x<sub>p</sub>,y<sub>p</sub>) = ${x}.(${xb},${yb}) = (${result[0]},${result[1]})`;
      outputPublicKey.classList.remove("alert-danger");
      outputPublicKey.classList.add("alert-success");
    }
    pointPublicKeyResult.innerHTML = stringResult;
    outputPublicKey.classList.remove("visually-hidden");
  });
}

// Menghitung kunci rahasia K(xk,yk) = x. Q(xq,yq)
const btnSecretKey = document.querySelector("#btnSecretKey");

if (btnSecretKey) {
  btnSecretKey.addEventListener("click", () => {
    let xq = document.querySelector("#xqValue").value,
      yq = document.querySelector("#yqValue").value,
      x = document.querySelector("#xSecValue").value;

    let outputSecretKey = document.querySelector("#outputSecretKey"),
      pointSecretKeyResult = document.querySelector("#pointSecretKeyResult"),
      z = [xq, yq];

    let result = stretch(z, x, aGlobal, pGlobal);

    if (xq == "" || yq == "" || x == "") {
      stringResult =
        "Pastikan semua masukan x<sub>q</sub>, y<sub>q</sub>, x diisi terlebih dahulu!";
      outputSecretKey.classList.remove("alert-success");
      outputSecretKey.classList.add("alert-danger");
    } else {
      if (yq == "inf") {
        yq = "∞";
      }

      if (result[1] == "inf") {
        result[1] = "∞";
      }

      stringResult = `Hasil perhitungan kunci rahasia K(x<sub>x</sub>,y<sub>k</sub>) persamaan kurva eliptik y<sup>2</sup> &#x2630; x<sup>3</sup> + ${aGlobal}x + ${bGlobal} (mod ${pGlobal}), yaitu:</br>
                K(x<sub>k</sub>,y<sub>k</sub>) = ${x}.(${xq},${yq}) = (${result[0]},${result[1]})`;
      outputSecretKey.classList.remove("alert-danger");
      outputSecretKey.classList.add("alert-success");
    }
    pointSecretKeyResult.innerHTML = stringResult;
    outputSecretKey.classList.remove("visually-hidden");
  });
}

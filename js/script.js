async function eksekusi() {
  const dataResult = await cariDB();
  document.querySelector(".tampilHasil").innerHTML = tampilHasil(dataResult);
}

document.querySelector("#lokasi").addEventListener("change", function () {
  eksekusi();
});

eksekusi();

// procesing
async function cariDB() {
  const cariLokasi = document.querySelectorAll("option.selection");
  const arrayLokasi = Object.values(cariLokasi).find(
    (e) => e.selected === true
  );
  const dataLokasi = arrayLokasi.value;

  async function getDataCovid(url) {
    const response = await fetch(`${url}`);
    return await response.json();
  }

  const confirmed = await getDataCovid(
    `https://covid19.mathdro.id/api${dataLokasi}`
  ).then((data) => data.confirmed.value);

  const recovered = await getDataCovid(
    `https://covid19.mathdro.id/api${dataLokasi}`
  ).then((data) => data.recovered.value);

  const death = await getDataCovid(
    `https://covid19.mathdro.id/api${dataLokasi}`
  ).then((data) => data.deaths.value);

  const dataAkhir = {
    confirmed: confirmed,
    recovered: recovered,
    death: death,
  };

  return dataAkhir;
}

// UI
function tampilHasil(dataResult) {
  return `
        <div class="positif">
          <h5>Positif</h5>
          <p class="pasien-positif">${dataResult.confirmed}</p>
        </div>
        <div class="perawatan">
          <h5>Perawatan</h5>
          <p class="pasien-perawatan">${
            dataResult.confirmed - dataResult.recovered
          }</p>
        </div>
        <div class="sembuh">
          <h5>Sembuh</h5>
          <p class="pasien-sembuh">${dataResult.recovered}</p>
        </div>
        <div class="meninggal">
          <h5>Meninggal</h5>
          <p class="pasien-meninggal">${dataResult.death}</p>
        </div>
  `;
}

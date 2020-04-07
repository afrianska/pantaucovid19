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
          <span class="jumlah-kasus">${new Intl.NumberFormat().format(
            dataResult.confirmed
          )}</span>
          <div class="detail-tambahan">
            <span class="icon-up"></span>
            <span class="tambahan-kasus">95</span>
          </div>
        </div>
        <div class="perawatan">
          <h5>Perawatan</h5>
          <span class="jumlah-kasus">${new Intl.NumberFormat().format(
            dataResult.confirmed - (dataResult.recovered + dataResult.death)
          )}</span>
          <div class="detail-tambahan">
            <span class="icon-up"></span>
            <span class="tambahan-kasus">95</span>
          </div>
        </div>
        <div class="sembuh">
          <h5>Sembuh</h5>
          <span class="jumlah-kasus">${new Intl.NumberFormat().format(
            dataResult.recovered
          )}</span>
          <div class="detail-tambahan">
            <span class="icon-up"></span>
            <span class="tambahan-kasus">95</span>
          </div>
        </div>
        <div class="meninggal">
          <h5>Meninggal</h5>
          <span class="jumlah-kasus">${new Intl.NumberFormat().format(
            dataResult.death
          )}</span>
          <div class="detail-tambahan">
            <span class="icon-up"></span>
            <span class="tambahan-kasus">95</span>
          </div>
        </div>
  `;
}

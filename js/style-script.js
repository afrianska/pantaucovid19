cariDB();

// -------------- js style for chart
var ctx = document.getElementById("dataStatisik").getContext("2d");
var cPostif = new Chart(ctx, {
  // The type of chart we want to create
  type: "bar",

  // The data for our dataset
  data: {
    labels: [
      "01/03",
      "01/03",
      "01/03",
      "01/03",
      "01/03",
      "01/03",
      "01/03",
      "01/03",
      "01/03",
      "01/03",
    ],
    datasets: [
      {
        label: "Data Positif",
        backgroundColor: "#F47961",
        borderColor: "#E6E6E6",
        data: [40, 150, 57, 205, 190, 106, 59, 41, 87, 60, 100],
      },
    ],
  },

  // Configuration options go here
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },

  // end
});

// console.log(cariDB());

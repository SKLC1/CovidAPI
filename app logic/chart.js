
const ctx = document.getElementById('myChart').getContext('2d');

export async function createChart(dataArr, continent) {
  console.log(dataArr);
  console.log();
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dataArr[continent].map(country=> {return country.name}),
      datasets: [{
          label: '# of Votes',
          data: dataArr[continent].map(country=> {return country.latest_data['confirmed']}),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
      }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
 });
}
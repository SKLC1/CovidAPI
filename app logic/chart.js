
  const ctx = document.getElementById('myChart').getContext('2d');
  let click = 1;
 
  export async function latestData(dataArr, continent) {
  
  const names = dataArr[continent].map(country=> {return country.name});
  const cases = dataArr[continent].map(country=> {return country.latest_data['confirmed']});
  
  const labels = names
  const data = {
    labels,
    datasets: [{
      data: cases,
      labels: 'cases',
    }]
  }
  
  const config = {
    type: 'line',
    data: data,
    Option: {
      responsive: true,
    }
  }
  // ;
  updateChart(config, click)
  click++;
}

let myChart = null
function updateChart(config, click) {
  if (click === 1) {
    myChart = new Chart(ctx, config)
    // createSubData()
  } else {
    myChart.destroy()
    myChart = new Chart(ctx, config)
  }
}

// export function createSubData (data,continent) {
//   const subBtnCont = document.querySelector('.sub-data-container')
//   const categories = data[continent][0]['latest_data']
//   const calculated = data[continent][0]['latest_data']['calculated']
  
//   for (const category of Object.entries(categories)) {
//       console.log(category);
//   }
// }



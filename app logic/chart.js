
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
  } else {
    myChart.destroy()
    myChart = new Chart(ctx, config)
  }
}


export function createSubButtons(data,continent) {
  const categoriesObj = data[continent][0]['latest_data']
  const calcObj = data[continent][0]['latest_data']['calculated']
  
  const subBtnCont = document.querySelector('.sub-data-container')
  const subBtnContArr = []
  let i = 0;
  for (const category in categoriesObj) {
  const btn = document.createElement('button')
  btn.classList.add(`subBtn`)
  btn.innerText = category
  subBtnContArr.push(btn)
  subBtnCont.appendChild(btn)
  i++;
  }
  subBtnContArr.forEach(btn=>{
    btn.insideData = data;
    btn.addEventListener('click', (btn)=>{
      handleSubBtnClick(btn,continent)
    })
  })
}

function handleSubBtnClick(btn,continent) {
  const newData = btn.currentTarget.insideData;
  const category = btn.path[0].innerText
  const confirmed= newData[category]
  
  console.log(category);
  console.log(continent);
}


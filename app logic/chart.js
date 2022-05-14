
  const ctx = document.getElementById('myChart').getContext('2d');
  let click = 1;
  let isSubBtn = false
 
  export async function latestData(dataArr, continent) {
    
    const names = dataArr[continent].map(country=> {return country.name});
    const cases = dataArr[continent].map(country=> {return country.latest_data['confirmed']});
    
  const labels = names
  const data = {
    labels,
    datasets: [{
      data: cases,
      labels: "label",
      backgroundColor: 'rgb(254,79,121)',
    }]
  }
  
  const config = {
    type: 'bar',
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
  let categoriesObj = data[continent][0]['latest_data']
  const subBtnContArr = []
  const subBtnCont = document.querySelector('.sub-data-container')
  let i = 0;
  if (isSubBtn === false) {
    for (const category in categoriesObj) {
      if (category !== 'calculated') { // not showing calculated btn for now
        isSubBtn = true
        const btn = document.createElement('button')
        btn.classList.add('subBtn')
        btn.innerText = category
        subBtnContArr.push(btn)
        subBtnCont.appendChild(btn)
        i++;
      }
    } 
  } else {
    const subBtnNode = document.querySelectorAll('.subBtn')
    let subBtnArr = [...subBtnNode]
    subBtnArr.forEach(btn=>{
      btn.cont = continent;
    })
  }
  subBtnContArr.forEach(btn=>{
    btn.insideData = data;
    btn.cont = continent;
    btn.addEventListener('click', (btn)=>{
      handleSubBtnClick(btn)
    })
  })
}

function handleSubBtnClick(btn) {
  const newData = btn.currentTarget.insideData;
  const category = btn.currentTarget.innerText;
  let continent = btn.currentTarget.cont

  console.log(category);
  console.log(continent);

  updateToCategoryChart(category, continent, newData)
}

 function updateToCategoryChart(category, continent, newData) {
   
  const names = newData[continent].map(country=> {return country.name});
  let selectedCategory = newData[continent].map(country=> {return country.latest_data[category]});
  
const labels = names
const data = {
  labels,
  datasets: [{
    data: selectedCategory,
    labels: "test",
    backgroundColor: 'rgb(254,79,121)',
  }]
}

const config = {
  type: 'bar',
  data: data,
  Option: {
    responsive: true,
  }
}

  myChart.destroy()
  myChart = new Chart(ctx, config)
 }
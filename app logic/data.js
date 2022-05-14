
// for now allowing cors with chrome extention because of
// limitations of requests from proxy will

// need to be changed
export async function getData() {
  const res1 = await fetch('https://corona-api.com/countries')
  const res2 = await fetch('https://nameless-citadel-58066.herokuapp.com/https://restcountries.herokuapp.com/api/v1')
  const data1 = await res1.json();
  const data2 = await res2.json();
  const dataArr = await createMainObj(data1,data2)
  const splittedData = await splitDataByContinent(dataArr)
  return splittedData
}
// getData()

export async function createMainObj (covidData, continentsData) {
  const arrOfCovidData = covidData["data"] 
  const joinedDataArr = [];

  async function matchCodes(arrOfCovidData, continentsData) {
    for (let i = 0; i < arrOfCovidData.length; i++) {
      for (let j = 0; j < continentsData.length; j++) {
        if (arrOfCovidData[i]['code'] === continentsData[j]['cca2']) {
          arrOfCovidData[i].region = continentsData[j]['region']
          arrOfCovidData[i].subregion = continentsData[j]['subregion']
          joinedDataArr.push(arrOfCovidData[i])
        }
      }
    }
  }
  matchCodes(arrOfCovidData, continentsData)
  return joinedDataArr
}

async function splitDataByContinent(joinedDataArr) {
  const dataObj = {}
  const continentArr = ['Europe','Oceania','Africa','Asia','Americas']
  joinedDataArr.forEach(country => {
    for (let i = 0; i < continentArr.length; i++) {
      if(country.region === continentArr[i]){
        if(!dataObj[country.region]){
          dataObj[country.region] = []
        } else {
          (dataObj[country.region]).push(country)
        }
      }
    }
  });
  // 
  createOptions(joinedDataArr)
  // 
  const worldTotal = createWorldData(dataObj)
  dataObj['World'] = joinedDataArr;
  return dataObj
}

export async function createWorldData(dataObj) {
  let worldCombinedData = {
    confirmed: 0,
    recovered: 0,
    critical: 0,
    deaths: 0,
  }
  for (const continent in dataObj) {
    dataObj[continent].forEach((country)=>{
      for (const category in country.latest_data) {
        if(category !== 'calculated')
        worldCombinedData[category] += country.latest_data[category];
      }
    })
  }
  
 appendWorldData(worldCombinedData)
}

function appendWorldData(worldCombinedData) {
  const statCont = document.querySelector('.total-stats-container')
  console.log(worldCombinedData);
  for (const stat in worldCombinedData) {
    const statElement = document.createElement('div')
    statElement.classList.add('stat-element')
    statElement.innerText = `World ${stat} : ${worldCombinedData[stat]}`
    statCont.appendChild(statElement)
  }
}

function createOptions(dataArr) {
  const select = document.querySelector('#select-country')
  dataArr.forEach(country=>{
    let opt = document.createElement('option')
    opt.classList.add('country-option')
    opt.value = country.name
    opt.innerText = country['name']
    select.appendChild(opt)
  })
  select.addEventListener('click',(opt)=>{
    let clickedCountry = opt.currentTarget.value;
    let clickedCountryData = {}
    dataArr.forEach(country=>{
      if (clickedCountry === country.name) {
        clickedCountryData.name = country.name
        clickedCountryData.data = country.latest_data
        appendClickedCountry(clickedCountryData.data, clickedCountry);
      }
    })
  })
  select.addEventListener("change",(opt)=> {
    let clickedCountry = opt.currentTarget.value;
    let clickedCountryData = {}
    dataArr.forEach(country=>{
      if (clickedCountry === country.name) {
        clickedCountryData.name = country.name
        clickedCountryData.data = country.latest_data
        changedClickedCountry(clickedCountryData.data, clickedCountry);
      }
    })
  })
}

let isCont = false;
function appendClickedCountry(countryDataStatsObj, countryName) {
  const chartCont = document.querySelector('.rounded-container')
  const countryDataCont = document.createElement('div')
  let innerData = document.createElement('div')
  countryDataCont.classList.add('country-data-container')
  innerData.classList.add('country-inner-data')
  if (!isCont) {   
    chartCont.appendChild(countryDataCont)
    isCont = true;
  } 
  innerData.innerHTML = `${countryName}`
  countryDataCont.appendChild(innerData)
  for (const key in countryDataStatsObj) {
    if(key !== 'calculated'){
      const stat = document.createElement('div')
      stat.classList.add('stat')
      stat.innerHTML = `${key}: ${countryDataStatsObj[key]}`  
      countryDataCont.appendChild(stat)
    }
    // } else {
    //   for (const calcCategory in countryDataStatsObj.calculated) {
    //     const stat = document.createElement('div')
    //     stat.classList.add('stat')
    //     stat.innerHTML = `${calcCategory}: ${countryDataStatsObj.calculated[calcCategory]}`  
    //     countryDataCont.appendChild(stat)
    //   }
    // }
    // code for adding calculated
  }
}

function changedClickedCountry(countryDataStatsObj, countryName) {
  const categoriesArr = []
  const innerData = document.querySelector('.country-inner-data')
  innerData.innerHTML = `${countryName}`
  const statsArr = document.querySelectorAll('.stat')
  let i = 0;
  for (const key in countryDataStatsObj) {
    if(key !== 'calculated'){
      statsArr[i].innerHTML = `${key}: ${countryDataStatsObj[key]}`
      i++;
    }
  }
}
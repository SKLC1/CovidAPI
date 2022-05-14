
// for now allowing cors with chrome extention because of
// limitations of requests from proxy will

// need to be changed
export async function getData() {
  const res1 = await fetch('https://corona-api.com/countries')
  const res2 = await fetch('https://restcountries.herokuapp.com/api/v1')
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
  createWorldData(dataObj)
  return dataObj
}

function createWorldData(dataObj) {
  let worldCombinedData = {
    confirmed: 0,
  }
  for (const continent in dataObj) {
    dataObj[continent].forEach((country)=>{
      worldCombinedData.confirmed += country.latest_data['confirmed'];
    })
  }
 console.log(worldCombinedData.confirmed);
}
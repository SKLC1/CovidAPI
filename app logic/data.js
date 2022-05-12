
// for now allowing cors with chrome extention because of
// limitations of requests from proxy will
// need to be changed
export async function getData() {
  const res1 = await fetch('https://corona-api.com/countries')
  const res2 = await fetch('https://restcountries.herokuapp.com/api/v1')
  const data1 = await res1.json();
  const data2 = await res2.json();
  createMainObj(data1,data2)
}
// getData()

export async function createMainObj (covidData, continentsData) {
  const arrOfCovidData = covidData["data"] 
  const joinedDataArr = [];

   function matchCodes(arrOfCovidData, continentsData) {
    for (let i = 0; i < arrOfCovidData.length; i++) {
      for (let j = 0; j < continentsData.length; j++) {
        if (arrOfCovidData[i]['code'] === continentsData[j]['cca2']) {
          arrOfCovidData[i].region = continentsData[j]['region']
          joinedDataArr.push(arrOfCovidData[i])
        }
      }
    }
    console.log(joinedDataArr);
  }
  matchCodes(arrOfCovidData,continentsData)
}
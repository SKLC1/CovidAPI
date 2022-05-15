import { getData } from "./data.js";
import { latestData, createSubButtons } from "./chart.js";
const ctx = document.getElementById('myChart').getContext('2d');

let isSubBtn = false;
async function createApp() {
  const data = await getData()
  console.log(data);
  latestData(data, 'Africa')
  function handleClick(e,) {
    const continent = e.currentTarget.innerText;
    latestData(data, continent)
    createSubButtons(data, continent)
  }
  // 
  
  function appendButtons() {
    if (isSubBtn === false) {
      isSubBtn = true;
      const subBtn = document.querySelectorAll('.btn')
      const subBtnArr = [...subBtn]
      subBtnArr.forEach(btn =>{
        btn.addEventListener('click', handleClick)
      })
    } 
  }
  appendButtons()
}
createApp()


function isLoading() {
  const spinnerWrapper = document.querySelector('.spinner-wrapper');
  const mainContainer = document.querySelector('.main-container');
  window.addEventListener('load',()=>{
    spinnerWrapper.parentElement.removeChild(spinnerWrapper)
  })

}
isLoading()
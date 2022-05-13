import { getData } from "./data.js";
import { latestData, createSubData } from "./chart.js";
const ctx = document.getElementById('myChart').getContext('2d');

let isSubBtn = false;
async function createApp() {
  const data = await getData()
  console.log(data);
  function handleClick(e,) {
    const continent = e.currentTarget.innerText;
    latestData(data, continent)
    createSubData(data, continent)
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
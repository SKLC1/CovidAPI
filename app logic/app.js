import { getData } from "./data.js";
import { createChart } from "./chart.js";
const ctx = document.getElementById('myChart').getContext('2d');

async function createApp() {
  const data = await getData()
  // console.log(data);
  createChart(data,'Africa')
  function handleClick(e) {
    const continent = e.currentTarget.innerText;
    updateChart(data,continent)
  }
  // 
  function appendButtons() { 
    const btns = document.querySelectorAll('.btn')
    const btnsArr = [...btns]
    btnsArr.forEach(btn =>{
      btn.addEventListener('click', handleClick)
     })
  }
  appendButtons()
}
createApp()
import { getData } from "./data.js";
import { createChart } from "./chart.js";


async function createApp() {
  const data = await getData()
  // console.log(data);
  function handleButton (e) {
    const continent = e.currentTarget.innerText;
    createChart(data, continent)
  }
  // 
  function appendButtons() { 
    const btns = document.querySelectorAll('.btn')
    const btnsArr = [...btns]
    btnsArr.forEach(btn =>{
      btn.addEventListener('click', handleButton)
     })
  }
  appendButtons()
}
createApp()
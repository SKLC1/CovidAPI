import { getData } from "./data.js";
import { latestData } from "./chart.js";
const ctx = document.getElementById('myChart').getContext('2d');

async function createApp() {
  const data = await getData()
  console.log(data);
  function handleClick(e,) {
    const continent = e.currentTarget.innerText;
    latestData(data, continent)
    // createSubData(data, continent)
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
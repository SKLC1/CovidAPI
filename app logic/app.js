import { getData } from "./data.js";
import { createChart } from "./chart.js";

async function createApp() {
  const data = await getData()
  // console.log(data);
  createChart(data, 'Africa')
}
createApp()
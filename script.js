const tempDiv = document.getElementById("tempValue");
const windDiv = document.getElementById("windValue");
const historyTableBody = document.querySelector("#historyData tbody");

function showSection(id) {
  document.querySelectorAll(".section").forEach((sec) => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function backToMain() {
  document.querySelectorAll(".section").forEach((sec) => sec.classList.remove("active"));
  document.getElementById("main").classList.add("active");
}

async function fetchWeather() {
  try {
    // Hà Nội: 21.0285 N, 105.8542 E
    // Thêm hourly cloudcover
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&hourly=temperature_2m,wind_speed_10m,cloudcover&current_weather=true";

    const res = await fetch(url);
    const data = await res.json();

    const now = new Date();

    const nowISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().substring(0, 16);

    const hourlyTimes = data.hourly.time;
    const tempHourly = data.hourly.temperature_2m;
    const windHourly = data.hourly.wind_speed_10m;
    const cloudHourly = data.hourly.cloudcover;

    let closestIndex = 0;
    for (let i = 0; i < hourlyTimes.length; i++) {
      if (hourlyTimes[i] <= nowISO) closestIndex = i;
      else break;
    }

    const temp = tempHourly[closestIndex];
    const wind = windHourly[closestIndex];
    const cloud = cloudHourly[closestIndex];

    const timeDisplay = new Date(hourlyTimes[closestIndex] + ":00").toLocaleString("vi-VN", {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    tempDiv.innerHTML = `
      <table>
        <tr><th>Thời gian</th><th>Nhiệt độ (°C)</th></tr>
        <tr><td>${timeDisplay}</td><td>${temp}</td></tr>
      </table>
    `;

    windDiv.innerHTML = `
      <table>
        <tr><th>Thời gian</th><th>Tốc độ gió (km/h)</th><th>Độ che phủ mây (%)</th></tr>
        <tr><td>${timeDisplay}</td><td>${wind.toFixed(1)}</td><td>${cloud}</td></tr>
      </table>
    `;

    const row = `<tr><td>${timeDisplay}</td><td>${temp}</td><td>${wind.toFixed(1)}</td><td>${cloud}</td></tr>`;
    historyTableBody.innerHTML = row + historyTableBody.innerHTML;

    if (historyTableBody.rows.length > 12) {
      historyTableBody.deleteRow(historyTableBody.rows.length - 1);
    }
  } catch (err) {
    tempDiv.textContent = "Không thể lấy dữ liệu nhiệt độ";
    windDiv.textContent = "Không thể lấy dữ liệu tốc độ gió và mây";
  }
}

fetchWeather();
setInterval(fetchWeather, 5 * 60 * 1000);

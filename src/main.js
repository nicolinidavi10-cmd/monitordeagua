const percentage = document.querySelector("#percentage");
const distance = document.querySelector("#distance");
const water = document.querySelector("#water");
const status = document.querySelector("#levelStatus");
const updated = document.querySelector("#updated");
const bubbles = document.querySelector("#bubbles");

const DIST_100 = 1.80;
const DIST_0 = 13.20;

function createBubbles() {
  for (let i = 0; i < 14; i++) {
    const b = document.createElement("i");
    b.style.left = `${8 + Math.random() * 84}%`;
    b.style.animationDelay = `${Math.random() * 4}s`;
    b.style.animationDuration = `${3 + Math.random() * 3}s`;
    b.style.width = `${3 + Math.random() * 6}px`;
    b.style.height = b.style.width;
    bubbles.appendChild(b);
  }
}

function setLevel(value, realDistance = null) {
  const level = Math.max(0, Math.min(100, Number(value)));
  const dist = realDistance !== null ? Number(realDistance) : DIST_0 - (level / 100) * (DIST_0 - DIST_100);

  percentage.textContent = Math.round(level);
  distance.textContent = dist.toFixed(2);
  water.style.height = `${level}%`;

  if (level <= 20) {
    status.textContent = "Nível baixo";
  } else if (level >= 90) {
    status.textContent = "Reservatório cheio";
  } else {
    status.textContent = "Nível normal";
  }

  updated.textContent = "agora";
}

const ESP32_IP = "http://192.168.1.8";
const espStatus = document.querySelector(".status");

function setConnection(online) {
  espStatus.innerHTML = online
    ? '<span></span> ESP32 CONECTADO'
    : '<span></span> ESP32 DESCONECTADO';
  const dot = espStatus.querySelector("span");
  dot.style.background = online ? "#45e58a" : "#ff5d6c";
  dot.style.boxShadow = online ? "0 0 14px #45e58a" : "0 0 14px #ff5d6c";
}

async function atualizarESP32() {
  try {
    const resposta = await fetch(`${ESP32_IP}/dados`, { cache: "no-store" });
    if (!resposta.ok) throw new Error("ESP32 respondeu com erro");

    const dados = await resposta.json();
    if (typeof dados.nivel !== "number" || typeof dados.distancia !== "number") {
      throw new Error("Dados inválidos");
    }

    setLevel(dados.nivel, dados.distancia);
    setConnection(true);
  } catch (erro) {
    setConnection(false);
  }
}

createBubbles();
setLevel(0, DIST_0);
setConnection(false);
atualizarESP32();
setInterval(atualizarESP32, 1000);

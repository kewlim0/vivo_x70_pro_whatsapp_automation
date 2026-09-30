const screens = Array.from(document.querySelectorAll(".screen"));
const nav = document.querySelector(".bottom-nav");
const navButtons = Array.from(document.querySelectorAll("[data-screen]"));
const terminalLog = document.querySelector("#terminalLog");
const clearLogButton = document.querySelector("#clearLog");
const appendLogButton = document.querySelector("#appendLog");
const approvalCountdown = document.querySelector("#approvalCountdown");
const phoneShell = document.querySelector(".phone-shell");

const hiddenNavScreens = new Set(["login", "approval", "confirm"]);

const baseLogs = [
  ["10:25:10", "INFO", "Connected to device"],
  ["10:25:11", "INFO", "Spec version: v1.2.3"],
  ["10:25:12", "INFO", "Android user: New user"],
  ["10:25:13", "INFO", "Ready to run"],
  ["10:25:14", "CMD", "Start run command"],
  ["10:25:15", "INFO", "Syncing spec..."],
  ["10:25:18", "INFO", "Spec sync complete"],
  ["10:25:19", "INFO", "Running automation..."],
  ["10:25:22", "INFO", "Opening WhatsApp..."],
  ["10:25:24", "INFO", "Navigating to chat..."],
  ["10:25:27", "INFO", "Sending message 1/50"],
  ["10:25:31", "INFO", "Message sent"],
  ["10:25:36", "INFO", "Waiting 5 seconds..."],
  ["10:25:41", "INFO", "Sending message 2/50"],
  ["10:25:44", "WARN", "Image not found, using text only"],
  ["10:25:49", "INFO", "Message sent"],
  ["10:25:40", "INFO", "Progress: 2/50 (4%)"]
];

function logClass(level) {
  if (level === "WARN") return "log-warn";
  if (level === "ERROR") return "log-error";
  return "log-info";
}

function renderLogs(lines = baseLogs) {
  terminalLog.innerHTML = lines
    .map(([time, level, message]) => `${time} <span class="${logClass(level)}">[${level}]</span> ${message}`)
    .join("\n");
}

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === `screen-${name}`);
  });

  document.querySelectorAll(".bottom-nav button").forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === name);
  });

  phoneShell.classList.toggle("nav-hidden", hiddenNavScreens.has(name));

  if (name === "terminal") {
    renderLogs();
  }
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.screen;
    if (target) showScreen(target);
  });
});

document.querySelectorAll(".mode-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".mode-card").forEach((item) => {
      item.classList.remove("selected");
      item.querySelector("b").textContent = "";
    });
    card.classList.add("selected");
    card.querySelector("b").textContent = "✓";
  });
});

document.querySelectorAll(".device-card:not(.muted)").forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    document.querySelectorAll(".device-card").forEach((item) => item.classList.remove("selected-device"));
    card.classList.add("selected-device");
  });
});

clearLogButton?.addEventListener("click", () => {
  terminalLog.textContent = "";
});

appendLogButton?.addEventListener("click", () => {
  const nextLines = [
    ...baseLogs,
    ["10:25:52", "INFO", "Sending message 3/50"],
    ["10:25:55", "INFO", "Message sent"],
    ["10:25:58", "INFO", "Progress: 3/50 (6%)"]
  ];
  renderLogs(nextLines);
});

let remaining = 28;
setInterval(() => {
  if (!approvalCountdown) return;
  remaining = remaining <= 1 ? 28 : remaining - 1;
  approvalCountdown.textContent = `00:${String(remaining).padStart(2, "0")}`;
}, 1000);

renderLogs();
showScreen("login");

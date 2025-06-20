const display = document.getElementById("display");
const resultPreview = document.getElementById("resultPreview");
const buttons = document.querySelectorAll(".btn, .btn1");

const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");
const themeToggle = document.getElementById("themeToggle");
const showHistory = document.getElementById("showHistory");
const clearHistory = document.getElementById("clearHistory");
const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");
const moveLeft = document.getElementById("moveLeft");
const moveRight = document.getElementById("moveRight");

let expression = "";
let cursorPos = 0;
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

function updateDisplay() {
            const visualExpr = expression.slice(0, cursorPos) + '|' + expression.slice(cursorPos);
display.value = visualExpr;

  try {
    const exp = expression
      .replace(/√\(/g, "Math.sqrt(")
      .replace(/sin\(/g, "Math.sin(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/(\d+)\^2/g, "Math.pow($1,2)");

    const result = eval(exp);
    resultPreview.textContent = "= " + result;
  } catch {
    resultPreview.textContent = "= ?";
  }
}

function insertAtCursor(val) {
  expression =
    expression.slice(0, cursorPos) + val + expression.slice(cursorPos);
  cursorPos += val.length;
  updateDisplay();
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    insertAtCursor(btn.getAttribute("data-val")); });
  });



equals.addEventListener("click", () => {
  try {
   const exp = expression
  .replace(/√\(/g, "Math.sqrt(")
  .replace(/sin\(/g, "Math.sin(")
  .replace(/cos\(/g, "Math.cos(")
  .replace(/(\d+)\^2/g, "Math.pow($1,2)")
  .replace(/(\d+)\^3/g, "Math.pow($1,3)");

    const result = eval(exp);
    if (expression.trim() !== "") {
      history.push(`${expression} = ${result}`);
      localStorage.setItem("calcHistory", JSON.stringify(history));
    }
    expression = result.toString();
    cursorPos = expression.length;
    updateDisplay();
  } catch {
    expression = "Error";
    cursorPos = expression.length;
    updateDisplay();
  }
});

clear.addEventListener("click", () => {
  expression = "";
  cursorPos = 0;
  updateDisplay();
});

backspace.addEventListener("click", () => {
  if (cursorPos > 0) {
    expression =
      expression.slice(0, cursorPos - 1) + expression.slice(cursorPos);
    cursorPos--;
    updateDisplay();
  }
});

moveLeft.addEventListener("click", () => {
  if (cursorPos > 0) cursorPos--;
});

moveRight.addEventListener("click", () => {
  if (cursorPos < expression.length) cursorPos++;
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

showHistory.addEventListener("click", () => {
  historyPanel.classList.toggle("hidden");
  loadHistory();
});

clearHistory.addEventListener("click", () => {
  history = [];
  localStorage.removeItem("calcHistory");
  loadHistory();
});

function loadHistory() {
  historyList.innerHTML = "";
  const saved = JSON.parse(localStorage.getItem("calcHistory")) || [];
  saved.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();
});

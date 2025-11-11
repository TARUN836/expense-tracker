// === Expense Tracker ===
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("expense-list");
const total = document.getElementById("total-amount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
  list.innerHTML = "";
  let sum = 0;
  expenses.forEach((exp, index) => {
    sum += exp.amount;
    const li = document.createElement("li");
    li.innerHTML = `
      ${exp.desc} - ₹${exp.amount}
      <button onclick="deleteExpense(${index})">❌</button>
    `;
    list.appendChild(li);
  });
  total.textContent = sum;
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

addBtn.addEventListener("click", () => {
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);
  if (desc === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter valid details");
    return;
  }

  expenses.push({ desc, amount });
  descInput.value = "";
  amountInput.value = "";
  renderExpenses();
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// Initial load
renderExpenses();

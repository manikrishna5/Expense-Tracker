let expenses = [];

const form  = document.querySelector('form');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');

const table = document.querySelector(".explist table");

form.addEventListener("submit",function(e){
    e.preventDefault();
    addExpense();
});

function addExpense(){
    const expense = {
        id: Date.now(),
        description: descriptionInput.value,
        category : categoryInput.value,
        amount : Number(amountInput.value),
        date : dateInput.value
    };
    expenses.push(expense);
    renderExpenses();
    form.reset();
}
 
function renderExpenses(){
    const rows = table.querySelectorAll("tr");

    rows.forEach((row,index)=>{
        if(index!=0) row.remove();
    });

    expenses.forEach((exp=>{
        const row = document.createElement("tr");
        row.innerHTML = ` <td>${exp.description}</td>
                          <td>${exp.category}</td>
                          <td>$${exp.amount}</td>
                          <td>${exp.date}</td>
                          <td><button onclick="deleteExpense(${exp.id})">Delete</button></td>`;
        table.appendChild(row);
    }));
    updateTotal();
}

function deleteExpense(id){
    expenses = expenses.filter(exp=> exp.id!=id);
    renderExpenses();
}


function updateTotal(){
    const total = expenses.reduce((sum,exp)=> sum+exp.amount,0);
    document.querySelector(".total").textContent = `Total: $${total}`;
}

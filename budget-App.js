// selecting important elements
const budgetOption = document.querySelector('.budget-option');
const expenseOption = document.querySelector('.expense-option');
const budgetBox = document.querySelector('.budget-box');
const expenseBox = document.querySelector('.expense-box');
const budgetInput = document.querySelector('.budget-input');
const expenseNameInput = document.querySelector('.expense-name-input');
const expenseAmtInput = document.querySelector('.expense-amt-input');
const enterBudget = document.querySelector('.enter-budget');
const enterExpense = document.querySelector('.enter-expense');
const currentBudget = document.querySelector('.current-budget');
const currentExpense = document.querySelector('.current-expense');
const currentBalance = document.querySelector('.current-balance');
const list = document.querySelector('ul');


// variables
var budget = 0, expense= 0, balance = 0 , id= 1;


//toggle visibility of budget input and expense input
budgetOption.addEventListener('click', ()=>{
    budgetBox.classList.toggle('invisible');
});

expenseOption.addEventListener('click', ()=>{
    expenseBox.classList.toggle('invisible');
});


//change budget
enterBudget.addEventListener('click',changeBudget);

function changeBudget(){
    budget = Number(budgetInput.value);
    currentBudget.innerHTML = budget;

    //update balance
    expense = Number(currentExpense.innerHTML);
    currentBalance.innerHTML = budget - expense;
    
    budgetInput.value = "";

}


//add expense
enterExpense.addEventListener('click',addExpense);

function addExpense() {
    expenseAmt = Number(expenseAmtInput.value);
    expenseName = expenseNameInput.value;

    //update expense
    let temp = Number(currentExpense.innerHTML) + expenseAmt;
    currentExpense.innerHTML = temp;
    //update balance
    let temp2 = Number(currentBalance.innerHTML) - expenseAmt;
    currentBalance.innerHTML = temp2;

    var item = `
                 <li>
                   <i class="far fa-edit ${id}" id="${id}" job="edit"></i> 
                   <i class="fas fa-trash ${id}" id="${id}" job="delete"></i>
                   <p class="ex-name">${expenseName}</p>
                   <p class="ex-amt">${expenseAmt}</p>
                 </li>
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
    
    id++;
}

//to delete an expense
function deleteExpense(element) {
    
    const elementIdNo = element.attributes.id.value;
    const expenseToDelete = Number(element.parentNode.querySelector('.ex-amt').innerHTML);
    console.log(expenseToDelete);
    temp = Number(currentExpense.innerHTML) - expenseToDelete;
    currentExpense.innerHTML = temp;
    temp2 = Number(currentBalance.innerHTML) + expenseToDelete;
    currentBalance.innerHTML = temp2;

    element.parentNode.remove(element);
    
}

//to edit an expense
function editExpense(element) {
    const expenseToEdit = Number(element.parentNode.querySelector('.ex-amt').innerHTML);
    const name = element.parentNode.querySelector('.ex-name').innerHTML;
    
    expenseBox.classList.remove('invisible');
    expenseNameInput.value = name;
    expenseAmtInput.value = expenseToEdit;
    expenseAmtInput.focus();
    expenseAmtInput.select();
    
    deleteExpense(element);


    
}

//target dynamically created elements and edit or delete them
list.addEventListener('click', function(event){
    const element = event.target;
    console.log(element);
    
    const elementJob = element.attributes.job.value;
    if (elementJob == "delete") {
        deleteExpense(element);
    }else if (elementJob == "edit") {
        editExpense(element);
    } 
});




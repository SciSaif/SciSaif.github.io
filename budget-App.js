// ---selecting important elements---
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
const clear = document.querySelector('.clear');
const list = document.querySelector('ul');


// ---variables---
var budget = 0, expense= 0, balance = 0 , id= 1;
var store = []; 

//---toggle visibility of budget input and expense input---
budgetOption.addEventListener('click', ()=>{
    budgetBox.classList.toggle('invisible');
});

expenseOption.addEventListener('click', ()=>{
    expenseBox.classList.toggle('invisible');
});
// console.log(store);


//---load data from local storage---

loadData();
function loadData(){
    var getstore =  JSON.parse(localStorage.getItem("storeExpense"));
    // console.log(getstore);
    if (getstore !== null) {
        
      getstore.forEach(elem => {
        //   console.log(elem);
          if (elem.trash===true) {
              return;
          }else{
              store.push(elem);

          }
    
      });

    //   console.log(store);

      //---load and display budget---
      currentBudget.innerHTML = store[0].Budget;
      currentBalance.innerHTML = store[0].Budget;
      //---load and display, expenses, and balance---
      //   console.log(store);
      
      let expensee=0;

      store.forEach(elem => {
        var item = `
                     <li>
                       <i class="far fa-edit ${elem.ID}" id="${elem.ID}" job="edit"></i> 
                       <i class="fas fa-trash ${elem.ID}" id="${elem.ID}" job="delete"></i>
                       <p class="ex-name">${elem.ExpenseName}</p>
                       <p class="ex-amt">${elem.ExpenseAmt}</p>
                     </li>
                   `;
        const position = "beforeend";
        list.insertAdjacentHTML(position, item);

        expensee += Number(elem.ExpenseAmt);
        currentExpense.innerHTML = Number(expensee);
        
        currentBalance.innerHTML -= elem.ExpenseAmt;
        // console.log(id);
        
        //---updating id---
        if (elem.ID>= id) {
            id = elem.ID;
        }
      });
     id++;
    //  console.log(id);
     
    }else return;
};


//clear data 
clear.addEventListener('click', ()=>{
    localStorage.clear();
    window.location.reload();
})


enterBudget.addEventListener('click',changeBudget);

function changeBudget(){
    budget = Number(budgetInput.value);
    currentBudget.innerHTML = budget;

    //---update balance---
    expense = Number(currentExpense.innerHTML);
    currentBalance.innerHTML = budget - expense;
    
    budgetInput.value = "";

    //---store current budget to local storage---
    store.forEach(elem => {
        elem.Budget = budget;
    });
    // console.log(store);
    
    localStorage.setItem("storeExpense", JSON.stringify(store));
}


//---add expense---
enterExpense.addEventListener('click',addExpense);

function addExpense() {
    expenseAmt = Number(expenseAmtInput.value);
    expenseName = expenseNameInput.value;

    //---update expense---
    let temp = Number(currentExpense.innerHTML) + expenseAmt;
    currentExpense.innerHTML = temp;
    //---update balance---
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
    
    //---store in local storage---
    
    store.push({
        "ExpenseName" : expenseName,
        "ExpenseAmt" : expenseAmt,
        "ID" : id,
        "trash" : false,
        "Budget" : Number(currentBudget.innerHTML)
    });
    // console.log(store);
    
    localStorage.setItem("storeExpense", JSON.stringify(store));

    id++;
}

//---to delete an expense---
function deleteExpense(element) {
    const elementIdNo = element.attributes.id.value;
    
    const expenseToDelete = Number(element.parentNode.querySelector('.ex-amt').innerHTML);
    // console.log(expenseToDelete);
    temp = Number(currentExpense.innerHTML) - expenseToDelete;
    currentExpense.innerHTML = temp;
    temp2 = Number(currentBalance.innerHTML) + expenseToDelete;
    currentBalance.innerHTML = temp2;
    
    element.parentNode.remove(element);
    
    //---set trash to true in local storage---
    var getstore = JSON.parse(localStorage.getItem("storeExpense"));
    // console.log(getstore);
    var index = getstore.findIndex((elem) => {
        return elem.ID == elementIdNo;
    })
    // console.log(index);
    getstore[index].trash = true;
    // console.log(getstore);
    localStorage.setItem("storeExpense", JSON.stringify(getstore));
    
    
    
}

//---to edit an expense---
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

//---target dynamically created elements and edit or delete them---
list.addEventListener('click', function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "delete") {
        deleteExpense(element);
    }else if (elementJob == "edit") {
        editExpense(element);
    } 
});




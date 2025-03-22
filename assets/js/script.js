const expenseForm = document.querySelector('form[name="expenseTracker"]');

const expName = expenseForm.querySelector('input#name');
const expAmount = expenseForm.querySelector('input#amount');
const expCategory = expenseForm.querySelector('select#category');
const expDate = expenseForm.querySelector('input#date');

let expenseData = JSON.parse(localStorage.getItem('expenseData')) || [];
expenseTable();

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let eNameValue = expName.value;
    let eAmountValue = expAmount.value;
    let eCategoryValue = expCategory.value;
    let eDateValue = expDate.value;

    if (!eNameValue || !eAmountValue || !eDateValue) {
        alert('Please fill all the required fields!');
        return;
    }

    expenseData.push({ name: eNameValue, amount: eAmountValue, category: eCategoryValue, date: eDateValue });

    localStorage.setItem('expenseData', JSON.stringify(expenseData));

    expenseTable();

    expName.value = '';
    expAmount.value = '';
    expCategory.selectedIndex = 0;
    expDate.value = '';
});

function expenseTable() {
    let tableBody = document.querySelector('table tbody'); 
    tableBody.innerHTML = '';
    let expenseData = JSON.parse(localStorage.getItem('expenseData')) || [];

    expenseData.forEach((expense, index) => {
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${expense.name}</td>
            <td>$${expense.amount}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td class="actionBtn">
                <a href="#" class="cta_btn edit"><ion-icon name="pencil"></ion-icon></a>
                <a href="#" class="cta_btn delete"><ion-icon name="trash"></ion-icon></a>
            </td>
        `;
        tableBody.appendChild(tableRow);
    });
    
}

document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.querySelector('form[name="expenseTracker"]');

    const expName = expenseForm.querySelector('input#name');
    const expAmount = expenseForm.querySelector('input#amount');
    const expCategory = expenseForm.querySelector('select#category');
    const expDate = expenseForm.querySelector('input#date');
    const submitBtn = expenseForm.querySelector('button[type="submit"]');
    const totalPriceDiv = document.querySelector('#price');

    let expenseData = JSON.parse(localStorage.getItem('expenseData')) || [];
    let editIndex = null;
    expenseTable();
    updateTotalPrice()

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

        if (editIndex !== null) {
            // Update existing record
            expenseData[editIndex] = { name: eNameValue, amount: eAmountValue, category: eCategoryValue, date: eDateValue };
            editIndex = null;
            submitBtn.textContent = "Add Expense";
        } else {
            // Add new record
            expenseData.push({ name: eNameValue, amount: eAmountValue, category: eCategoryValue, date: eDateValue });
        }

        localStorage.setItem('expenseData', JSON.stringify(expenseData));

        expName.value = '';
        expAmount.value = '';
        expCategory.selectedIndex = 0;
        expDate.value = '';

        expenseTable();
        updateTotalPrice()
    });

    function expenseTable() {
        let tableBody = document.querySelector('table tbody'); 
        tableBody.innerHTML = '';

        expenseData.forEach((expense, index) => {
            let tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${expense.name}</td>
                <td>$${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td class="actionBtn">
                    <a href="#" class="cta_btn edit-btn" data-index="${index}"><ion-icon name="pencil"></ion-icon></a>
                    <a href="#" class="cta_btn delete-btn" data-index="${index}"><ion-icon name="trash"></ion-icon></a>
                </td>
            `;
            tableBody.appendChild(tableRow);
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', deleteTask);
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', editTask);
        });
        updateTotalPrice()
    }

    function deleteTask(e) {
        e.preventDefault();
        let index = e.target.closest('.delete-btn').getAttribute('data-index');
        
        expenseData.splice(index, 1); // Remove from global array
        localStorage.setItem('expenseData', JSON.stringify(expenseData)); // Update localStorage
        
        expenseTable();
        updateTotalPrice()
    }

    function editTask(e) {
        e.preventDefault();
        let index = e.target.closest('.edit-btn').getAttribute('data-index');
        let expense = expenseData[index];
        
        expName.value = expense.name;
        expAmount.value = expense.amount;
        expCategory.value = expense.category;
        expDate.value = expense.date;

        editIndex = index;
        submitBtn.textContent = "Update Expense";
        updateTotalPrice()
    }

    function updateTotalPrice() {
        let total = expenseData.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
        document.querySelector('#price').innerHTML = `<b>Total:</b> PKR${total.toFixed(0)}`;
    }
    
});
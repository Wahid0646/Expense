document.addEventListener('DOMContentLoaded', () => {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function renderExpenses() {
        const expenseList = document.getElementById('expenseList');
        expenseList.innerHTML = '';

        expenses.forEach((expense, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            const inrAmount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(expense.amount);

            listItem.innerHTML = `
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>${expense.name}</strong><br>
                        Category: ${expense.category}
                    </div>
                    <div>
                        ${inrAmount}
                        <button class="btn btn-secondary btn-sm ml-2 edit-btn" data-index="${index}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
                    </div>
                </div>`;
            expenseList.appendChild(listItem);
        });
    }

    function addExpense(name, amount, category) {
        expenses.push({ name, amount, category });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }

    function editExpense(index, newName, newAmount, newCategory) {
        expenses[index] = { name: newName, amount: newAmount, category: newCategory };
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }

    function deleteExpense(index) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }

    renderExpenses();

    const expenseForm = document.getElementById('expenseForm');
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const expenseName = document.getElementById('expenseName').value;
        const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
        const expenseCategory = document.getElementById('expenseCategory').value;

        if (expenseName && expenseAmount && expenseCategory) {
            addExpense(expenseName, expenseAmount, expenseCategory);
            expenseForm.reset();
        }
    });

    const expenseList = document.getElementById('expenseList');
    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            const expense = expenses[index];

            const newName = prompt('Edit Expense Name:', expense.name);
            if (newName === null) return;
            const newAmount = parseFloat(prompt('Edit Expense Amount:', expense.amount));
            if (isNaN(newAmount)) return;
            const newCategory = prompt('Edit Category:', expense.category);

            editExpense(index, newName, newAmount, newCategory);
        } else if (e.target.classList.contains('delete-btn')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            deleteExpense(index);
        }
    });
});

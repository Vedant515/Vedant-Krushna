// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Get references to buttons and modal elements
    const addEmpButton = document.getElementById('add-employee-button');
    const addEmployeeModal = document.getElementById('add-employee-modal');
    const closeModalButton = document.getElementById('close-modal-button');
    const submitEmployeeButton = document.getElementById('submit-employee-button');
    const employeeTableBody = document.getElementById('employee-table-body'); // Corrected selector
    const employeeContextMenu = document.getElementById('employee-context-menu');
    const editEmployeeButton = document.getElementById('edit-employee-button');
    const deleteEmployeeButton = document.getElementById('delete-employee-button');

    // Edit Employee Modal elements
    const editEmployeeModal = document.getElementById('edit-employee-modal');
    const closeEditEmployeeModalButton = document.getElementById('close-edit-employee-modal-button');
    const editEmpNameInput = document.getElementById('edit-emp-name');
    const editEmpEmailInput = document.getElementById('edit-emp-email');
    const editEmpRoleInput = document.getElementById('edit-emp-role');
    const saveEmployeeChangesButton = document.getElementById('save-employee-changes-button');


    let currentContextMenuButton = null; // To keep track of which button opened the menu
    let currentRowToEdit = null; // To keep track of the table row being edited

    // Functionality for "Add New Emp" button to open the modal
    addEmpButton.addEventListener('click', () => {
        addEmployeeModal.classList.add('show');
    });

    // Functionality for close button to hide the modal
    closeModalButton.addEventListener('click', () => {
        addEmployeeModal.classList.remove('show');
    });

    // Functionality for submitting new employee (placeholder)
    submitEmployeeButton.addEventListener('click', () => {
        const nameInput = document.getElementById('new-emp-name');
        const emailInput = document.getElementById('new-emp-email');
        const roleInput = document.getElementById('new-emp-role');

        const name = nameInput.value;
        const email = emailInput.value;
        const role = roleInput.value;

        if (name && email && role) {
            console.log('New Employee Data:', { name, email, role });

            // Simulate adding a new row to the table
            const newRow = document.createElement('tr');
            newRow.classList.add('table-row'); // Apply table-row class
            newRow.innerHTML = `
                <td class="table-data">${name}</td>
                <td class="table-data">${email}</td>
                <td class="table-data">${role}</td>
                <td class="table-data action-cell">
                    <button class="three-dots-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="three-dots-icon">
                            <path fill-rule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </td>
            `;
            employeeTableBody.appendChild(newRow); // Append to the table body

            alert('Employee added successfully (simulated)!');
            addEmployeeModal.classList.remove('show'); // Close modal after submission
            // Clear form fields
            nameInput.value = '';
            emailInput.value = '';
            roleInput.value = '';
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Function to hide the context menu
    function hideContextMenu() {
        employeeContextMenu.classList.remove('show');
        currentContextMenuButton = null;
    }

    // Event delegation for "three dots" buttons
    employeeTableBody.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('.three-dots-button');
        if (clickedButton) {
            event.stopPropagation(); // Stop propagation to prevent document click from hiding immediately

            // If the same button is clicked again, toggle the menu
            if (currentContextMenuButton === clickedButton) {
                hideContextMenu();
                return;
            }

            // Hide any currently open menu
            hideContextMenu();

            // Show the new menu
            currentContextMenuButton = clickedButton;
            currentRowToEdit = clickedButton.closest('tr'); // Set the row to be edited
            const rect = clickedButton.getBoundingClientRect();

            // Position the context menu to the right of the button
            employeeContextMenu.style.top = `${rect.top}px`;
            employeeContextMenu.style.left = `${rect.right + 5}px`; // 5px to the right of the button

            // Adjust if menu goes off screen to the right
            const menuWidth = employeeContextMenu.offsetWidth;
            const viewportWidth = window.innerWidth;
            if (rect.right + menuWidth + 5 > viewportWidth) {
                // If not enough space on the right, open to the left
                employeeContextMenu.style.left = `${rect.left - menuWidth - 5}px`;
            }

            employeeContextMenu.classList.add('show');
        }
    });

    // Hide context menu when clicking anywhere else on the document
    document.addEventListener('click', (event) => {
        if (!employeeContextMenu.contains(event.target) && !event.target.closest('.three-dots-button')) {
            hideContextMenu();
        }
    });

    // Functionality for "Edit" button in context menu
    editEmployeeButton.addEventListener('click', () => {
        if (currentRowToEdit) {
            // Populate the edit modal with current row data
            editEmpNameInput.value = currentRowToEdit.children[0].textContent;
            editEmpEmailInput.value = currentRowToEdit.children[1].textContent;
            editEmpRoleInput.value = currentRowToEdit.children[2].textContent;

            editEmployeeModal.classList.add('show'); // Show the edit modal
            hideContextMenu(); // Hide the context menu
        }
    });

    // Functionality for "Save Changes" button in Edit Employee Modal
    saveEmployeeChangesButton.addEventListener('click', () => {
        if (currentRowToEdit) {
            const updatedName = editEmpNameInput.value;
            const updatedEmail = editEmpEmailInput.value;
            const updatedRole = editEmpRoleInput.value;

            if (updatedName && updatedEmail && updatedRole) {
                // Update the table row
                currentRowToEdit.children[0].textContent = updatedName;
                currentRowToEdit.children[1].textContent = updatedEmail;
                currentRowToEdit.children[2].textContent = updatedRole;

                alert('Employee updated successfully (simulated)!');
                console.log('Employee updated:', { updatedName, updatedEmail, updatedRole });
                editEmployeeModal.classList.remove('show'); // Hide the modal
                currentRowToEdit = null; // Clear the reference
            } else {
                alert('Please fill in all fields for the edited employee.');
            }
        }
    });

    // Functionality for close button in Edit Employee Modal
    closeEditEmployeeModalButton.addEventListener('click', () => {
        editEmployeeModal.classList.remove('show');
        currentRowToEdit = null; // Clear the reference if modal is closed without saving
    });

    // Functionality for "Delete" button in context menu
    deleteEmployeeButton.addEventListener('click', () => {
        if (currentRowToEdit) {
            const name = currentRowToEdit.children[0].textContent;
            if (confirm(`Are you sure you want to delete employee: ${name}?`)) { // Using confirm for simple delete confirmation
                currentRowToEdit.remove(); // Remove the row from the table
                console.log(`Deleted Employee: ${name} (simulated)`);
            }
            hideContextMenu();
            currentRowToEdit = null;
        }
    });

    // Functionality for navigation tabs (placeholder)
    document.querySelectorAll('nav button').forEach(navButton => {
        navButton.addEventListener('click', (event) => {
            // Remove active styling from all tabs
            document.querySelectorAll('nav button').forEach(btn => {
                btn.classList.remove('active'); // Assuming 'active' is the class for active tab
            });

            // Add active styling to the clicked tab
            event.target.classList.add('active');

            const tabName = event.target.textContent;
            console.log(`Navigated to: ${tabName} (simulated).`);
            // In a real app, this would load content for the selected tab
        });
    });
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Get references to elements
    const taskNameInput = document.getElementById('task-name');
    const selectEmployeeInput = document.getElementById('select-employee');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const assignTaskButton = document.getElementById('assign-task-button');
    const assignedTasksTableBody = document.getElementById('assigned-tasks-table-body');
    const taskContextMenu = document.getElementById('task-context-menu');
    const editTaskButton = document.getElementById('edit-task-button');
    const deleteTaskButton = document.getElementById('delete-task-button');

    // Edit Task Modal elements
    const editTaskModal = document.getElementById('edit-task-modal');
    const closeEditTaskModalButton = document.getElementById('close-edit-task-modal-button');
    const editTaskNameInput = document.getElementById('edit-task-name');
    const editSelectEmployeeInput = document.getElementById('edit-select-employee');
    const editStartDateInput = document.getElementById('edit-start-date');
    const editEndDateInput = document.getElementById('edit-end-date');
    const saveTaskChangesButton = document.getElementById('save-task-changes-button');

    let currentContextMenuButton = null; // To keep track of which button opened the menu
    let currentRowToEdit = null; // To keep track of the table row being edited

    // Function to hide the context menu
    function hideContextMenu() {
        taskContextMenu.classList.remove('show');
        currentContextMenuButton = null;
        console.log('Context menu hidden.'); // Log for debugging
    }

    // Functionality for "Assign Task" button
    assignTaskButton.addEventListener('click', () => {
        const taskName = taskNameInput.value;
        const assignedEmployee = selectEmployeeInput.value;
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        if (taskName && assignedEmployee && startDate && endDate) {
            console.log('New Task Data:', { taskName, assignedEmployee, startDate, endDate });

            // Simulate adding a new row to the table
            const newRow = document.createElement('tr');
            newRow.classList.add('table-row'); // Add the new table-row class
            newRow.innerHTML = `
                <td class="table-data">${taskName}</td>
                <td class="table-data">${assignedEmployee}</td>
                <td class="table-data">${startDate}</td>
                <td class="table-data">${endDate}</td>
                <td class="table-data action-cell">
                    <button class="three-dots-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="three-dots-icon">
                            <path fill-rule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </td>
            `;
            assignedTasksTableBody.appendChild(newRow);

            alert('Task assigned successfully (simulated)!');
            // Clear form fields
            taskNameInput.value = '';
            selectEmployeeInput.value = '';
            startDateInput.value = '';
            endDateInput.value = '';
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Event delegation for "three dots" buttons in the tasks table
    assignedTasksTableBody.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('.three-dots-button');
        if (clickedButton) {
            event.stopPropagation(); // Stop propagation to prevent document click from hiding immediately
            console.log('Three dots button clicked.'); // Log for debugging

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
            // Using rect.top and rect.right directly for fixed positioning relative to viewport
            taskContextMenu.style.top = `${rect.top}px`;
            taskContextMenu.style.left = `${rect.right + 5}px`; // 5px to the right of the button

            // Adjust if menu goes off screen to the right
            const menuWidth = taskContextMenu.offsetWidth;
            const viewportWidth = window.innerWidth;
            if (rect.right + menuWidth + 5 > viewportWidth) {
                // If not enough space on the right, open to the left
                taskContextMenu.style.left = `${rect.left - menuWidth - 5}px`;
            }

            taskContextMenu.classList.add('show');
            console.log('Context menu shown at:', taskContextMenu.style.top, taskContextMenu.style.left); // Log for debugging
        }
    });

    // Hide context menu when clicking anywhere else on the document, unless it's the context menu itself
    document.addEventListener('click', (event) => {
        if (!taskContextMenu.contains(event.target) && !event.target.closest('.three-dots-button')) {
            hideContextMenu();
        }
    });

    // Functionality for "Edit Task" button in context menu
    editTaskButton.addEventListener('click', () => {
        if (currentRowToEdit) {
            // Populate the edit modal with current row data
            editTaskNameInput.value = currentRowToEdit.children[0].textContent;
            editSelectEmployeeInput.value = currentRowToEdit.children[1].textContent;
            editStartDateInput.value = currentRowToEdit.children[2].textContent;
            editEndDateInput.value = currentRowToEdit.children[3].textContent;

            editTaskModal.classList.add('show'); // Show the edit modal
            hideContextMenu(); // Hide the context menu
        }
    });

    // Functionality for "Save Changes" button in Edit Task Modal
    saveTaskChangesButton.addEventListener('click', () => {
        if (currentRowToEdit) {
            const updatedTaskName = editTaskNameInput.value;
            const updatedAssignedEmployee = editSelectEmployeeInput.value;
            const updatedStartDate = editStartDateInput.value;
            const updatedEndDate = editEndDateInput.value;

            if (updatedTaskName && updatedAssignedEmployee && updatedStartDate && updatedEndDate) {
                // Update the table row
                currentRowToEdit.children[0].textContent = updatedTaskName;
                currentRowToEdit.children[1].textContent = updatedAssignedEmployee;
                currentRowToEdit.children[2].textContent = updatedStartDate;
                currentRowToEdit.children[3].textContent = updatedEndDate;

                alert('Task updated successfully (simulated)!');
                console.log('Task updated:', { updatedTaskName, updatedAssignedEmployee, updatedStartDate, updatedEndDate });
                editTaskModal.classList.remove('show'); // Hide the modal
                currentRowToEdit = null; // Clear the reference
            } else {
                alert('Please fill in all fields for the edited task.');
            }
        }
    });

    // Functionality for close button in Edit Task Modal
    closeEditTaskModalButton.addEventListener('click', () => {
        editTaskModal.classList.remove('show');
        currentRowToEdit = null; // Clear the reference if modal is closed without saving
    });


    // Functionality for "Delete Task" button in context menu
    deleteTaskButton.addEventListener('click', () => {
        if (currentRowToEdit) {
            const taskName = currentRowToEdit.children[0].textContent;
            if (confirm(`Are you sure you want to delete task: ${taskName}?`)) {
                currentRowToEdit.remove(); // Remove the row from the table
                console.log(`Deleted Task: ${taskName} (simulated)`);
            }
            hideContextMenu(); // Hide context menu whether deleted or not
            currentRowToEdit = null; // Clear the reference
        }
    });

    // Functionality for navigation tabs (placeholder)
    document.querySelectorAll('nav button').forEach(navButton => {
        navButton.addEventListener('click', (event) => {
            // Remove active styling from all tabs
            document.querySelectorAll('nav button').forEach(btn => {
                btn.classList.remove('active'); // Remove 'active' class
            });

            // Add active styling to the clicked tab
            event.target.classList.add('active'); // Add 'active' class

            const tabName = event.target.textContent;
            console.log(`Navigated to: ${tabName} (simulated).`);
            // In a real app, this would load content for the selected tab
        });
    });
});

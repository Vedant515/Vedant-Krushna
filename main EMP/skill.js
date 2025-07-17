// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Get references to elements
    const addSkillButton = document.getElementById('add-skill-button');
    const editSkillsButton = document.getElementById('edit-skills-button'); // Corrected ID to match HTML
    const skillManagementBox = document.getElementById('skill-management-box');
    const skillsTableContainer = document.querySelector('.skills-table-container');
    const skillTableBody = document.querySelector('.data-table tbody'); // Corrected selector for tbody
    const skillContextMenu = document.getElementById('skill-context-menu');
    const editSelectedSkillButton = document.getElementById('edit-selected-skill-button');
    const deleteSelectedSkillButton = document.getElementById('delete-selected-skill-button');

    // Modal elements
    const addSkillModal = document.getElementById('add-skill-modal');
    const closeSkillModalButton = document.getElementById('close-skill-modal-button');
    const submitSkillButton = document.getElementById('submit-skill-button');
    const skillNameInput = document.getElementById('skill-name-input');
    const skillDescriptionInput = document.getElementById('skill-description-input');

    let isEditingMode = false;

    // Function to toggle editing mode
    function toggleEditingMode() {
        isEditingMode = !isEditingMode;
        skillsTableContainer.classList.toggle('editing', isEditingMode);
        editSkillsButton.classList.toggle('active-mode', isEditingMode); // Toggle active-mode class

        if (isEditingMode) {
            editSkillsButton.textContent = 'Done';
            // Context menu will be shown/hidden based on checkbox selection
        } else {
            editSkillsButton.textContent = 'Edit';
            hideContextMenu(); // Hide context menu when exiting edit mode
            // Uncheck all checkboxes when exiting edit mode
            document.querySelectorAll('.skill-checkbox').forEach(checkbox => {
                checkbox.checked = false;
            });
        }
    }

    // Function to show the context menu, positioned relative to the skill management box
    function showContextMenu() {
        const rect = skillManagementBox.getBoundingClientRect();
        // Position the context menu to the right of the skill management box
        // Using rect.top and rect.right directly for fixed positioning relative to viewport
        skillContextMenu.style.top = `${rect.top}px`;
        skillContextMenu.style.left = `${rect.right + 20}px`; // 20px to the right of the box

        // Adjust if menu goes off screen to the right
        const menuWidth = skillContextMenu.offsetWidth;
        const viewportWidth = window.innerWidth;
        if (rect.right + menuWidth + 20 > viewportWidth) { // Added 20 for margin
            // If not enough space on the right, open to the left
            skillContextMenu.style.left = `${rect.left - menuWidth - 20}px`; // 20px to the left
        }

        skillContextMenu.classList.add('show');
    }

    // Function to hide the context menu
    function hideContextMenu() {
        skillContextMenu.classList.remove('show');
    }

    // Event listener for the main "Edit" button
    editSkillsButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent document click from immediately hiding menu
        toggleEditingMode();
        // If entering edit mode and no checkboxes are checked, ensure menu is hidden
        if (isEditingMode && getSelectedSkillRows().length === 0) {
            hideContextMenu();
        }
    });

    // Event listener for "Add Skill" button to open the modal
    addSkillButton.addEventListener('click', () => {
        addSkillModal.classList.add('show');
    });

    // Event listener for close button to hide the modal
    closeSkillModalButton.addEventListener('click', () => {
        addSkillModal.classList.remove('show');
    });

    // Event listener for submitting new skill (placeholder)
    submitSkillButton.addEventListener('click', () => {
        const name = skillNameInput.value;
        const description = skillDescriptionInput.value;

        if (name && description) {
            console.log('New Skill Data:', { name, description });

            // Simulate adding a new row to the table
            const newRow = document.createElement('tr');
            newRow.classList.add('table-row'); // Add class for styling
            newRow.innerHTML = `
                <td class="table-data checkbox-cell">
                    <input type="checkbox" class="skill-checkbox">
                </td>
                <td class="table-data">${name}</td>
                <td class="table-data">${description}</td>
            `;
            skillTableBody.appendChild(newRow); // Append to the table body

            alert('Skill added successfully (simulated)!');
            addSkillModal.classList.remove('show'); // Close modal after submission
            // Clear form fields
            skillNameInput.value = '';
            skillDescriptionInput.value = '';
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Function to get selected skill rows
    function getSelectedSkillRows() {
        return Array.from(skillTableBody.querySelectorAll('.skill-checkbox:checked')).map(checkbox => checkbox.closest('tr'));
    }

    // Event listener for checkbox changes (using event delegation)
    skillTableBody.addEventListener('change', (event) => {
        if (event.target.classList.contains('skill-checkbox')) {
            const selectedCount = getSelectedSkillRows().length;
            if (isEditingMode) { // Only show/hide menu if in editing mode
                if (selectedCount > 0) {
                    showContextMenu();
                } else {
                    hideContextMenu();
                }
            }
        }
    });


    // Functionality for "Edit Selected" button in context menu
    editSelectedSkillButton.addEventListener('click', () => {
        const selectedRows = getSelectedSkillRows();
        if (selectedRows.length === 1) {
            const skillName = selectedRows[0].children[1].textContent;
            const skillDescription = selectedRows[0].children[2].textContent;
            alert(`Editing skill: ${skillName} - ${skillDescription} (Functionality to open an edit modal/form would go here)`);
            console.log('Editing selected skill:', { name: skillName, description: skillDescription });
        } else if (selectedRows.length > 1) {
            alert('Please select only one skill to edit.');
        } else {
            alert('Please select a skill to edit.');
        }
        hideContextMenu();
    });

    // Functionality for "Delete Selected" button in context menu
    deleteSelectedSkillButton.addEventListener('click', () => {
        const selectedRows = getSelectedSkillRows();
        if (selectedRows.length > 0) {
            if (confirm(`Are you sure you want to delete ${selectedRows.length} selected skill(s)?`)) {
                selectedRows.forEach(row => {
                    const skillName = row.children[1].textContent;
                    row.remove();
                    console.log(`Deleted skill: ${skillName}`);
                });
                alert(`${selectedRows.length} skill(s) deleted successfully (simulated)!`);
            }
        } else {
            alert('Please select at least one skill to delete.');
        }
        hideContextMenu();
    });

    // Hide context menu when clicking anywhere else on the document, unless it's the edit button itself or the context menu
    document.addEventListener('click', (event) => {
        if (!skillContextMenu.contains(event.target) && !editSkillsButton.contains(event.target)) {
            hideContextMenu();
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

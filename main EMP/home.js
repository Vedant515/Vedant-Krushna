// script.js
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');

    // Handle logout button click
    logoutButton.addEventListener('click', () => {
        console.log('Admin logged out (simulated).');
        // In a real application, you would redirect to a login page or clear session
        // window.location.href = '/admin-login'; // Example redirection
    });

    // Add functionality to card buttons (e.g., redirect to specific admin pages)
    document.querySelectorAll('.cards-section .card-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const cardTitle = event.target.closest('.card').querySelector('.card-title').textContent;
            console.log(`Navigating to ${cardTitle} management (simulated).`);
            // Example: Redirect based on card title
            // if (cardTitle === 'Employee') {
            //     window.location.href = '/admin/employees';
            // } else if (cardTitle === 'Skills') {
            //     window.location.href = '/admin/skills';
            // } else if (cardTitle === 'Task Assignment') {
            //     window.location.href = '/admin/tasks';
            // }
        });
    });
});

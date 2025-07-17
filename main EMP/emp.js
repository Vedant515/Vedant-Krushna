// script.js
document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.getElementById('skills-section');
    const editSkillsButton = document.getElementById('edit-skills-button');
    const logoutButton = document.getElementById('logout-button');

    let isEditingSkills = false;

    // Function to render stars based on a given rating
    function renderStars(skillElement, rating) {
        const skillStarsContainer = skillElement.querySelector('.skill-stars');
        skillStarsContainer.innerHTML = ''; // Clear existing stars

        for (let i = 1; i <= 5; i++) {
            const starSpan = document.createElement('span');
            starSpan.classList.add('star-icon');
            starSpan.dataset.value = i; // Store the star's value (1 to 5)

            const starSvg = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007Z" clip-rule="evenodd" />
                </svg>
            `;
            starSpan.innerHTML = starSvg;

            if (i <= rating) {
                starSpan.classList.add('star-filled');
                starSpan.classList.remove('star-empty');
            } else {
                starSpan.classList.add('star-empty');
                starSpan.classList.remove('star-filled');
            }

            skillStarsContainer.appendChild(starSpan);
        }
    }

    // Initialize all skill ratings on load
    document.querySelectorAll('#skill-list > div').forEach(skillElement => {
        const initialRating = parseInt(skillElement.dataset.rating);
        renderStars(skillElement, initialRating);
    });

    // Handle "Edit" button click for skills
    editSkillsButton.addEventListener('click', () => {
        isEditingSkills = !isEditingSkills; // Toggle editing mode
        skillsSection.classList.toggle('editing', isEditingSkills); // Add/remove editing class

        if (isEditingSkills) {
            editSkillsButton.textContent = 'Save';
            // Classes for styling the button in 'Save' mode are now handled by CSS
        } else {
            editSkillsButton.textContent = 'Edit';
            // Classes for styling the button in 'Edit' mode are now handled by CSS
            // In a real application, you would save the updated ratings here
            console.log('Skill ratings saved (simulated).');
        }
    });

    // Handle star clicks for rating
    skillsSection.addEventListener('click', (event) => {
        if (!isEditingSkills) return; // Only allow rating changes in editing mode

        const clickedStar = event.target.closest('.star-icon');
        if (clickedStar) {
            const skillElement = clickedStar.closest('.skill-item'); // Use the new class name
            const newRating = parseInt(clickedStar.dataset.value);

            if (skillElement) {
                // Update the data-rating attribute
                skillElement.dataset.rating = newRating;
                // Re-render stars for the specific skill
                renderStars(skillElement, newRating);
                console.log(`Updated ${skillElement.dataset.skill} rating to: ${newRating}`);
            }
        }
    });

    // Handle logout button click
    logoutButton.addEventListener('click', () => {
        console.log('User logged out (simulated).');
        // In a real application, you would redirect to a login page or clear session
        // window.location.href = '/login'; // Example redirection
    });
});

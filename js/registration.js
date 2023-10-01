document.addEventListener('DOMContentLoaded', function() {
    const userIsLoggedIn = checkUserLoggedIn();
    if (userIsLoggedIn) {
        // Redirect to dashboard.html if user is logged in
        window.location.href = "/dashboard.html";
      } else {
        // If user is not logged in, no action is taken, so the user stays on the current page
      }


    const registrationForm = document.getElementById('registrationForm');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Extract user input
        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        // Validate inputs
        if (!isValidEmail(email) || !isValidUsername(username) || password.length < 8) {
            alert('Please check your inputs and ensure they meet the requirements.');
            return;
        }

        // Create a user object to send to the API
        const user = {
            name: username,
            email: email,
            password: password
        };

        // Make a POST request to the API to register the user
        try {
            const response = await fetch('https://api.noroff.dev/api/v1/auction/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            // Log the response details for debugging
            console.log('Response Status:', response.status);

            if (response.ok) {
                alert('Registration successful! You can now log in.');
            } else {
                const data = await response.json();
                console.log('Response Data:', data); // Log the response data
                alert(`Registration failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering the user.');
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@(stud\.)?noroff\.no$/;
        return emailRegex.test(email);
    }

    function isValidUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        return usernameRegex.test(username);
    }

        // Function to check if the user is logged in (example)
        function checkUserLoggedIn() {
            // You check for the presence of a valid token.
            return localStorage.getItem('accessToken'); // Return true if logged in, false if not logged in
        }
});


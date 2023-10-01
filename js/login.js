document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Extract user input
        const email = emailInput.value;
        const password = passwordInput.value;

        // Create a user object for login
        const user = {
            email: email,
            password: password
        };

        // Make a POST request to the API to log in the user
        try {
            const response = await fetch('https://api.noroff.dev/api/v1/auction/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {

                const data = await response.json();
                localStorage.setItem('email',data.email);
                localStorage.setItem('name',data.name);
                localStorage.setItem('accessToken',data.accessToken);
                localStorage.setItem('avatar',data.avatar);
                localStorage.setItem('credits',data.credits);
                alert('Login successful!');
                window.location.href = '/dashboard.html';
                // Redirect to a user dashboard or perform other actions.
            } else {
                const data = await response.json();
                alert(`Login failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error logging in user:', error);
            alert('An error occurred while logging in.');
        }
    });
});

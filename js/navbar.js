document.addEventListener('DOMContentLoaded', function() {
    const loginNav = document.getElementById('loginNav');
    const registerNav = document.getElementById('registerNav');
    const dashboardNav = document.getElementById('dashboardNav');
    const logoutNav = document.getElementById('logoutNav');

    // Check if the user is logged in (for example, by checking the presence of a valid token)
    const userIsLoggedIn = checkUserLoggedIn(); 

    // Display or hide navigation options based on the user's login status
    if (userIsLoggedIn) {
        dashboardNav.style.display = 'block'; // Show Dashboard
        logoutNav.style.display = 'block'; // Show Logout
        loginNav.style.display = 'none'; // Hide Login
        registerNav.style.display = 'none'; // Hide Register
    } else {
        loginNav.style.display = 'block'; // Show Login
        registerNav.style.display = 'block'; // Show Register
        dashboardNav.style.display = 'none'; // Hide Dashboard
        logoutNav.style.display = 'none'; // Hide Logout
        createNav.style.display = 'none'; // Hide Logout
    }

    // Function to check if the user is logged in 
    function checkUserLoggedIn() {
        // You check for the presence of a valid token.
        return localStorage.getItem('accessToken'); // Return true if logged in, false if not logged in
    }
});

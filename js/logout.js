document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutNav');

    // Add a click event listener to the logout button
    logoutButton.addEventListener('click', function() {
        console.log('clicking logout');
        // Perform the logout action here
        // Logout by clearing a user's token.
        clearAccessToken();
    });

    // Function to clear the user's token (a logout)
    function clearAccessToken() {
        localStorage.clear();
        alert('Logout successful!');
        window.location.href = '/login.html';
        //Redirect the user to a login page.
    }
});

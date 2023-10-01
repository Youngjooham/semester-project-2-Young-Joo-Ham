// Check if the user is logged in (for example, by checking the presence of a valid token)
const userIsLoggedIn = checkUserLoggedIn(); 
//Validations
if(userIsLoggedIn){

}else{
    window.location.href = "/login.html";
}

 // Function to check if the user is logged in (example)
 function checkUserLoggedIn() {
    //Check for the presence of a valid token.
    return localStorage.getItem('accessToken'); // Return true if logged in, false if not logged in
}


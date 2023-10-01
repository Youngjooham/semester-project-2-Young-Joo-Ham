document.addEventListener('DOMContentLoaded', function() {
    const accessToken = localStorage.getItem('accessToken');
    const myName = localStorage.getItem('name');
    const myEmail = localStorage.getItem('email');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const includeSeller = true; // Change to false if you don't want to include seller data
    const includeBids = accessToken ? true : false;

    // Construct the endpoint URL with query parameters
    const endpoint = `https://api.noroff.dev/api/v1/auction/listings/${id}?_seller=${includeSeller}&_bids=${includeBids}`;


    fetch(endpoint)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data here
        console.log(data);

         // Populate the HTML elements with the response data
         document.getElementById('title').textContent = data.title;
         document.getElementById('media').src = data.media;
         document.getElementById('description').textContent = data.description;

         document.getElementById('id').textContent = data.id;
         document.getElementById('created').textContent = data.created;
         document.getElementById('updated').textContent = data.updated;
         document.getElementById('endsAt').textContent = data.endsAt;

         document.getElementById('sellerName').textContent = data.seller.name;
         document.getElementById('sellerEmail').textContent = data.seller.email;
         document.getElementById('sellerAvatar').src = data.seller.avatar;

         const bidsList = document.getElementById('bidsList');
         data.bids.forEach(bid => {
           const li = document.createElement('li');
           li.innerHTML = `<strong>Bidder Name:</strong> ${bid.bidderName}, <strong>Amount:</strong> ${bid.amount}, <strong>Created:</strong> ${bid.created}`;
           bidsList.appendChild(li);
         });

        // You can perform further actions with the data as needed
        renderRules();
    })
    .catch(error => {
        console.error('Error:', error);
    });


    // Handle the form submission
    const bidForm = document.getElementById('bidForm');
    bidForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the bid amount from the form input
        const bidAmount = parseInt(document.getElementById('bidAmount').value);

        // Make a POST request to create the bid
        fetch(`https://api.noroff.dev/api/v1/auction/listings/${id}/bids`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify({ amount: bidAmount }), // Convert the bid amount to JSON
        })
       .then(response => {
            if (!response.ok) {
                // Handle the error response
                response.json().then(errorResponse => {
                    if (errorResponse.errors && errorResponse.errors.length > 0) {
                        const errorMessage = errorResponse.errors[0].message;
                        // Display the error message to the user using an alert or other UI element
                        alert(errorMessage); // Display the error message in an alert
                        // You can also display the error message on the page or in a modal dialog
                    }
                });
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data as needed
            console.log('Bid created:', data);
            // You can update the UI to show a success message or update bid-related information.
            refreshProfile();
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors, such as displaying an error message to the user.
        });
    });


    /**HIDE/SHOW DEPENDENT ON LOGGED IN OR NOT */
    // Get the bids container element by its ID
    const bidsContainer = document.getElementById('bidsContainer');
    // Check the value of bid and set the display property accordingly
    if (includeBids) {
        bidsContainer.style.display = 'block'; // Show the bids section
    } else {
        bidsContainer.style.display = 'none'; // Hide the bids section
    }


   function renderRules() {
    /**CHECK FOR ENDED LISTING */
    // Get the element that contains the ending date
    const endsAtElement = document.getElementById('endsAt');

    // Parse the ending date string into a Date object
    const endsAtDate = new Date(endsAtElement.textContent);

    // Get the current date and time
    const currentDate = new Date();

    // Compare the ending date with the current date
    if (endsAtDate <= currentDate) {
        // The ending date has passed; hide the bidding form
        const bidForm = document.getElementById('bidForm');
        bidForm.style.display = 'none';
    }

    // Get seller elements
    const sellerName = document.getElementById('sellerName').textContent;
    const sellerEmail = document.getElementById('sellerEmail').textContent;
    if((sellerName == myName) && (sellerEmail == myEmail)) {
        const bidForm = document.getElementById('bidForm');
        bidForm.style.display = 'none';
    }
   }

   function refreshProfile() {
     // Make a GET request to fetch the user's profile data
     fetch(`https://api.noroff.dev/api/v1/auction/profiles/${myName}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
     })
     .then(response => {
         if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
         }
         return response.json();
     })
     .then(data => {
         // Handle the retrieved profile data as needed
         localStorage.setItem('credits',data.credits);
         console.log('Profile data:', data);
         window.location.reload();
     })
     .catch(error => {
         console.error('Error:', error);
         // Handle errors, such as displaying an error message to the user.
     });
    }


});
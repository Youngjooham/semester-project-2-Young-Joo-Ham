document.addEventListener("DOMContentLoaded", function () {
    const listingForm = document.getElementById("listingForm");
    const messageDiv = document.getElementById("message");
    const displayTitle = document.getElementById("displayTitle");
    const displayDescription = document.getElementById("displayDescription");
    const displayTags = document.getElementById("displayTags");
    const displayMedia = document.getElementById("displayMedia");
    const displayEndsAt = document.getElementById("displayEndsAt");

    listingForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Gather form data
        const title = document.getElementById("title").value;
        const endsAt = document.getElementById("endsAt").value;
        const description = document.getElementById("description").value;
        const mediaURL = [];
        mediaURL.push(document.getElementById("media").value);

        // Prepare data for API request
        const accessToken = localStorage.getItem('accessToken');
        const requestData = {
            title: title,
            endsAt: endsAt, // Example date and time
            description: description,
            media: mediaURL
        };

        try {
            const response = await fetch('https://api.noroff.dev/api/v1/auction/listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                const data = await response.json();
                // Display listing details on success
                displayTitle.textContent = data.title;
                displayDescription.textContent = data.description;
                displayTags.textContent = data.tags; 
                // Display the image using an <img> element
                displayMedia.innerHTML = `<img src="${mediaURL}" alt="Listing Image" style="max-width: 100%;">`;
                displayEndsAt.textContent = data.endsAt;
                // Display a success message
                messageDiv.innerHTML = `Listing created successfully. Listing ID: ${data.id}`;
            } else {
                const data = await response.json();
                // Display an error message in the HTML
                messageDiv.innerHTML = `Listing creation failed: ${data.message}`;
            }
        } catch (error) {
            console.error('Error creating listing:', error);
            // Display an error message in the HTML
            messageDiv.innerHTML = 'An error occurred while creating the listing.';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const listingsList = document.getElementById('listingsList');

    // Fetch and display the user's listings
    fetchUserListings()
        .then(listings => {
            listings.forEach(listing => {
                const item = document.createElement('a');
                item.href = `/listing.html?id=${listing.id}`;

                const listItem = document.createElement('li');

                // Create an image element and set its src attribute
                const imageElement = document.createElement('img');
                imageElement.src = listing.media[0]; 
                imageElement.alt = listing.title; 

                imageElement.style.maxWidth = '100%'; 
                imageElement.style.height = 'auto'; 

                // Create elements for title, endsAt, and description
                const titleElement = document.createElement('h3');
                titleElement.textContent = listing.title;

                const endsAtElement = document.createElement('p');
                endsAtElement.textContent = `endsAt: ${listing.endsAt}`;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = listing.description;

                 // Append the elements to the list item
                item.appendChild(imageElement);
                item.appendChild(titleElement);
                item.appendChild(descriptionElement);
                item.appendChild(endsAtElement);


                // Append the list item to the listingsList
                listingsList.appendChild(item);
            });
            renderListings(listings, '');

            // Listen for changes in the search input field
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', () => {
                const searchQuery = searchInput.value.trim();
                renderListings(listings, searchQuery);
            });
        })
        .catch(error => {
            console.error('Error fetching listings:', error);
            const errorItem = document.createElement('li');
            errorItem.textContent = 'An error occurred while fetching listings.';
            listingsList.appendChild(errorItem);
        });

    async function fetchUserListings() {
        try {
            // Make a GET request to retrieve the user's listings
            const response = await fetch('https://api.noroff.dev/api/v1/auction/listings', {
                method: 'GET',
                headers: {
                    
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(`Failed to fetch listings: ${response.statusText}`);
            }
        } catch (error) {
            throw error;
        }
    }

    function renderListings(listings, searchQuery) {
        const listingsList = document.getElementById('listingsList');
        listingsList.innerHTML = ''; 
    
        // Filter the listings based on the search query
        const filteredListings = listings.filter(listing =>
            listing.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
        if (filteredListings.length === 0) {
            const noResultsElement = document.createElement('p');
            noResultsElement.textContent = 'No matching listings found.';
            listingsList.appendChild(noResultsElement);
            return;
        }
    
        filteredListings.forEach(listing => {
            const item = document.createElement('a');
            item.href = `/listing.html?id=${listing.id}`;
    
            // Create a list item element for the listing
            const listItem = document.createElement('li');
    
            // Create an image element and set its src attribute
            const imageElement = document.createElement('img');
            imageElement.src = listing.media[0]; 
            imageElement.alt = listing.title;
    
            imageElement.style.maxWidth = '100%';
            imageElement.style.height = 'auto';
    
            // Create elements for title, endsAt, and description
            const titleElement = document.createElement('h3');
            titleElement.textContent = listing.title;
    
            const endsAtElement = document.createElement('p');
            const endsAt = new Date(listing.endsAt); 
            const formattedDate = `${endsAt.toLocaleDateString()} ${endsAt.toLocaleTimeString()}`; // Format the date
            endsAtElement.textContent = `End Date: ${formattedDate}`;

    
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = listing.description;
    
            // Append the elements to the list item
            item.appendChild(imageElement);
            item.appendChild(titleElement);
            item.appendChild(descriptionElement);
            item.appendChild(endsAtElement);
    
            // Append the list item to the listingsList
            listingsList.appendChild(item);
        });
    }
});

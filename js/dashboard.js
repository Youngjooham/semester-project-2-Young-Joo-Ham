document.addEventListener('DOMContentLoaded', function() {

    /**LOAD USERDATA */
    const accessToken = localStorage.getItem('accessToken');
    const avatarImage = document.getElementById('avatarImage');
    const avatarURL = localStorage.getItem('avatar');
    const credits = localStorage.getItem('credits');
    const creditsElement = document.getElementById('credits');
    creditsElement.innerHTML =  `Credits: ${credits} `;

    // Check if the avatar URL exists in local storage
    if (avatarURL) {
        console.log(avatarURL);
        // Set the src attribute of the avatar image element
        avatarImage.src = avatarURL;
    }


    // Get the user's name from local storage
    const username = localStorage.getItem('name');

    // URL for the PUT request
    const putUrl = `https://api.noroff.dev/api/v1/auction/profiles/${username}/media`;



    avatarContainer.addEventListener("click", function(event) {
        // Check if the clicked element is an image element
        if (event.target.tagName === "IMG") {
          // Get the ID of the clicked image
          const src = event.target.src;
          uploadAvatar(src);
        }
      });

    function uploadAvatar(avatarURL) {
        // Request body
        const requestBody = {
        avatar: avatarURL // 
        };

        // Trigger the avatarForm submission when the button is clicked
        updateProfileMedia(putUrl, requestBody)
        .then(response => {
            console.log('Profile media updated successfully:', response);
            localStorage.setItem('avatar',avatarURL);
            avatarImage.src = avatarURL;
            modal.style.display = "none";
        })
        .catch(error => {
            console.error('Error updating profile media:', error);
        });
    }


    async function updateProfileMedia(url, body) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(`Failed to update profile media: ${response.statusText}`);
            }
        } catch (error) {
            throw error;
        }
    }


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("updateAvatarButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

});






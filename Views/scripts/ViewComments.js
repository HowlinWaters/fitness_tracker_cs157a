// JavaScript to load username in header
if (sessionStorage.getItem("GlobalViewProfileName")) {
    // Get profile name from sessionStorage
    var profileName = sessionStorage.getItem("GlobalViewProfileName");

    // Then update the header
    document.getElementById("header").innerText = profileName + "\'s Profile";

    // Log name and id in console
    var profileID = sessionStorage.getItem("GlobalViewProfileID");

    console.log(profileName);
    console.log(profileID);
}

const addButton = document.querySelector('#addCommentButton');

// JavaScript to handle adding entries to the table
addButton.onclick = function (data) {
    var comment = prompt('Comment:');
    var username = "placeholder_username"
    
    if (comment) {
        var tableBody = document.getElementById('commentsTableBody');
        var newRow = document.createElement('tr');

        newRow.innerHTML = '<td>' + username + '</td><td>' + comment + '</td>';
        tableBody.appendChild(newRow);
    } else {
        alert('Please enter valid values for all fields.');
    }
};

// Function to go back to ViewProfile
function goBack() {
    sessionStorage.removeItem("GlobalViewProfileID");
    sessionStorage.removeItem("GlobalViewProfileName");
    window.parent.postMessage('ViewProfile.html', '*');
}

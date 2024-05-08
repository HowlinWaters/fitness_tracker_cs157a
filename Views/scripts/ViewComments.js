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

// Function to go back to ViewProfile
function goBack() {
    sessionStorage.removeItem("GlobalViewProfileID");
    sessionStorage.removeItem("GlobalViewProfileName");
    window.parent.postMessage('ViewProfile.html', '*');
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// Fetch the database from SQL server.
document.addEventListener("DOMContentLoaded", () => {
  // First, fetch a request to get one user based on their user ID (globalized).
  fetch("http://localhost:8080/profile/"+sessionStorage.getItem("GlobalViewProfileID"), {
    headers: {
      "Content-Type": "application/json",
    },
  })
    // User's data is returned in JSON format.
    .then(function (profileRes) {
      if (!profileRes.ok) {
        throw new Error("Failed to fetch profile");
      }
      return profileRes.json();
    })
    .then(function (profileData) {
      // Next, fetch a request to get the TracksActivities table with the fetched user ID from before.
      return fetch(`http://localhost:8080/commentwprofile/${profileData.ProfileID}`);
    })
    // A table of the fetched user's activities data is returned in JSON format.
    .then(function (commentsRes) {
      if (!commentsRes.ok) {
        throw new Error("Failed to fetch profiles");
      }
      return commentsRes.json();
    })
    // Since activities data is in an array, each activity must be isolated from the array using the map() function to iterate through the activities.
    // Then, each activity ID sends a fetch request to receive each
    .then(function (commentsData) {
      // This requires iteration with map() to go through all the data.
      const commentIDs = commentsData.map((comment) => comment.CommentID);
      const commentFetchPromises = commentIDs.map((commentID) =>
        fetch(`http://localhost:8080/comment/${commentID}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
      );

      // Promise.all() ensures that all the iterated fetched activities are returned as a single Promise.
      // Having multiple Promises returned may cause errors to the fetch chain (though I'm not exactly sure what errors would arise).
      return Promise.all(commentFetchPromises);
    })
    // Another iteration/map is required to convert all the activities in the table to JSON format.
    .then(function (commentResponses) {
      const commentJSONPromises = commentResponses.map((response) =>
        response.json()
      );

      // The activities in JSON format all get returned as a single Promise.
      return Promise.all(commentJSONPromises);
    })
    .then(function (commentJSONs) {
      console.log(commentJSONs);
      // Function loadTable() is called to start loading the table from the database.
      loadTable(commentJSONs);
    })
    // Any errors in the fetch chain are caught below.
    .catch(function (error) {
      console.error("Error:", error);
    });
});

 // Load the database table into HTML file.
 function loadTable(data) {
  console.log("Loading table from database...");
  console.log(data);

  // Variable table will hold the table loaded from the database.
  let table = document.querySelector("table tbody");

  // Variable tableHTML will load the HTML contents to table.innerHTML.
  let tableHTML = "";

  // Each row of the database table is outputted through the iteration below [forEach()].
  data.forEach(function ({
    UserID,
    Content,
    PublishDate,
  }) {
    tableHTML += "<tr>";
    tableHTML += `<td id="name-col">${UserID}</td>`;
    tableHTML += `<td id="content-col">${Content}</td>`;
    tableHTML += `<td id="date-col">${PublishDate}</td>`;
    tableHTML += "</tr>";
  });

  table.innerHTML = tableHTML;
}

const addButton = document.querySelector("#addCommentButton");

// JavaScript to handle adding entries to the table
addButton.onclick = () => {
  const profileID = sessionStorage.getItem("GlobalViewProfileID");
  var comment = prompt("Enter comment:");
  const userID = sessionStorage.getItem("GlobalUserID");
  const currentDate = new Date();
  // Format the date as required by MySQL (YYYY-MM-DD format)
  const formattedDate = currentDate.toISOString().slice(0, 10);

  if (comment) {
    fetch("http://localhost:8080/createcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({
        ProfileID: profileID,
        Content: comment,
        UserID: userID,
        PublishDate: formattedDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    location.reload();
  } else {
    alert("Please enter valid values for all fields.");
  }
};
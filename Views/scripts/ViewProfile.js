//Fetch the database from SQL server.
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8080/allprofiles", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      // All profile data is returned in JSON format.
      .then(function (profilesRes) {
        if (!profilesRes.ok) {
          throw new Error("Failed to fetch profiles");
        }
        return profilesRes.json();
      })
      .then(function (profilesData) {
        // Next, fetch a request to get all profiles
        const profilesIDs = profilesData.map((profile => profile.ProfileID));
        const profilesFetchPromises = profilesIDs.map((profileID) =>
            fetch(`http://localhost:8080/profile/${profileID}`, {
              headers: {
                "Content-Type": "application/json",
              },
            })
          );
          return Promise.all(profilesFetchPromises);
      })

      // Another iteration/map is required to convert all the profiles in the table to JSON format.
      .then(function (profileResponses) {
        const profileJSONPromises = profileResponses.map((response) =>
          response.json()
        );
  
        // The activities in JSON format all get returned as a single Promise.
        return Promise.all(profileJSONPromises);
      })
      .then(function (profileJSONs) {
        console.log(profileJSONs);
        // Function loadTable() is called to start loading the table from the database.
        loadTable(profileJSONs);
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
      ProfileID,
      ProfileName,
    }) {
      tableHTML += "<tr>";
      tableHTML += `<td id="name-col">${ProfileName}</td>`;
      tableHTML += `<td><button class="view-btn" data-id=${ProfileID} data-name=${ProfileName}>View</td>`;
      tableHTML += "</tr>";
    });
  
    table.innerHTML = tableHTML;
  }

  document
  .querySelector("table tbody")
  .addEventListener("click", function (event) {
    if (event.target.className === "view-btn") {
      var rowID = event.target.getAttribute("data-id");
      var rowName = event.target.getAttribute("data-name");
      // Get profile id
      GlobalViewProfileID = rowID;
      sessionStorage.setItem("GlobalViewProfileID", GlobalViewProfileID);
      // Get profile name
      GlobalViewProfileName = rowName;
      sessionStorage.setItem("GlobalViewProfileName", GlobalViewProfileName);
      loadComments();
    }
  });

  // Function to load ViewComments
function loadComments() {
    window.parent.postMessage('ViewComments.html', '*');
}



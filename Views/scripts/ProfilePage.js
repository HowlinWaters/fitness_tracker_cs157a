document.addEventListener("DOMContentLoaded", function (id) {
    // First, fetch a request to get user based on their user ID (globalized).
    fetch("http://localhost:8080/users/" + sessionStorage.getItem("GlobalUserID"), {
        headers: {
            "Content-Type": "application/json",
        },
    })
        // User's data is returned in JSON format.
        .then(function (userRes) {
            if (!userRes.ok) {
                throw new Error("Failed to fetch user");
            }
            return userRes.json();
        })
        .then(function (userJSON) {
            console.log(userJSON);
            // Function loadTable() is called to start loading the table from the database.
            loadPersonalInfo(userJSON);
        })

        // Since activities data is in an array, each activity must be isolated from the array using the map() function to iterate through the activities.
        // Then, each activity ID sends a fetch request to receive each
        //   .then(function (activitiesData) {
        //     // This requires iteration with map() to go through all the data.
        //     const activityIDs = activitiesData.map((activity) => activity.ActivityID);
        //     const activityFetchPromises = activityIDs.map((activityID) =>
        //       fetch(`http://localhost:8080/activities/${activityID}`, {
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //       })
        //     );

        //     // Promise.all() ensures that all the iterated fetched activities are returned as a single Promise.
        //     // Having multiple Promises returned may cause errors to the fetch chain (though I'm not exactly sure what errors would arise).
        //     return Promise.all(activityFetchPromises);
        //   })
        //   // Another iteration/map is required to convert all the activities in the table to JSON format.
        //   .then(function (activityResponses) {
        //     const activityJSONPromises = activityResponses.map((response) =>
        //       response.json()
        //     );

        //     // The activities in JSON format all get returned as a single Promise.
        //     return Promise.all(activityJSONPromises);
        //   })
        //   .then(function (activityJSONs) {
        //     console.log(activityJSONs);
        //     // Function loadTable() is called to start loading the table from the database.
        //     loadTable(activityJSONs);
        //   })
        // Any errors in the fetch chain are caught below.
        .catch(function (error) {
            console.error("Error:", error);
        });
});

function loadPersonalInfo(data) {
    document.getElementById("name").textContent = data.FName + " " + data.LName;
    document.getElementById("dob").textContent = data.DOB;
    document.getElementById("weight").textContent = data.Weight;
    document.getElementById("height").textContent = data.Height;
    document.getElementById("email").textContent = data.Email;
    //   document.getElementById("bmi").textContent = data.bmi;
    //   document.getElementById("personal-note").textContent = data.personalNote;

    // Example of adding a new milestone
    // const milestonesList = document.getElementById("milestones-list");
    // const newMilestone = document.createElement("li");
    // newMilestone.textContent = "Bought a new house (May 2024)";
    // milesstonesList.appendChild(newMilestone);

}
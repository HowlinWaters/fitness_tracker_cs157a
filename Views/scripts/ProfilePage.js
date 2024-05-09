document.addEventListener("DOMContentLoaded", function (id) {
  // First, fetch a request to get user based on their user ID (globalized).
  fetch(
    "http://localhost:8080/users/" + sessionStorage.getItem("GlobalUserID"),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
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
  // Parse the UTC timestamp into a JavaScript Date object
  var dobUTC = new Date(data.DOB);

  // Convert the UTC timestamp to the local timezone
  var dobLocal = dobUTC.toLocaleDateString();

  // Update the DOM element with the converted date
  document.getElementById("dob").textContent = dobLocal;
  document.getElementById("name").textContent = data.FName + " " + data.LName;
  document.getElementById("weight").textContent = data.Weight;
  document.getElementById("height").textContent = data.Height;
  document.getElementById("email").textContent = data.Email;
  loadBMI();
  loadNote();

  loadMilestones();
}

function loadBMI() {
  fetch("http://localhost:8080/bmi/" + sessionStorage.getItem("GlobalUserID"), {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data.BMIContent);
      document.getElementById("bmi").textContent = data.BMIContent;
    });
}

function loadNote() {
  fetch(
    "http://localhost:8080/note/" + sessionStorage.getItem("GlobalUserID"),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data.NoteContent);
      document.getElementById("personal-note").textContent = data.NoteContent;
    });
}

function loadMilestones() {
  fetch(
    "http://localhost:8080/profile/" + sessionStorage.getItem("GlobalUserID"),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((profileRes) => profileRes.json())
    .then((profileData) => {
      console.log(profileData);
      return fetch(
        `http://localhost:8080/profilemilestones/${profileData.ProfileID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    })
    .then((profileMSRes) => profileMSRes.json())
    .then((profileMSData) => {
      console.log(profileMSData);
      return fetch(
        `http://localhost:8080/milestones/${profileMSData.MilestoneID}`
      );
    })
    .then((milestonesRes) => milestonesRes.json())
    .then((milestonesData) => {
      console.log(milestonesData);
      loadMSTable(milestonesData);
    });
}

function loadMSTable(data) {
  console.log(data);

  let table = document.querySelector("table tbody");

  let tableHTML = "";

  data.forEach(function ({ Milestone, MilestoneID }) {
    tableHTML += "<tr>";
    tableHTML += `<td id="milestone">${Milestone}</td>`;
    tableHTML += `<td><button class="edit-btn" data-id=${MilestoneID}>Edit</td>`;
    tableHTML += "</tr>";
  });

  table.innerHTML = tableHTML;
}

const editButton = document.querySelector("#edit-profile");

editButton.onclick = () => {
  var name = prompt("Enter your name (one space between two names).");
  var [fname, lname] = name.split(" ");
  var dob = prompt("Enter your date of birth.");
  var weight = prompt("Enter your weight.");
  var height = prompt("Enter your height.");
  var email = prompt("Enter your email");

  if (
    (fname === "" || lname === "") &&
    !(document.getElementById("name").textContent === "")
  ) {
    alert("Error! Must enter both first and last name fields.");
    return;
  }

  fname =
    fname === ""
      ? document.getElementById("name").textContent.split(" ")[0]
      : fname;
  lname =
    lname === ""
      ? document.getElementById("name").textContent.split(" ")[1]
      : lname;
  dob = dob === "" ? document.getElementById("dob").textContent : dob;
  let [month, day, year] = dob.split("/");
  let dateObject = new Date(year, month - 1, day);
  let dobFormat = dateObject.toISOString().split("T")[0];
  weight =
    weight === "" ? document.getElementById("weight").textContent : weight;
  height =
    height === "" ? document.getElementById("height").textContent : height;
  email = email === "" ? document.getElementById("email").textContent : email;

  var id = sessionStorage.getItem("GlobalUserID");

  fetch("http://localhost:8080/updateusers", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({
      FName: fname,
      LName: lname,
      DOB: dobFormat,
      Weight: weight,
      Height: height,
      Email: email,
      UserID: id,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to edit profile.");
      res.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data);
      location.reload();
    })
    .catch((error) => console.log("Error:", error));
};

const editBMIBtn = document.querySelector("#editBMIButton");

editBMIBtn.onclick = () => {
  var bmi = prompt("Enter new BMI.");
  var id = sessionStorage.getItem("GlobalUserID");

  fetch("http://localhost:8080/updatebmi", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({
      BMIID: id,
      BMIContent: bmi,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update BMI.");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const editNoteBtn = document.querySelector("#editNoteButton");

editNoteBtn.onclick = () => {
  var note = prompt("Enter new Note.");
  var id = sessionStorage.getItem("GlobalUserID");

  fetch("http://localhost:8080/updatenote", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({
      NoteID: id,
      NoteContent: note,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update BMI.");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

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
    `http://localhost:8080/profilemilestones/` +
      sessionStorage.getItem("GlobalUserID"),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((profileMSRes) => profileMSRes.json())
    .then((profileMSData) => {
      console.log(profileMSData);
      const milestoneIDsArray = profileMSData.map(
        (milestoneData) => milestoneData.MilestoneID
      );
      console.log(milestoneIDsArray);
      // Map through each milestone ID and fetch data for each milestone
      const milestonePromises = milestoneIDsArray.map((milestoneID) => {
        return fetch(`http://localhost:8080/milestones/${milestoneID}`).then(
          (milestoneRes) => milestoneRes.json()
        );
      });
      // Wait for all milestone data to be fetched
      return Promise.all(milestonePromises);
    })
    .then((milestonesData) => {
      loadMSTable(milestonesData);
    })
    .catch((error) => {
      console.error("Error loading milestones:", error);
    });
}

const addMilestone = document.querySelector("#addMilestone");

// JavaScript to handle adding entries to the table
addMilestone.onclick = () => {
  var milestone = prompt("Enter milestone:");

  if (milestone) {
    fetch("http://localhost:8080/createmilestone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({
        Milestone: milestone,
        ProfileID: sessionStorage.getItem("GlobalUserID"),
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

document.querySelector("table tbody").addEventListener("click", function (event) {
    if (event.target.className === "delete-btn") {
      var rowID = event.target.dataset.id;
      deleteRowById(rowID);
    }
    if (event.target.className === "edit-btn") {
      var rowID = event.target.dataset.id;
      editRowById(rowID);
    }
  });

// Row can be deleted once "Delete" button is pressed.
function deleteRowById(id) {
  // Send a fetch request with the activity ID argument.
  fetch(`http://localhost:8080/deletemilestone/${id}`, {
    method: "DELETE",
  })
    .then(function (res) {
      if (!res.ok) throw new Error("Failed to delete row.");
      // Current webpage reloads once the row is deleted from the database table.
      location.reload();
    })
    .catch((error) => console.error("Failed to delete row."));
}

// Row can have its values edited once "Edit" button is pressed.
function editRowById(id) {
  // Prompts are similar to the function to add rows.
  var milstone = prompt("Enter milestone");

  if (milstone) {
    fetch(`http://localhost:8080/updatemilestones/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        MilestoneID: id,
        Milestone: milstone,
      }),
      cache: "no-cache",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update row.");
        return res.json();
      })
      .then((data) => {
        location.reload();
      })
      .catch((error) => console.error("Failed to update row."));
  } else {
    alert("Please enter valid values for all fields.");
  }
}

function loadMSTable(data) {
  console.log(data);

  let table = document.querySelector("table tbody");

  let tableHTML = "";
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    var milestoneData = data[i][0];
    tableHTML += "<tr>";
    tableHTML += `<td id="milestone">${milestoneData.Milestone}</td>`;
    tableHTML += `<td><button class="delete-btn" data-id=${milestoneData.MilestoneID}>Delete</td>`;
    tableHTML += `<td><button class="edit-btn" data-id="${milestoneData.MilestoneID}">Edit</button></td>`;
    tableHTML += "</tr>";
  }

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

  fname === ""
    ? document.getElementById("name").textContent.split(" ")[0]
    : fname;
  lname === ""
    ? document.getElementById("name").textContent.split(" ")[1]
    : lname;
  dob = dob === "" ? document.getElementById("dob").textContent : dob;
  let [month, day, year] = dob.split("/");
  let dateObject = new Date(year, month - 1, day);
  let dobFormat = dateObject.toISOString().split("T")[0];
  weight === "" ? document.getElementById("weight").textContent : weight;
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

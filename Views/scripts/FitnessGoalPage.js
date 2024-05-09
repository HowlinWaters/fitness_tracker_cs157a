document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8080/users/" + sessionStorage.getItem("GlobalUserID"), {
        headers: {
            "Content-Type": "application.json"
        }
    })
    .then(userRes => {
        if (!userRes.ok) throw new Error("Failed to fetch user.");
        return userRes.json();
    })
    .then(userData => {
        console.log(userData);
        return fetch(`http://localhost:8080/fitnessgoalsuser/${userData.UserID}`);
    })
    .then(fitnessGoalsRes => {
        if (!fitnessGoalsRes.ok) throw new Error("Failed to fetch fitness goals.");
        return fitnessGoalsRes.json();
    })
    .then(fitnessGoalsData => {
        const fitnessGoalIDs = fitnessGoalsData.map(fitnessGoal => fitnessGoal.FitnessGoalID);
        const fitnessGoalFetchPromises = fitnessGoalIDs.map(fitnessGoalID => 
            fetch(`http://localhost:8080/fitnessgoal/${fitnessGoalID}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        );

        return Promise.all(fitnessGoalFetchPromises);
    })
    .then(fitnessGoalResponses => {
        const fitnessGoalJSONResponses = fitnessGoalResponses.map(response => response.json());

        return Promise.all(fitnessGoalJSONResponses);
    })
    .then(fitnessGoalJSONs => {
        console.log(fitnessGoalJSONs);
        loadTable(fitnessGoalJSONs);
    })
    .catch(error => console.log("Error:", error));
})

function loadTable(data) {
    console.log(data);

    let table = document.querySelector("table tbody");

    let tableHTML = "";

    data.forEach(function ({
        FitnessGoalID,
        Descriptions,
        CaloriesBurnt,
        CaloriesConsumed,
    }) {
        tableHTML += "<tr>";
        tableHTML += `<td id="desc">${Descriptions}</td>`;
        tableHTML += `<td id="calburn">${CaloriesBurnt}</td>`;
        tableHTML += `<td id="calcon">${CaloriesConsumed}</td>`;
        tableHTML += `<td><button class="delete-btn" data-id=${FitnessGoalID}>Delete</td>`;
        tableHTML += `<td><button class="edit-btn" data-id=${FitnessGoalID}>Edit</td>`;
        tableHTML += "</tr>";
    });

    table.innerHTML = tableHTML;
}

const addButton = document.querySelector("#addFitnessGoal");

addButton.onclick = () => {
    var desc = prompt("Describe your fitness goal:");
    var calburn = prompt("How many calories do you want to burn?");
    var calcon = prompt("How many calories do you want to consume?");

    if (desc && calburn && calcon) {
        fetch("http://localhost:8080/createfitnessgoals", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                UserID: 1, // Temporary constant, must replace with global ID soon.
                Descriptions: desc,
                CaloriesBurnt: calburn,
                CaloriesConsumed: calcon
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log("Error:", error));

        location.reload();
    } else {
        alert("Please enter valid values for all fields.");
    }
}

document.querySelector("table tbody").addEventListener("click", event => {
    if (event.target.className === "delete-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-btn") {
        editRowById(event.target.dataset.id);
    }
})

function deleteRowById(id) {
    fetch(`http://localhost:8080/deletefitnessgoals/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (!res.ok) throw new Error("Failed to delete row.");
        location.reload();
    })
    .catch(error => console.log("Error:", error));
}

function editRowById(id) {
    var desc = prompt("Describe your fitness goal:");
    var calburn = prompt("How many calories do you want to burn?");
    var calcon = prompt("How many calories do you want to consume?");

    if (desc && calburn && calcon) {
        fetch(`http://localhost:8080/updatefitnessgoals`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                UserID: 1, // Temporary constant, must change to global soon.
                Descriptions: desc,
                CaloriesBurnt: calburn,
                CaloriesConsumed: calcon,
                FitnessGoalID: id
            })
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to update row.");
            return res.json();
        })
        .then(data => {
            console.log("Updated: " + data);
            location.reload();
        })
        .catch(error => console.log("Error:", error));
    }
}
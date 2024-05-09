document.addEventListener("DOMContentLoaded", function (id) {
    fetch("http://localhost:8080/users/" + sessionStorage.getItem("GlobalUserID"), {
        headers : {
            "Content-Type" : "application/json"
        }
    })
    .then(function (userRes) {
        if (!userRes.ok) throw new Error("Failed to fetch user.");
        console.log(userRes);
        return userRes.json();
    })
    .then(function(userData) {
        return fetch(`http://localhost:8080/activitylocation/${userData.UserID}`);
    })
    .then(function(locationsRes) {
        if (!locationsRes.ok) throw new Error("Failed to fetch locations.");
        return locationsRes.json();
    })
    .then(locationsData => {
        const locationIDs = locationsData.map((location) => location.LocationID);
        const locationFetchPromises = locationIDs.map((locationID) => 
            fetch(`http://localhost:8080/location/${locationID}`, {
                headers : {
                    "Content-Type" : "application/json"
                }
            })
        );

        return Promise.all(locationFetchPromises);
    })
    .then(locationResponses => {
        const locationJSONResponses = locationResponses.map(response => response.json());

        return Promise.all(locationJSONResponses); 
    })
    .then(locationJSONs => {
        console.log(locationJSONs);
        loadTable(locationJSONs);
    })
    .catch(error => console.log("Error:", error));
})

function loadTable(data) {
    console.log(data);

    let table = document.querySelector("table tbody");

    let tableHTML = "";

    data.forEach(function ({
        LocationID,
        Address,
        City,
        State,
        BuildingName
    }) {
        tableHTML += "<tr>";
        tableHTML += `<td id="address-col">${Address}</td>`;
        tableHTML += `<td id="city-col">${City}</td>`;
        tableHTML += `<td id="state-col">${State}</td>`;
        tableHTML += `<td id="build-col">${BuildingName}</td>`;
        tableHTML += `<td><button class="delete-btn" data-id=${LocationID}>Delete</td>`;
        tableHTML += `<td><button class="edit-btn" data-id=${LocationID}>Edit</td>`;
        tableHTML += "</tr>";
    });

    table.innerHTML = tableHTML;
}

const addLocation = document.querySelector(`#addLocationButton`);

addLocation.onclick = () => {
    var address = prompt("Enter address:");
    var city = prompt("Enter city:");
    var state = prompt("Enter state:");
    var building = prompt("Enter building name (optional):");

    if (!building) building = "N/A";

    if (address && city && state) {
        fetch("http://localhost:8080/createlocations", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Address: address,
                City: city,
                State: state,
                BuildingName: building
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error));
        location.reload();
    } else {
        alert("Error: Please enter valid input into the text bar (besides optional).");
    }
}

document.querySelector('table tbody').addEventListener("click", function(event) {
    if (event.target.className === "delete-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-btn") {
        editRowById(event.target.dataset.id);
    }
})

function deleteRowById(id) {
    fetch(`http://localhost:8080/deletelocations/${id}`, {
        method: 'DELETE'
    })
    .then(res => {
        if (!res.ok) throw new Error("Failed to delete row.");
        location.reload();
    })
    .catch(error => console.log("Failed to delete row.", error));
}

function editRowById(id) {
    var address = prompt("Enter address:");
    var city = prompt("Enter city:");
    var state = prompt("Enter state:");
    var building = prompt("Enter building name (optional):");

    if (!building) building = "N/A";

    if (address && city && state) {
        fetch("http://localhost:8080/updatelocations", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
            {
                Address: address,
                City: city,
                State: state,
                BuildingName: building,
                LocationID: id
            })
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to update row.");
            return res.json();
        })
        .then(data => {
            console.log(data);
            location.reload();
        })
        .catch(error => console.log("Error:", error));
    }
}
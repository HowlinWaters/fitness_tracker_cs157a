// JavaScript to handle adding entries to the table
function addActivity(data) {
    document.getElementById('addEntryButton').addEventListener('click', function(data) {
        var name = prompt('Enter activity:');
        var duration = prompt('Enter duration (minutes):');
        var calories = prompt('Enter calories burned:');
        
        if (name && duration && calories) {
            var tableBody = document.getElementById('activityTableBody');
            var newRow = document.createElement('tr');
            newRow.innerHTML = `<td><input type='text' value='` + name + `'/></td>`+ `<td><input type='text' value='` + duration +`'/></td>` + 
            `<td><input type='text' value='` + calories + `'/></td>` + 
            `<td><input type='button' value='Delete' onclick='deleteRow(this)'/></td>`;
            fetch('http://localhost:8080/createactivities', { 
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                cache : "no-cache"
            })
            .then(response => response.json())
            .then(data => createActivities(data['data']))
            .catch(err => console.log(err));
            tableBody.appendChild(newRow);
        } else {
            alert('Please enter valid values for all fields.');
        }
    });
}
// document.getElementById('addEntryButton').addEventListener('click', function(data) {
//     var name = prompt('Enter activity:');
//     var duration = prompt('Enter duration (minutes):');
//     var calories = prompt('Enter calories burned:');
    
//     if (name && duration && calories) {
//         var tableBody = document.getElementById('activityTableBody');
//         var newRow = document.createElement('tr');
//         newRow.innerHTML = `<td><input type='text' value='` + name + `'/></td>`+ `<td><input type='text' value='` + duration +`'/></td>` + 
//         `<td><input type='text' value='` + calories + `'/></td>` + 
//         `<td><input type='button' value='Delete' onclick='deleteRow(this)'/></td>`;
//         fetch('http://localhost:8080/createactivities', { 
//             method : 'POST',
//             headers : {
//                 "Content-Type" : "application/json"
//             },
//             cache : "no-cache"
//         })
//         .then(response => response.json())
//         .then(data => createActivities(data['data']))
//         .catch(err => console.log(err));
//         tableBody.appendChild(newRow);
//     } else {
//         alert('Please enter valid values for all fields.');
//     }
// });

// Row can be deleted once "Delete" button is pressed.
function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
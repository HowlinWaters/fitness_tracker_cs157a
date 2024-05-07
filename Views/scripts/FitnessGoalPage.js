document.getElementById('addFitnessGoal').addEventListener('click', function() {
    var fitnessGoal = prompt("What is your goal?");
    if (fitnessGoal.length > 0) {
        var tableBody = document.getElementById('goalTableBody');
        var newRow = document.createElement('tr');
        newRow.innerHTML = '<td>' + fitnessGoal + '</td>';
        tableBody.appendChild(newRow);
    } else {
        alert('Error! Please write something in the text bar.');
    }
});
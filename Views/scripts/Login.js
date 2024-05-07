function saveUserData() {
    event.preventDefault();
    // Get form inputs
    let username = document.getElementById("username").value || null;
    let password = document.getElementById("password").value || null;

    // reset the form
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    // Create user object
    fetch('http://localhost:8080/users/'+username+'/'+password)
    .then(response => response.json())
    .then(data => console.log(data));

    let item = localStorage.getItem("currentUser");
    console.log(item);
    let data = JSON.parse(item);
}

function resetStorage() {
    event.preventDefault();
    localStorage.removeItem("currentUser");
}
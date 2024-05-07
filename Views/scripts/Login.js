function saveUserData() {
  event.preventDefault();
  // Get form inputs
  let username = document.getElementById("username").value || null;
  let password = document.getElementById("password").value || null;

  // reset the form
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";

  // Create user object
  fetch("http://localhost:8080/users/" + username + "/" + password)
    .then((response) => response.json())
    .then((data) => {
      GlobalUserID = data.UserID;
      sessionStorage.setItem("GlobalUserID", GlobalUserID);
    });
}

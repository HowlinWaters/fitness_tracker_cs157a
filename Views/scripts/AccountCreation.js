function saveUserData() {
  event.preventDefault();
  // Get form inputs
  let username = document.getElementById("username").value || null;
  let password = document.getElementById("password").value || null;
  let fname = document.getElementById("fname").value || null;
  let lname = document.getElementById("lname").value || null;
  let dob = document.getElementById("dob").value || null;
  let weight = document.getElementById("weight").value || null;
  let height = document.getElementById("height").value || null;
  let email = document.getElementById("email").value || null;

  // reset the form
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("height").value = "";
  document.getElementById("email").value = "";

  // Store user data in local storage with key 'currentUser'
  fetch("http://localhost:8080/createusers", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      Username: username,
      Password: password,
      FName: fname,
      LName: lname,
      DOB: dob,
      Weight: weight,
      Height: height,
      Email: email,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    form.onsubmit = function (event) {
        event.preventDefault(); // Prevent normal form submission

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if (username.trim() === "" || password.trim() === "") {
            alert("Please enter both username and password.");
            return false;
        }

        // AJAX request to authenticate.php
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "../php/authenticate.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                let response = JSON.parse(this.responseText);
                alert(response.message);
                if (response.success) {
                    // Handle successful login, e.g., redirect to another page
                    window.location.href = '../html/index.html'; // Redirect to a new page upon success
                }
            }
        }
        xhr.send(`username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    };
});
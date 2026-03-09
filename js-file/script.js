// console.log("Bilmillha")

document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault();

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user === "admin" && pass === "admin123"){
        // alert("Login Successful!");
        window.location.href = "index2.html";
    }
    else{
        alert("Wrong Username or Password");
    }

});


const API = "http://localhost:5000";

function signup() {
    fetch(API + "/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: su_user.value,
            password: su_pass.value,
            phone: su_phone.value
        })
    }).then(res => res.json())
      .then(data => alert(data.message));
}

function login() {
    fetch(API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: li_user.value,
            password: li_pass.value
        })
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("token", data.token);
        window.location = "dashboard.html";
    });
}

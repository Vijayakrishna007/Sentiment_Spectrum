function signup() {
    var email = document.getElementById('usern').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('repassword').value;

    // Validate password match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Store user data in localStorage (for demo purposes)
    var user = { email: email, password: password };
    localStorage.setItem('user', JSON.stringify(user));

    alert('User successfully created!');
    // window.location.href = 'welcome.html';
    window.location.href = 'login.html';
}


function login() {
    var email = document.getElementById('usern').value;
    var password = document.getElementById('password').value;

    // Retrieve user data from localStorage (for demo purposes)
    var storedUser = localStorage.getItem('user');

    if (storedUser) {
        var user = JSON.parse(storedUser);

        // Check if login credentials match
        if (user.email === email && user.password === password) {
            alert('Login successful!');

            // Redirect to main page
            window.location.href = 'welcome.html';
        } else {
            alert('Invalid login credentials');
        }
    } else {
        alert('User not found. Please sign up.');
    }
}
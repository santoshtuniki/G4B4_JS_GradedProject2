window.onload = () => {
	localStorage.setItem('username', "santosh");
	localStorage.setItem('password', 'frontend123');
}

let username, password;

document.querySelector('#username').addEventListener('input', function () {
	username = this.value;
});

document.querySelector('#password').addEventListener('input', function () {
	password = this.value;
});

document.querySelector('#login-form').addEventListener('submit', function (event) {
	let uname = localStorage.getItem('username');
	let pswd = localStorage.getItem('password');

	if (!(username === uname && password === pswd)) {
		event.preventDefault();
		document.querySelector('#message').style.display = 'block';
		document.querySelector('#message').innerHTML = "Invalid username or password";

		document.querySelector('#username').value = "";
		document.querySelector('#password').value = "";
	}
});
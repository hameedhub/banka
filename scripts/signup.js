const auth = `${API_URL}/api/v1/users`;
//console.log(auth);

// PASSWORD MATCH VALIDATION
 const validatePass =()=>{
 	let password = document.querySelector('input[name="password"]').value;
 	let rpassword = document.querySelector('input[name="rpassword"]').value;
 	let submit = document.querySelector('input[name="submit"]');
 	if (password != rpassword) {
 		let msg = document.querySelector('#msg').textContent = 'Password not matched';
 		submit.setAttribute('disabled', 'disabled');
 	}else{ let msg = document.querySelector('#msg').textContent = ''
 	submit.removeAttribute('disabled');

 	 };
 }
 
// GETTING THE FORM DATA
let form = document.querySelector('form');
form.addEventListener('submit', (event)=>{
	event.preventDefault();
	let firstName = document.querySelector('input[name="firstName"]').value;
	let lastName = document.querySelector('input[name="lastName"]').value;
	let email = document.querySelector('input[name="email"]').value;
	let password = document.querySelector('input[name="password"]').value;
	
	user = JSON.stringify({firstName, lastName, email, password, type: 'client', isAdmin: false});
	signup(user);
});

const signup = (user) =>{
	fetch(auth, {method: 'POST', headers:{'Content-Type':'application/json'}, body:user})
	.then(res=>res.json())
	.then(res=>{
		let notify = document.querySelector('#notify');
		if (res.error) {
			return notify.textContent = res.error;
		} else { notify.textContent = res.message};
	})
}
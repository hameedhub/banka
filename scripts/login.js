const auth = `${API_URL}/api/v1/users/login`;

let form = document.querySelector('form');

form.addEventListener('submit', (event)=>{
	event.preventDefault();
	email = document.querySelector('input[name=email]').value;
	password = document.querySelector('input[name=password]').value;

	user = JSON.stringify({ email: email, password: password});
	login(user)
});

const login = (user) =>{
	fetch(auth,{ method:'POST', headers:{'Content-Type':'application/json'}, body:user})
	.then(res=>res.json())
	.then(res=>{
		if (res.error){
			let p = document.querySelector('#notify');
			p.textContent = res.error;
			return false;
		}
		window.location.href =`dashboard.html?id=${res.id}`;
	});
}
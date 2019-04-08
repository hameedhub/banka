const id = window.location.href.split('?id=')[1];
const user = `${API_URL}/api/v1/users/${id}`;
const account = `${API_URL}/api/v1/accounts/owner/${id}`;

//FETCH DATA OF USER 
fetch(user).then(res=>res.json()).then(res=>{
	let title = document.querySelector('title').textContent = res.data.firstName+' - Dashboard';
	let p = document.querySelector('#fullname').textContent = res.data.firstName+' '+res.data.lastName;
	let span = document.querySelector('#firstName').textContent = res.data.firstName;

})

//FETCH ACCOUNT
fetch(account).then(res=>res.json()).then(res=>{
	let bal = document.querySelector('#bal').innerHTML ='&#8358; '+res.data.balance;
	let accNum = document.querySelector('#accNum').textContent = res.data.accountNumber;
//FETCH RECENT TRANS BY ACCOUNT NUMBER
trans = `${API_URL}/api/v1/transactions/account/${res.data.accountNumber}`;
fetch(trans).then(res=>res.json()).then(res=>{
	res.data.slice(-3).forEach(data =>{
		let myUL = document.querySelector('#myUL')
		let li = document.createElement('li');
		let a = document.createElement('a');
		if (data.type == 'credit') { type ='<b class="success">>></b>';}
		 else { type ='<b class="danger"><<</b>'}
		a.innerHTML = `${type} Alert# ${data.type} | ${data.createdOn} | ${data.amount} | TransID ${data.id} `
		li.setAttribute('class', 'collapsible' );
		li.appendChild(a);
		myUL.appendChild(li);
		li.addEventListener('click',()=>{
			li.setAttribute('class', 'collapsible activeCol');
			if (div.style.display === 'block') {
				div.style.display = 'none';
			} else {
				div.style.display = 'block';
			}
		})
		let div = document.createElement('div');
		let p = document.createElement('p');
		p.innerHTML = ` ${data.type} Alert# on Account Number: ${data.accountNumber}<br> Date/Time: ${data.createdOn} <br> Amount: NGN${data.amount} <br> Avail Bal: NGN${data.newBalance} <br> Enquires? mail banka@banka.com`;
		div.setAttribute('class', 'content');
		div.appendChild(p);
		myUL.appendChild(div);
		console.log(data);
		
	})
	
})

})



const token = sessionStorage.getItem('token');
const url = `${API_URL}/api/v1/accounts`;
const firstname = sessionStorage.getItem('firstname');
document.querySelector('#firstname').innerHTML = firstname;
console.log(token);
const submit = document.querySelector('#submit');
submit.addEventListener('click', (e) => {
  e.preventDefault();
  const openingBalance = document.querySelector('input[name=openingbalance]').value;
  const type = document.querySelector('#type').value;
  if(openingBalance === '' || type === ''){
    document.querySelector('#notify').innerHTML = 'Please complete the above form'
      return
  }else{
      document.querySelector('#notify').innerHTML = '';
  }
  const data = JSON.stringify({ type, openingBalance });
  createAccount(data);
});

const createAccount = (data) => {
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }, body: data })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        document.querySelector('#notify').innerHTML = res.error
      }
      document.querySelector('#notify').innerHTML = 'Account Registeration was successful';
    });
};

const url = `${API_URL}/api/v1/auth/signup`;
console.log(url);

// password varification
const validatePassword = () => {
  const password = document.querySelector('input[name="password"]').value;
  const repeatPassword = document.querySelector('input[name="repeatPassword"]').value;
  const submit = document.querySelector('input[name="submit"]');
  if (password != repeatPassword) {
    const notify = document.querySelector('#notify').textContent = 'Password not matched';
    submit.setAttribute('disabled', 'disabled');
  } else {
    const notify = document.querySelector('#notify').textContent = '';
    submit.removeAttribute('disabled');

  }
};

// getting data from form
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const firstname = document.querySelector('input[name="firstName"]').value;
  const lastname = document.querySelector('input[name="lastName"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  user = JSON.stringify({
    firstname, lastname, email, password,
  });
  signup(user);
});

const signup = (user) => {
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: user })
    .then(res => res.json())
    .then((res) => {
      const notify = document.querySelector('#notify');
      if (res.error) {
        return notify.textContent = res.error;
      }
      notify.textContent = 'Registeration was successful';
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('type', res.data[0].type);
      sessionStorage.setItem('isAdmin', res.data[0].isAdmin);
      sessionStorage.setItem('email', res.data[0].email);
      sessionStorage.setItem('firstname', res.data[0].firstname);
      sessionStorage.setItem('lastname', res.data[0].lastname);      
        window.location.href = 'dashboard.html';
    });
};

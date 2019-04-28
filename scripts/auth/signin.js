const url = `${API_URL}/api/v1/auth/signin`;

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  email = document.querySelector('input[name=email]').value;
  password = document.querySelector('input[name=password]').value;

  user = JSON.stringify({ email, password });
  login(user);
});

const login = (user) => {
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: user })
    .then(res => res.json())
    .then((res) => {
      // console.log(res)
      if (res.error) {
        const p = document.querySelector('#notify');
        p.textContent = res.error;
        return false;
      }
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('type', res.data[0].type);
      sessionStorage.setItem('isAdmin', res.data[0].isAdmin);
      sessionStorage.setItem('email', res.data[0].email);
      sessionStorage.setItem('firstname', res.data[0].firstname);
      sessionStorage.setItem('lastname', res.data[0].lastname);
      const isAdmin = sessionStorage.getItem('isAdmin');
      const type = sessionStorage.getItem('type');
      if (isAdmin === true) {
        window.location.href = '../admin/dashboard.html';
      } else if (type === 'staff' && isAdmin !== true) {
        window.location.href = '../staff/dashboard.html';
      } else {
        window.location.href = 'dashboard.html';
      }
    });
};

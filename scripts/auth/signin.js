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
     
     sessionStorage.setItem('token', res.data);
     let data = sessionStorage.getItem('token');
      console.log(res.data[0]);
    });
};

const email = sessionStorage.getItem('email');
const token = sessionStorage.getItem('token');
const url = `${API_URL}/api/v1/user/${email}/accounts`;
const firstname = sessionStorage.getItem('firstname');
// document.querySelector('#firstname').innerHTML = firstname;

fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` } })
  .then(res => res.json())
  .then((res) => {
    const data = res.accounts;
    data.forEach((account) => {
        console.log(data);
      fetch(`${API_URL}/api/v1/accounts/${account.accountnumber}/transactions`, { method: 'GET', headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` } }).then(res => res.json()).then((res) => {
        res.data.slice(-10).forEach((data) => {
          const myUL = document.querySelector('#myUL');
          const li = document.createElement('li');
          const a = document.createElement('a');
          if (data.type == 'credit') { type = '<b class="success">>></b>'; }
          else { type = '<b class="danger"><<</b>'; }
          a.innerHTML = `${type} Alert# ${data.type} | on  ${data.createdon} | Account Number: ${data.accountnumber} |Amount &#8358;${data.amount} |  Transaction ID ${data.id} `;
          li.setAttribute('class', 'collapsible');
          li.appendChild(a);
          myUL.appendChild(li);
          li.addEventListener('click', () => {
            li.setAttribute('class', 'collapsible activeCol');
            if (div.style.display === 'block') {
              div.style.display = 'none';
            } else {
              div.style.display = 'block';
            }
          });
          let div = document.createElement('div');
          const p = document.createElement('p');
          p.innerHTML = ` ${data.type} Alert# on Account Number: ${data.accountnumber}<br> Date/Time: ${data.createdon} <br>  &#8358;${data.amount} <br> Avail Bal: NGN${data.newbalance} <br> Enquires? mail banka@banka.com`;
          div.setAttribute('class', 'content');
          div.appendChild(p);
          myUL.appendChild(div);
        });

      });
    });
  });

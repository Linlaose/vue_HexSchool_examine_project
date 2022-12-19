const signUp = {
  account: document.querySelector('#signUpEmail'),
  password: document.querySelector('#signUpPassword'),
  submitBtn: document.querySelector('#signUpBtn'),
};
const login = {
  account: document.querySelector('#loginEmail'),
  password: document.querySelector('#loginPassword'),
  submitBtn: document.querySelector('#loginBtn'),
};

if (signUp.account) {
  signUp.submitBtn.addEventListener('click', () => {
    const apiUrl = 'https://vue-examine-project-server.onrender.com/register';
    const data = {
      email: signUp.account.value,
      password: signUp.password.value,
    };
    // eslint-disable-next-line no-undef
    axios.post(apiUrl, data)
      .then(() => {
        alert('註冊成功');
        location.href = 'login.html';
      }).catch((err) => {
        // eslint-disable-next-line no-alert
        alert(err.response.data);
      });
  });
}

if (login.account) {
  login.submitBtn.addEventListener('click', () => {
    const apiUrl = 'https://vue-examine-project-server.onrender.com/login';
    const data = {
      email: login.account.value,
      password: login.password.value,
    };

    // eslint-disable-next-line no-undef
    axios.post(apiUrl, data)
      .then((res) => {
        location.href = 'index.html';
        localStorage.setItem('userId', res.data.user.id);
        if (res.data.user.isAdmin) {
          localStorage.setItem('admin', res.data.user.isAdmin);
          location.href = 'admin.html';
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        console.log(err);
      });
  });
}

export const memberInfo = document.querySelector('#memberInfo');
if (localStorage.getItem('userId') && !localStorage.getItem('admin')) {
  const template = `
    <a class="btn" href="collect.html">收藏列表</a>
    <p class="m-0">Hello!</p>
    <button id="logOutBtn" class="btn btn-link" type="button">登出</button>
  `;
  memberInfo.innerHTML = template;
} else if (localStorage.getItem('userId') && localStorage.getItem('admin')) {
  const template = `
    <a class="btn" href="admin.html">前往後臺</a>
    <a class="btn" type="button" href="collect.html">收藏列表</a>
    <p class="m-0">Hello!</p>
    <button id="logOutBtn" class="btn btn-link" type="button">
      登出
    </button>
  `;
  memberInfo.innerHTML = template;
}

const logOutBtn = document.querySelector('#logOutBtn');

if (logOutBtn) {
  logOutBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
    location.href = 'index.html'
  });
}


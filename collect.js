function extractURL() {
  let address = document.URL;
  address = address.split('/');
  const path = address[address.length - 1];
  return path
}

const scenes = document.querySelector('#scenes');

function init() {
  getCollection();
}
init();

function getCollection() {
  const userId = localStorage.getItem('userId');
  const apiUrl = `https://vue-examine-project-server.onrender.com/users/${userId}/favorites`;

  let arr;

  axios.get(apiUrl)
    .then((res) => {
      arr = res.data;
      renderCollection(arr);
    })
    .catch((err) => {
      console.log(err);
    })
}

function renderCollection(arr) {
  let template = "";
  arr.forEach((item) => {
    template += `
      <li>
        <h3>${item.Name}</h3>
        <p>${item.Description}</p>
        <button data-id="${item.id}" type="button" class="btn btn-dark js-collectBtn">已收藏</button>
      </li>
    `;
  })
  scenes.innerHTML = template;
}

function cancelCollection(collectId) {
  const apiUrl = `https://vue-examine-project-server.onrender.com/favorites/${collectId}`;

  axios.delete(apiUrl)
    .then((res) => {
      console.log(res);
      getCollection();
    })
    .catch((err) => {
      console.log(err);
    })
}

scenes.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    cancelCollection(Number(e.target.getAttribute('data-id')));
  }
})

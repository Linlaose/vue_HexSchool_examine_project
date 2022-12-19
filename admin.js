const scenes = document.querySelector('.js-scenes');

function init() {
  getScene();
}
init();

function getScene() {
  const apiUrl = `https://vue-examine-project-server.onrender.com/scenes`;

  let arr;

  axios.get(apiUrl)
    .then((res) => {
      arr = res.data;
      renderScene(arr);
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderScene(arr) {
  let template = "";
  arr.forEach((item) => {
    template += `
      <tr>
        <th scope="row">${item.id}</th>
        <td class="text-center" width="20%">${item.Name}</td>
        <td width="55%">${item.Description}</td>
        <td>
          <button data-id=${item.id} type="button" class="btn btn-outline-danger">刪除</button>
          <a data-id=${item.id} href="add-scene.html" class="btn btn-warning">編輯</a>
        </td>
      </tr>
    `;
  });
  scenes.innerHTML = template;
}

function deleteScene(id) {
  const apiUrl = `https://vue-examine-project-server.onrender.com/scenes/${id}`;

  axios.delete(apiUrl)
    .then(() => {
      getScene();
    }).catch((err) => {
      console.log(err);
    });
}


scenes.addEventListener('click', (e) => {
  if (e.target.textContent === '刪除') {
    deleteScene(e.target.getAttribute('data-id'));
  } else if (e.target.textContent === '編輯') {
    localStorage.setItem('sceneId', e.target.getAttribute('data-id'));
  }
})

const sceneForm = document.querySelector('.js-scene-form');
const sceneSubmitBtn = document.querySelector('.js-scene-form-btn');

function init() {
  getScene(localStorage.getItem('sceneId'));
}
init();

function getScene(id) {
  const apiUrl = `https://vue-examine-project-server.onrender.com/scenes/${id}`;

  axios.get(apiUrl)
    .then((res) => {
      if (localStorage.getItem('sceneId')) {
        sceneForm.name.value = res.data.Name;
        sceneForm.content.value = res.data.Description;
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

function addScene(name, content) {
  const apiUrl = `https://vue-examine-project-server.onrender.com/scenes`;
  const data = {
    Name: name,
    Description: content
  }
  axios.post(apiUrl, data)
    .then(() => {
      sceneForm.reset();
      alert('新增成功');
    })
    .catch((err) => {
      console.log(err);
    })
}

function editScene(sceneId, name, content) {
  const apiUrl = `https://vue-examine-project-server.onrender.com/scenes/${sceneId}`;
  const data = {
    Name: name,
    Description: content
  };

  axios.patch(apiUrl, data)
    .then((res) => {
      alert('編輯完成');
      localStorage.removeItem('sceneId');
      location.href = 'admin.html';
    })
    .catch((err) => {
      console.log(err);
    });
}

sceneSubmitBtn.addEventListener('click', () => {
  if (localStorage.getItem('sceneId')) {
    const sceneId = JSON.parse(localStorage.getItem('sceneId'));
    const name = sceneForm.name.value;
    const content = sceneForm.content.value;
    editScene(sceneId, name, content);
  } else {
    addScene(sceneForm.name.value, sceneForm.content.value);
  }
})

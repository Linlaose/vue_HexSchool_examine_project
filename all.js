const apiUrl = 'https://vue-examine-project-server.onrender.com/scenes';
const scenes = document.querySelector('#scenes');

function getScene() {
  // eslint-disable-next-line no-shadow
  let scenes;

  // eslint-disable-next-line no-undef
  axios.get(apiUrl)
    .then((res) => {
      scenes = res.data;
      // eslint-disable-next-line no-use-before-define
      renderScenes(scenes);
    })
    .catch((err) => {
      console.log(err);
    });
}

function init() {
  getScene();
}
init();

function renderScenes(arr) {
  let template = '';
  arr.forEach((scene, index) => {
    template += `
          <li class="card">
            <img
              class="card-img-top"
              src="${scene.Picture1}"
            />
            <div class="card-body">
              <h3 class="card-title">${scene.Name}</h3>
              <p class="card-text">
                ${scene.Description}
              </p>
              <button data-id="${index + 1}" id="moreBtn" class="btn btn-primary stretched-link">more</button>
            </div>
          </li>
        `;
  });
  scenes.innerHTML = template;
}

scenes.addEventListener('click', (e) => {
  if (e.target.id === 'moreBtn') {
    let arr;
    let template = '';
    const sceneId = e.target.getAttribute('data-id');
    // eslint-disable-next-line no-undef
    axios.get(apiUrl)
      .then((res) => {
        arr = res.data;
        arr.forEach((item, index) => {
          if (item.id === Number(sceneId)) {
            template += `
            <div>
              <img src="${item.Picture1}">
              <h3>${item.Name}</h3>
              <p>${item.Description}</p>
              <button data-id="${index + 1}" id="collectBtn" type="button">收藏</button>
            </div>
            `;
          }
        });
        scenes.innerHTML = template;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (e.target.id === 'collectBtn') {
    collectScene(Number(e.target.getAttribute('data-id')));
  }
});

function collectScene(sceneId) {
  let arr;
  const getUrl = `https://vue-examine-project-server.onrender.com/scenes`;
  const apiUrl = `https://vue-examine-project-server.onrender.com/favorites`;
  let data;
  axios.get(getUrl)
    .then((res) => {
      arr = res.data;
      arr.forEach((item) => {
        if (item.id === sceneId) {
          data = {
            userId: localStorage.getItem('userId'),
            Name: item.Name,
            Description: item.Description,
            Picture1: item.Picture1
          };
        }
      });
      axios.post(apiUrl, data)
        .then(() => {
          alert('已收藏');
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

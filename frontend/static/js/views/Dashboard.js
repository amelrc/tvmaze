import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    const findShow = (query) => {
      let object = [];

      const url = `https://api.tvmaze.com/search/shows?q=${query}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          data.map((el, i) => {
            const episodesUrl = `https://api.tvmaze.com/shows/${el.show.id}/episodes`;
            fetch(episodesUrl)
              .then((response) => response.json())
              .then((data) => {
                object.push({
                  image: el.show.image.medium,
                  name: el.show.name,
                  description: el.show.summary,
                  episodes: data,
                });
                showsResult(object);
              });
          });
        })
        .catch((er) => {
          console.log(er);
        });
    };

    const showsResult = (shows) => {
      const resultList = document.getElementById("resultsList");
      resultList.innerHTML = "";
      const node = document.createElement("li");
      node.className = "list";

      shows.map((el, i) => {
        let showInfo = `
        <img src=${el.image} alt='img_${i}'/>
        <h2>${el.name}</h2>
        ${el.description}
        <div>
        ${el.episodes.map(
          (el) =>
            `<a href='/episodes/${el.id}' data-link>Episode:${el.name}</a>`
        )}
        </div>`;
        node.innerHTML = showInfo;
      });
      resultList.appendChild(node);
    };

    window.onload = () => {
      const searchShow = document.getElementById("searchShow");
      searchShow.onkeyup = () => {
        findShow(searchShow.value);
      };
    };

    return `
          <div class='searchWrapper'>
            <h1>Search Movies!</h1>
            <input id="searchShow" placeholder="Type for search" type="text" />
          </div>
          <ul id="resultsList"></ul>
        `;
  }
}

import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    const findShow = async (query) => {
      let object = [];

      const url = `https://api.tvmaze.com/search/shows?q=${query}`;

      const shows = await fetch(url).then((response) => response.json());

      shows.map((el, i) => {
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
    };

    let timeout = 0;
    window.onload = () => {
      const searchShow = document.getElementById("searchShow");
      searchShow.onkeyup = () => {
        clearTimeout(timeout);
        if (searchShow.value.trim().length === 0) {
          return;
        }
        timeout = setTimeout(() => {
          findShow(searchShow.value);
        }, 250);

        findShow(searchShow.value);
      };
    };

    const showsResult = (shows) => {
      const resultList = document.getElementById("resultsList");

      let showInfo = "";

      shows.map((el, i) => {
        showInfo += `
        <img src=${el.image} alt='img_${i}'/>
        <h2>${el.name}</h2>
        ${el.description}
        <div class='episodesWrapper'>
        ${el.episodes.map(
          (el) =>
            `<a href='/episodes/${el.id}' data-link>Episode:${el.name}</a>`
        )}
        </div>`;
      });
      resultList.innerHTML = showInfo;
    };

    return `
          <div class='searchWrapper'>
            <h1>Search Movies!</h1>
            <input id="searchShow" placeholder="Type for search" type="text" />
          </div>
            <ul>
              <li id="resultsList"></li>
            </ul>
        `;
  }
}

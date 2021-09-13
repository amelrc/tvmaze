import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    const url = `https://api.tvmaze.com${window.location.pathname}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => details(data))
      .catch((er) => {
        console.log(er);
      });

    const details = (results) => {
      const list = document.getElementById("episodeInformation");
      let showsOutput = "";

      showsOutput = `
            <li class='list'>
              <img src=${results.image.medium} alt='img'/>
              <h2>${results.name}</h2>
              ${results.summary}
            </li>
        `;
      list.innerHTML = showsOutput;
    };

    return `
            <div class='searchWrapper'>
              <h1>Episode Information </h1>
              <ul id='episodeInformation'></ul>
            </div>
        `;
  }
}

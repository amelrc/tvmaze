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
      // list.innerHTML = "";
      let showsOutput = "";

      showsOutput = `
            <div>
              <img src=${results.image.medium} alt='img'/>
              <h2>${results.name}</h2>
              ${results.summary}
            </div>
        `;
      list.innerHTML = showsOutput;
    };

    return `
            <h1>Episode Information </h1>
            <div id='episodeInformation'></div>
        `;
  }
}

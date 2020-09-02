//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
const rootElem = document.getElementById("root");
function makePageForEpisodes(episodeList) {
  
  // rootElem.textContent = `Got ${episodeList.length} episode(s) `;
  
  // Create Hero Section
  rootElem.appendChild(createHeroSection());
  const div = document.createElement('div');
  div.setAttribute('class', 'episodes');
  rootElem.appendChild(div);
  

  episodeList.map(item=> {
    div.appendChild(createEpisodeCard(item.name, item.season, item.number, item.image.original, item.summary));
  })


  rootElem.appendChild(createCopyright('Original data from', 'https://static.tvmaze.com/images/tvm-header-logo.png'))
  ;

  
  
}

function createHeroSection(){
  //create div container for hero
  const div = document.createElement('div');
  div.setAttribute('class', 'hero');


  //create image tag 
  const img = document.createElement('img');
  img.setAttribute('src', './hero.svg')
  img.setAttribute('class', 'hero-img')

  //create the heading text
  const heroText = document.createElement('h1');
  heroText.textContent = 'CYF TV SHOW';
  heroText.setAttribute('class', 'hero-text');

  //append elements
  
  div.appendChild(img);
  div.appendChild(heroText);

  return div;
}
function createEpisodesSection(){
  //create div container for episodes
  
}


function createEpisodeCard(title, seasonNr, episodeNr, imageUrl, summary){
  const episode = document.createElement('div');
  episode.setAttribute('class', 'episode');

  const episodeImg = document.createElement('img');
  episodeImg.setAttribute('src', imageUrl)
  episodeImg.setAttribute('class', 'episode-img')

  const episodeTitle = document.createElement('h2');
  episodeTitle.textContent = title;
  episodeTitle.setAttribute('class', 'episode-title');


  ///////////////////////////////////////////
  //Season + Episode     Ex. S01E01
  const episodeInfo = document.createElement('p');
  episodeInfo.setAttribute('class', 'episode-info');

  const S = document.createElement('span');
  S.setAttribute('class', 'episode-letter');
  S.textContent = 'S';

  const E = document.createElement('span');
  E.setAttribute('class', 'episode-letter');
  E.textContent = 'E';

  const season = document.createElement('span');
  season.setAttribute('class', 'episode-number');
  season.textContent = seasonNr < 10 ? '0' + seasonNr : seasonNr;

  const ep = document.createElement('span');
  ep.setAttribute('class', 'episode-number');
  ep.textContent = episodeNr < 10 ? '0' + episodeNr : episodeNr;
  
  
  episodeInfo.appendChild(S);
  episodeInfo.appendChild(season);
  episodeInfo.appendChild(E);
  episodeInfo.appendChild(ep);
  

  ///////////////////////////////////////////

  const episodeSeasonNr = document.createElement('p');
  episodeSeasonNr.textContent = seasonNr;
  episodeSeasonNr.setAttribute('class', 'episode-season');

  const episodeEpisodeNr = document.createElement('p');
  episodeEpisodeNr.textContent = episodeNr;
  episodeEpisodeNr.setAttribute('class', 'episode-number');

  const episodeDescription = document.createElement('p');
  episodeDescription.textContent = 'Description';
  episodeDescription.setAttribute('class', 'episode-description');

  const episodeSummary = document.createElement('p');
  episodeSummary.innerHTML = summary;
  episodeSummary.setAttribute('class', 'episode-summary');


  episode.appendChild(episodeImg);
  episode.appendChild(episodeTitle);
  episode.appendChild(episodeInfo);
  episode.appendChild(episodeDescription);
  episode.appendChild(episodeSummary);
  return episode;
}


function createCopyright(text, imageUrl){
  const copyrightBox = document.createElement('div');
  copyrightBox.setAttribute('class', 'copyright');

  const copyrightText = document.createElement('h5');
  copyrightText.setAttribute('class', 'copyright-text');
  copyrightText.innerHTML = text;

  


  const copyrightImage = document.createElement('img');
  copyrightImage.setAttribute('class', 'copyright-image');
  copyrightImage.setAttribute('src', imageUrl);

  const link = document.createElement('a');
  link.setAttribute('href', 'https://www.tvmaze.com/');
  link.appendChild(copyrightImage);

  copyrightBox.appendChild(copyrightText);
  copyrightBox.appendChild(link);

  return copyrightBox;
}



window.onload = setup;

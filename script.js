//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();

function setup() {
  makePageForEpisodes(allEpisodes);
}




function makePageForEpisodes(episodeList) {
  //Add Hero Section
  rootElem.appendChild(createHeroSection());
  
  //Add Episodes section
  const episodes = createEpisodesSection();
  
  //Create and Append the Input Fields (Search Bar)
  const createInputBox = createInputsSection(episodeList.length, episodes);
  rootElem.appendChild(createInputBox);
  
  //Display episodes on the page
  displayMovies(episodeList, episodes);
  
  //Appending Episodes + Copyright Section
  rootElem.appendChild(episodes);
  rootElem.appendChild(createCopyright('Original data from', 'https://static.tvmaze.com/images/tvm-header-logo.png'));
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
  const episodes = document.createElement('episodes');
  episodes.setAttribute('class', 'episodes');
  return episodes;
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




function createInputsSection(lengthOfTheList, parent){
  let filteredLengthOfTheList = lengthOfTheList;

  const inputsBox = document.createElement('div');
  inputsBox.setAttribute('class', 'inputs-container');

  const search = document.createElement('input');
  search.setAttribute('type', 'search');
  search.setAttribute('class', 'input-search');
  search.setAttribute('placeholder', 'Search...');

  search.addEventListener('keyup', (e)=> {
    e.preventDefault();
    let searchInputvalue = e.target.value; 
    parent.innerHTML = '';
    displayMovies(filteredEpisodes(searchInputvalue), parent);
    filteredLengthOfTheList =  filteredEpisodes(searchInputvalue).length;
    text.innerHTML = `Displaying ${filteredLengthOfTheList} / ${lengthOfTheList} `;
  })
  

  const text = document.createElement('p');
  text.setAttribute('class', 'search-text');
  text.innerHTML = `Displaying ${filteredLengthOfTheList} / ${lengthOfTheList} `;

  inputsBox.appendChild(search);
  inputsBox.appendChild(text);
  return inputsBox;
}



function displayMovies(list, parentDiv){
  list.map(item => {
    parentDiv.appendChild(createEpisodeCard(item.name, item.season, item.number, item.image.original, item.summary));
  })
}



function filteredEpisodes(word){
  return allEpisodes.filter(episode => episode.name.toLowerCase().includes(word.toLowerCase()) || episode.summary.toLowerCase().includes(word.toLowerCase())  ? episode : '');
}


window.onload = setup;

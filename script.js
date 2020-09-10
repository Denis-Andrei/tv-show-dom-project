//You can edit ALL of the code here
const allShows = getAllShows();
console.log(allShows)

let allEpisodes = fetchData('https://api.tvmaze.com/shows/82/episodes');
const rootElem = document.getElementById("root");

function setup() {
  makePageForEpisodes(allEpisodes);
}

function fetchData(link){
  fetch(link)
  .then(res => res.json())
  .then(data => allEpisodes = data)
 
}

function makePageForEpisodes(episodeList) {
  
  rootElem.appendChild(createHeroSection())
  rootElem.appendChild(createInputsSection(episodeList))
  rootElem.appendChild(createEpisodesSection(episodeList))
  rootElem.appendChild(createCopyrightSection('Original data from', 'https://static.tvmaze.com/images/tvm-header-logo.png'));
  
}

function createHeroSection(){
  const heroSection = document.createElement('div');
  const heroImg = document.createElement('img');
  const heroText = document.createElement('h1');
  
  heroSection.setAttribute('class', 'hero');
  heroImg.setAttribute('src', './hero.svg')
  heroImg.setAttribute('class', 'hero-img')
  heroText.textContent = 'CYF TV SHOW';
  heroText.setAttribute('class', 'hero-text');

  heroSection.appendChild(heroImg);
  heroSection.appendChild(heroText);

  return heroSection;
}

function createSelector(name, list){
  const selector = document.createElement('select');
  const option = document.createElement('option');

  selector.setAttribute('class', `selector-list-${name}`);
  option.setAttribute('class', `first-option-${name}`);

  option.innerHTML = `All ${name}`;

  selector.appendChild(option); 

  list.map(item => {
    let format = '';
    const option = document.createElement('option');
    option.setAttribute('class', 'option');
    if(name.includes('episode')){
      format = `S${seasonEpisodeFormat(item.season)} E${seasonEpisodeFormat(item.number)}`;
      option.innerHTML =  `${format} - ${item.name}`;
    }else{
      option.innerHTML =  item.name;
    }
    
    selector.appendChild(option);
  })


  return selector;
}

function createInputsSection(episodeList){
  const inputsSection = document.createElement('div');
  const inputSearch = document.createElement('input');
  // const episodeSelector = document.createElement('select');
  // const episodeOption = document.createElement('option');
  const text = document.createElement('p');
  

  inputsSection.setAttribute('class', 'inputs-section');
  inputSearch.setAttribute('type', 'search');
  inputSearch.setAttribute('class', 'input-search');
  inputSearch.setAttribute('placeholder', 'Search...');
  // episodeSelector.setAttribute('class', 'selector-list');
  // episodeOption.setAttribute('class', 'first-option');
  // episodeOption.innerHTML = 'All episodes';
  text.setAttribute('class', 'search-text');
  text.innerHTML = `Displaying ${ episodeList.length } / ${allEpisodes.length} `;
  // episodeSelector.appendChild(episodeOption); 

  // allEpisodes.map(episode => {
  //   const episodeOption = document.createElement('option');
  //   episodeOption.setAttribute('class', 'option');
  //   let format = `S${seasonEpisodeFormat(episode.season)} E${seasonEpisodeFormat(episode.number)}`;
  //   episodeOption.innerHTML =  `${format} - ${episode.name}`;
  //   episodeSelector.appendChild(episodeOption);
  // })
  let showSelector = createSelector('shows', allShows); //first parameter hardcoded 
  let episodeSelector = createSelector('episodes', allEpisodes); //first parameter hardcoded 

  inputSearch.addEventListener('keyup', onSearchEvent);
  episodeSelector.addEventListener('change', onSelectEvent);
  inputsSection.appendChild(showSelector);
  inputsSection.appendChild(episodeSelector);
  inputsSection.appendChild(inputSearch);
  inputsSection.appendChild(text);

  return inputsSection;
}

function createEpisodesSection(episodeList){
  const episodesSection = document.createElement('div');
  episodesSection.setAttribute('class', 'episodes-section');

  displayEpisodes(episodeList, episodesSection);
  return episodesSection;
}

function createEpisodeCard(title, seasonNr, episodeNr, imageUrl, summary){
  const episodeCard = document.createElement('div');
  const episodeImg = document.createElement('img');
  const episodeTitle = document.createElement('h2');
  const episodeInfo = document.createElement('p');
  const episodeDescription = document.createElement('p');
  const episodeSummary = document.createElement('p');
  const S = document.createElement('span');
  const E = document.createElement('span');
  const season = document.createElement('span');
  const ep = document.createElement('span');

  episodeCard.setAttribute('class', 'episode');
  episodeImg.setAttribute('src', imageUrl);

  episodeImg.setAttribute('class', 'episode-img');
  episodeTitle.textContent = title;
  episodeTitle.setAttribute('class', 'episode-title');
  episodeInfo.setAttribute('class', 'episode-info');
  S.setAttribute('class', 'episode-letter');
  S.textContent = 'S';
  E.setAttribute('class', 'episode-letter');
  E.textContent = 'E';
  season.setAttribute('class', 'episode-number');
  season.textContent = seasonEpisodeFormat(seasonNr);
  ep.setAttribute('class', 'episode-number');
  ep.textContent = seasonEpisodeFormat(episodeNr);
  episodeDescription.textContent = 'Description';
  episodeDescription.setAttribute('class', 'episode-description');
  episodeSummary.innerHTML = summary;
  episodeSummary.setAttribute('class', 'episode-summary');
  
  episodeInfo.appendChild(S);
  episodeInfo.appendChild(season);
  episodeInfo.appendChild(E);
  episodeInfo.appendChild(ep);
  episodeCard.appendChild(episodeImg);
  episodeCard.appendChild(episodeTitle);
  episodeCard.appendChild(episodeInfo);
  episodeCard.appendChild(episodeDescription);
  episodeCard.appendChild(episodeSummary);
  
  return episodeCard;
}

function createCopyrightSection(text, imageUrl){
  const copyrightSection = document.createElement('div');
  const copyrightText = document.createElement('h5');
  const copyrightImage = document.createElement('img');
  const link = document.createElement('a');
  
  copyrightSection.setAttribute('class', 'copyright');
  copyrightText.setAttribute('class', 'copyright-text');
  copyrightText.innerHTML = text;
  copyrightImage.setAttribute('class', 'copyright-image');
  copyrightImage.setAttribute('src', imageUrl);
  link.setAttribute('href', 'https://www.tvmaze.com/');
  link.appendChild(copyrightImage);
  
  copyrightSection.appendChild(copyrightText);
  copyrightSection.appendChild(link);

  return copyrightSection;

}

function onSearchEvent(event){
  let selectorOption = document.querySelector('.selector-list');
  let initialSelectorOption = document.querySelector('.first-option').value;
  const text = document.querySelector('.search-text');
  const episodesSection = document.querySelector('.episodes-section');
  let searchValue = event.target.value.toLowerCase();
  filteredEpisodes = filterEpisodeListByWord(searchValue);
  text.innerHTML = `Displaying ${ filteredEpisodes.length } / ${allEpisodes.length} `;
  selectorOption.value = initialSelectorOption;
  episodesSection.innerHTML = '';
  displayEpisodes(filteredEpisodes, episodesSection);
}

function onSelectEvent(event){
  let searchInput = document.querySelector('.input-search');
  const text = document.querySelector('.search-text');
  const episodesSection = document.querySelector('.episodes-section');  
  searchInput.value = '';
  let optionValue = event.target.value.toLowerCase();
  filteredEpisodes = filterEpisodeListByOption(optionValue);
  text.innerHTML = `Displaying ${ filteredEpisodes.length } / ${allEpisodes.length} `;
  episodesSection.innerHTML = '';
  displayEpisodes(filteredEpisodes, episodesSection);

}

function filterEpisodeListByWord(word){
  return allEpisodes.filter(episode => episode.name.toLowerCase().includes(word) || episode.summary.toLowerCase().includes(word));
}
function filterEpisodeListByOption(option){
  const firstOption = document.querySelector('.first-option-episodes').value.toLowerCase();
  return allEpisodes.filter(episode => option === firstOption ? allEpisodes : option.includes(episode.name.toLowerCase()));
}

function seasonEpisodeFormat(seasonNr){
  return seasonNr < 10 ? '0' + seasonNr : seasonNr;
}

function displayEpisodes(episodeList, parentNode){
  episodeList.forEach(episode => {
    parentNode.appendChild(createEpisodeCard(episode.name, episode.season, episode.number, episode.image.original, episode.summary));
  })
}



window.onload = setup;
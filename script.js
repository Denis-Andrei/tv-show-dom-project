//You can edit ALL of the code here
let allShows = alphabeticalSort(getAllShows());
let allEpisodes; 
fetchData('https://api.tvmaze.com/shows/82/episodes');

const rootElem = document.getElementById("root");

function setup() {
  
  makePageForEpisodes(allEpisodes);
  
}

function alphabeticalSort(list){
   return list.sort((x,y) => {
    if(x.name.toLowerCase() > y.name.toLowerCase()){
      return 1;
    } else{
      return -1;
    }
    return 0;
  })
}

function fetchData(link){

  fetch(link)
  .then(res => res.json())
  .then(data => allEpisodes = data)
  .catch(err => alert(err))

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
  selector.setAttribute('class', `selector-list-${name}`);

  populateSelector(name, list, selector)
 
  return selector;
}



function populateSelector(name, list, parent){
  const option = document.createElement('option');
  option.setAttribute('class', `first-option-${name}`);
  option.innerHTML = `All ${name}`;

  parent.appendChild(option); 
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
    
    parent.appendChild(option);
  })
}

function createInputsSection(episodeList){
  const inputsSection = document.createElement('div');
  const inputSearch = document.createElement('input');
  const text = document.createElement('p');
  

  inputsSection.setAttribute('class', 'inputs-section');
  inputSearch.setAttribute('type', 'search');
  inputSearch.setAttribute('class', 'input-search');
  inputSearch.setAttribute('placeholder', 'Search...');
 
  text.setAttribute('class', 'search-text');
  text.innerHTML = `Displaying ${ episodeList.length } / ${allEpisodes.length} `;
 
  let showSelector = createSelector('shows', allShows); //first parameter hardcoded 
  let episodeSelector = createSelector('episodes', allEpisodes); //first parameter hardcoded 

  showSelector.addEventListener('change', onShowSelectEvent);
  inputSearch.addEventListener('keyup', onSearchEvent);
  episodeSelector.addEventListener('change', onEpisodeSelectEvent);
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
function onShowSelectEvent(event){
  const episodesSection = document.querySelector('.episodes-section');
  const searchInput = document.querySelector('.input-search');
  const episodeSelector = document.querySelector('.selector-list-episodes');
  const text = document.querySelector('.search-text');
  
  allShows.forEach(item => {
    if(item.name === event.target.value)
      fetch(`https://api.tvmaze.com/shows/${item.id}/episodes`)
      .then(res => res.json())
      .then(data => {
        allEpisodes = data;
        text.innerHTML = `Displaying ${ allEpisodes.length } / ${allEpisodes.length} `;
        searchInput.value = '';
        episodeSelector.innerHTML = '';
        episodesSection.innerHTML = '';
        populateSelector('episodes', data, episodeSelector );
        displayEpisodes(data,episodesSection) })
    
  })
}

function onSearchEvent(event){
  const selectorOption = document.querySelector(`.selector-list-episodes`); //selector-list-episodes
  const initialSelectorOption = document.querySelector('.first-option-episodes').value; // first-option-episodes hardcoded
  const text = document.querySelector('.search-text');
  const episodesSection = document.querySelector('.episodes-section');
  const searchValue = event.target.value.toLowerCase();
  filteredEpisodes = filterEpisodeListByWord(searchValue);
  text.innerHTML = `Displaying ${ filteredEpisodes.length } / ${allEpisodes.length} `;
  selectorOption.value = initialSelectorOption;
  episodesSection.innerHTML = '';
  displayEpisodes(filteredEpisodes, episodesSection);
}

function onEpisodeSelectEvent(event){
  const searchInput = document.querySelector('.input-search');
  const text = document.querySelector('.search-text');
  const episodesSection = document.querySelector('.episodes-section');  
  searchInput.value = '';
  let optionValue = event.target.value.toLowerCase();
  // console.log(optionValue)
  filteredEpisodes = filterEpisodeListByOption(optionValue);
  text.innerHTML = `Displaying ${ filteredEpisodes.length } / ${allEpisodes.length} `;
  episodesSection.innerHTML = '';
  displayEpisodes(filteredEpisodes, episodesSection);

}

function filterEpisodeListByWord(word){
  
  return allEpisodes.filter(episode => !episode.summary  ? episode.name.toLowerCase().includes(word.trim()) : episode.summary.toLowerCase().includes(word.trim()) || episode.name.toLowerCase().includes(word.trim()));
  
}
function filterEpisodeListByOption(option){
  //10 on line 251 represents the first letters after the title was formated with seasonEpisodeFormat()   eg: S01 E01 - 
  const firstOption = document.querySelector('.first-option-episodes').value.toLowerCase();
  option = option !== firstOption ? option.split('').splice(10).join('') : option;
  return allEpisodes.filter(episode => option === firstOption ? allEpisodes : option.toLowerCase() === episode.name.toLowerCase());
}

function seasonEpisodeFormat(seasonNr){
  return seasonNr < 10 ? '0' + seasonNr : seasonNr;
}

function displayEpisodes(episodeList, parentNode){
  episodeList.forEach(episode => {
    let image = episode.image ? episode.image.original : 'https://mu-property.com/wp-content/themes/realestate-7/images/no-image.png';
    let summary = episode.summary ? episode.summary : "<p>Description available soon</p>";
    parentNode.appendChild(createEpisodeCard(episode.name, episode.season, episode.number, image , summary));
  })
}



window.onload = setup;
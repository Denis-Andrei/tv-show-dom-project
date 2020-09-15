//You can edit ALL of the code here
let allShows = alphabeticalSort(getAllShows());
let allEpisodes; 

const rootElem = document.getElementById("root");

function setup() {
  fetch('https://api.tvmaze.com/shows/82/episodes')
  .then(res => res.json())
  .then(data => {
    allEpisodes = data;
    makePageForEpisodes(allEpisodes);

  })
  .catch(err => alert(err))

  
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


function makePageForEpisodes() {
  
  rootElem.appendChild(createHeroSection())
  rootElem.appendChild(createShowInputsSection())
  // rootElem.appendChild(createInputsSection(episodeList))
  // rootElem.appendChild(createEpisodesSection(episodeList))
  rootElem.appendChild(createShowsSection(allShows));
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
  const goBackButton = document.createElement('button');
  

  inputsSection.setAttribute('class', 'inputs-section');
  inputSearch.setAttribute('type', 'search');
  inputSearch.setAttribute('class', 'input-search');
  inputSearch.setAttribute('placeholder', 'Search...');
  goBackButton.setAttribute('class', 'btn');
  // goBackButton.setAttribute('onClick', goBack);
  goBackButton.innerHTML = `Main Page`;
 
  text.setAttribute('class', 'search-text');
  text.innerHTML = `Displaying ${ episodeList.length } / ${allEpisodes.length} `;
 
   //first parameter hardcoded 
  let episodeSelector = createSelector('episodes', allEpisodes); //first parameter hardcoded 

  // showSelector.addEventListener('change', onShowSelectEvent);
  inputSearch.addEventListener('keyup', onSearchEvent);

  episodeSelector.addEventListener('change', onEpisodeSelectEvent);
  goBackButton.addEventListener('click', goBack);

  inputsSection.appendChild(goBackButton);
  inputsSection.appendChild(episodeSelector);
  inputsSection.appendChild(inputSearch);
  inputsSection.appendChild(text);

  return inputsSection;
}

function goBack(){
  console.log('hsdajfdsjf')
  rootElem.innerHTML = '';
  makePageForEpisodes();
  
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
  const showsSection = document.querySelector('.shows-section');
  const showInputsSection = document.querySelector('.show-inputs-section');
  const searchInput = document.querySelector('.input-search');
  const episodeSelector = document.querySelector('.selector-list-episodes');
  const text = document.querySelector('.search-text');
  
  allShows.forEach(item => {
    if(item.name === event.target.value)
      fetch(`https://api.tvmaze.com/shows/${item.id}/episodes`)
      .then(res => res.json())
      .then(data => {
        showsSection.remove();
        showInputsSection.remove();
        allEpisodes = data;
        console.log(data);
        text.innerHTML = `Displaying ${ allEpisodes.length } / ${allEpisodes.length} `;
        searchInput ? searchInput.value = '' : '';
        episodeSelector ? episodeSelector.innerHTML = '' : '';
        episodesSection ? episodesSection.innerHTML = '' : '';
        // populateSelector('episodes', data, episodeSelector );
        // displayEpisodes(data,episodesSection) 
        // rootElem.appendChild(createInputsSection(allEpisodes))
        // rootElem.appendChild(createEpisodesSection(allEpisodes))
        rootElem.insertBefore(createInputsSection(allEpisodes), rootElem.children[1]);
        rootElem.insertBefore(createEpisodesSection(allEpisodes), rootElem.children[2]);
      
      })
    
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



/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
function createShowsSection(allShows){
  const showsSection = document.createElement('div');
  showsSection.setAttribute('class', 'shows-section');

  displayShows(allShows, showsSection);
  return showsSection;
}

function displayShows(showList, parentNode){
  showList.forEach(show => {
    let image = show.image ? show.image.original : 'https://mu-property.com/wp-content/themes/realestate-7/images/no-image.png';
    let summary = show.summary ? show.summary : "<p>Description available soon</p>";
    parentNode.appendChild(createShowCard(show));
  })
}

function createShowCard(show){
  const showCard = document.createElement('div');
  const showImg = document.createElement('img');
  const showContainerRight = document.createElement('div');
  const showTitle = document.createElement('h2');
  const showInfo = document.createElement('div');
  const showRuntime = document.createElement('div');
  const showGenres = document.createElement('div');
  const showStatus = document.createElement('div');
  const showSummary = document.createElement('p');

  const showRating= document.createElement('div');
  const showRatingImg= document.createElement('img');
  const showRatingNumber= document.createElement('p');

  showCard.setAttribute('class', 'show');
  show.image ? showImg.setAttribute('src', show.image.original) : showImg.setAttribute('src', 'https://mu-property.com/wp-content/themes/realestate-7/images/no-image.png');
  
  showImg.setAttribute('class', 'show-img');
  showContainerRight.setAttribute('class', 'show-container-right')


  showTitle.textContent = show.name;
  showTitle.setAttribute('class', 'show-title');

  showInfo.setAttribute('class', 'show-info');
  showRuntime.setAttribute('class', 'show-runtime');
  showRuntime.textContent = `${show.runtime} min`;

  show.genres.length > 0 ? show.genres.forEach((genre,i) => i === show.genres.length - 1 ? showGenres.textContent += `${genre}` : showGenres.textContent += `${genre} | `) : showGenres.textContent = 'No data available';
  showGenres.setAttribute('class', 'show-genres');
 
  showStatus.setAttribute('class', 'show-status');
  showStatus.textContent = show.status;

  showSummary.innerHTML = show.summary;
  showSummary.setAttribute('class', 'show-summary');

  showRating.setAttribute('class', 'show-rating');
  showRatingImg.setAttribute('class', 'show-rating-img');
  showRatingImg.setAttribute('src', './star.svg');
  showRatingNumber.setAttribute('class', 'show-rating-number');
  show.rating ? show.rating.average ? showRatingNumber.textContent = show.rating.average : '' : '';




  showInfo.appendChild(showRuntime);
  showInfo.appendChild(showGenres);
  showInfo.appendChild(showStatus);
  showRating.appendChild(showRatingImg);
  showRating.appendChild(showRatingNumber);

  showContainerRight.appendChild(showTitle);
  showContainerRight.appendChild(showInfo);
  showContainerRight.appendChild(showSummary);
  showContainerRight.appendChild(showRating);

  showCard.appendChild(showImg);
  showCard.appendChild(showContainerRight);


  return showCard;
}

function createShowInputsSection(){

  const showInputsSection = document.createElement('div');
  const showSearch = document.createElement('input');
  const text = document.createElement('p');
 
 
  showInputsSection.setAttribute('class', 'show-inputs-section');
  showSearch.setAttribute('class', 'show-input-search');
  showSearch.setAttribute('placeholder', 'Search...');
  showSearch.setAttribute('type', 'search');

  text.setAttribute('class', 'search-text');
  text.innerHTML = `Displaying ${ allShows.length } / ${allShows.length} `;

  let showSelector = createSelector('shows', allShows);
  // showSelector.addEventListener('click', showSelector);

  showSelector.addEventListener('change', onShowSelectEvent);


  showInputsSection.appendChild(showSelector);
  showInputsSection.appendChild(showSearch);
  showInputsSection.appendChild(text);

  return showInputsSection;
}

window.onload = setup;
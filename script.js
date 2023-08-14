const API_KEY = "4c67d263559fcfe44eeaa5180392b3fe";
const url = "https://gnews.io/api/v4/search?q=";

function reload(){
    window.location.reload();
}

window.addEventListener('load',() => fetchNews("India"));

async function fetchNews(query)
{
    const res= await fetch(`${url}${query}&lang=en&country=us&max=10&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function  bindData(articles){

    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML="";

    articles.forEach(article => {
        
        if(!article.image) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article) {

    console.log(article);

    const newsImg = cardClone.querySelector("#news-img");
    const title = cardClone.querySelector("#news-title");
    const source = cardClone.querySelector("#news-source");
    const description = cardClone.querySelector("#news-desc");

    newsImg.src=article.image;
    title.innerHTML=article.title;
    description.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",
    {timeZone : "Asia/Jakarta"});

    source.innerHTML = `${article.source.name}${date}`;

    newsImg.addEventListener("click", () => {
        window.open(article.url,"_blank");
    });
}

let curSelectiveNav = null;

function onclickNavItems(id){
    
    fetchNews(id);
    const navItem = document.getElementById(id);

    curSelectiveNav?.classList.remove("active");
    curSelectiveNav=navItem;
    curSelectiveNav.classList.add("active"); 
}


const searchButton = document.getElementById("search-button");
const searchtext =  document.getElementById("search-text");

searchButton.addEventListener("click",()=> {

    const query = searchtext.value;

    if(!query) return;
    fetchNews(query);

    curSelectiveNav?.classList.remove("active");
    curSelectiveNav= null;
});

import { getFavorites, initialiser,sauvegarderfavorites } from "./store.js";
import { renderPagination, rechercheFiltrer, renderCard, renderModule, renderFavs } from "./render.js";

let pageActuelle = 1;
const limit = 8;

const pagination = document.getElementById("pagination");
const btnClear = document.getElementById("clear");
const favMenu = document.getElementById("fav-menu");
const aside = document.getElementById("aside");


async function afficher(){
    const cinetrack = await initialiser();
    console.table(cinetrack);

    let filmFiltrer = cinetrack;

    let favList = getFavorites();

    const cards = document.getElementById("cards");

    const message = document.getElementById("message");

    function afficherMessage(text){
        message.textContent = text;
        message.classList.remove("hidden");

        setTimeout(() =>{
            message.classList.add("hidden");
        },3000);
    }

    function afficherPages(){
        const nbrPages = Math.ceil(filmFiltrer.length / limit);
        const pages = filmFiltrer.slice((pageActuelle - 1) * limit, pageActuelle * limit);

        renderPagination(pageActuelle,nbrPages);

        renderCard(pages,favList);

        const btnsFav = document.querySelectorAll(".btnFav");
        btnsFav.forEach(btnFav =>{
            btnFav.addEventListener("click",e =>{
                e.stopPropagation();
                const c = btnFav.closest(".cards");
                c.classList.toggle("fav");

                const img = c.querySelector("img").src;
                const title = c.querySelector("h3").textContent;
                const type = c.querySelector("[data-typefilm]").dataset.typefilm;

                const film ={
                    image : img,
                    title : title,
                    type : type
                }

                btnFav.innerHTML = `<i class="fa-solid fa-heart" style="color: rgb(255, 0, 0);"></i>`;

                if(c.classList.contains("fav")){
                    if(!favList.some(fav => fav.title === title)){
                        favList.push(film);
                        afficherMessage(`${film.type === "movie" ? "Film" : "Série"} ajouté aux favoris`);
                    }
                }

                renderFavs(favList);
                sauvegarderfavorites(favList);
            });
        });
    }

    afficherPages();

    cards.addEventListener("click", (e) =>{
        const card =e.target.closest("[data-index]");
        if(!card) return;

        let id= card.dataset.index;
        let c = cinetrack.find(ca => ca.id == id);

        renderModule(c);
    });

    const search = document.getElementById("search");
    search.addEventListener("input",() =>{
        filmFiltrer = rechercheFiltrer(cinetrack);

        pageActuelle = 1;
        afficherPages();
    });

    const bouttons = document.querySelectorAll(".filter-btn");

    bouttons.forEach(btn =>{
        btn.addEventListener("click",() =>{
            filmFiltrer = rechercheFiltrer(cinetrack,btn.dataset.type);
            bouttons.forEach(b =>{
                b.classList.remove("bg-purple-700");
            })
            btn.classList.add("bg-purple-700");

            pageActuelle = 1;
            afficherPages();
        });
    });

    

    pagination.addEventListener("click",e =>{
        const btn = e.target.closest("[data-page]");
        if(!btn || btn.disabled) return;

        pageActuelle = Number(btn.dataset.page);

        afficherPages();
    });

    document.getElementById("fav-container").addEventListener("click", e =>{
        const btn = e.target.closest(".delete-fav");
        const title = btn.dataset.title;

        favList = favList.filter(fav => fav.title !== title);

        const cards = document.querySelectorAll(".cards");
        cards.forEach(card =>{
            const cardTitle = card.querySelector("h3").textContent;

            if(cardTitle === title){
                card.classList.remove("fav");
                afficherMessage("Favori supprimé !");

                const btnFav = card.querySelector(".btnFav");
                if(btnFav){
                    btnFav.innerHTML = `<i class="fa-regular fa-heart"></i>`;
                }
            }
        })

        sauvegarderfavorites(favList);
        renderFavs(favList);
    });

    btnClear.addEventListener("click", () =>{
        favList = [];
        sauvegarderfavorites(favList);

        renderFavs(favList);
    });

    renderFavs(favList);

    favMenu.addEventListener("click",e =>{
        e.preventDefault();
        aside.classList.toggle("hidden");
        const icon = favMenu.querySelector("#fav-menu i");
        if(icon.classList.contains("fa-heart")){
            icon.classList.replace("fa-heart","fa-x");
        }else{
            icon.classList.replace("fa-x","fa-heart");
        }
    });
}

afficher();
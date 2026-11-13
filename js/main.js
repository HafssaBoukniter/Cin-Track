import { initialiser } from "./store.js";
import { renderPagination, rechercheFiltrer, renderCard, renderModule } from "./render.js";

let pageActuelle = 1;
const limit = 8;

const pagination = document.getElementById("pagination");

async function afficher(){
    const cinetrack = await initialiser();
    console.table(cinetrack);

    let filmFiltrer = cinetrack;

    const cards = document.getElementById("cards");

    function afficherPages(){
        const nbrPages = Math.ceil(filmFiltrer.length / limit);
        const pages = filmFiltrer.slice((pageActuelle - 1) * 8, pageActuelle * 8);

        renderPagination(pageActuelle,nbrPages);

        renderCard(pages);
    }

    afficherPages();

    cards.addEventListener("click", (e) =>{
            
        const card =e.target.closest("[data-index]")
        let id= card.dataset.index
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
                b.classList.remove("bg-purple-600");
            })
            btn.classList.add("bg-purple-600");

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
}
    

afficher();
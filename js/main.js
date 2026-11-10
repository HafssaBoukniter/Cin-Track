import { initialiser } from "./store.js";
import { rechercheFiltrer, renderCard, renderModule } from "./render.js";


async function afficher(){
    const cinetrack = await initialiser();
    console.table(cinetrack);

    renderCard(cinetrack);

    const cards = document.getElementById("cards");


        cards.addEventListener("click", (e) =>{
             
            const card =e.target.closest("[data-index]")
            let id= card.dataset.index
            let c = cinetrack.find(ca => ca.id == id);

            renderModule(c);
        });

        const search = document.getElementById("search");
        search.addEventListener("input",() =>{
            rechercheFiltrer(cinetrack);
        });

        const bouttons = document.querySelectorAll(".filter-btn");

        bouttons.forEach(btn =>{
            btn.addEventListener("click",() =>{
                rechercheFiltrer(cinetrack,btn.dataset.type);
                bouttons.forEach(b =>{
                    b.classList.remove("bg-purple-600");
                })
                btn.classList.add("bg-purple-600");
            });
        });
    }
    

afficher();
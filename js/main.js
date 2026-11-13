import { initialiser } from "./store.js";
import { renderCard, renderModule } from "./render.js";


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
    }
    

afficher();
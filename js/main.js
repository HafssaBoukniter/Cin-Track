import { initialiser } from "./store.js";
import { renderCard } from "./render.js";


async function afficher(){
    const cinetrack = await initialiser();

    console.table(cinetrack);

    renderCard(cinetrack);
}

afficher();
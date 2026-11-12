export async function initialiser() {
    try {
        const data = localStorage.getItem("cinetrack");

        if (data !== null) {
            return JSON.parse(data);
        }

        const response = await fetch("https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json");

        if (!response.ok) {
            throw new Error("error");
        }

        const cinetrack = await response.json();

        sauvegarder(cinetrack);

        return cinetrack;
    } catch (error) {
        const errorEl = document.getElementById("error");

        errorEl.textContent = "Une erreur est survenue lors du chargement des données.";
        errorEl.classList.remove("hidden");

        return [];
    }
}

export function sauvegarder(cinetrack) {
    localStorage.setItem("cinetrack", JSON.stringify(cinetrack));
}

export function getFavorites(){
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function sauvegarderfavorites(favorites){
    localStorage.setItem("favorites",JSON.stringify(favorites));
}
export function renderCard(cinetrack,favList = []){
    const cards = document.getElementById("cards");

    cards.innerHTML = cinetrack.map(c =>{
        const {id,image,title,type,releaseYear} = c;
        const isFav = favList.some(fav => fav.title === title);

        return `
            <div id="card" data-index="${id}" class="cards bg-purple-900 border border-purple-800 rounded-xl overflow-hidden hover:border-purple-500 transition cursor-pointer">
                <div class="relative">
                    <img src=${image} class="w-full h-full object-cover">
                    <button id="btn-fav" data-id="${id}" class="btnFav absolute top-3 right-3 text-white text-xl hover:text-red-500 transition">
                        <i class="${isFav ? "fa-solid fa-heart text-red-500" : "fa-regular fa-heart"}"></i>
                    </button>
                </div>
                <div class="p-4">
                    <h3 class="text-white font-bold text-xl">${title}</h3>
                    <div class="flex justify-between item-center mt-3">
                        <span class="text-gray-400 text-sm">
                            <i class="fa-regular fa-calendar mr-1"></i>
                            ${releaseYear}
                        </span>
                        <span data-typefilm ="${type}" class="bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
                            ${type}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

export function renderModule(cinetrack){
    const module = document.getElementById("module");

    module.classList.remove("hidden");
    module.classList.add("fixed", "inset-0",  "z-50",  "bg-black/80", "backdrop-blur-sm", "flex", "items-center", "justify-center", "p-7");

    module.innerHTML = `
        <div  class="card relative bg-purple-900 border border-purple-600 items-center rounded-2xl w-full max-w-[90vh]">
            <button id="close-module" class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-purple-800 hover:bg-purple-600 transition">
                <i class="fa-solid fa-xmark text-xl"></i>
            </button>

            <h2 class="text-3xl text-center mt-3 font-bold mb-1.5">${cinetrack.title}</h2>

            <div id="module-body" class="p-6 flex items-center gap-4">
                <div>
                    <img src="${cinetrack.image}" class="w-full h-105 rounded-xl">
                </div>
                <div class="flex flex-col mb-6">
                    <div class="flex items-center gap-4 mb-6">
                        <span class="bg-purple-600 px-4 py-1 rounded-full text-sm">
                            ${cinetrack.type}
                        </span>
                        <span class="text-gray-300">
                            <i class="fa-regular fa-calendar mr-2"></i>
                            ${cinetrack.releaseYear}
                        </span>
                    </div>
                    ${cinetrack.type == "series" ? `
                        <div class="mb-4">
                            <p class="text-purple-400 font-semibold mb-1">
                                <i class="fa-solid fa-tv mr-2"></i>
                                seasons
                            </p>
                            <p class="text-gray-300">
                                ${cinetrack.seasons.join(", ")}
                            </p>
                        </div>
                    ` : `
                        <div class="mb-4">
                            <p class="text-purple-400 font-semibold mb-1">
                                <i class="fa-regular fa-clock"></i>
                                Duration
                            </p>
                            <p class="text-gray-300">
                                ${Math.floor(cinetrack.duration/60)} h ${Math.floor(cinetrack.duration%60)} min
                            </p>
                        </div>
                    `}
                    
                    <div class="mb-4">
                        <p class="text-purple-400 font-semibold mb-1">
                            <i class="fa-solid fa-tags mr-2"></i>
                            Genres
                        </p>
                        <p class="text-gray-300">
                            ${cinetrack.genres.join(", ")}
                        </p>  
                    </div>
                    <div class="mb-4">
                        <p class="text-purple-400 font-semibold mb-1">
                            <i class="fa-solid fa-user-tie mr-2"></i>
                            Directors
                        </p>
                        <p class="text-gray-300">
                            ${cinetrack.directors.join("")}
                        </p>  
                    </div>
                    <div class="mb-4">
                        <p class="text-purple-400 font-semibold mb-1">
                            <i class="fa-solid fa-globe mr-2"></i>
                            Production contries
                        </p>
                        <p class="text-gray-300">
                            ${cinetrack.productionCountries.join(" ")}
                        </p>  
                    </div>
                </div>
            </div>
            <div class="mb-4 px-5">
                <p class="text-purple-400 font-semibold mb-1">
                    Description
                </p>
                <p class="text-gray-300">
                    ${cinetrack.description}
                </p>  
            </div>
        </div>
    `;

    document.getElementById("close-module").addEventListener("click", ()=>{
        module.classList.add("hidden");
    })
};

export function rechercheFiltrer(cinetrack,typeBtn="tous"){
    const searchInput = document.getElementById("search").value.trim().toLowerCase();

    const ct = cinetrack.filter(c =>{
        const filtrerType = c.type === typeBtn || typeBtn === "tous";
        const rechercher = c.title.toLowerCase().includes(searchInput); 

        return rechercher && filtrerType;
    });
    return ct;
}



export function renderPagination(page,total){
    const pagination = document.getElementById("pagination");
   

    if(!pagination) return;
  
    if(total <= 1){
        pagination.innerHTML = "";
        return;
    }
    
    let pages = "";

    if(page > 1){
        pages += `
            <button type="button" data-page="${page - 1}" ${page <= 1 ? "disabled" : ""} class="px-4 py-2 rounded-lg bg-purple-400 text-white hover:bg-purple-600"><</button>
        `;
    }

    for(let i = 1; i <= total; i++){
        pages += `
            <button type="button" data-page="${i}" ${page == i ? "disabled" : ""} class="px-4 py-2 rounded-lg ${page === i ? "bg-purple-500" : "bg-purple-400"} text-white hover:bg-purple-600">${i}</button>
        `;
    }

    if(page < total){
        pages += `
            <button type="button" data-page="${page + 1}" ${page >= total ? "disabled" : ""} class="px-4 py-2 rounded-lg bg-purple-400 text-white hover:bg-purple-600">></button>
        `;
    }

    pagination.innerHTML = pages;
}

export function renderFavs(favs){
    const favContainer = document.getElementById("fav-container");
    const favImpty = document.getElementById("fav-impty");
    const favCount = document.getElementById("fav-count");
    const clear = document.getElementById("clear");
    const serieCount = document.getElementById("serie-count");
    const movieCount = document.getElementById("movie-count");

    favImpty.classList.toggle("hidden",favs.length > 0);
    clear.classList.toggle("hidden",favs.length === 0);
    favCount.textContent = favs.length;

    const result = favs.reduce((t,fav) =>{
        if(fav.type === "movie"){
            t.movie++
        }else{
            t.serie++
        }

        return t;
    },{
        movie:0,
        serie:0
    });

    movieCount.textContent = result.movie;
    serieCount.textContent = result.serie;

    return favContainer.innerHTML = favs.map(fav =>{
        return `
            <div id="fav-body" class="p-1 bg-purple-900 border border-purple-600 flex rounded-2xl justify-between mb-2">
                <img src="${fav.image}" class="w-15 h-20 p-1 object-cover rounded-xl">
                <div class="flex flex-col items-start flex-1 p-2">
                    <h2 class="text-md text-left font-bold mb-1.5">${fav.title}</h2>
                    <span class="bg-purple-600 px-3 py-1 rounded-full text-xs">
                        ${fav.type}
                    </span>
                </div>
                <button data-title = "${fav.title}" class="delete-fav text-white text-lg p-2 hover:text-black transition">
                    <i class="fa-solid fa-x"></i>
                </button>
            </div>
        `;
    }).join("");
}

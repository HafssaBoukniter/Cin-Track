export function renderCard(cinetrack){
    const cards = document.getElementById("cards");

    cards.innerHTML = cinetrack.map(c =>{
        const {id,image,title,type,releaseYear} = c;

        return `
            <div id="card" data-index="${id}" class="bg-purple-900 border border-purple-800 rounded-xl overflow-hidden hover:border-purple-500 transition cursor-pointer">
                <div class="relative">
                    <img src=${image} class="w-full h-64">
                    <button class="absolute top-3 right-3 text-white text-xl hover:text-red-500 transition">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
                <div class="p-4">
                    <h3 class="text-white font-bold text-xl">${title}</h3>
                    <div class="flex justify-between item-center mt-3">
                        <span class="text-gray-400 text-sm">
                            <i class="fa-regular fa-calendar mr-1"></i>
                            ${releaseYear}
                        </span>
                        <span class="bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
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

            <div id="module-body" class="p-6 flex items-center gap-4">
                <div>
                    <img src="${cinetrack.image}" class="w-full h-105 rounded-xl">
                </div>
                <div class="flex flex-col gap-4 mb-6">
                    <h2 class="text-3xl font-bold mb-3">${cinetrack.title}</h2>
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
                    ` : ""}
                    
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


export function renderCard(cinetrack){
    const cards = document.getElementById("cards");

    cards.innerHTML = cinetrack.map(c =>{
        const {image,title,type,releaseYear} = c;

        return `
            <div class="bg-purple-900 border border-purple-800 rounded-xl overflow-hidden hover:border-purple-500 transition cursor-pointer">
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
let mods = [];

let currentCategory = "all";


async function loadMods() {

    const response = await fetch("mods.json");

    mods = await response.json();

    renderMods();

}


function renderMods() {

    const grid =
        document.getElementById("modsGrid");

    const search =
        document
            .getElementById("search")
            .value
            .toLowerCase()
            .trim();


    const filtered = mods.filter(mod => {

        const categoryMatch =
            currentCategory === "all" ||
            mod.category === currentCategory;

        const searchMatch =
            mod.name.toLowerCase().includes(search) ||
            mod.brand.toLowerCase().includes(search) ||
            mod.model.toLowerCase().includes(search);

        return categoryMatch && searchMatch;

    });


    grid.innerHTML = "";


    filtered.forEach(mod => {

        const card =
            document.createElement("article");

        card.className = "mod-card";


        card.innerHTML = `

            <div class="mod-image">

                ${
                    mod.image

                    ?

                    `<img
                        src="${mod.image}"
                        alt="${mod.name}"
                    >`

                    :

                    `<div class="placeholder">
                        ${mod.name}
                    </div>`
                }

            </div>


            <div class="mod-info">

                <div class="category">
                    ${mod.category.toUpperCase()}
                </div>


                <h3>
                    ${mod.name}
                </h3>


                <p>
                    ${mod.description}
                </p>


                <div class="mod-bottom">

                    <span>
                        ⭐ ${mod.rating}
                    </span>

                    <span>
                        ${mod.downloads} downloads
                    </span>

                </div>


                <div class="download">
                    VIEW MOD
                </div>

            </div>

        `;


        /*
         * Вся картка відкриває
         * сторінку мода
         */

        card.addEventListener(
            "click",
            () => {

                window.location.href =
                    `mod.html?id=${mod.id}`;

            }
        );


        grid.appendChild(card);

    });

}


function filterMods(category, button) {

    currentCategory = category;

    document
        .querySelectorAll(".filter button")
        .forEach(btn => {
            btn.classList.remove("active");
        });

    button.classList.add("active");

    renderMods();
}


function searchMods() {

    renderMods();

}


document
    .getElementById("search")
    .addEventListener(
        "input",
        renderMods
    );


loadMods();

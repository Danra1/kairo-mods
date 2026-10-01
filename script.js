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
            mod.name
                .toLowerCase()
                .includes(search) ||

            mod.brand
                .toLowerCase()
                .includes(search);

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
                    `<img src="${mod.image}"
                          alt="${mod.name}">`
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


                <a
    href="mod.html?id=${mod.id}"
    class="download"
>
    VIEW MOD
</a>

            </div>

        `;


        grid.appendChild(card);

    });

}


function filterMods(category) {

    currentCategory = category;

    document
        .querySelectorAll(".filter button")
        .forEach(button => {
            button.classList.remove("active");
        });


    event.target.classList.add("active");

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

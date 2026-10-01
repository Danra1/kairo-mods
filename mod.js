async function loadMod() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        params.get("id");


    if (!id) {

        showError(
            "Mod not found."
        );

        return;

    }


    const response =
        await fetch("mods.json");


    const mods =
        await response.json();


    const mod =
        mods.find(
            item => item.id === id
        );


    if (!mod) {

        showError(
            "Mod not found."
        );

        return;

    }


    document.title =
        `${mod.name} — KAIRO Mods`;


    renderMod(mod);

}



function renderMod(mod) {

    const page =
        document.getElementById(
            "modPage"
        );


    page.innerHTML = `

        <section class="mod-hero">


            <div class="mod-hero-image">

                ${
                    mod.image

                    ?

                    `<img
                        src="${mod.image}"
                        alt="${mod.name}"
                    >`

                    :

                    `<div class="big-placeholder">
                        ${mod.name}
                    </div>`
                }

            </div>



            <div class="mod-hero-info">


                <div class="category">

                    ${mod.category.toUpperCase()}

                </div>


                <h1>

                    ${mod.name}

                </h1>


                <p class="mod-description">

                    ${mod.description}

                </p>


                <div class="mod-stats">


                    <div>

                        <span>
                            RATING
                        </span>

                        <strong>
                            ⭐ ${mod.rating}
                        </strong>

                    </div>


                    <div>

                        <span>
                            DOWNLOADS
                        </span>

                        <strong>
                            ${mod.downloads}
                        </strong>

                    </div>


                    <div>

                        <span>
                            VERSION
                        </span>

                        <strong>
                            ${mod.version}
                        </strong>

                    </div>


                </div>


                <a
                    href="${mod.modsfire}"
                    target="_blank"
                    rel="noopener"
                    class="big-download"
                >

                    DOWNLOAD MOD

                    <small>
                        VIA MODSFIRE
                    </small>

                </a>


            </div>


        </section>



        <section class="mod-details">


            <div class="details-content">


                <h2>
                    About this mod
                </h2>


                <p>

                    ${mod.description}

                </p>


                <h2>
                    Mod information
                </h2>


                <div class="info-grid">


                    <div>
                        <span>
                            CATEGORY
                        </span>

                        <strong>
                            ${mod.category}
                        </strong>
                    </div>


                    <div>
                        <span>
                            BRAND
                        </span>

                        <strong>
                            ${mod.brand}
                        </strong>
                    </div>


                    <div>
                        <span>
                            YEAR
                        </span>

                        <strong>
                            ${mod.year}
                        </strong>
                    </div>


                    <div>
                        <span>
                            VERSION
                        </span>

                        <strong>
                            ${mod.version}
                        </strong>
                    </div>


                </div>


            </div>


        </section>

    `;

}



function showError(message) {

    document.getElementById(
        "modPage"
    ).innerHTML = `

        <section class="error-page">

            <h1>
                404
            </h1>

            <p>
                ${message}
            </p>

            <a
                href="index.html"
                class="download"
            >
                BACK TO MODS
            </a>

        </section>

    `;

}


loadMod();

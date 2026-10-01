async function loadMod() {

    const params = new URLSearchParams(
        window.location.search
    );

    const id = params.get("id");

    if (!id) {
        showError("Mod not found.");
        return;
    }

    try {

        const response = await fetch("mods.json");

        if (!response.ok) {
            throw new Error("Failed to load mods.json");
        }

        const mods = await response.json();

        const mod = mods.find(
            item => item.id === id
        );

        if (!mod) {
            showError("Mod not found.");
            return;
        }

        document.title =
            `${mod.name} — KAIRO Mods`;

        renderMod(mod);

    } catch (error) {

        console.error(error);

        showError("Unable to load mod.");

    }
}


function renderMod(mod) {

    const page =
        document.getElementById("modPage");


    /*
     * SCREENSHOTS
     */

    const screenshots =
        mod.screenshots || [];


    const gallery =
        screenshots.length > 0

        ?

        `
        <h2>
            Screenshots
        </h2>

        <div class="screenshots">

            ${screenshots.map(image => `

                <div class="screenshot">

                    <img
                        src="${image}"
                        alt="${mod.name} screenshot"
                        loading="lazy"
                    >

                </div>

            `).join("")}

        </div>
        `

        :

        "";


    /*
     * TAGS
     */

    const tags =
        mod.tags || [];


    const tagsHTML =
        tags.length > 0

        ?

        `
        <div class="tags">

            ${tags.map(tag => `

                <span class="tag">
                    ${tag}
                </span>

            `).join("")}

        </div>
        `

        :

        "";


    /*
     * FEATURES
     */

    const features =
        mod.features || [];


    /*
     * CHANGELOG
     */

    const changelog =
        mod.changelog || [];


    /*
     * INSTALLATION
     */

    const installation =
        mod.installation || [];


    page.innerHTML = `

        <!-- BACK -->

        <div class="mod-back">

            <a href="index.html">

                ← BACK TO MODS

            </a>

        </div>


        <!-- HERO -->

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


                ${tagsHTML}


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
                    rel="noopener noreferrer"
                    class="big-download"
                >

                    <span>
                        DOWNLOAD MOD
                    </span>

                    <small>
                        VIA MODSFIRE
                    </small>

                </a>


            </div>


        </section>



        <!-- DETAILS -->

        <section class="mod-details">


            <div class="details-content">


                <!-- ABOUT -->

                <h2>
                    About this mod
                </h2>


                <p>
                    ${mod.description}
                </p>



                <!-- MOD INFORMATION -->

                <h2>
                    Mod Information
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
                            MODEL
                        </span>

                        <strong>
                            ${mod.model}
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


                    <div>

                        <span>
                            GAME VERSION
                        </span>

                        <strong>
                            ${mod.gameVersion}
                        </strong>

                    </div>


                    <div>

                        <span>
                            AUTHOR
                        </span>

                        <strong>
                            ${mod.author}
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


                    ${
                        mod.fileSize

                        ?

                        `
                        <div>

                            <span>
                                FILE SIZE
                            </span>

                            <strong>
                                ${mod.fileSize}
                            </strong>

                        </div>
                        `

                        :

                        ""
                    }


                    ${
                        mod.fileFormat

                        ?

                        `
                        <div>

                            <span>
                                FORMAT
                            </span>

                            <strong>
                                ${mod.fileFormat}
                            </strong>

                        </div>
                        `

                        :

                        ""
                    }


                    ${
                        mod.lastUpdated

                        ?

                        `
                        <div>

                            <span>
                                UPDATED
                            </span>

                            <strong>
                                ${mod.lastUpdated}
                            </strong>

                        </div>
                        `

                        :

                        ""
                    }


                </div>



                <!-- SPECIFICATIONS -->

                <h2>
                    Specifications
                </h2>


                <div class="specs">


                    <div>

                        <span>
                            ENGINE
                        </span>

                        <strong>
                            ${mod.engine}
                        </strong>

                    </div>


                    <div>

                        <span>
                            POWER
                        </span>

                        <strong>
                            ${mod.power}
                        </strong>

                    </div>


                    <div>

                        <span>
                            DRIVE
                        </span>

                        <strong>
                            ${mod.drive}
                        </strong>

                    </div>


                </div>



                <!-- FEATURES -->

                ${
                    features.length > 0

                    ?

                    `

                    <h2>
                        Features
                    </h2>


                    <div class="features">

                        ${features.map(feature => `

                            <div class="feature">

                                ✓ ${feature}

                            </div>

                        `).join("")}

                    </div>

                    `

                    :

                    ""
                }



                <!-- SCREENSHOTS -->

                ${gallery}



                <!-- INSTALLATION -->

                ${
                    installation.length > 0

                    ?

                    `

                    <h2>
                        Installation
                    </h2>


                    <div class="installation">

                        ${installation.map((step, index) => `

                            <div class="installation-step">

                                <span>
                                    ${String(index + 1).padStart(2, "0")}
                                </span>

                                <p>
                                    ${step}
                                </p>

                            </div>

                        `).join("")}

                    </div>

                    `

                    :

                    ""
                }



                <!-- CHANGELOG -->

                ${
                    changelog.length > 0

                    ?

                    `

                    <h2>
                        Changelog
                    </h2>


                    <div class="changelog">

                        ${changelog.map(change => `

                            <div>
                                • ${change}
                            </div>

                        `).join("")}

                    </div>

                    `

                    :

                    ""
                }



                <!-- FINAL DOWNLOAD -->

                <a
                    href="${mod.modsfire}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="final-download"
                >

                    <strong>
                        DOWNLOAD ${mod.name.toUpperCase()}
                    </strong>

                    <span>
                        VIA MODSFIRE →
                    </span>

                </a>


            </div>

        </section>

    `;
}



function showError(message) {

    document.getElementById("modPage").innerHTML = `

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
document.addEventListener("click", function(event) {

    const image = event.target.closest(".screenshot img");

    if (!image) return;

    openLightbox(image);

});


function openLightbox(clickedImage) {

    const images = [
        ...document.querySelectorAll(".screenshot img")
    ];

    const currentIndex =
        images.indexOf(clickedImage);


    const overlay =
        document.createElement("div");

    overlay.className = "lightbox";


    overlay.innerHTML = `

        <button class="lightbox-close">
            ×
        </button>

        <button class="lightbox-prev">
            ←
        </button>

        <div class="lightbox-content">

            <img
                src="${clickedImage.src}"
                alt="${clickedImage.alt}"
            >

        </div>

        <button class="lightbox-next">
            →
        </button>

    `;


    document.body.appendChild(overlay);

    document.body.style.overflow = "hidden";


    let index = currentIndex;


    const lightboxImage =
        overlay.querySelector(
            ".lightbox-content img"
        );


    function updateImage() {

        if (index < 0) {
            index = images.length - 1;
        }

        if (index >= images.length) {
            index = 0;
        }

        lightboxImage.src =
            images[index].src;

        lightboxImage.alt =
            images[index].alt;

    }


    overlay
        .querySelector(".lightbox-prev")
        .addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                index--;

                updateImage();

            }
        );


    overlay
        .querySelector(".lightbox-next")
        .addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                index++;

                updateImage();

            }
        );


    overlay
        .querySelector(".lightbox-close")
        .addEventListener(
            "click",
            closeLightbox
        );


    overlay.addEventListener(
        "click",
        function(event) {

            if (
                event.target === overlay
            ) {

                closeLightbox();

            }

        }
    );


    function closeLightbox() {

        overlay.remove();

        document.body.style.overflow = "";

        document.removeEventListener(
            "keydown",
            keyboardNavigation
        );

    }


    function keyboardNavigation(event) {

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowLeft") {

            index--;

            updateImage();

        }

        if (event.key === "ArrowRight") {

            index++;

            updateImage();

        }

    }


    document.addEventListener(
        "keydown",
        keyboardNavigation
    );

}

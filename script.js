const cards = document.querySelectorAll(".mod-card");
const searchInput = document.getElementById("search");


function filterMods(category) {

    cards.forEach(card => {

        const cardCategory =
            card.dataset.category;

        if (
            category === "all" ||
            cardCategory === category
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}


function searchMods() {

    const query =
        searchInput.value
            .toLowerCase()
            .trim();

    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        if (text.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}


searchInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            searchMods();
        }

    }
);

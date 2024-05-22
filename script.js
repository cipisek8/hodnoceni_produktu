/*
****            = nejspis bude tezke, nechat na konec
--------------- = hotovo
/-/-/-/-/-/-/-/ = castecne hotovo
/////////////// = pracuju prave ted

celkove hodnoceni
    aktualizace pri zmene hodnoceni /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-
    zmena obrazku pri specifickych procentech (0-20, 21-40, 41-60, 61-80, 81-100) ------------------
    aktualizace procent ----------------------------------------------------------------------------
    casti hvezd ****

zaridici tlacitka
    seradi produkty podle hodnoceni ----------------------------------------------------------------

produkt
    hvezdy
        prejizdeni = rozsviceni --------------------------------------------------------------------
        vyjeti = zhasnuti --------------------------------------------------------------------------
        click = locknuti, dokud zase neprejedu -----------------------------------------------------
    tlacitka
        pridat hodnoceni - prida .add_review, po tlacitku Odeslat zmizi --------------------------
        smazat - smaze produkt ---------------------------------------------------------------------
        zobrazit recenze - otevre <aside>

nacist dalsi
    nacte dalsi produkty

aside
    dat pozadi na zbytek stranky
    zmeni hodnoceni/obrazek podle produktu
    zmeni komentare podle produktu
    ulozeni like, zmena like
*/


totalHappiness();
addEvents();

function totalHappiness() {
    let percents = document.querySelectorAll(".object_percent");
    let total = 0;
    for (let percent of percents) {
        total += parseInt(percent.innerText);
    }
    let average = Math.round(total / percents.length);

    document.getElementById("total_percent").innerText = average;

    let stars = document.querySelectorAll("#product_happiness .stars img");
    let rating_img = document.querySelector("#product_happiness .rating_img");

    switch (Math.ceil(average / 20)) {
        case 5:
            for (let star of stars) {
                star.src = "img/Full_Star.webp";
            }
            rating_img.src = "img/Zenith.webp";
            break;

        case 4:
            for (let star of stars) {
                star.src = "img/Empty_Star.webp";
            }
            for (let i = 0; i < 4; i++) {
                stars[i].src = "img/Full_Star.webp";
            }
            rating_img.src = "img/Terra_Blade.webp";
            break;

        case 3:
            for (let star of stars) {
                star.src = "img/Empty_Star.webp";
            }
            for (let i = 0; i < 3; i++) {
                stars[i].src = "img/Full_Star.webp";
            }
            rating_img.src = "img/True_Excalibur.webp";
            break;

        case 2:
            for (let star of stars) {
                star.src = "img/Empty_Star.webp";
            }
            for (let i = 0; i < 2; i++) {
                stars[i].src = "img/Full_Star.webp";
            }
            rating_img.src = "img/Night's_Edge.webp";
            break;

        case 1:
            for (let star of stars) {
                star.src = "img/Empty_Star.webp";
            }
            for (let i = 0; i < 1; i++) {
                stars[i].src = "img/Full_Star.webp";
            }
            rating_img.src = "img/Copper_Shortsword.webp";
            break;
    }
}

function addEvents() {
    for (let star of document.querySelectorAll(".stars_product img")) {
        star.addEventListener("click", changeStarClick);
        star.addEventListener("mouseleave", changeStarOut);
        star.addEventListener("mouseenter", changeStarOver);
    }

    for (let button of document.querySelectorAll(".delete_item"))
        button.addEventListener("click", deleteProduct);

    for (let button of document.querySelectorAll(".add_review_button"))
        button.addEventListener("click", addReview);
}

function changeStarOver() {
    let stars = this.parentElement.children;
    for (let star of stars) {
        star.src = "img/Empty_Star.webp";
    }
    for (let i = 0; i < this.classList[0]; i++) {
        stars[i].src = "img/Full_Star.webp";
    }
}

function changeStarOut() {
    let stars = this.parentElement.children;
    for (let star of stars) {
        star.src = "img/Empty_Star.webp";
    }
    for (let i = 0; i < Math.ceil(parseInt(this.parentElement.parentElement.children[1].children[0].innerText) / 20); i++) {
        stars[i].src = "img/Full_Star.webp";
    }
}

function changeStarClick() {
    let percent = 0;
    for (let star of this.parentElement.children) {
        if (star.src.includes("Full_Star.webp"))
            percent += 20;
    }
    this.parentElement.parentElement.children[1].children[0].innerText = percent;
}

function sortProductsAscending() {
    let productContainer = document.querySelector("#product_container");
    let products = productContainer.children;
    let highestItem = [-1, -1] //[index, value]
    for (let i = 0; i < products.length; i++) {
        highestItem = [-1, -1];
        for (let y = 0; y < (products.length - i); y++) {
            let productPercent = parseInt(products[y].children[0].children[2].children[1].children[0].innerText);
            if (productPercent >= highestItem[1]) {
                highestItem = [y, productPercent];
            }
        }
        productContainer.appendChild(products[highestItem[0]]);
    }
}

function sortProductsDescending() {
    let productContainer = document.querySelector("#product_container");
    let products = productContainer.children;
    let lowestItem = [-1, 101] //[index, value]
    for (let i = 0; i < products.length; i++) {
        lowestItem = [-1, 101];
        for (let y = 0; y < (products.length - i); y++) {
            let productPercent = parseInt(products[y].children[0].children[2].children[1].children[0].innerText);
            if (productPercent <= lowestItem[1]) {
                lowestItem = [y, productPercent];
            }
        }
        productContainer.appendChild(products[lowestItem[0]]);
    }
}

function deleteProduct() {
    this.parentElement.parentElement.parentElement.remove();
}

function addReview() {
    let product = this.parentElement.parentElement.parentElement;
    if (product.children.length == 1) {
        let reviewContainer = document.createElement("div");
        reviewContainer.classList.add("add_review");

        let textBox = document.createElement("textarea");
        textBox.placeholder = "Hodnocení produktu...";
        textBox.classList.add("write_review");
        reviewContainer.appendChild(textBox);

        let submitButton = document.createElement("button");
        submitButton.class = "submit_review";
        submitButton.innerText = "Odeslat";
        submitButton.addEventListener("click", submitReview)
        reviewContainer.appendChild(submitButton);

        product.appendChild(reviewContainer);
    }
    else
        product.children[1].remove();
}

function submitReview() {
    let productId = this.parentElement.parentElement.children[0].children[1].children[1].innerText.slice(16);
    window.localStorage.setItem(`review_product_${productId}`, this.parentElement.children[0].value);
    this.parentElement.remove();
}

///////////////////////////////////// pro spolupraci autocomplete
document.querySelector().parentElement.children.
    parseInt()
"ssseeefggg".includes
this.parentElement.parentElement.parentElement;
/////////////////////////////////////
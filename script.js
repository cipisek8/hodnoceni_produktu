/*
****            = nejspis bude tezke, nechat na konec
--------------- = hotovo
/-/-/-/-/-/-/-/ = castecne hotovo
/////////////// = pracuju prave ted

celkove hodnoceni
    aktualizace pri zmene hodnoceni ----------------------------------------------------------------
    zmena obrazku pri specifickych procentech (0-20, 21-40, 41-60, 61-80, 81-100) ------------------
    aktualizace procent ----------------------------------------------------------------------------
    casti hvezd ****

zaridici tlacitka
    seradi produkty podle hodnoceni ----------------------------------------------------------------

produkt
    hvezdy -----------------------------------------------------------------------------------------
        prejizdeni = rozsviceni --------------------------------------------------------------------
        vyjeti = zhasnuti --------------------------------------------------------------------------
        click = locknuti, dokud zase neprejedu -----------------------------------------------------
        hover - pres css - ~ - vsechny za tim //////////////////////////////////////////////////////
    tlacitka
        pridat hodnoceni - prida .add_review, po tlacitku Odeslat zmizi /-/-/-/-/-/-/-/-/-/-/-/-/-/-
            hodnoceni bude v u ostatnich komentaru
        smazat - smaze produkt ---------------------------------------------------------------------
        zobrazit recenze - otevre <aside> ----------------------------------------------------------

nacist dalsi
    nacte dalsi produkty ---------------------------------------------------------------------------

aside
    dat pozadi na zbytek stranky
    zmeni hodnoceni/obrazek podle hodnoceni produktu
    zmeni komentare podle produktu
    ulozeni like, zmena like
    muj komentar nacteny z local storage, bez like

plan aside
    eventlistener, this (prejeti na product. class cislo)
    predani do metody otevirani aside
    kalkulace recenze z komentaru
        aktualizace obrazku
    ukladani like do local storage

reforma
    zmenit cely kod aby pouzival localstorage ------------------------------------------------------
        ukladat jako array/json
    zadny this.parentElemnt.children[0]
    nepridavat eventy vsemu vzdy
    hlaska s zadnymy produkty
    sort - existuje metoda
*/

const productList = [
    { imgSrc: "Dirt_Rod.webp", name: "Dirt rod", id: 114, rating: window.localStorage.getItem(`review_product_my_rating_${114}`) },
    { imgSrc: "Ice_Rod.webp", name: "Ice rod", id: 496, rating: window.localStorage.getItem(`review_product_my_rating_${496}`) },
    { imgSrc: "Rod_of_Discord.webp", name: "Rod of Discord", id: 1326, rating: window.localStorage.getItem(`review_product_my_rating_${1326}`) },
    { imgSrc: "Rainbow_Rod.webp", name: "Rainbow Rod", id: 495, rating: window.localStorage.getItem(`review_product_my_rating_${495}`) },
    { imgSrc: "Actuation_Rod.webp", name: "Actuation Rod", id: 362, rating: window.localStorage.getItem(`review_product_my_rating_${362}`) },
    { imgSrc: "Crimson_Rod.webp", name: "Crimson Rod", id: 1256, rating: window.localStorage.getItem(`review_product_my_rating_${1256}`) },
    { imgSrc: "Nimbus_Rod.webp", name: "Nimbus Rod", id: 1244, rating: window.localStorage.getItem(`review_product_my_rating_${1244}`) }
]

const reviewList = [
    [
        { imgSrc: "Map_Icon_Moon_Lord.webp", name: "Moon Lord", rating: 100, comment: "Best dirt moving tool ever!", liked: window.localStorage.getItem(`comment_product_${productList[0].id}_comment_${0}`) },
        { imgSrc: "Map_Icon_Eye_of_Cthulhu.webp", name: "Eye of Cthulhu", rating: 20, comment: "Nejhorší věc, co jsem kdy viděl. Co na tom ostatní vidí???", liked: window.localStorage.getItem(`comment_product_${productList[0].id}_comment_${1}`) }
    ],
    [

    ],
    [

    ],
    [

    ],
    [

    ],
    [

    ],
    [

    ]
]

addEvents();
addProducts();
totalHappiness();

// window.localStorage.setItem(`comment_product_${productList[0].id}_comment_${0}`, true);

function totalHappiness() {
    let percents = document.querySelectorAll(".object_percent");
    let total = 0;
    for (let percent of percents) {
        total += parseInt(percent.innerText);
    }
    let average = Math.round(total / percents.length);

    document.getElementById("total_percent").innerText = average;

    let stars = document.querySelectorAll("#product_happiness .stars img");
    let ratingImg = document.querySelector("#product_happiness .rating_img");

    switch (Math.ceil(average / 20)) {
        case 5:
            for (let star of stars) {
                star.src = "img/Full_Star.webp";
            }
            ratingImg.src = "img/Zenith.webp";
            break;

        case 4:
            for (let star of stars) {
                star.src = "img/Empty_Star.webp";
            }
            for (let i = 0; i < 4; i++) {
                stars[i].src = "img/Full_Star.webp";
            }
            ratingImg.src = "img/Terra_Blade.webp";
            break;

        case 3:
            for (let star of stars) {
                star.src = "img/Empty_Star.webp";
            }
            for (let i = 0; i < 3; i++) {
                stars[i].src = "img/Full_Star.webp";
            }
            ratingImg.src = "img/True_Excalibur.webp";
            break;

        case 2:
            for (let star of stars) {
                star.src = "img/Empty_Star.webp";
            }
            for (let i = 0; i < 2; i++) {
                stars[i].src = "img/Full_Star.webp";
            }
            ratingImg.src = "img/Night's_Edge.webp";
            break;

        case 1:
            for (let star of stars) {
                star.src = "img/Empty_Star.webp";
            }
            for (let i = 0; i < 1; i++) {
                stars[i].src = "img/Full_Star.webp";
            }
            ratingImg.src = "img/Copper_Shortsword.webp";
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

    let loadMoreButton = document.querySelector("#load_more");
    if (productList.length == document.querySelectorAll(".product").length) {
        loadMoreButton.removeEventListener("click", addProducts);
        loadMoreButton.classList.toggle("disabled", true);
    }
    else {
        loadMoreButton.addEventListener("click", addProducts);
        loadMoreButton.classList.toggle("disabled", false);
    }

    for (let button of document.querySelectorAll(".open_reviews"))
        button.addEventListener("click", openReviews);
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
    totalHappiness();
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
    // addEvents();
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
    window.localStorage.setItem(`review_product_my_text_${productId}`, this.parentElement.children[0].value);
    window.localStorage.setItem(`review_product_my_rating_${productId}`, this.parentElement.parentElement.children[0].children[2].children[1].children[0].innerText);
    this.parentElement.remove();
}

function addProduct(index) {
    let product = document.createElement("div");
    product.classList.add("product");
    product.classList.add(index);
    document.querySelector("#product_container").appendChild(product);

    {
        let productReview = document.createElement("div");
        productReview.classList.add("product_my_review");
        product.appendChild(productReview);

        {
            let productImg = document.createElement("img");
            productImg.src = `img/${productList[index].imgSrc}`;
            productImg.classList.add("product_img");
            productReview.appendChild(productImg);

            let productInfo = document.createElement("div");
            productInfo.classList.add("product_info");
            productReview.append(productInfo);

            {
                productInfo.innerHTML = `<h2>${productList[index].name}</h2>
                <p class="product_id">Číslo produktu: ${productList[index].id}</p>
                <button class="add_review_button">Přidat hodnocení</button>
                <button class="delete_item">Smazat</button>
                <button class="open_reviews">Zobrazit recenze</button>`;
            }

            let starsProduct = document.createElement("div");
            starsProduct.classList.add("stars_product");
            productReview.append(starsProduct);

            {
                let rating = productList[index].rating;
                if (rating == null)
                    rating = 100;
                starsProduct.innerHTML = `<div class="stars 1">
                    <img src="img/Full_Star.webp" class="1">
                    <img src="img/Full_Star.webp" class="2">
                    <img src="img/Full_Star.webp" class="3">
                    <img src="img/Full_Star.webp" class="4">
                    <img src="img/Full_Star.webp" class="5">
                </div>
                <h3><b class="object_percent">${rating}</b><b>%</b></h3>`
                let stars = starsProduct.children[0].children;

                switch (Math.ceil(rating / 20)) {
                    case 5:
                        for (let star of stars) {
                            star.src = "img/Full_Star.webp";
                        }
                        break;

                    case 4:
                        for (let star of stars) {
                            star.src = "img/Empty_Star.webp";
                        }
                        for (let i = 0; i < 4; i++) {
                            stars[i].src = "img/Full_Star.webp";
                        }
                        break;

                    case 3:
                        for (let star of stars) {
                            star.src = "img/Empty_Star.webp";
                        }
                        for (let i = 0; i < 3; i++) {
                            stars[i].src = "img/Full_Star.webp";
                        }
                        break;

                    case 2:
                        for (let star of stars) {
                            star.src = "img/Empty_Star.webp";
                        }
                        for (let i = 0; i < 2; i++) {
                            stars[i].src = "img/Full_Star.webp";
                        }
                        break;

                    case 1:
                        for (let star of stars) {
                            star.src = "img/Empty_Star.webp";
                        }
                        for (let i = 0; i < 1; i++) {
                            stars[i].src = "img/Full_Star.webp";
                        }
                        break;
                }
            }
        }
    }
    addEvents();
    totalHappiness();
}

function addProducts() {
    let activeProductsIDs = [];
    let activeProducts = document.querySelectorAll(".product");

    for (let i = 0; i < activeProducts.length; i++) {
        activeProductsIDs[i] = parseInt(activeProducts[i].classList[1]);
    }

    let amountDone = 0;

    for (let i = 0; i < productList.length; i++) {
        if (amountDone == 3)
            return;
        if (!activeProductsIDs.includes(i)) {
            addProduct(i);
            amountDone++;
        }
    }
    addEvents();
}

function submitAllRatings() {
    let ratings = document.querySelectorAll(".object_percent");
    for (let i = 0; i < ratings.length; i++)
        window.localStorage.setItem(`review_product_my_rating_${ratings[i].parentElement.parentElement.parentElement.children[1].children[1].innerText.slice(16)}`, ratings[i].innerText);
}

function openReviews() {
    let sidebar = document.querySelector("aside");
    sidebar.classList.toggle("hidden", false);
    let index = this.parentElement.parentElement.parentElement.classList[1];

    sidebar.children[2].innerHTML = "";

    for (let i = 0; i < reviewList[index].length; i++) {
        let review = document.createElement("div");
        review.classList.add("review");
        sidebar.children[2].appendChild(review);

        let reviewer = reviewList[index][i];
        let like = "";
        if (reviewer.liked == "true")
            like = "Life_Crystal_Full.webp";
        else
            like = "Life_Crystal_Empty.webp";

        review.innerHTML = `<img class="user_icon" src="img/${reviewer.imgSrc}">
        <p class="user_name">${reviewer.name}</p>
        <p class="user_review_score"><b class="object_percent_review">${reviewer.rating}</b><b>%</b></p>
        <p class="user_review">${reviewer.comment}</p>
        <img src="img/${like}" class="heart">`;
    }

    //skoro stejny jako totalHappiness(), nechce se mi to menit pro premene jen abych to nemusel 1 zkopirovat
    {
        let percents = document.querySelectorAll(".object_percent_review");
        let total = 0;
        for (let percent of percents) {
            total += parseInt(percent.innerText);
        }
        let average = Math.round(total / percents.length);
        if(total == 0)
            average = 100;
        document.getElementById("product_total_percent").innerText = average;

        let stars = document.querySelectorAll("#product_info_reviews .stars img");
        let ratingImg = document.querySelector("#product_info_reviews .rating_img");

        switch (Math.ceil(average / 20)) {
            case 5:
                for (let star of stars) {
                    star.src = "img/Full_Star.webp";
                }
                ratingImg.src = "img/Zenith.webp";
                break;

            case 4:
                for (let star of stars) {
                    star.src = "img/Empty_Star.webp";
                }
                for (let i = 0; i < 4; i++) {
                    stars[i].src = "img/Full_Star.webp";
                }
                ratingImg.src = "img/Terra_Blade.webp";
                break;

            case 3:
                for (let star of stars) {
                    star.src = "img/Empty_Star.webp";
                }
                for (let i = 0; i < 3; i++) {
                    stars[i].src = "img/Full_Star.webp";
                }
                ratingImg.src = "img/True_Excalibur.webp";
                break;

            case 2:
                for (let star of stars) {
                    star.src = "img/Empty_Star.webp";
                }
                for (let i = 0; i < 2; i++) {
                    stars[i].src = "img/Full_Star.webp";
                }
                ratingImg.src = "img/Night's_Edge.webp";
                break;

            case 1:
                for (let star of stars) {
                    star.src = "img/Empty_Star.webp";
                }
                for (let i = 0; i < 1; i++) {
                    stars[i].src = "img/Full_Star.webp";
                }
                ratingImg.src = "img/Copper_Shortsword.webp";
                break;
        }
    }
}


/*
            <div class="review"> <!-- recenze (jednotne) -->
                <img class="user_icon" src="img/Map_Icon_Eye_of_Cthulhu.webp">
                <p class="user_name">Eye of Cthulhu</p>
                <p class="user_review_score"><b class="object_percent_review">20</b><b>%</b></p>
                <p class="user_review">Nejhorší věc, co jsem kdy viděl. Co na tom ostatní vidí???</p>
                <img src="img/Life_Crystal_Empty.webp" class="heart">
            </div>
*/

///////////////////////////////////// pro spolupraci autocomplete/copy paste garage
/*
document.querySelector().classList.
    parseInt()
"ssseeefggg".includes
this.parentElement.parentElement.parentElement;
ratings[0].parentElement.parentElement.parentElement.children[1].children[1].innerText.slice(16);
window.localStorage.setItem(`review_product_my_rating_${productId}`, this.parentElement.parentElement.children[0].children[2].children[1].children[0].innerText);
this.parentElement.parentElement.parentElement.classList[1]
*/
/////////////////////////////////////
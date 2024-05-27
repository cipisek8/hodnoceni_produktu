/*
****            = nejspis bude tezke, nechat na konec
--------------- = hotovo
/-/-/-/-/-/-/-/ = castecne hotovo
/////////////// = pracuju prave ted

--------------- = prekopano
/-/-/-/-/-/-/-/ = prekopu jinak/jindy

celkove hodnoceni
{
    aktualizace pri zmene hodnoceni ----------------------------------------------------------------
    zmena obrazku pri specifickych procentech (0-20, 21-40, 41-60, 61-80, 81-100) ------------------
    aktualizace procent ----------------------------------------------------------------------------
    casti hvezd ****
}

zaridici tlacitka ----------------------------------------------------------------------------------
{
    seradi produkty podle hodnoceni ----------------------------------------------------------------
}

produkt --------------------------------------------------------------------------------------------
{
    hvezdy -----------------------------------------------------------------------------------------
    {
        prejizdeni = rozsviceni --------------------------------------------------------------------
        vyjeti = zhasnuti --------------------------------------------------------------------------
        click = locknuti, dokud zase neprejedu -----------------------------------------------------
    }
    tlacitka ---------------------------------------------------------------------------------------
    {
        pridat hodnoceni - prida .add_review, po tlacitku Odeslat zmizi ----------------------------
            hodnoceni bude v u ostatnich komentaru -------------------------------------------------
        smazat - smaze produkt ---------------------------------------------------------------------
        zobrazit recenze - otevre <aside> ----------------------------------------------------------
    }
}
    
nacist dalsi ---------------------------------------------------------------------------------------
{
    nacte dalsi produkty ---------------------------------------------------------------------------
}

aside ----------------------------------------------------------------------------------------------
{
    dat pozadi na zbytek stranky -------------------------------------------------------------------
    zmeni hodnoceni/obrazek podle hodnoceni produktu -----------------------------------------------
    zmeni komentare podle produktu -----------------------------------------------------------------
    ulozeni like, zmena like -----------------------------------------------------------------------
    muj komentar nacteny z local storage, bez like -------------------------------------------------
}
    
plan aside -----------------------------------------------------------------------------------------
{
    eventlistener, this (prejeti na product. class cislo) ------------------------------------------
    predani do metody otevirani aside --------------------------------------------------------------
    kalkulace recenze z komentaru ------------------------------------------------------------------
        aktualizace obrazku ------------------------------------------------------------------------
    ukladani like do local storage -----------------------------------------------------------------
}

reforma --------------------------------------------------------------------------------------------
{
    zmenit cely kod aby pouzival localstorage ------------------------------------------------------
        ukladat jako array/json --------------------------------------------------------------------
    zadny this.parentElemnt.children[0] ------------------------------------------------------------
        kazda tlacitko cislo, podle cisla rodice ---------------------------------------------------
        quaryselector(.cislo) ----------------------------------------------------------------------
    nepridavat eventy vsemu vzdy -------------------------------------------------------------------
    hlaska s zadnymy produkty ----------------------------------------------------------------------
    sort - existuje metoda -------------------------------------------------------------------------
    hover - pres css - ~ - vsechny za tim ----------------------------------------------------------
    opravit addProducts/addProduct -----------------------------------------------------------------
    aktualizace viditelneho ratingu produktu po smazani --------------------------------------------
}

*/

const productList = [
    { imgSrc: "Dirt_Rod.webp", name: "Dirt rod", id: 114 },
    { imgSrc: "Ice_Rod.webp", name: "Ice rod", id: 496 },
    { imgSrc: "Rod_of_Discord.webp", name: "Rod of Discord", id: 1326 },
    { imgSrc: "Rainbow_Rod.webp", name: "Rainbow Rod", id: 495 },
    { imgSrc: "Actuation_Rod.webp", name: "Actuation Rod", id: 362 },
    { imgSrc: "Crimson_Rod.webp", name: "Crimson Rod", id: 1256 },
    { imgSrc: "Nimbus_Rod.webp", name: "Nimbus Rod", id: 1244 }
]

//backup pri smazani/nespravne delce localStorage
if ((window.localStorage.getItem("myProductRatings") == null) || (window.localStorage.getItem("myProductRatings").split(',').length != productList.length)) {
    let myProductRatings = [];
    for (let i = 0; i < productList.length; i++)
        myProductRatings[i] = 100;

    window.localStorage.setItem("myProductRatings", myProductRatings.join(','));
}

const reviewList = {
    0: {
        0: { imgSrc: "Map_Icon_Moon_Lord.webp", name: "Moon Lord", rating: 100, comment: "Best dirt moving tool ever!" },
        1: { imgSrc: "Map_Icon_Eye_of_Cthulhu.webp", name: "Eye of Cthulhu", rating: 20, comment: "Nejhorší věc, co jsem kdy viděl. Co na tom ostatní vidí???" },
        2: { imgSrc: "Map_Icon_Golem.webp", name: "Golem", rating: 80, comment: "Helps a lot with building the temple." },
        3: {
            imgSrc: "Map_Icon_King_Slime.webp", name: "King Slime", rating: 20, comment: `All around me are familiar faces
        Worn out places, worn out faces
        Bright and early for the daily races
        Going nowhere, going nowhere`},
        4: { imgSrc: "Map_Icon_Brain_of_Cthulhu.webp", name: "Brain of Cthulhu", rating: 60, comment: "Not my best drop." },
        5: { imgSrc: "Map_Icon_Mechanic.webp", name: "Mechanic", rating: 100, comment: "An essential tool for everyday use." },
        6: { imgSrc: "Map_Icon_Plantera_(first_form).webp", name: "Plantera", rating: 60, comment: "What even is this supposed to be?" },
        7: { imgSrc: "Map_Icon_Plantera_(second_form).webp", name: "Ragetera", rating: 20, comment: "fuck fuck fuck fuck fuck fuck fuck" },
        8: { imgSrc: "Map_Icon_Empress_of_Light.webp", name: "Empress of Light", rating: 20, comment: "a tool for weapklings" },
        9: { imgSrc: "Map_Icon_Wall_of_Flesh.webp", name: "Wall of Flesh", rating: 20, comment: "cant use it, too much fire around" }
    },
    1: {
        0: { imgSrc: "Map_Icon_Wall_of_Flesh.webp", name: "Wall of Flesh", rating: 20, comment: "cant use it, too much fire around" }
    },
    2: {
        0: { imgSrc: "Map_Icon_Empress_of_Light.webp", name: "Empress of Light", rating: 20, comment: "a tool for weaklings" }
    },
    3: {
        0: { imgSrc: "Map_Icon_Plantera_(first_form).webp", name: "Plantera", rating: 60, comment: "What even is this supposed to be?" },
        1: { imgSrc: "Map_Icon_Plantera_(second_form).webp", name: "Ragetera", rating: 20, comment: "fuck fuck fuck fuck fuck fuck fuck" }
    },
    4: {
        0: { imgSrc: "Map_Icon_Mechanic.webp", name: "Mechanic", rating: 100, comment: "An essential tool for everyday use." }
    },
    5: {
        0: { imgSrc: "Map_Icon_Brain_of_Cthulhu.webp", name: "Brain of Cthulhu", rating: 60, comment: "Not my best drop." }
    },
    6: {
        0: {
            imgSrc: "Map_Icon_King_Slime.webp", name: "King Slime", rating: 20, comment: `All around me are familiar faces
        Worn out places, worn out faces
        Bright and early for the daily races
        Going nowhere, going nowhere`}
    }
}

if (window.localStorage.getItem("likes") == null)
    window.localStorage.setItem("likes", "{}");

if (window.localStorage.getItem("myReviews") == null)
    window.localStorage.setItem("myReviews", "{}");

/*
testing

let defaultLikes = {
    0: {
        0: true,
        1: false,
        2: true,
        3: true,
        4: false,
        5: true,
        6: false,
        7: false,
        8: false,
        9: false
    },
    1: {
        0: false
    },
    2: {
        0: true
    },
    3: {
        0: false,
        1: true
    },
    4: {
        0: true
    },
    5: {
        0: false
    },
    6: {
        0: true
    }
}
window.localStorage.setItem("likes", JSON.stringify(defaultLikes));
*/

addProducts();
updateLoadMore();
totalHappiness();

function getRating(index) {
    return window.localStorage.getItem("myProductRatings").split(',')[index];
}
// -------------------------------------------------------------------------------------------------

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
// -------------------------------------------------------------------------------------------------

function updateLoadMore() {
    let loadMoreButton = document.querySelector("#load_more");
    if (productList.length == document.querySelectorAll(".product").length) {
        loadMoreButton.removeEventListener("click", addProducts);
        loadMoreButton.classList.toggle("disabled", true);
    }
    else {
        loadMoreButton.addEventListener("click", addProducts);
        loadMoreButton.classList.toggle("disabled", false);
    }
}
// -------------------------------------------------------------------------------------------------

function changeStarClick() {
    let percent = 0;
    let stars = document.querySelectorAll(`.star.${this.classList[1]}`)

    for (let i = 0; i < stars.length; i++)
        stars[i].src = "img/Empty_Star.webp";

    for (let i = 0; i < parseInt(this.classList[2].slice(2)) + 1; i++) {
        stars[i].src = "img/Full_Star.webp";
        percent += 20;
    }

    document.querySelector(`.object_percent.${this.classList[1]}`).innerText = percent;
    totalHappiness();
}
// -------------------------------------------------------------------------------------------------

function sortProductsAscending() {
    let productContainer = document.querySelector("#product_container");
    let productsArray = Array.from(productContainer.children);

    productsArray.sort((a, b) => {
        let percentA = parseInt(document.querySelector(`.object_percent.${a.classList[1]}`).innerText);
        let percentB = parseInt(document.querySelector(`.object_percent.${b.classList[1]}`).innerText);

        if (percentA > percentB)
            return -1;
        else if (percentA < percentB)
            return 1;
        else
            return 0;
    })

    for (let product of productsArray) {
        productContainer.appendChild(product);
    }
}
// -------------------------------------------------------------------------------------------------

function sortProductsDescending() {
    let productContainer = document.querySelector("#product_container");
    let productsArray = Array.from(productContainer.children);

    productsArray.sort((a, b) => {
        let percentA = parseInt(document.querySelector(`.object_percent.${a.classList[1]}`).innerText);
        let percentB = parseInt(document.querySelector(`.object_percent.${b.classList[1]}`).innerText);

        if (percentA < percentB)
            return -1;
        else if (percentA > percentB)
            return 1;
        else
            return 0;
    })

    for (let product of productsArray) {
        productContainer.appendChild(product);
    }
}
// -------------------------------------------------------------------------------------------------

function deleteReview() {
    let myReviews = JSON.parse(window.localStorage.getItem("myReviews"));
    myReviews[parseInt(this.classList[1].slice(1))] = undefined;
    window.localStorage.setItem("myReviews", JSON.stringify(myReviews));


    percents = window.localStorage.getItem("myProductRatings").split(',');
    percents[this.classList[1].slice(1)] = 100;
    window.localStorage.setItem("myProductRatings", percents.join(','));

    let stars = document.querySelectorAll(`.star.${this.classList[1]}`);
    for (let i = 0; i < stars.length; i++)
        stars[i].src = "img/Full_Star.webp";
    document.querySelector(`.object_percent.${this.classList[1]}`).innerText = 100;

    updateLoadMore();
    totalHappiness();
}
// -------------------------------------------------------------------------------------------------

function addReview() {
    document.querySelector(`.add_review.${this.classList[1]}`).classList.toggle("hidden");
}
// -------------------------------------------------------------------------------------------------

function submitReview() {
    let loadedRatings = window.localStorage.getItem("myProductRatings").split(',');
    loadedRatings[parseInt(this.classList[1].slice(1))] = document.querySelector(`.object_percent.${this.classList[1]}`).innerText;
    window.localStorage.setItem("myProductRatings", loadedRatings.join(','));

    let myReviews = JSON.parse(window.localStorage.getItem("myReviews"));
    myReviews[parseInt(this.classList[1].slice(1))] = document.querySelector(`.write_review.${this.classList[1]}`).value;
    window.localStorage.setItem("myReviews", JSON.stringify(myReviews));

    document.querySelector(`.add_review.${this.classList[1]}`).classList.toggle("hidden", true);
}
// -------------------------------------------------------------------------------------------------

function addProduct(index) {
    let product = document.createElement("div");
    product.classList.add("product");
    product.classList.add(`_${index}`);
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
                <button class="add_review_button _${index}">Přidat hodnocení</button>
                <button class="delete_item _${index}">Smazat</button>
                <button class="open_reviews _${index}">Zobrazit recenze</button>`;

                document.querySelector(`.add_review_button._${index}`).addEventListener("click", addReview);
                document.querySelector(`.delete_item._${index}`).addEventListener("click", deleteReview);
                document.querySelector(`.open_reviews._${index}`).addEventListener("click", openReviews);
            }

            let starsProduct = document.createElement("div");
            starsProduct.classList.add("stars_product");
            productReview.append(starsProduct);

            {
                let rating = getRating(index);
                if (rating == null)
                    rating = 100;
                starsProduct.innerHTML = `<div class="stars _${index}">
                    <img src="img/Full_Star.webp" class="star _${index} __0">
                    <img src="img/Full_Star.webp" class="star _${index} __1">
                    <img src="img/Full_Star.webp" class="star _${index} __2">
                    <img src="img/Full_Star.webp" class="star _${index} __3">
                    <img src="img/Full_Star.webp" class="star _${index} __4">
                </div>
                <h3><b class="object_percent _${index}">${rating}</b><b>%</b></h3>`
                let stars = document.querySelectorAll(`.star._${index}`);

                for (let star of stars) {
                    star.addEventListener("click", changeStarClick);
                }

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

    let review = document.createElement("div");
    review.classList.add("add_review");
    review.classList.add("hidden");
    review.classList.add(`_${index}`);
    review.innerHTML = `<textarea placeholder="Hodnocení produktu..." class="write_review _${index}"></textarea><button class="submit_review _${index}">Odeslat</button>`;
    product.appendChild(review);

    document.querySelector(`.submit_review._${index}`).addEventListener("click", submitReview);
    totalHappiness();
}
// -------------------------------------------------------------------------------------------------

function addProducts() {
    if (!(productList.length > 0)) {
        document.querySelector("#product_container").innerHTML = `<h1>Žádné produkty nejsou dostupné!</h1>`;
        return;
    }
    let activeProductsIDs = [];
    let activeProducts = document.querySelectorAll(".product");

    for (let i = 0; i < activeProducts.length; i++) {
        activeProductsIDs[i] = parseInt(activeProducts[i].classList[1].slice(1));
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
    updateLoadMore();
}
// -------------------------------------------------------------------------------------------------

function submitAllRatings() {
    let ratings = document.querySelectorAll(".object_percent");
    let loadedRatings = window.localStorage.getItem("myProductRatings").split(',');
    for (let i = 0; i < ratings.length; i++)
        loadedRatings[ratings[i].classList[1].slice(1)] = ratings[i].innerText;
    window.localStorage.setItem("myProductRatings", loadedRatings.join(','));
}
// -------------------------------------------------------------------------------------------------

function openReviews() {
    let sidebar = document.querySelector("aside");
    sidebar.classList.toggle("hidden", false);
    document.querySelector("#aside_background").classList.toggle("hidden", false);
    let index = this.classList[1].slice(1);
    let reviewContainer = document.querySelector("#review_container");
    let likes = JSON.parse(window.localStorage.getItem("likes"))[index];

    reviewContainer.innerHTML = "";

    if(JSON.parse(window.localStorage.getItem("myReviews"))[index] != undefined)
    {
        let review = document.createElement("div");
        review.classList.add("review");
        review.classList.add(`_${index}`);
        reviewContainer.appendChild(review);

        review.innerHTML = `<img class="user_icon" src="img/Terrarian.webp">
        <p class="user_name">Terrarian</p>
        <p class="user_review_score"><b class="object_percent_review">${window.localStorage.getItem("myProductRatings").split(',')[index]}</b><b>%</b></p>
        <p class="user_review">${JSON.parse(window.localStorage.getItem("myReviews"))[index]}</p>`;
    }

    for (let i = 0; i < Object.keys(reviewList[index]).length; i++) {
        let review = document.createElement("div");
        review.classList.add("review");
        review.classList.add(`_${index}`);
        review.classList.add(`__${i}`);
        reviewContainer.appendChild(review);

        let reviewer = reviewList[index][i];
        let like = "";
        if (likes != undefined) {
            if (likes[i] != true)
                like = "Life_Crystal_Empty.webp";
            else
                like = "Life_Crystal_Full.webp";
        }
        else {
            like = "Life_Crystal_Empty.webp";
        }

        review.innerHTML = `<img class="user_icon" src="img/${reviewer.imgSrc}">
        <p class="user_name">${reviewer.name}</p>
        <p class="user_review_score"><b class="object_percent_review">${reviewer.rating}</b><b>%</b></p>
        <p class="user_review">${reviewer.comment}</p>
        <img src="img/${like}" class="heart _${index} __${i}">`;
    }

    //skoro stejny jako totalHappiness(), nechce se mi to menit pro premene jen abych to nemusel 1 zkopirovat
    {
        let percents = document.querySelectorAll(".object_percent_review");
        let total = 0;
        for (let percent of percents) {
            total += parseInt(percent.innerText);
        }
        let average = Math.round(total / percents.length);
        if (total == 0)
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

    // pridat meneni like
    for (let heart of document.querySelectorAll(".heart"))
        heart.addEventListener("click", changeLike);
}
// -------------------------------------------------------------------------------------------------

function closeReviews() {
    document.querySelector("aside").classList.toggle("hidden", true);
    document.querySelector("#aside_background").classList.toggle("hidden", true);
}
// -------------------------------------------------------------------------------------------------

function changeLike() {
    let likes = JSON.parse(window.localStorage.getItem("likes"));
    let indexItem = this.classList[1].slice(1);
    let indexComment = this.classList[2].slice(2);
    if (likes[indexItem] == undefined)
        likes[indexItem] = {};

    if (this.src.includes("Life_Crystal_Empty.webp")) {
        this.src = "img/Life_Crystal_Full.webp";

        likes[indexItem][indexComment] = true;
        window.localStorage.setItem("likes", JSON.stringify(likes));
    }
    else {
        this.src = "img/Life_Crystal_Empty.webp";

        likes[indexItem][indexComment] = false;
        window.localStorage.setItem("likes", JSON.stringify(likes));
    }
}
// -------------------------------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////////////////////////////////////// pro spolupraci autocomplete/copy paste garage
/*
document.querySelector().classList.
    parseInt()
"ssseeefggg".includes
*/
////////////////////////////////////////////////////////////////////////////////////////////////////
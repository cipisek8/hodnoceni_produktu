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
    seradi produkty podle hodnoceni

produkt
    hvezdy
        prejizdeni = rozsviceni
        vyjeti = zhasnuti
        click = locknuti, dokud zase neprejedu
    tlacitka
        pridat hodnoceni - prida .class_review, po tlacitku Odeslat zmizi
        smazat - smaze produkt
        zobrazit recenze - otevre aside

nacist dalsi
    nacte dalsi produkty

aside
    dat pozadi na zbytek stranky
    zmeni hodnoceni/obrazek podle produktu
    zmeni komentare podle produktu
    ulozeni like, zmena like
*/
totalHappiness();

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


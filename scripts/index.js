/*jslint browser: true*/
/*global $, jQuery, alert*/
/*global moment*/

$(document).ready(function () {

    /*---------- DATE ACTUELLE ----------*/

    moment.locale("fr");
    $("#intervalDate").html(
        moment().format("LL") +
        " : de <span>" +
        moment().subtract(2.5, "hours").format("LT") +
        "</span> à <span>" +
        moment().format("LT") +
        "</span>"
    );

});

/*---------- Sidebar mouvement ----------*/

// Taille de sidebar au chargement et pas
// à chaque appel de la fonction

var sizeSidebar = sidebar.offsetWidth;

function sidebarAnimate(pop) {

    // Init
    var sidebar = document.querySelector("#sidebar"),
        popWrap = pop.querySelector(".pop-wrap"),
        allPop = document.querySelectorAll(".pop"),
        section = document.querySelector("#section");

    // Element cible déjà sélectionné
    if (pop.classList.contains("selected")) {
        // Déselectionner
        pop.classList.remove("selected");
        // Remettre la sidebar
        sidebar.style.width = sizeSidebar + "px";
        section.style.transform = "translateX(0)";
        popWrap.style.backgroundColor = "rgba(255, 255, 255, 0)";
        pop.querySelector("svg").style.fill = "#fff";
        allPop.forEach(function(thisPop) {
            thisPop.querySelector(".pop-wrap").style.borderRadius = "100%";
        });

    // Element cible non sélectionné
    } else {
        // Anlyser chaque pop
        allPop.forEach(function(thisPop) {
            // Si un autre était sélectionné
            if (thisPop.classList.contains("selected")) {
                // Déselectionner
                thisPop.classList.remove("selected");
                // Sélectionner le nouveau
                pop.classList.add("selected");
                // Transparent thisPop wrap
                console.log(thisPop !== pop);
                if (thisPop !== pop) {
                    thisPop.querySelector(".pop-wrap").style.backgroundColor = "rgba(255, 255, 255, 0)";
                    thisPop.querySelector("svg").style.fill = "#fff";
                } else {
                    thisPop.querySelector(".pop-wrap").style.backgroundColor = "#fff";
                    thisPop.querySelector("svg").style.fill = "#FFD166";
                }
                // Blanc pop wrap
                //popWrap.style.backgroundColor = "rgba(#fff, 1)";
            // Si aucun n'était sélectionné
            } else {
                // Sélectionner la cible
                pop.classList.add("selected");
                // Blanc pop wrap
                popWrap.style.backgroundColor = "#fff";
                pop.querySelector("svg").style.fill = "#FFD166";
                allPop.forEach(function(thisPop) {
                    thisPop.querySelector(".pop-wrap").style.borderRadius = "2em";
                });
                // Agrandir sidebar
                sidebar.style.width = sizeSidebar*5 + "px";
                section.style.transform = "translateX(" + sizeSidebar*4 + "px)";
            }
        });
    }
}

/*---------- Graphique ----------*/

let ctx = document.querySelector("#myChart");

var niveauSon = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    labels = [];
for (var n = niveauSon.length; n > 0; n--) {
    moment.relativeTimeThreshold("m", 60);
    let label =
        moment()
            .subtract(n * 15, "minutes")
            .format("LT") +
        "\n" +
        moment()
            .subtract(n * 15, "minutes")
            .fromNow();
    labels.push(label);
}

var options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            easing: "easeInOutQuad",
            duration: 1500
        },
        title: {
            display: true,
            text: 'Choisissez une salle',
            fontSize: 20,
            fontFamily: '"Rubik", sans-serif',
            fontColor: "#fff",
            fontStyle: "bold",
        },
        scales: {
            xAxes: [
                {
                    display: false
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        color: "rgba(200, 200, 200, 0.2)",
                        lineWidth: 1
                    },
                    scaleLabel: {
                        labelString: "",
                        fontColor: "rgba(200, 200, 200, 0.5)",
                        fontSize: 10
                    },
                    ticks: {
                        fontColor: "rgba(200, 200, 200, 0.8)",
                        fontSize: 14
                    }
                }
            ]
        },
        elements: {
            line: {
                tension: 0.4
            }
        },
        legend: {
            display: false
        },
        point: {
            backgroundColor: "white"
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        }
    },
    data = {
        labels: labels,
        datasets: [
            {
                label: "Niveau sonore",
                borderWidth: 5,
                borderColor: "#55E4D4",
                backgroundColor: "#fff",
                pointRadius: 8,
                pointHoverRadius: 8,
                pointBorderWidth: 3,
                pointHoverBorderWidth: 3,
                pointBackgroundColor: "#293B5A",
                pointHoverBackgroundColor: "#55E4D4",
                pointBorderColor: "#55E4D4",
                pointHoverBorderColor: "#55E4D4",
                data: niveauSon
            }
        ]
    };

var myChart = new Chart(ctx, {
    type: "line",

    data: data,

    options: options,
});

/*---------- SELECT DÉPENDANTS ----------*/

var categories = [];
categories.startList = ["ND des Champs", "ND de Lorette"];
categories["ND des Champs"] = [
    "NDC - 1er",
    "NDC - 2e",
    "NDC - 3e",
    "NDC - 4e",
    "NDC - 5e"
];
categories["ND de Lorette"] = [
    "NDL - 1er",
    "NDL - 2e",
    "NDL - 3e",
    "NDL - 4e"
];
categories["NDC - 1er"] = ["N15", "N16-A", "N16-B", "N18"];
categories["NDC - 2e"] = ["N24", "N26", "N28"];
categories["NDC - 3e"] = ["N33", "N34", "N36", "N38"];
categories["NDC - 4e"] = ["N43", "N44", "N46", "N48-A", "N48-B"];
categories["NDC - 5e"] = ["N410", "N411"];
categories["NDL - 1er"] = ["L108", "L114", "L115", "L122"];
categories["NDL - 2e"] = ["L206", "L207", "L212", "L213", "L220"];
categories["NDL - 3e"] = ["L305", "L306", "L311", "L312", "L313"];
categories["NDL - 4e"] = ["L409", "L416", "L417"];

/*---------- REQUETE XHR GRAPH ----------*/

var salles;

// Etablir la requête XHR
let request = new XMLHttpRequest();
request.open("GET","salles.json", true);
request.responseType = "json";
request.onload = function() {
    if(request.status === 200) {
        salles = request.response;
        initialize();
    } else {
        console.log('La demande réseau pour salles.json a échoué avec la réponse ' + request.status + ': ' + request.statusText)
    }
};

request.send();



// Initialiser le processus avec fonctions et var principales
function initialize() {

    // Récupérer les filtrages
    var batimentSelect = document.querySelector("#List1"),
        etageSelect = document.querySelector("#List2"),
        salleSelect = document.querySelector("#List3"),
        recherche = document.querySelector("#search-bar"),
        rechercheBouton = document.querySelector("#search-button"),
        idNomSalle,
        libreContainer = document.querySelector(".sub-content-right");

    // Réinitialiser les paramètres et mémoire de catégorie
    var derBatiment = batimentSelect.value,
        derEtage = etageSelect.value,
        derSalle = salleSelect.value,
        derRecherche = '';
    libreContainer.innerHTML = "<h2>Salles libres</h2>";

    // Contient les données de l'étage puis
    // groupeFinal contient les données après
    // le filtrage de recherche
    var groupeSelect,
        groupeInt,
        groupeFinal;

    // Afficher toutes les salles au début
    // notamment les salles libres
    groupeFinal = salles;
    afficheLibre();

    // Réinitialiser le filtrage
    groupeSelect = [];
    groupeFinal = [];

    function afficheLibre() {
        // Analyser le niveau sonore de chaque
        // salle et voir s'il est en dessous de
        // 20, si oui alors la salle est libre
        // donc on crée un item à droite

        for (var sa = 0; sa < salles.length; sa++) {
            var derNiveau = salles[sa].niveau[salles[sa].niveau.length - 1];
            if (derNiveau < 20) {
                var newLibre = document.createElement("div"),
                    firstSpan = document.createElement("span"),
                    secondSpan = document.createElement("span"),
                    salleLibre = document.createElement("h3"),
                    snode = document.createTextNode(String(salles[sa].salle)),
                    title = document.createElement("p"),
                    tnode = document.createTextNode("Dernière activité : "),
                    derActivite = document.createElement("p");
                newLibre.className = "libre";
                title.appendChild(tnode);
                salleLibre.appendChild(snode);
                salles[sa].niveau.forEach(function(valeur, index) {
                    if (valeur > 30) {
                        var activiteNode = moment().subtract((10 - index)*15, "minutes").fromNow();
                        derActivite.textContent = activiteNode;
                    }
                });
                const inferieurTrente = (valeur) => valeur < 30;
                if (salles[sa].niveau.every(inferieurTrente)) {
                    derActivite.textContent = "Il y a plus de 3h";
                };
                firstSpan.appendChild(salleLibre);
                secondSpan.innerHTML += title.outerHTML + derActivite.outerHTML;
                newLibre.innerHTML += firstSpan.outerHTML + secondSpan.outerHTML;
                libreContainer.appendChild(newLibre);
            }
        }
    }

    // Quand le select change ou quand
    // une recherche est lancée, invoquer
    // le filterSelect
    batimentSelect.onchange = filterSelect;
    etageSelect.onchange = filterSelect;
    salleSelect.onchange = filterSelect;
    rechercheBouton.onclick = filterSelect;

    function filterSelect() {

        // Réinitialiser le filtrage
        groupeSelect = [];
        groupeInt = [];
        groupeFinal = [];
        document.querySelector(".sub-content-items").innerHTML = "";

        if (batimentSelect.value === derBatiment && etageSelect.value === derEtage && salleSelect.value === derSalle && recherche.value.trim() === derRecherche) {
            return;
        } else {

            // Changer si nécessaire le contenu des select
            if (derBatiment !== batimentSelect.value) {
                etageSelect.length = 1;
                etageSelect.selectedIndex = 0;
                salleSelect.length = 1;
                salleSelect.selectedIndex = 0;
                var nCat = categories[batimentSelect.value];
                for (var each in nCat) {
                    var nOption = document.createElement("option");
                    var nData = document.createTextNode(nCat[each]);
                    nOption.setAttribute("value", nCat[each]);
                    nOption.appendChild(nData);
                    etageSelect.appendChild(nOption);
                }
            }

            if (derEtage !== etageSelect.value) {
                salleSelect.length = 1;
                salleSelect.selectedIndex = 0;
                var nCat = categories[etageSelect.value];
                for (var each in nCat) {
                    var nOption = document.createElement("option");
                    var nData = document.createTextNode(nCat[each]);
                    nOption.setAttribute("value", nCat[each]);
                    nOption.appendChild(nData);
                    salleSelect.appendChild(nOption);
                }
            }

            // Initialiser le filtrage et la recherche
            derBatiment = batimentSelect.value;
            derEtage = etageSelect.value;
            derSalle = salleSelect.value;
            derRecherche = recherche.value.trim();

            if (batimentSelect.value === "---") {
                groupeSelect = salles;
                rechercheSalle();
            } else {
                idNomSalle = 'Bâtiment ' + batimentSelect.value;
                for (var sa = 0; sa < salles.length; sa++) {
                    if (salles[sa].batiment === batimentSelect.value) {
                        groupeSelect.push(salles[sa]);
                    }
                }
                if (etageSelect.value !== "---") {
                    idNomSalle = 'Étage ' + etageSelect.value;
                    for (sa = 0; sa < groupeSelect.length; sa++) {
                        if (groupeSelect[sa].etage === etageSelect.value) {
                            groupeInt.push(groupeSelect[sa]);
                        }
                    }
                    groupeSelect = groupeInt;
                }
                if (salleSelect.value !== "---") {
                    idNomSalle = 'Salle ' + salleSelect.value;
                    for (sa = 0; sa < groupeSelect.length; sa++) {
                        if (groupeSelect[sa].salle === salleSelect.value) {
                            groupeSelect = [groupeSelect[sa]];
                        }
                    }
                }
                rechercheSalle();
            }
        }
    }

    function rechercheSalle() {
        // Si aucun mot de recherche, le groupe final
        // est celui filtré par les catégories
        if (recherche.value.trim() === '') {
            groupeFinal = groupeSelect;
            updateDisplay();
        } else {
            // Pour chaque salle voir si le mot de recherche
            // est contenu dans un des noms de salle, (sinon
            // indexOf retourne -1) et l'ajouter dans le groupeFinal
            for (var sa = 0; sa < groupeSelect.length; sa++) {
                if (groupeSelect[sa].salle.indexOf(recherche.value.trim().toUpperCase()) !== -1) {
                    groupeFinal.push(groupeSelect[sa]);
                    batimentSelect.value = groupeSelect[sa].batiment;
                    var nCat = categories[batimentSelect.value];
                    for (var each in nCat) {
                        var nOption = document.createElement("option");
                        var nData = document.createTextNode(nCat[each]);
                        nOption.setAttribute("value", nCat[each]);
                        nOption.appendChild(nData);
                        etageSelect.appendChild(nOption);
                    }
                    etageSelect.value = groupeSelect[sa].etage;
                    var nCat = categories[etageSelect.value];
                    for (var each in nCat) {
                        var nOption = document.createElement("option");
                        var nData = document.createTextNode(nCat[each]);
                        nOption.setAttribute("value", nCat[each]);
                        nOption.appendChild(nData);
                        salleSelect.appendChild(nOption);
                    }
                    salleSelect.value = groupeSelect[sa].salle;
                    idNomSalle= 'Salle ' + salleSelect.value;
                }
            }
            updateDisplay();
        }
    }

    function updateDisplay() {
        if (groupeFinal.length === 0) {
            idNomSalle = 'Aucune salle correspondante';
            myChart.config.data.datasets = {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
            myChart.update();
            updateItem(myChart.config.data.datasets.data[10]);
        } else {
            // On enlève toutes les valeurs du graph
            myChart.config.data.datasets = [];
            for (var sa = 0; sa < groupeFinal.length; sa++) {
                recupValeurs(groupeFinal[sa]);
            }
        }
    }

    function recupValeurs(arraySalle) {

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var colorArray = [
                "#EF476F",
                "#FFD166",
                "#55E4D4",
                "#118AB2"
            ],
            randomIntForColor = getRandomInt(0,3),
            colorString = colorArray[randomIntForColor],
            nomSalle = arraySalle.salle;

        var newDataset = {
            label: "Niveau sonore en " + nomSalle,
            borderWidth: 5,
            borderColor: colorString,
            fill: false,
            pointRadius: 8,
            pointHoverRadius: 8,
            pointBorderWidth: 3,
            pointHoverBorderWidth: 3,
            pointBackgroundColor: "#293B5A",
            pointBorderColor: colorString,
            pointHoverBackgroundColor: colorString,
            data: arraySalle.niveau
        };

        // On ajoute la dataset au graph
        myChart.config.data.datasets.push(newDataset);
        myChart.config.options.title.text = idNomSalle;

        myChart.update();

        updateItem(arraySalle);
    }

    // Item Niveau Sonore, Présents et Dernière Activité

    function updateItem(items) {

        var itemContainer = document.querySelector(".sub-content-items"),
            newItem = document.createElement("div"),
            firstSpan = document.createElement("span"),
            secondSpan = document.createElement("span"),
            firstIcon = document.createElement("i"),
            title = document.createElement("p"),
            tnode = document.createTextNode("Décibels en \n" + String(items.salle)),
            secondIcon = document.createElement("i"),
            value = document.createElement("h3"),
            vnode = document.createTextNode(items.niveau[items.niveau.length - 1]);
        newItem.className = "item";
        firstIcon.className = "fas fa-bell";
        title.appendChild(tnode);
        if (items.niveau[items.niveau.length - 1] < items.niveau[items.niveau.length - 2]) {
            secondIcon.className = "fas fa-chevron-circle-down";
            newItem.style.backgroundColor = "#49D8B6";
            firstIcon.style.color = "#49D8B6";
        } else {
            secondIcon.className = "fas fa-chevron-circle-up";
            newItem.style.backgroundColor = "#FF5D87";
            firstIcon.style.color = "#FF5D87";
        }
        value.appendChild(vnode);
        firstSpan.innerHTML += title.outerHTML + firstIcon.outerHTML;
        secondSpan.innerHTML += value.outerHTML + secondIcon.outerHTML;
        newItem.innerHTML += firstSpan.outerHTML + secondSpan.outerHTML;
        itemContainer.appendChild(newItem);
    }

}

/*jslint browser: true*/
/*global $, jQuery, alert*/
/*global moment*/

$(document).ready(function () {

    /*---------- DATE ACTUELLE ----------*/

    moment.locale("fr");
    $("#intervalDate").text(
        moment().format("LL") +
        " : de " +
        moment().subtract(2.5, "hours").format("LT") +
        " à " +
        moment().format("LT")
    );

});

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
                pointBackgroundColor: "#55E4D4",
                pointBorderColor: "#fff",
                pointHoverBorderColor: "#293B5A",
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

window.onload = function() {request.send()};



// Initialiser le processus avec fonctions et var principales
function initialize() {

    // Récupérer les filtrages
    var batimentSelect = document.forms.tripleplay.List1,
        etageSelect = document.forms.tripleplay.List2,
        salleSelect = document.forms.tripleplay.List3,
        recherche = document.querySelector("#search-bar"),
        rechercheBouton = document.querySelector("#search-button"),
        idNomSalle = document.querySelector("#nomSalle");

    // Réinitialiser les paramètres et mémoire de catégorie
    var derBatiment = batimentSelect.value,
        derEtage = etageSelect.value,
        derSalle = salleSelect.value,
        derRecherche = '';

    // Contient les données de l'étage puis
    // groupeFinal contient les données après
    // le filtrage de recherche
    var groupeSelect,
        groupeInt,
        groupeFinal;

    // Afficher toutes les salles au début puis
    // updateDisplay
    groupeFinal = salles;

    // Réinitialiser le filtrage
    groupeSelect = [];
    groupeFinal = [];

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
                idNomSalle.textContent = 'Bâtiment ' + batimentSelect.value;
                for (var sa = 0; sa < salles.length; sa++) {
                    if (salles[sa].batiment === batimentSelect.value) {
                        groupeSelect.push(salles[sa]);
                    }
                }
                if (etageSelect.value !== "---") {
                    idNomSalle.textContent = 'Étage ' + etageSelect.value;
                    for (sa = 0; sa < groupeSelect.length; sa++) {
                        if (groupeSelect[sa].etage === etageSelect.value) {
                            groupeInt.push(groupeSelect[sa]);
                        }
                    }
                    groupeSelect = groupeInt;
                }
                if (salleSelect.value !== "---") {
                    idNomSalle.textContent = 'Salle ' + salleSelect.value;
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
                if (groupeSelect[sa].salle.indexOf(recherche.value.trim()) !== -1) {
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
                    idNomSalle.textContent = 'Salle ' + salleSelect.value;
                }
            }
            updateDisplay();
        }
    }

    function updateDisplay() {
        if (groupeFinal.length === 0) {
            idNomSalle.textContent = 'Aucune salle correspondante';
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
            pointBackgroundColor: colorString,
            pointBorderColor: "#fff",
            pointHoverBorderColor: "#293B5A",
            data: arraySalle.niveau
        };

        // On ajoute la dataset au graph
        myChart.config.data.datasets.push(newDataset);

        myChart.update();

        updateItem(arraySalle.niveau[arraySalle.niveau.length - 1]);
    }

    // Item Niveau Sonore, Présents et Dernière Activité

    function updateItem(itemNiveau) {

        document.querySelector("#itemNiveau").textContent = itemNiveau;
        for (var i = 0; i <= 120; i += 5) {
            if (itemNiveau >= i) {
                var itemPresents = (i - 30) / 2 >= 0 ? (i - 30) / 2 : 0;
                document.querySelector("#itemPresents").textContent = Math.round(itemPresents);
            }
        }
    }

}
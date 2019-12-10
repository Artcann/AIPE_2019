#!/usr/local/bin/python3

import cgi
from model.Carte import *
from model.Salle import *
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="arca220929!",
    database="AIPE"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM Cartes order by id desc limit 15")
values = mycursor.fetchall()

listeCarte = []

for info in values:
    if len(listeCarte) == 0:
        listeCarte.append(Carte(info[3]))
    else:
        for carte in listeCarte:
            if info[3] != carte.getID():
                listeCarte.append(Carte(info[3]))

mycursor.execute("SELECT * FROM CartesSallesRelation")
values = mycursor.fetchall()

for info in values:
    for carte in listeCarte:
        if info[0] == carte.getID():
            carte.ajouterSalle(Salle(carte, info[1]))

with open("salles.json") as json_file:
    data = json.load(json_file)

print("Content-type: text/html; charset=utf-8\n")

html = """
<!DOCTYPE html>
<html lang="en">

<head>

  <!--  Meta  -->
  <meta charset="UTF-8" />
  <title>NDCBel</title>

  <!--  Styles  -->
  <link rel="stylesheet" href="templates/styles/index.css">
  <link href="https://fonts.googleapis.com/css?family=Rubik&display=swap" rel="stylesheet">

</head>

<body>

  <div class="section activite">
    <div class="barre-haute">
      <h1>Activité</h1>
      <form method="get" class="search-container" action="javascript:void(0);">
        <input type="text" id="search-bar" placeholder="Rechercher...">
        <button id="search-button"><i class="fas fa-search"></i></button>
      </form>
    </div>
    <div class="sub-content">
      <div class="sub-content-left">
        <div class="sub-top">
          <div id="infoSalle">
            <h2 id="nomSalle">Choisissez un bâtiment</h2>
            <p id="intervalDate"></p>
          </div>
          <div>
            <form name="tripleplay" action="javascript:void(0);">
              <div class="select">
                <label>Bâtiment :</label>
                <select name="List1">
                  <option selected>---</option>
                  <option value="ND des Champs">ND des Champs</option>
                  <option value="ND de Lorette">ND de Lorette</option>
                </select>
              </div>
              <div class="select">
                <label>Étage :</label>
                <select name="List2">
                  <option selected>---</option>
                </select>
              </div>
              <div class="select">
                <label>Salle :</label>
                <select name="List3">
                  <option selected >---</option>
                </select>
              </div>
            </form>
          </div>
          <!-- Fin séparation du sub-top pour flex -->
        </div>
        <!-- Fin sub-top -->
        <div class="sub-middle">
          <canvas id="myChart" width="500" height="40vh"></canvas>
        </div>
        <!-- Fin sub-middle -->
      </div>
      <!-- Fin subcontent-left -->
      <div class="sub-content-right">
        <div class="item">
          <i class="fas fa-users"></i>
          <p>Présents</p>
          <i class="fas fa-chevron-circle-up"></i>
          <h3 id="itemPresents">---</h3>
        </div>
        <div class="item">
          <i class="fas fa-bell"></i>
          <p>Décibels</p>
          <!-- Remplacer en fonction de la valeur d'avant, augmentation ou diminution -->
          <i class="fas fa-chevron-circle-down"></i>
          <!-- Remplacer en fonction de la valeur actuelle -->
          <h3 id="itemNiveau">---</h3>
        </div>
        <!--
        <div class="item">
          <i class="fas fa-history"></i>
          <p>Dernière Activité</p>
          <i class="fas fa-chevron-circle-up"></i>
          <h3 id="itemDerniere"></h3>
        </div>
        -->
      </div>
      <!-- Fin subcontent-right -->
    </div>
  </div>

  <!-- Scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://kit.fontawesome.com/4066a3c5f6.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/fr.js"></script>
  <script src="templates/scripts/index.js"></script>

</body>

</html>
"""

print(html)

mydb.close()

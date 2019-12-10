from http.server import HTTPServer, BaseHTTPRequestHandler
import http.server
from os import curdir, sep
from model.Carte import *
from model.Salle import *
import mysql.connector
import json

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="arca220929!",
    database="AIPE"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM InfoCartes")
values1 = mycursor.fetchall()


listeCarte = []
json_data = []



for info in values1:
    if len(listeCarte) == 0:
        listeCarte.append(Carte(info[0]))
    else :
        for carte in listeCarte:
            if Carte(info[0]) != carte.getID():
                listeCarte.append(Carte(info[0]))

mycursor.execute("SELECT * FROM CartesSallesRelation")
values2 = mycursor.fetchall()

for info in values2:
    for carte in listeCarte:
        if info[0] == carte.getID():
            carte.ajouterSalle(Salle(carte, info[1]))

for carte in listeCarte:
    for localisation, salle in carte.getDictSalle().items():
        mycursor.execute("SELECT niveau_sonore FROM Cartes where micro=\"{0}\" limit 10".format(localisation))
        dataSalle = mycursor.fetchall()
        salle.updateNiveauSonore(dataSalle)

for carte in listeCarte:
    for salle, valeur in carte.getDictSalle().items():
        test = valeur.getNiveauSonore()
        dict = {}
        if salle[0] == "N":
            dict["batiment"] = "ND des Champs"
        if salle[0] == "L":
            dict["batiment"] = "ND de Lorette"
        if salle[0] == "N":
            if salle[1] == "1":
                dict["etage"] = "NDC - 1er"
            elif salle[1] == "2":
                dict["etage"] = "NDC - 2e"
            elif salle[1] == "3":
                dict["etage"] = "NDC - 3e"
            elif salle[2] == "1":
                dict["etage"] = "NDC - 5e"
            else:
                dict["etage"] = "NDC - 4e"
        elif salle[0] == "L":
            if salle[1] == "1":
                dict["etage"] = "NDL - 1er"
            elif salle[1] == "2":
                dict["etage"] = "NDL - 2e"
            elif salle[1] == "3":
                dict["etage"] = "NDL - 3e"
            elif salle[1] == "4":
                dict["etage"] = "NDL - 4e"
        dict["salle"] = salle
        dict["niveau"] = []
        for item in test:
            dict["niveau"].append(item[0])
        json_data.append(dict)
json_file = json.dumps(json_data)
print(json_file)

hostname = "172.16.237.233"
PORT = 9889
server_adress = (hostname, PORT)



class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        print(self.path)
        if self.path == "/":
            self.path = "/index.html"

        try:
            sendReply = False
            sendJson = False
            if self.path.endswith(".html"):
                mimetype = "text/html"
                sendReply = True
            if self.path.endswith(".css"):
                mimetype = "text/css"
                sendReply = True
            if self.path.endswith(".js"):
                mimetype = "application/javascript"
                sendReply = True
            if self.path.endswith(".json"):
                mimetype = "application/json"
                sendJson = True
            if self.path.endswith(".map"):
                mimetype = "application/json"
                sendReply = True

            if sendReply:
                f = open(curdir + sep + self.path)
                self.send_response(200)
                self.send_header('Content-type', mimetype)
                self.end_headers()
                self.wfile.write(bytes(f.read(), "utf-8"))
                f.close()
            if sendJson:
                print("JSON OK")
                self.send_response(200)
                self.send_header('Content-type', mimetype)
                self.end_headers()
                self.wfile.write(bytes(str(json_file), "utf-8"))

            return
        except IOError as e:
            print("Erreur d'ouverture du fichier : ", e)


print("Serveur actif sur le PORT : ", PORT)

server = HTTPServer(server_adress, MyHandler)
server.serve_forever()

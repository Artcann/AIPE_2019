from http.server import HTTPServer, BaseHTTPRequestHandler
from os import curdir, sep
from model.Carte import *
from model.Salle import *
import json

with open('salles.json') as json_data:
    json_inter = json.load(json_data)
    json_file = json.dumps(json_inter)
print(json_file)

hostname = "0.0.0.0"
PORT = 5000
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
                with open('salles.json') as json_data:
                    json_inter = json.load(json_data)
                    json_file = json.dumps(json_inter)
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

# coding : utf-8

import socket
import mysql.connector
from modules import ThreadClient as Thread

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="arca220929!",
    database="AIPE"
)

mycursor = mydb.cursor()

host = "172.16.237.233"
port = 8888

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((host, port))

server.listen(5)


clients = {}
while True:
    connexion, servClient = server.accept()

    thread = Thread.ThreadClient(connexion, servClient, clients, mycursor, mydb)
    thread.start()

    idclient = thread.getName()
    clients[idclient] = connexion



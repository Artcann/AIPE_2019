import socket
from random import randint
import time

host = "172.16.237.233"
port = 8888

socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
socket.connect((host, port))

listeSalles = ["N15", "N16-A", "N16-B", "N18", "N24", "N26", "N28", "N33", "N34", "N36", "N38",
               "N43", "N44", "N46", "N48-A", "N48-B", "N410", "N411", "L108", "L114", "L115", "L122", "L206",
               "L207", "L212", "L213", "L220", "NDL - 3e", "L305", "L306", "L311", "L312", "L313",
               "L409", "L416", "L417"]
for salle in listeSalles:
    for i in range(0, 15):
        message = '{0},{1},{2}'.format(randint(10, 30), salle, "Roxette")
        socket.send(bytes(str(message), "utf-8"))
        time.sleep(0.1)

socket.send(b"end")

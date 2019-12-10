import threading


class ThreadClient(threading.Thread):
    def __init__(self, connect, adresse, clients, cursor, db):
        threading.Thread.__init__(self)
        self.connexion = connect
        self.adresseClient = adresse
        self.clients = clients
        self.mycursor = cursor
        self.mydb = db

    def run(self):
        nom = self.getName()
        self.data = ''
        while True:
            self.data = self.connexion.recv(1024)
            print("Données reçues : {0} s'est connecté".format(self.adresseClient))
            self.data = self.data.decode('utf-8')
            if self.data == 'end':
                break
            else:
                self.data = self.data.split(",")
                self.niveau = self.data[0]
                self.micro = self.data[1]
                self.carte = self.data[2]
                print(self.data)
                sql = "INSERT INTO Cartes VALUES (%s,%s,%s,%s)"
                val = (None, self.niveau, self.micro, self.carte)
                self.mycursor.execute(sql, val)
                self.mydb.commit()

        self.connexion.close()
        print("connexion fermée avec le client {0}".format(self.micro))
        del self.clients[nom]

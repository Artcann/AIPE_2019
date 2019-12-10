# coding: utf-8

class Carte():
    def __init__(self, ID):
        self.ID = ID
        self.dictSalle = {}

    def __repr__(self):
        return self.ID

    def getID(self):
        return self.ID

    def ajouterSalle(self, Salle):
        self.dictSalle[Salle.getLocalisation()] = Salle

    def getDictSalle(self):
        return self.dictSalle
    
    def getSalle(self, Salle):
        return self.dictSalle[Salle.localisation()]

    def afficheSalles(self):
        for salle in self.dictSalle.keys():
            print(salle)


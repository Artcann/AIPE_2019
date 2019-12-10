# coding: utf-8

class Salle():
    def __init__(self, carte, localisation):
        self.carte = carte
        self.localisation = localisation
        self.niveauSonore = 0

    def getCarte(self):
        return self.carte
    
    def nouvelleCarte(self, carte):
        self.carte = carte

    def getNiveauSonore(self):
        return self.niveauSonore

    def updateNiveauSonore(self, niveauSonore):
        self.niveauSonore = niveauSonore

    def getLocalisation(self):
        return self.localisation

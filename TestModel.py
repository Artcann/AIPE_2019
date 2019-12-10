# coding: utf-8

from model.Salle import *
from model.Carte import *

carte1 = Carte("127.0.0.1")
carte2 = Carte("127.0.0.2")

salle1 = Salle(carte1, "N16")
salle2 = Salle(carte1, "N18")

carte1.ajouterSalle(salle1)
carte1.ajouterSalle(salle2)

print(salle1.getLocalisation())

print(carte1.getDictSalle())

print(carte1.afficheSalles())
print(carte1.__repr__())
print(carte2.__str__())


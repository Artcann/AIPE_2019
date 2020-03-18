import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="arca220929!",
    database="dbAipe"
)

mycursor = mydb.cursor()

listeSalles = ["N16-A", "N16-B", "N18", "N24", "N26", "N28", "N33", "N34", "N36", "N38",
               "N43", "N44", "N46", "N48-A", "N48-B", "N410", "N411", "L108", "L114", "L115", "L122", "L206",
               "L207", "L212", "L213", "L220", "NDL - 3e", "L305", "L306", "L311", "L312", "L313",
               "L409", "L416", "L417"]

for salle in listeSalles:
    mycursor.execute("INSERT INTO CartesSallesRelation VALUES (\"Roxette\",\"{0}\");".format(salle))

mydb.commit()

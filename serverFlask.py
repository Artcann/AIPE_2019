from flask import Flask, request, render_template
import json
import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="arca220929!",
    database="AIPE"
)

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")


@app.route('/salles.json')
def json_data():
    cursor = db.cursor()

    with open("salles.json") as json_file:
        data = json.load(json_file)

    json_file.close()

    for salle in data:
        cursor.execute(
            "SELECT niveau_sonore FROM Cartes where micro=\"{0}\" order by id desc limit 10".format(salle["salle"]))
        values = cursor.fetchall()

        for value in values:
            salle["niveau"].append(value[0])

    cursor.close()
    return json.dumps(data)


if __name__ == '__main__':
    app.run(debug=True)

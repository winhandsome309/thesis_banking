from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'loan_data'

mysql = MySQL(app)


@app.route("/")
@cross_origin()
def index():
    return "<p>This is index file</p>"


@app.route("/admin/waiting_app", methods=["GET", "POST"])
def waiting_app():
    if request.method == "POST":
        return "<p>POST!</p>"
    else:
        cursor = mysql.connect.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * from loan_data")
        data = cursor.fetchall()
        return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)

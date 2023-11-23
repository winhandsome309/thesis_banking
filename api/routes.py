from flask import Flask, request

from flaskext.mysql import MySQL

app = Flask(__name__)
mysql = MySQL()
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "root"
app.config["MYSQL_DATABASE_DB"] = "EmpData"
app.config["MYSQL_DATABASE_HOST"] = "localhost"
mysql.init_app(app)


@app.route("/")
def index():
    return "<p>This is index file</p>"


@app.route("/admin/waiting_app", methods=["GET", "POST"])
def waiting_app():
    if request.method == "POST":
        return "<p>POST!</p>"
    else:
        conn = mysql.connect()
        cursor = conn.cursor()

        cursor.execute("SELECT * from loan_data")
        data = cursor.fetchall()

        return "<p>GET!</p>"


if __name__ == "__main__":
    app.run(debug=True)

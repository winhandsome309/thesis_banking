from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
from flask_cors import CORS, cross_origin
import ast

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

mysql_host = "localhost"
mysql_user = "root"
mysql_password = ""
mysql_db = "loan_data"

# mysql_host = "bszj9ehek5tqoemiufpm-mysql.services.clever-cloud.com"
# mysql_user = "uwjlixjntoxk91y2"
# mysql_password = "iSgk194ukeYE68FIXB8T"
# mysql_db = "bszj9ehek5tqoemiufpm"

app.config["MYSQL_HOST"] = mysql_host
app.config["MYSQL_USER"] = mysql_user
app.config["MYSQL_PASSWORD"] = mysql_password
app.config["MYSQL_DB"] = mysql_db

mysql = MySQL(app)
db = MySQLdb.connect(mysql_host, mysql_user, mysql_password, mysql_db)


@app.route("/")
@cross_origin()
def index():
    return "<p>This is index file</p>"


@app.route("/admin/waiting-app", methods=["GET", "POST"])
def waiting_app():
    if request.method == "POST":
        data = ast.literal_eval(request.data.decode("UTF-8"))

        id = data["body"]["id"]
        credit_policy = data["body"]["credit_policy"]
        purpose = data["body"]["purpose"]
        int_rate = data["body"]["int_rate"]
        installment = data["body"]["installment"]
        log_annual_inc = data["body"]["log_annual_inc"]
        dti = data["body"]["dti"]
        fico = data["body"]["fico"]
        days_with_cr_line = data["body"]["days_with_cr_line"]
        revol_bal = data["body"]["revol_bal"]
        revol_util = data["body"]["revol_util"]
        inq_last_6mths = data["body"]["inq_last_6mths"]
        delinq_2yrs = data["body"]["delinq_2yrs"]
        pub_rec = data["body"]["pub_rec"]

        cursor = db.cursor()
        cursor.execute(
            """INSERT INTO waiting_loan VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (
                id,
                credit_policy,
                purpose,
                int_rate,
                installment,
                log_annual_inc,
                dti,
                fico,
                days_with_cr_line,
                revol_bal,
                revol_util,
                inq_last_6mths,
                delinq_2yrs,
                pub_rec,
                100,
            ),
        )
        db.commit()
        cursor.close()
        return "success"
    else:
        cursor = mysql.connect.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * from waiting_loan")
        data = cursor.fetchall()
        return jsonify(data)


@app.route("/admin/delete/waiting-app", methods=["POST"])
def delete_waiting_app():
    if request.method == "POST":
        id = request.args.get("id")
        cursor = db.cursor()
        cursor.execute("DELETE FROM waiting_loan WHERE id = '%s'" % id)
        db.commit()
        cursor.close()
        return "success"


@app.route("/admin/get-current-id", methods=["GET", "POST"])
def get_current_id():
    if request.method == "GET":
        cursor = mysql.connect.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT MAX(id) as id from waiting_loan")
        data = cursor.fetchall()
        cursor.close()
        return str(data[0]["id"])


@app.route("/admin/processed-app", methods=["GET", "POST"])
def processed_app():
    if request.method == "POST":
        id = request.args.get("id")

        cursor = db.cursor()
        cursor.execute("SELECT * FROM waiting_loan WHERE id = '%s'" % id)
        data = cursor.fetchone()
        cursor.close()

        id = data[0]
        credit_policy = data[1]
        purpose = data[2]
        int_rate = data[3]
        installment = data[4]
        log_annual_inc = data[5]
        dti = data[6]
        fico = data[7]
        days_with_cr_line = data[8]
        revol_bal = data[9]
        revol_util = data[10]
        inq_last_6mths = data[11]
        delinq_2yrs = data[12]
        pub_rec = data[13]
        status = data[14]

        cursor = db.cursor()
        cursor.execute(
            """INSERT INTO processed_loan VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (
                id,
                credit_policy,
                purpose,
                int_rate,
                installment,
                log_annual_inc,
                dti,
                fico,
                days_with_cr_line,
                revol_bal,
                revol_util,
                inq_last_6mths,
                delinq_2yrs,
                pub_rec,
                100,
                status,
            ),
        )
        db.commit()
        cursor.close()
        return "success"

    else:
        cursor = mysql.connect.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * from processed_loan")
        data = cursor.fetchall()
        return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)

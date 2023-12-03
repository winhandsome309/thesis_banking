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

# app.config['MYSQL_HOST'] = 'bszj9ehek5tqoemiufpm-mysql.services.clever-cloud.com'
# app.config['MYSQL_USER'] = 'uwjlixjntoxk91y2'
# app.config['MYSQL_PASSWORD'] = 'iSgk194ukeYE68FIXB8T'
# app.config['MYSQL_DB'] = 'bszj9ehek5tqoemiufpm'

mysql = MySQL(app)
db = MySQLdb.connect("localhost", "root", "", "loan_data")


@app.route("/")
@cross_origin()
def index():
    return "<p>This is index file</p>"


@app.route("/admin/waiting_app", methods=["GET", "POST"])
def waiting_app():
    if request.method == "POST":
        data = ast.literal_eval(request.data.decode("UTF-8"))

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
            """INSERT INTO loan_data VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (
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
                1,
                100,
            ),
        )
        db.commit()
        cursor.close()
        return "<p>Success!</p>"
    else:
        cursor = mysql.connect.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * from loan_data")
        data = cursor.fetchall()
        return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)

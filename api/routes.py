from flask import Flask, request


app = Flask(__name__)

@app.route('/')
def index():
    return "<p>This is index file</p>"

@app.route("/waiting_app", method = ['GET', 'POST'])
def waiting_app():
    if request.method == "POST":
        return "<p>POST!</p>"
    else: return "<p>GET!</p>"
    
if __name__ == "__main__":
    app.run(debug=True)
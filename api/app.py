from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import json


app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/")
@cross_origin()
def home():
    return jsonify({ "status": "running", "message": "App is running successfully." }), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)

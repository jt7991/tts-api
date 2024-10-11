from melo.api import TTS
import os
import uuid
from flask import request
from flask import render_template
from flask import Flask
from minio import Minio, S3Error
from dotenv import load_dotenv
import nltk
from site_parser import parse_site
from tts import tts

app = Flask(__name__)

@app.route("/", methods=["POST"])
def process_text():
    tts(request.form['text'])

@app.route("/parse-url", methods=["POST"])
def parse_url():
  text = parse_site(request.form['url'])
  if text == "":
    return "Could not parse site"
  return tts(text)
    
@app.route("/", methods=["GET"])
def get_form():
    return render_template("home.html")

@app.route("/url", methods=["GET"])
def get_url_form():
    return render_template('url_form.html')

@app.route("/health", methods=['GET'])
def healthcheck():
    return "healthy!"

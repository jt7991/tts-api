from melo.api import TTS
from flask import request
from flask import Flask
import nltk
nltk.download('averaged_perceptron_tagger_eng')

# Speed is adjustable
speed = 1.0

# CPU is sufficient for real-time inference.
# You can set it manually to 'cpu' or 'cuda' or 'cuda:0' or 'mps'
device = 'auto' # Will automatically use GPU if available

# English 
model = TTS(language='EN', device=device)
speaker_ids = model.hps.data.spk2id

output_path = 'en-us.wav'

app = Flask(__name__)

@app.route("/", methods=["POST"])
def process_text():
    text = request.get_json()["text"]
    print(text)
    model.tts_to_file(text, speaker_ids['EN-Default'], output_path, speed=speed)
    return output_path

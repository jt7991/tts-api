from flask import Flask
from flask import request
from bark import SAMPLE_RATE, generate_audio, preload_models
from scipy.io.wavfile import write as write_wav

# download and load all models
preload_models()

# play text in notebook
app = Flask(__name__)

@app.route("/", methods=["POST"])
def process_text():
    text = request.get_json()["text"]
    print(text)
    audio_array = generate_audio(text)

    write_wav("bark_generation.wav", SAMPLE_RATE, audio_array)
    return audio_array

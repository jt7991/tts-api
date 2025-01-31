
import os
import uuid
from melo.api import TTS
import os
import uuid
from minio import Minio, S3Error
from dotenv import load_dotenv

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

def tts(text):
    minio_url = os.environ.get('MINIO_URL')
    minio_access_key = os.environ.get('MINIO_ACCESS_KEY')
    minio_secret_key = os.environ.get('MINIO_SECRET_KEY')

    if not minio_url or not minio_access_key or not minio_secret_key:
        return "Please set MINIO_URL, MINIO_ACCESS_KEY, and MINIO_SECRET_KEY environment variables."

    minio_client = Minio(minio_url,
        access_key= minio_access_key,
        secret_key= minio_secret_key,
    )

    uuid_str = str(uuid.uuid4())
    

    output_path_minio = uuid_str + '.wav'
    model.tts_to_file(text, speaker_ids['EN-Default'], output_path_minio, speed=speed)
    minio_client.fput_object('tts', output_path_minio, output_path_minio)

    # Generate the file URL
    file_url = minio_client.presigned_get_object("tts", output_path_minio)
    return file_url

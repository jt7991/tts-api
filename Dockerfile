# syntax=docker/dockerfile:1

FROM python:3.10.12

WORKDIR /

COPY requirements.txt requirements.txt

RUN apt-get update && apt-get install -y git

RUN pip install --no-cache-dir --upgrade pip setuptools wheel
RUN pip install --no-cache-dir git+https://github.com/myshell-ai/MeloTTS.git
RUN pip install -r requirements.txt
RUN python -m unidic download

COPY . .
EXPOSE 8000
CMD [ "gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "main:app" ]

# syntax=docker/dockerfile:1

FROM python:3.10

WORKDIR /

COPY requirements.txt requirements.txt

RUN apt-get update && apt-get install -y git

RUN pip install --no-cache-dir --upgrade pip setuptools wheel
RUN python -m unidic download
RUN pip install -r requirements.txt

COPY . .

CMD [ "gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "main:app" ]

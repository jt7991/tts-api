# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

WORKDIR /

COPY requirements.txt requirements.txt

RUN apt-get update && apt-get install -y git
RUN pip install -r requirements.txt

COPY . .

CMD [ "gunicorn", "-w", "4", "-b", "8000", "main" ]

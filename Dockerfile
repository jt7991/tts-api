# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

WORKDIR /

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD [ "gunicorn", "-w", "4", "-b", "8000", "main" ]

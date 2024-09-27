# syntax=docker/dockerfile:1

FROM python:3.10.12

WORKDIR /

COPY requirements.txt requirements.txt

RUN apt-get update && apt-get install -y git
RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "-m", "unidic", "download" ]
CMD [ "gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "main:app" ]

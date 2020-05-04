FROM python:3.6-alpine

EXPOSE 8000

RUN apk add --no-cache gcc python3-dev musl-dev

# ADD . /django_ec2

WORKDIR /django_ec2
ADD . /django_ec2

RUN pip install -r requirements.txt
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py test
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]

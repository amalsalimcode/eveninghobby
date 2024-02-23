# management/commands/ingest_data.py
from django.core.management.base import BaseCommand
import csv
from etl.models import Consumer
import requests

class Command(BaseCommand):
    def handle(self, *args, **options):
        # read CSV file and ingest data into the database
        endpoint_url = "https://drive.google.com/uc?id=1W_kilVANsPW3tUUFLPOB7WEibvNItVJh"
        response = requests.get(endpoint_url)
        # print(response.content.decode('utf-8'))

        if response.status_code == 200:
            # Decode the content of the response
            content = response.content.decode('utf-8')

            # Parse the CSV content
            csv_data = csv.reader(content.splitlines(), delimiter=',')

            # Convert CSV data to a list of dictionaries
            headers = next(csv_data)
            for row in csv_data:
                d = dict(zip(headers, row))
                Consumer.objects.create(
                    client_reference_no=d['client reference no'],
                    balance=d['balance'],
                    status=d['status'].lower(),
                    name=d['consumer name'].lower(),
                    address=d['consumer address'],
                    ssn=d['ssn']
                )

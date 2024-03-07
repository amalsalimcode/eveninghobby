# management/commands/ingest_data.py
from datetime import datetime
from django.core.management.base import BaseCommand
import csv

from foodtruck.models import FoodVendor 

class Command(BaseCommand):
    help = 'Import data from CSV file into the database'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file to import')

    def handle(self, *args, **options):
        csv_file = options['csv_file']
        
        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                import pprint
                pprint.pprint(row)
                row['ExpirationDate'] = datetime.strptime(row['ExpirationDate'], '%m/%d/%Y %I:%M:%S %p') if row['ExpirationDate'] else ''
                row['Approved'] = datetime.strptime(row['Approved'], '%m/%d/%Y %I:%M:%S %p') if row['Approved'] else ''

                obj = FoodVendor.objects.create(
                    locationid=row.get('locationid'),
                    Applicant=row.get('Applicant'),
                    FacilityType=row.get('FacilityType'),
                    cnn=row.get('cnn'),
                    LocationDescription=row.get('LocationDescription'),
                    Address=row.get('Address'),
                    blocklot=row.get('blocklot'),
                    block=row.get('block'),
                    lot=row.get('lot'),
                    permit=row.get('permit'),
                    Status=row.get('Status'),
                    FoodItems=row.get('FoodItems'),
                    X=row.get('X') or None,
                    Y=row.get('Y') or None,
                    Latitude=row.get('Latitude'),
                    Longitude=row.get('Longitude'),
                    Schedule=row.get('Schedule'),
                    dayshours=row.get('dayshours'),
                    NOISent=row.get('NOISent'),
                    Approved=row.get('Approved'),
                    Received=row.get('Received'),
                    PriorPermit=row.get('PriorPermit'),
                    ExpirationDate=row.get('ExpirationDate') or '9999-01-01',
                    FirePreventionDistricts=row.get('Fire Prevention Districts') or None,
                    PoliceDistricts=row.get('Police Districts') or None,
                    SupervisorDistricts=row.get('Supervisor Districts') or None,
                    ZipCodes=row.get('Zip Codes') or None,
                    Neighborhoods=row.get('Neighborhoods (old)')
                )
                obj.save()

        self.stdout.write(self.style.SUCCESS('Data imported successfully'))
# management/commands/ingest_data.py
from datetime import datetime
import json
from django.core.management.base import BaseCommand
import csv

from foodtruck.models import FoodVendor 

class Command(BaseCommand):
    help = 'Import data from CSV file into the database'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file to import')
    
    def format_food(self, categories):
        formatted_menu = []
        for category in categories.split(". "):
            if category:
                parts = category.split(": ", 1)
                category_name = parts[0]
                items = parts[1] if len(parts) > 1 else ""  # Handle cases where there are no items listed
                items_list = [x.strip().lower() for x in items.split(":")]
                formatted_menu.append({"category_name": category_name.lower().capitalize(), "items": items_list})
        return json.dumps(formatted_menu)
        
        
    def handle(self, *args, **options):
        csv_file = options['csv_file']
        
        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                row['ExpirationDate'] = datetime.strptime(row['ExpirationDate'], '%m/%d/%Y %I:%M:%S %p') if row['ExpirationDate'] else ''
                row['Approved'] = datetime.strptime(row['Approved'], '%m/%d/%Y %I:%M:%S %p') if row['Approved'] else ''
                row['FoodItems'] = self.format_food(row.get('FoodItems'))

                obj = FoodVendor.objects.create(
                    location_id=row.get('locationid'),
                    applicant=row.get('Applicant'),
                    facility_type=row.get('FacilityType'),
                    location_description=row.get('LocationDescription'),
                    address=row.get('Address'),
                    permit=row.get('permit'),
                    status=row.get('Status'),
                    food_items=row.get('FoodItems'),
                    latitude=row.get('Latitude'),
                    longitude=row.get('Longitude'),
                    days_hours=row.get('dayshours'),
                    approved=row.get('Approved'),
                    received=row.get('Received'),
                    prior_permit=row.get('PriorPermit'),
                    expiration_date=row.get('ExpirationDate') or '9999-01-01',
                    zip_codes=row.get('Zip Codes') or None,
                )
                obj.save()

        self.stdout.write(self.style.SUCCESS('Data imported successfully'))
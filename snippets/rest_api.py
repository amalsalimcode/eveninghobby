import requests
url = 'https://maps.googleapis.com/maps/api/geocode/json'
params = {'address': location_param, 'key': 'AIzaSyAR64j4rBqetvMfH_bB8ysQD4C5m0CTy5c'}
r = requests.get(url, params=params)
geocode_result = r.json()

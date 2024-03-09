# Find Food Vendor

### Using Docker (Recommended)

If you have Docker installed, you can easily run the project using Docker Compose.

```bash
docker-compose up
```

This will start both the frontend and backend services.

- Frontend: [http://127.0.0.1:3000/](http://127.0.0.1:3000/)
- Backend: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

### Without Docker

If you don't have Docker, follow these steps:

1. **Backend Setup:**

   - Navigate to the backend folder:

     ```bash
     cd backend
     ```

   - Install Python dependencies:

     ```bash
     pip install -r requirements.txt
     ```

   - Run Django server:

     ```bash
     python manage.py runserver
     ```

2. **Frontend Setup:**

   - Navigate to the frontend folder:

     ```bash
     cd frontend
     ```

   - Install Node.js dependencies:

     ```bash
     npm install
     ```

   - Start the frontend server:

     ```bash
     npm start
     ```

- Frontend: [http://127.0.0.1:3000/](http://127.0.0.1:3000/)
- Backend: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

## Data Ingestion

The data can be ingested into the database using the following command:

```bash
python manage.py ingest_data <file_name>
```

The data is already ingested, and SQLite is available in the repository in case you want to skip data ingestion.

If you wish to re-ingest the data or start from scratch:

1. Delete the `db.sqlite3` file.
2. Run migrations:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

3. Ingest the data:

   ```bash
   python manage.py ingest_data <file_name>
   ```

```

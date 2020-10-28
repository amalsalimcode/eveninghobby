import sqlite3 as sql
import pymongo

def get_db(read=False):
    con = sql.connect("database.db")
    if read:
        con.row_factory = sql.Row
    return con.cursor(), con

def get_mongo_db(col):
    m_client = pymongo.MongoClient("mongodb://localhost:27017/")
    m_db = m_client["mydatabase"]
    return m_db[col]


def create_location(imei, l_time, l_lat, l_long):
    mycol = get_mongo_db(imei)
    mycol.insert_one({"time": l_time, "lat": l_lat, "long": l_long})


def init_table():
    cur, con = get_db()
    # con.execute('DROP TABLE alarm')
    # con.execute('DROP TABLE video_file')

    con.execute('CREATE TABLE if not exists alarm '
                '(type varchar(100),'
                'imei TEXT,'
                'time DATETIME,'
                'lat TEXT,'
                'long TEXT)')

    con.execute('CREATE TABLE if not exists video_file'
                '(file_name VARCHAR(100),'
                'alarm_id INTEGER,'
                'FOREIGN KEY (alarm_id) REFERENCES alarm(id))')

    con.commit()
    con.close()

def create_alarm(imei, al_type, al_time, lat, long):
    cur, con = get_db()
    con.execute('INSERT INTO alarm (imei, type, time, lat, long) VALUES (?, ?, ?, ?, ?)',
                [imei, al_type, al_time, lat, long])
    row_id = con.execute('select last_insert_rowid()').fetchone()[0]
    con.commit()
    con.close()
    return row_id

def create_file(alarm_id, file_name):
    cur, con = get_db()
    con.execute('INSERT INTO video_file (alarm_id, file_name) VALUES (?, ?)',
                [alarm_id, file_name])
    row_id = con.execute('select last_insert_rowid()').fetchone()[0]
    con.commit()
    con.close()
    return row_id

def get_users_all():
    cur, con = get_db(True)
    rows = cur.execute("SELECT * from credentials").fetchall()
    con.close()
    user_lst = [[x[0], x[1]] for x in rows] if len(rows) else []
    return user_lst

def user_exists(imei):
    cur, con = get_db()
    exists = cur.execute("SELECT 1 FROM credentials WHERE imei = (?)", [imei]).fetchall()
    con.close()
    return bool(len(exists))

def create_user(imei, hashed_imei):
    cur, con = get_db()
    cur.execute("INSERT INTO credentials (imei, password) VALUES (?, ?)", [imei, hashed_imei])
    con.commit()
    con.close()

def get_password(username):
    cur, con = get_db()
    data = cur.execute('SELECT * FROM credentials WHERE username = (?)', [username]).fetchone()
    con.close()
    return data[1] if data else None

def update_credentials(username, hashed_pass):
    cur, con = get_db()
    cur.execute('UPDATE credentials SET password = (?) WHERE username = (?)', [hashed_pass, username])
    con.commit()
    con.close()


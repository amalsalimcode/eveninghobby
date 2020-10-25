import sqlite3 as sql

def get_db(read=False):
    con = sql.connect("database.db")
    if read:
        con.row_factory = sql.Row
    return con.cursor(), con

def create_credentials_table():
    cur, con = get_db(True)
    con.execute('CREATE TABLE IF NOT EXISTS credentials (USERNAME varchar(255), PASSWORD varchar(255))')
    con.close()

def get_users_all():
    cur, con = get_db(True)
    rows = cur.execute("SELECT * from credentials").fetchall()
    con.close()
    user_lst = [[x[0], x[1]] for x in rows] if len(rows) else []
    return user_lst

def user_exists(username):
    cur, con = get_db()
    exists = cur.execute("SELECT 1 FROM credentials WHERE username = (?)", [username]).fetchall()
    con.close()
    return bool(len(exists))

def create_user(username, hashed_pass):
    cur, con = get_db()
    cur.execute("INSERT INTO credentials (username, password) VALUES (?, ?)", [username, hashed_pass])
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


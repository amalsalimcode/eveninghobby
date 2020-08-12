import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase("db.db");

export const success = (tx, result) => {
    console.log("SQL Success", result)
}

export const error = (tx, result) => {
    console.log("SQL Error", tx, result)
}

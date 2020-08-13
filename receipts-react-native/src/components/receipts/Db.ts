import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase("db.db");

export const success = (_, result) => {
    console.log("SQL Success", result)
}

export const error = (tx, result) => {
    console.log("SQL Error", tx, result)
}

export const createTable = () => {
    db.transaction(tx => {
        tx.executeSql("DROP TABLE IF EXISTS receipt")
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS receipt (id integer PRIMARY KEY NOT NULL, amount FLOAT, store TEXT, memo TEXT, fileName TEXT, purchasedAt DATE);"
        );
    },
    null,
    () => { });
}

export const addReceipt = (v: { amount: number; memo: String; store: String, purchasedAt: String, fileName: String }) => {

    db.transaction(
        tx => {
            tx.executeSql("insert into receipt (amount, store, memo, fileName, purchasedAt) values (?, ?, ?, ?, ?)", [v.amount, v.store, v.memo, v.fileName, v.purchasedAt], success, error);
        },
        null,
        () => { }
    );
}

export const ReadReceipt = (setResult) => {
    db.transaction(
        tx => {
            tx.executeSql("SELECT * FROM receipt ORDER BY purchasedAt DESC", [], (_, { rows }) => {console.log(rows["_array"]); setResult(rows["_array"])});
        },
        null,
        () => {console.log("here is the error") }
    );
}
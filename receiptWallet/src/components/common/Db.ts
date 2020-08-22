import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase("db.db");

export const success = (_, result) => {
    console.log("SQL Success", result)
}

export const error = (tx, result) => {
    console.log("SQL Error", tx, result)
}

export const transactionError = (error) => {
    console.log("DB transaction error", error)
}

export const createTable = () => {
    db.transaction(tx => {
        // tx.executeSql("DROP TABLE IF EXISTS receipt")
        // tx.executeSql("DROP TABLE IF EXISTS category")
        tx.executeSql("CREATE TABLE IF NOT EXISTS category (type VARCHAR(100) PRIMARY KEY NOT NULL);", null, success, error);
        tx.executeSql("CREATE TABLE IF NOT EXISTS label (type VARCHAR(100) PRIMARY KEY NOT NULL);", null, success, error);
        tx.executeSql("INSERT OR IGNORE INTO label (type) values (?), (?), (?)", ["Taxes 2020", "Utah Road Trip"], null, success, error);
        tx.executeSql("INSERT OR IGNORE INTO category (type) values (?), (?), (?)", ["groceries", "dining", "gas"], null, success, error);
        tx.executeSql("CREATE TABLE IF NOT EXISTS receipt (id integer PRIMARY KEY NOT NULL, amount FLOAT, store VARCHAR(200), memo TEXT, fileName VARCHAR(100), purchasedAt DATE, isdeleted BOOLEAN DEFAULT FALSE, uuid VARCHAR(100), category VARCHAR(100) DEFAULT NULL, FOREIGN KEY (category) REFERENCES category(type));", null, success, error);
    },
        null,
        () => { });
}

export const addReceiptDb = (v: { amount: number; memo: String; store: String, purchasedAt: String, fileName: String, uuid: String, category: String }) => {

    db.transaction(
        tx => {
            tx.executeSql("insert into receipt (amount, store, memo, fileName, purchasedAt, isdeleted, uuid, category) values (?, ?, ?, ?, ?, ?, ?, ?)", [v.amount, v.store, v.memo, v.fileName, v.purchasedAt, false, v.uuid, v.category], success, error);
        },
        null,
        () => { }
    );
}

export const ReadReceipt = (setResult) => {
    db.transaction(
        tx => {
            tx.executeSql("SELECT * FROM receipt WHERE isdeleted = FALSE ORDER BY purchasedAt DESC, id DESC", [], (error, { rows }) => { setResult(rows["_array"]) });
        },
        null,
        null
    );
}

export const ReadCategoryTypes = (setResult) => {
    db.transaction(
        tx => {
            tx.executeSql("SELECT type FROM category", [], (error, { rows }) => { setCategoryTypesResult(rows["_array"], setResult) });
        },
        null,
        null
    );
}

export const ReadLabelTypes = (setResult) => {
    db.transaction(
        tx => {
            tx.executeSql("SELECT type FROM label", [], (error, { rows }) => { setCategoryTypesResult(rows["_array"], setResult) });
        },
        null,
        null
    );
}

export const AddNewLabelTypes = (arg) => {
    db.transaction(
        tx => {
            tx.executeSql("SELECT type FROM label", [], (error, { rows }) => { setCategoryTypesResult(rows["_array"], setResult) });
        },
        null,
        null
    );
}

const setCategoryTypesResult = (output, setResult) => {
    let values = []
    for (var key in output) {
        values.push(output[key]["type"])
    }
    setResult(values)
}

export const deleteReceiptDb = (uuid) => {

    var argCount = ""
    uuid.forEach((_, index) => { index != uuid.length - 1 ? argCount += "?, " : argCount += "?" });
    db.transaction(
        tx => {
            tx.executeSql("UPDATE receipt SET isdeleted = TRUE where uuid in (" + argCount + ")", uuid, success, error);
        },
        null,
        null
    );

    return

}
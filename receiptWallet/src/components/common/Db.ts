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
        tx.executeSql("CREATE TABLE IF NOT EXISTS ReceiptLabelRelation (id integer PRIMARY KEY NOT NULL, receiptid INTEGER DEFAULT NULL, label VARCHAR(100) DEFAULT NULL, FOREIGN KEY (receiptid) REFERENCES receipt(id), FOREIGN KEY (label) REFERENCES label(type));", null, success, error)
    },
        null,
        () => { });
}

export function addReceiptDb(v: { amount: number, memo: String, store: String, purchasedAt: String, fileName: String, uuid: String, category: String }) {
    console.log("here is the purchasedate", v.purchasedAt)
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql("insert into receipt (amount, store, memo, fileName, purchasedAt, isdeleted, uuid, category) values (?, ?, ?, ?, DATE(?), ?, ?, ?)", [v.amount, v.store, v.memo, v.fileName, v.purchasedAt, false, v.uuid, v.category],
                    (_, result) => { resolve(result["insertId"]) }, null);
            },
            null,
            () => { }
        );
    })
}

export const updateReceiptDb = (v: { amount: number, memo: String, store: String, purchasedAt: String, category: String }, receiptId) => {
    console.log("args", v)
    console.log("receiptId", receiptId)
    db.transaction(
        tx => {
            tx.executeSql("UPDATE receipt SET amount=?, memo=?, store=?, purchasedAt=?, category=? WHERE id=?", [v.amount, v.memo, v.store, v.purchasedAt, v.category, receiptId], (error, { rows }) => { console.log(rows) });
        },
        null,
        null
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
            tx.executeSql("SELECT type FROM category", [], (error, { rows }) => { filterSetResult(rows["_array"], setResult, "type") });
        },
        null,
        null
    );
}

export const ReadLabelTypes = (setResult) => {
    db.transaction(
        tx => {
            tx.executeSql("SELECT type FROM label", [], (error, { rows }) => { filterSetResult(rows["_array"], setResult, "type") });
        },
        null,
        null
    );
}

export const ReadRLRFromReceipt = (setResult, receiptId) => {
    db.transaction(
        tx => {
            tx.executeSql("select label from receiptlabelrelation where receiptid=?", [receiptId], (error, { rows }) => { filterSetResult(rows["_array"], setResult, "label") });
        },
        null,
        null
    );
}

export function ReadLabelTypesAsync() {
    return new Promise((resolve, _) => {
        db.transaction(
            tx => {
                tx.executeSql("SELECT type FROM label", [], (_, { rows }) => {
                    let x = getLabelTypesResult(rows["_array"])
                    resolve(x)
                }, null);
            },
            null,
            () => { }
        );
    })
}

export function ReadCategoryTypesAsync() {
    return new Promise((resolve, _) => {
        db.transaction(
            tx => {
                tx.executeSql("SELECT type FROM category", [], (_, { rows }) => {
                    let x = getLabelTypesResult(rows["_array"])
                    resolve(x)
                }, null);
            },
            null,
            () => { }
        );
    })
}

export const AddNewLabelType = (arg) => {
    db.transaction(
        tx => {
            tx.executeSql("insert into label (type) values (?)", [arg], success, error);
        },
        null,
        null
    );
}

export const AddNewCategoryType = (arg) => {
    db.transaction(
        tx => {
            tx.executeSql("insert into category (type) values (?)", [arg], success, error);
        },
        null,
        null
    );
}

const getLabelTypesResult = (output) => {
    let values = []
    for (var key in output) {
        values.push(output[key]["type"])
    }
    return values
}
const filterSetResult = (output, setResult, column) => {
    let values = []
    for (var key in output) {
        values.push(output[key][column])
    }
    setResult(values)
}

export const deleteReceiptDb = (uuid) => {
    var arg = ""
    uuid.forEach((_, index) => { index != uuid.length - 1 ? arg += "?, " : arg += "?" });
    db.transaction(
        tx => {
            tx.executeSql("UPDATE receipt SET isdeleted = TRUE where uuid in (" + arg + ")", uuid, success, error);
        },
        null,
        null
    );
    return
}

export const addReceiptLabelRelationDb = (receiptId: number, label: Array<string>) => {
    var arg = ""
    label.forEach((value, index) => {
        index != label.length - 1 ? arg += "(" + receiptId + "," + "\"" + value + "\"" + "), " :
            arg += "(" + receiptId + "," + "\"" + value + "\"" + ");"
    });
    db.transaction(
        tx => {
            tx.executeSql("INSERT INTO receiptlabelrelation ('receiptid', 'label') VALUES " + arg, success, error);
        },
        null,
        null
    );
}

export const deleteReceiptLabelRelationDb = (label, id) => {
    var arg = ""
    label.forEach((_, index) => { index != label.length - 1 ? arg += "?, " : arg += "?" });
    db.transaction(
        tx => {
            tx.executeSql("DELETE from receiptlabelrelation where label in (" + arg + ") AND receiptid = " + id + "", label, success, error);
        },
        null,
        null
    );
    return
}

export const filterReceiptExactDate = (searchVal) => {
    db.transaction(
        tx => {
            tx.executeSql("SELECT * from RECEIPT where store in ?", searchVal, success, error);
        },
        null,
        null
    );
}
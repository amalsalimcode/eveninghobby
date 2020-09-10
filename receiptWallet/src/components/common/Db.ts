import * as SQLite from 'expo-sqlite';
import { getSQLformattedDate } from './constants';

export const db = SQLite.openDatabase("db.db");

export const success = (_, result) => {
    // console.log("SQL Success", result)
}

export const error = (tx, result) => {
    console.log("SQL Error", tx, result)
}

export const transactionError = (error) => {
    console.log("DB transaction error", error)
}

export const createTable = () => {
    db.transaction(tx => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS category (type VARCHAR(100) PRIMARY KEY NOT NULL);", null, success, error);
        tx.executeSql("CREATE TABLE IF NOT EXISTS label (type VARCHAR(100) PRIMARY KEY NOT NULL);", null, success, error);
        tx.executeSql("INSERT OR IGNORE INTO label (type) values (?), (?), (?)", ["Taxes 2020", "Utah Road Trip"], null, success, error);
        tx.executeSql("INSERT OR IGNORE INTO category (type) values (?), (?), (?)", ["groceries", "dining", "gas"], null, success, error);
        tx.executeSql("CREATE TABLE IF NOT EXISTS receipt (id integer PRIMARY KEY NOT NULL, amount FLOAT, store VARCHAR(200), memo TEXT, fileuri VARCHAR(200), fileId VARCHAR(100), purchasedAt DATE, isdeleted BOOLEAN DEFAULT FALSE, uuid VARCHAR(100), category VARCHAR(100) DEFAULT NULL, FOREIGN KEY (category) REFERENCES category(type));", null, success, error);
        tx.executeSql("CREATE TABLE IF NOT EXISTS receiptlabelrelation (id integer PRIMARY KEY NOT NULL, receiptid INTEGER DEFAULT NULL, label VARCHAR(100) DEFAULT NULL, FOREIGN KEY (receiptid) REFERENCES receipt(id), FOREIGN KEY (label) REFERENCES label(type));", null, success, error)
    },
        null,
        () => { });
}

export const deleteAllTables = () => {
    db.transaction(tx => {
        tx.executeSql("DROP TABLE IF EXISTS receipt")
        tx.executeSql("DROP TABLE IF EXISTS category")
        tx.executeSql("DROP TABLE IF EXISTS label")
        tx.executeSql("DROP TABLE IF EXISTS receiptlabelrelation")
    },
        null,
        () => { });

}

export function addReceiptDb(v: { amount: number, memo: String, store: String, purchasedAt: String, fileuri: String, fileid: String, uuid: String, category: String }) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql("insert into receipt (amount, store, memo, fileuri, fileid, purchasedAt, isdeleted, uuid, category) values (?, ?, ?, ?, ?, DATE(?), ?, ?, ?)", [v.amount, v.store, v.memo, v.fileuri, v.fileid, v.purchasedAt, 0, v.uuid, v.category],
                    (_, result) => { resolve(result["insertId"]) }, null);
            },
            null,
            () => { }
        );
    })
}

export const updateReceiptDb = (v: { amount: number, memo: String, store: String, purchasedAt: String, category: String }, receiptId) => {
    db.transaction(
        tx => {
            tx.executeSql("UPDATE receipt SET amount=?, memo=?, store=?, purchasedAt=?, category=? WHERE id=?", [v.amount, v.memo, v.store, v.purchasedAt, v.category, receiptId], (error, { rows }) => { });
        },
        null,
        null
    );
}

export const ReadReceipt = (setResult) => {
    db.transaction(
        tx => {
            tx.executeSql("SELECT * FROM receipt WHERE isdeleted=0 ORDER BY purchasedAt DESC, id DESC", [], (error, { rows }) => { setResult(rows["_array"]) });
        },
        (e) => { console.log("error found", e) },
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
                    let x = getResultFromKey(rows["_array"], "type")
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
                tx.executeSql("SELECT type FROM category", [],
                    (_, { rows }) => {
                        let x = getResultFromKey(rows["_array"], "type")
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

const getResultFromKey = (output, valueKey) => {
    let values = []
    for (var key in output) {
        values.push(output[key][valueKey])
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

export function getReceiptFileIdFromUUID(uuid) {
    return new Promise((resolve, reject) => {
        var arg = ""
        uuid.forEach((_, index) => { index != uuid.length - 1 ? arg += "?, " : arg += "?" });
        db.transaction(
            tx => {
                tx.executeSql("select fileid from receipt where uuid in (" + arg + ")", uuid,
                    (_, { rows }) => {
                        let x = getResultFromKey(rows["_array"], "fileId")
                        resolve(x)
                    }, null);
            },
            null,
            () => { }
        );
    })
}

export const deleteReceiptDb = (uuid) => {
    var arg = ""
    uuid.forEach((_, index) => { index != uuid.length - 1 ? arg += "?, " : arg += "?" });
    db.transaction(
        tx => {
            // tx.executeSql("UPDATE receipt SET isdeleted = 1 where uuid in (" + arg + ")", uuid, success, error);
            tx.executeSql("DELETE from receipt where uuid in (" + arg + ")", uuid, success, error);
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

export const deleteLabel = (label) => {
    var arg = ""
    label.forEach((_, index) => { index != label.length - 1 ? arg += "?, " : arg += "?" });
    db.transaction(
        tx => {
            tx.executeSql("DELETE from label where type in (" + arg + ")", label, success, error);
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

export const buildSearchQuery = (searchVal, selectedLabel, selectedCategory, startDate, endDate, exactDate) => {

    let curPrefix = " WHERE"
    let query = "SELECT * FROM receipt"
    if (selectedLabel.length) {
        query += " INNER JOIN receiptlabelrelation on receipt.id = receiptlabelrelation.receiptid"
    }

    if (searchVal) {
        query += `${curPrefix} store like '%${searchVal}%' OR memo like '%${searchVal}%'`
        curPrefix = " AND"
    }

    if (selectedCategory.length) {
        var arg = ""
        selectedCategory.forEach((_, index) => { index != selectedCategory.length - 1 ? arg += `'${selectedCategory[index]}', ` : arg += `'${selectedCategory[index]}'` });
        query += `${curPrefix} category in (${arg})`
        curPrefix = " AND"
    }

    if (exactDate) {
        exactDate.setDate(exactDate.getDate() + 1)
        let exactDateFmt = getSQLformattedDate(exactDate)
        query += `${curPrefix} purchasedAt=DATE('${exactDateFmt}')`
        curPrefix = " AND"
    } else {

        if (startDate) {
            startDate.setDate(startDate.getDate() + 1)
            let startDateFmt = getSQLformattedDate(startDate)
            query += `${curPrefix} purchasedAt>=Date('${startDateFmt}')`
            curPrefix = " AND"
        }

        if (endDate) {
            endDate.setDate(endDate.getDate() + 1)
            let endDateFmt = getSQLformattedDate(endDate)
            query += `${curPrefix} purchasedAt<=Date('${endDateFmt}')`
            curPrefix = " AND"
        }

    }

    if (selectedLabel.length) {
        var arg = ""
        selectedLabel.forEach((_, index) => { index != selectedLabel.length - 1 ? arg += `'${selectedLabel[index]}', ` : arg += `'${selectedLabel[index]}'` });
        query += `${curPrefix} ReceiptLabelRelation.label in (${arg}) `
    }

    query += "order by purchasedAt desc;"

    return query
}

export const executeQuery = (query, setResult) => {
    db.transaction(
        tx => {
            tx.executeSql(query, [], (error, { rows }) => { setResult(rows["_array"]) });
        },
        null,
        null
    );
}
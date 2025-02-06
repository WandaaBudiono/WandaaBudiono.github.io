function readDB() {
    $.getJSON('./assets/database/', function (data) {
        db = {}
        $.each(data, (key, name) => {
            db[name.split('.')[0]] = $.getJSON(`./assets/database/${name}`, (data) => db[name.split('.')[0]] = data)
        });
    })
}

function updateDB(key, item) {
    if (key || item) {
        localStorage[key] = JSON.stringify(item)
    } else {
        $(db).each(function (key, db) {
            localStorage[key] = JSON.stringify(db)
        })
    }
}

readDB()
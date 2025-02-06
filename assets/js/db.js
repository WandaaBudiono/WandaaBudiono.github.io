function readDB() {
    $.getJSON('https://raw.githubusercontent.com/WandaaBudiono/WandaaBudiono.github.io/refs/heads/main/assets/database/index.json', function (data) {
        db = {};
        let files = data.files;
        $.each(files, (key, name) => {
            if (localStorage.length === 0) {
                $.getJSON(`https://raw.githubusercontent.com/WandaaBudiono/WandaaBudiono.github.io/refs/heads/main/assets/database/${name}.json`, (data) => {
                    db[name] = data
                    localStorage[name] = JSON.stringify(data)
                });
            } else db[name] = JSON.parse(localStorage[name])
        });
    });
}

function updateDB(key, item) {
    if (key && item) {
        localStorage[key] = JSON.stringify(item);
    } else {
        $.each(db, (key, db) => localStorage[key] = JSON.stringify(db));
    }
}

readDB();

// function readDB() {
//     $.getJSON('/assets/database/', function (data) {
//         db = {}
//         $.each(data, (key, name) => {
//             db[name.split('.')[0]] = $.getJSON(`/assets/database/${name}`, (data) => db[name.split('.')[0]] = data)
//         });
//     })
// }

// function updateDB(key, item) {
//     if (key || item) {
//         localStorage[key] = JSON.stringify(item)
//     } else {
//         $(db).each(function (key, db) {
//             localStorage[key] = JSON.stringify(db)
//         })
//     }
// }

// readDB()
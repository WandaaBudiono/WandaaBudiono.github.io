function readDB() {
    $.getJSON('https://raw.githubusercontent.com/WandaaBudiono/WandaaBudiono.github.io/refs/heads/main/assets/database/index.json', function (data) {
        db = {};
        let files = data.files;
        $.each(files, (key, name) => {
            if (!localStorage[name]) {
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
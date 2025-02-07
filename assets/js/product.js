product = {
    create: function (name, value) {
    },
    read: function (name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    delete: function (data) {
        delete user.getCart()[data]
    },
    add: function (data) {
        user.getCart()
        user.getCart().push(data)
        user.update()
    }
};
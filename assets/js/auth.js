session = {
    create: function (name, value, days) {
        var expires;

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
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
    delete: function (name) {
        this.create(name, "", -1);
    },
    user: function () {
        return this.read('user');
    }
};
$('#form_sign_in').on('submit', function (e) {
    e.preventDefault()
    let email = $('input[name="signin-email"]').val();
    let password = $('input[name="signin-password"]').val();
    let user = db.users[email] ? db.users[email] : undefined

    if (user && user.password === password) {
        session.create('user', JSON.stringify(user), 1);
        loadPage('index')
        location.reload()
    } else {
        alert('User atau password salah');
    }
})

$('#form_sign_up').on('submit', function (e) {
    e.preventDefault()
    let email = $('input[name="signup-email"]').val();
    let password = $('input[name="signup-password"]').val();
    let vpassword = $('input[name="signup-vpassword"]').val();
    let name = $('input[name="signup-fullname"]').val();
    let user = db.users[email] ? db.users[email] : undefined
    if (!user) {
        if (password === vpassword) {
            db.users[email] = {
                name,
                email,
                password,
                "role": "customer",
                "picture": "/assets/img/hacktiv8-logo.png",
                "cart": []
            }
            session.create('user', JSON.stringify(db.users[email]), 1);
            updateDB()
            loadPage('index')
            location.reload()
        } else {
            alert('Password tidak sama');
            $('input[name="signup-password"]').val('');
            $('input[name="signup-vpassword"]').val('');
        }
    } else console.log("Email sudah terdaftar. Silahkan login");
})

$(document).on("click", "#logout", function (e) {
    e.preventDefault();
    session.delete('user');
    loadPage('index');
    location.reload()
});

function user(User) {
    User = JSON.parse(session.user()) ?? 'guest';

    function getRole() {
        return User.role ??= User;
    }

    function getName() {
        return User.name;
    }

    function getAddress() {
        return User.address;
    }

    function getEmail() {
        return User.email;
    }

    function getSex() {
        return User.sex;
    }

    function getPicture() {
        return User.picture;
    }

    function getPassword() {
        return User.password;
    }

    function updateUser() {
        User.name = $("#nama").val();
        User.address = $("#alamat").val();
        User.email = $("#email").val();
        User.password = $("#password").val();
        User.picture = $("#profilePic").val().split("\\").pop();
        session.create('user', JSON.stringify(User), 1);
        console.log(session.user());
    }

    user.getRole = getRole;
    user.getName = getName;
    user.getAddress = getAddress;
    user.getEmail = getEmail;
    user.getSex = getSex;
    user.getPicture = getPicture;
    user.getPassword = getPassword;
    user.updateUser = updateUser;
}

user()
isAdmin = user.getRole() === 'admin'
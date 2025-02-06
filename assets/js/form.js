$.fn.validate = function () {
    $("#password, #vpassword").focus(function () {
        $(this).val("");
    });
    this.submit(function (ev) {
        ev.stopPropagation();
        retun = true;
        $("form#form :input").each(function () {
            name = $(this).attr('name');
            value = $(this).val();
            console.log(name, value);
            kosong = $.isEmptyObject(value) && name !== 'profilePic';
            if (!name.match(/^(answer|question|text)(\[(\d)*\]){1,2}$/)) {
                regex = '';

                if (kosong) {
                    console.log("KOSONGG!!!");
                    pesan = formatting(name) + " Tidak Boleh Kosong";
                } else

                    if (name === 'nama') {
                        regex = /^[a-zA-Z]+( *[a-zA-Z']+)*$/;
                        pesan = "Hanya Boleh Memasukkan Format Nama";
                    } else

                        if (name === 'nis') {
                            regex = /^[0-9]{8}$/;
                            pesan = "Hanya Boleh Memasukkan Format Angka 8 Digit";
                        } else

                            if (name === 'alamat') {
                                regex = /^([j][l][.][ ])([a-z0-9 .])+((([ ][n][o][.][ ])|([\/]))[0-9]+[a-z]*)$/i;
                                pesan = "Masukan Alamat yang Benar";
                            } else

                                if (name === 'email') {
                                    regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                                    pesan = "Masukan Format Alamat E-mail yang Benar";
                                } else

                                    if (name === 'gender') {
                                        regex = /((Laki-laki)|(Perempuan))$/;
                                        pesan = "Masukan Jenis Kelamin";
                                    } else

                                        if (name === 'password') {
                                            regex = /([\s\S]{8,})$/;
                                            pesan = "Password Minimal 8 Digit";
                                        } else

                                            if (name === 'vpassword') {
                                                if ($("#password").val() == $("#vpassword").val()) {
                                                    regex = /([\s\S]{8,})$/;
                                                    pesan = "Password Minimal 8 Digit";
                                                } else {
                                                    regex = /{}$/;
                                                    pesan = "Password not Match"
                                                }
                                            } else

                                                if (name === 'profilePic') {
                                                    regex = /([\s\S])+((.jpg)|(.jpeg)|(.tiff)|(.gif)|(.png)|(.bmp))$/i;
                                                    pesan = "Format File Harus Gambar";
                                                } else

                                                    if (name === 'startT' || name === 'endT') {
                                                        pesan = 'Value Tidak Valid!';
                                                        if (name !== 'startT') {
                                                            if (+start > +value) {
                                                                pesan = 'Start Harus Kurang Dari End!';
                                                                kosong = true;
                                                            }
                                                        } else
                                                            start = value;
                                                        regex = /[0-1][0-9]|20$/;
                                                    } else

                                                        if (name === 'start' || name === 'end') {
                                                            if (name !== 'start') {
                                                                tglJam = new Date(start);
                                                                psn = 'Start';
                                                            } else {
                                                                tglJam = new Date();
                                                                psn = 'Sekarang';
                                                            }
                                                            regex = /^.*$/;
                                                            console.log(value);
                                                            value = new Date(value);
                                                            console.log(value);
                                                            console.log(tglJam);
                                                            console.log(value < tglJam);
                                                            if (value < tglJam) {
                                                                pesan = "Tanggal Melewati Batas " + psn + "!";
                                                                kosong = true;
                                                            } else
                                                                value = "" + value;
                                                            start = value;
                                                        }

                if ((kosong || !value.match(regex)) && !(name === 'profilePic' && !value)) {
                    alert(pesan);
                    if (name === 'start' || name === 'end') {
                        $(this).parent().addClass('error');
                    } else
                        $(this).addClass('error');
                    $(this).focus();
                    retun = false;
                    return false;
                } else {
                    if (name === 'start' || name === 'end') {
                        $(this).parent().removeClass('error');
                    } else
                        $(this).removeClass('error');
                }
            } else {
                retun = extValidation(this);
                return retun;
            }
        });

        console.log("Retun Awal " + retun);
        if (retun) {
            if (page == "Login.html") {
                login();
                return false;
            } else {
                if (page == 'Upload.html') {
                    location.replace('Course.html');
                }
                if (page == "Profile.html") {
                    btnEdit(true);
                }
                return true;
            }
        } else {
            return false;
        }
    });
};
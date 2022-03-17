var vm = function () {
    var data_local = JSON.parse(localStorage.getItem('accounts_list'));
    console.log(data_local);
    console.log(JSON.parse(sessionStorage.getItem('viewed')))
    if (JSON.parse(sessionStorage.getItem('viewed')) == null) {
        sessionStorage.setItem('viewed', JSON.stringify([]));
    }
    // emails and passwords available for log in
    emails = [
        {email: "mendes.j@ua.pt", password: "abc", name: "Zé Mendes"},
        {email: "bernardopinto@ua.pt", password: "123", name: "Bernardo" },
    ];




    // validates log in
    $('#login_button').click(function () {
        var val_email = $('#email_login').val();
        var val_password = $('#password_login').val();

        // data on localstorage
        for (var i = 0; i < data_local.length; i++) {
            
            if ((val_email == data_local[i].email) & (val_password == data_local[i].password)) {
                console.log('Login Success');
                var user = data_local[i].name;
                $('#name_text').html("<span style='color: red'><strong> Bem vindo</strong></span>" + " " + user);
                $('#login_error').hide();
                document.querySelector('.bg-modal').style.display = 'none';
                $('#nav_log').hide();
                $('#nav_sign').hide();
                $('#nav_name').show();
                $('#nav_prof').show();
                $('#leave').show();
                sessionStorage.setItem('state', true);
                var obj = [
                    {
                        email: val_email,
                        password: val_password,
                        user: user

                    }
                ];
                sessionStorage.setItem('user', JSON.stringify(obj));
                break;
            }
            else {
                $('#login_error').show();
                console.log('Erro');
            }
        }
    });

};



// validates sign up
function validate() {
    var retVal = true

    if ($('#FN').val().trim().length < 2) {
        retVal = false;
        $('#name_error').show();
    }
    else {
        $('#name_error').hide();
    }

    if ($('#LN').val().trim().length < 2) {
        retVal = false;
        $('#surname_error').show();
    }
    else {
        $('#surname_error').hide();
    }

    var re = /\S+@\S+\.\S+/;
    var email = $('#email_signup').val().trim();
    if (!re.test(email) || email.length < 10 || email.length > 100) {
        retVal = false;
        $('#email_error').show();
    }
    else {
        $('#email_error').hide();
    }

    if ($('#password_signup').val().trim().length < 3) {
        retVal = false;
        $('#pass_len_error').show();
    }
    else {
        $('#pass_len_error').hide();
    }

    if ($('#password_signup').val() != $('#conf_password_signup').val()) {
        retVal = false;
        $('#pass_error').show();
    }
    else {
        $('#pass_error').hide();
    }

    if (retVal == true) {
        $('#FN').hide();
        $('#LN').hide();
        $('#email_signup').hide();
        $('#password_signup').hide();
        $('#conf_password_signup').hide();
        $('#register_button').hide();
        $('#acc_reg').show();
        $('#acc_av').show();

        // store data
        if (localStorage.getItem('accounts_list') == null) {
            var empty_accountList = [];
            empty_accountList.push(emails[0]);
            empty_accountList.push(emails[1]);
            empty_accountList.push(
                {
                    name: $('#FN').val() + " " + $('#LN').val(),
                    email: $('#email_signup').val(),
                    password: $('#password_signup').val()
                }
                
            );
            localStorage.setItem('accounts_list', JSON.stringify(empty_accountList));
            console.log(localStorage.getItem('accounts_list'));

        } else {
            var list_accounts = JSON.parse(localStorage.getItem('accounts_list'));
            list_accounts.push(
                {
                    name: $('#FN').val() + " " + $('#LN').val(),
                    email: $('#email_signup').val(),
                    password: $('#password_signup').val()
                }
            );
            localStorage.setItem('accounts_list', JSON.stringify(list_accounts));
        }

    }
};


// leave button

// $('#leave').click(function () {
// 
//     sessionStorage.setItem('state', false);
//     $('#nav_log').show();
//     $('#nav_sign').show();
//     $('#nav_name').hide();
//     $('#nav_prof').hide();
//     $('#leave').hide();
// });


// verifies if the session is still on for log in
if (sessionStorage.getItem('state') == 'true') {
    console.log(sessionStorage.getItem('state'));
    array = JSON.parse(sessionStorage.getItem('user'));
    console.log(array[0].user)

    $('#name_text').html("<span style='color: red'><strong> Bem vindo</strong></span>" + " " + array[0].user);
    $('#nav_log').hide();
    $('#nav_sign').hide();
    $('#nav_name').show();
    $('#nav_prof').show();
    $('#leave').show();
} else {
    // clears favs list for next account
    localStorage.setItem('fav', JSON.stringify([]));
}





$(document).ready(function () {
    console.log("ready!");

    ko.applyBindings(new vm());
});
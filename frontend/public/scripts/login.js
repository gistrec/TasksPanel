toastr.options = {
    debug: false,
    newestOnTop: false,
    positionClass: "toast-bottom-right",
    closeButton: true,
    progressBar: true
};

$("#login, #password").change(function() {
    $(this).css("border", "");
});

$("#loginForm").submit(function(e) {
    e.preventDefault(); // Отменяем отправку формы

    // Формат логина и пароля
    const format = /^[a-zA-Z0-9а-яА-Я_\-]+$/;
    const login  = $("#login").val();
    const passwd = $("#password").val();

    // Если входим по логину
    if (!format.test(login) || login.length < 5 || login.length > 20) {
        $("#login").css("border", "1.5px solid red");
        toastr.error("Неправильный логин");
        return;
    }

    if (!format.test(passwd) || passwd.length < 6 || passwd.length > 30) {
        $("#password").css("border", "1.5px solid red");
        toastr.error("Неправильный пароль");
        return;
    }
    $("button").prop("disabled", true);

    $.ajax({
        type: "POST",
        url: "/login",
        data: {login, passwd},
        success: function(res) {
            switch (res) {
                case "Success":
                    toastr.success("Авторизация прошла успешно");
                    setTimeout(function() {
                        window.location.href = "/tasks";
                    }, 500);
                    break;

                case "Invalid credentials":
                    toastr.error("Неверный логин или пароль");
                    $("#password").css("border", "1.5px solid red");
                    $("#login").css("border", "1.5px solid red");
                    $("button").prop("disabled", false);
                    break;

                default:
                    toastr.error(res);
                    $("button").prop("disabled", false);
            }
        }
    });
});
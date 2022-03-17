var progress = document.getElementById("progress")

function validate() {
    var fun = true;
    var nome = document.getElementById("name").value;
    var nomerro = document.getElementById("namerror");
    var lastname = document.getElementById("lastname").value;
    var lastnamerror = document.getElementById("lasterror");
    var morada = document.getElementById("adress").value;
    var moradaerro = document.getElementById("adresserror")
    var palavras = morada.split(' ');
    var circuit = document.getElementById("searchcircuit").value;
    var circuiterror = document.getElementById("circuiterror")
    var conf = 0;
    var pag1conf = document.getElementById("pag1conf")
    var pag1 = document.getElementById("pag1")


    if (nome.length < 3) {
        nomerro.classList.add("d-block");
        nomerro.classList.remove("d-none");

    }
    else {
        nomerro.classList.remove("d-block");
        nomerro.classList.add("d-none");
        conf = conf + 1;
    }
    if (lastname.length < 3) {
        lastnamerror.classList.add("d-block");
        lastnamerror.classList.remove("d-none");

    }
    else {
        lastnamerror.classList.remove("d-block");
        lastnamerror.classList.add("d-none");
        conf = conf + 1;
    }

    if (palavras.length < 3) {
        moradaerro.classList.add("d-block");
        moradaerro.classList.remove("d-none");

    }
    else {
        moradaerro.classList.remove("d-block");
        moradaerro.classList.add("d-none");
        conf = conf + 1;
    }
    if (circuit == 0) {
        circuiterror.classList.add("d-block");
        circuiterror.classList.remove("d-none");

    }
    else {
        circuiterror.classList.add("d-none");
        circuiterror.classList.remove("d-block");
        conf = conf + 1;
    }
    if (conf == 4) {
        pag1conf.classList.add("d-block");
        pag1conf.classList.remove("d-none");
        pag1.classList.remove("d-block");
        pag1.classList.add("d-none");
        progress.classList.remove("w-0")
        progress.classList.add("w-50")


    }
}




function buy() {
    var local = document.getElementById("locais").value;
    var day = document.getElementById("inputday").value;
    var quantidade = document.getElementById("quantidade").value;
    var botao = document.getElementById("botao")
    var fim = document.getElementById("fim")
    var buy = document.getElementById("buy")

    if (local != 0 && day != 0 && quantidade != 0) {
        progress.classList.remove("w-50")
        progress.classList.add("w-100")
        botao.classList.remove("d-block")
        botao.classList.add("d-none")
        buy.classList.remove("d-none")
        buy.classList.add("d-block")

    }




    var fim = (local * day * quantidade).toFixed(2);
    var valor = document.getElementById("valor")
    valor.innerText = `${fim}` + '€';









}




$(document).ready(function () {
    $("#searchcircuit").autocomplete({
        minLength: 4,
        source: function (request, response) {
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "http://192.168.160.58/Formula1/api/Search/Circuits?q=" + $('#searchcircuit').val(),
                data: "",
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return item.Name;
                    }));
                },
                error: function (result) {
                    alert(result.statusText);
                }
            });
        }
    });
});

var valor = document.getElementById
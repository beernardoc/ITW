$(document).ready(function () {
    $("#SearchText").autocomplete({
        minLength: 1,
        source: function (request, response) {
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "http://192.168.160.58/Formula1/api/Search/Circuits?q=" + $('#SearchText').val(),
                data: "",
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        console.log(data)
                        return item.Name;
                    }));
                },
                error: function (result) {
                    alert(result.statusText);


                }

            });

        }
    });

    $("#button").click(function () {
        console.log($('#SearchText').val());
        var nome = $('#SearchText').val();

        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "http://192.168.160.58/Formula1/api/Search/Circuits?q=" + $('#SearchText').val(),
            data: "",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (nome == data[i].Name) {
                        console.log(data[i].CircuitId);
                        var id_circuit = data[i].CircuitId;
                        window.open('./circuitsDetails.html?id=' + id_circuit, "_self");
                    }
                }
            },
            error: function (result) {
                alert(result.statusText);


            }

        });
    });
});
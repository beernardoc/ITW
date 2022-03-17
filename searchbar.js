

$(document).ready(function () {
    $("#SearchText").autocomplete({
        minLength: 1,
        source: function (request, response) {
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "http://192.168.160.58/Formula1/api/Search/Drivers?q=" + $('#SearchText').val(),
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
            url: "http://192.168.160.58/Formula1/api/Search/Drivers?q=" + $('#SearchText').val(),
            data: "",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (nome == data[i].Name) {
                        console.log(data[i].DriverId);
                        var id_driver = data[i].DriverId;
                        window.open('./driverDetails.html?id=' + id_driver, "_self");
                    }
                }
            },
            error: function (result) {
                alert(result.statusText);


            }

        });
    });
});





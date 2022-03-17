$(document).ready(function () {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://192.168.160.58/Formula1/api/drivers",
        data: "",
        dataType: "json",
        success: function (data) {
            // favourites table
            var favs_inarray = JSON.parse(localStorage.getItem('fav'));
            let array_display = [];

            for (var i = 0; i < data.List.length; i++) {
                for (var j = 0; j < favs_inarray.length; j++) {
                    
                    if (data.List[i].DriverId == favs_inarray[j]) {
                        var push_to_array = JSON.stringify(data.List[i])
                        array_display.push(JSON.parse(push_to_array));
                    }
                }
            }
            console.log(array_display);
            if (array_display.length != 0) {
                $('#table_id').show();
                $('#no_fav_added1').hide();
                $('#no_fav_added2').hide();
                array_display.forEach(function (dt) {
                    $('#tdata').append("<tr>" +
                        "<td class='align-middle'>" + dt.DriverId + "</td>" +
                        "<td class='align-middle'>" + dt.Name + "</td>" +
                        "<td class='align-middle'>" + dt.Nationality + "</td>" +
                        "<td class='text-end'> <button class='btn btn-outline-danger' style='border: 1px solid black' id=" + dt.DriverId + " onClick='reply_click(this.id)' ><i class='fa fa-ban' title='Click to remove from favourites'></i></button> </td>"
                        + "</tr>");

                });
            }
            // recently watched table
            var recent_inarray = JSON.parse(sessionStorage.getItem('viewed'));
            let array_display2 = [];

            for (var i = 0; i < data.List.length; i++) {
                for (var j = 0; j < recent_inarray.length; j++) {

                    if (data.List[i].DriverId == recent_inarray[j]) {
                        var push_to_array2 = JSON.stringify(data.List[i])
                        array_display2.push(JSON.parse(push_to_array2));
                    }
                }
            }
            console.log(array_display2);
            if (array_display2.length != 0) {
                $('#table_id_views').show();
                $('#no_rec_added1').hide();
                $('#no_rec_added2').hide();
                array_display2.forEach(function (dt) {
                    $('#view_data').append("<tr>" +
                        "<td class='align-middle'>" + dt.DriverId + "</td>" +
                        "<td class='align-middle'>" + dt.Name + "</td>" +
                        "<td class='align-middle'>" + dt.Nationality + "</td>" +
                        "<td class='text-end'> <button class='btn btn-outline-danger' style='border: 1px solid black' id=" + dt.DriverId + " onClick='reply_click2(this.id)' ><i class='fa fa-times' title='Click to remove from recently seen'></i></button> </td>"
                        + "</tr>");

                });
            }
            
  
        },
        error: function (result) {
            alert(result.statusText);

        }

    });
});

function reply_click(clicked_id) {
    var favs_inarray = JSON.parse(localStorage.getItem('fav'));
    console.log(favs_inarray);
    console.log(clicked_id);
    for (var i = 0; i < favs_inarray.length; i++) {
        if (favs_inarray[i] == clicked_id) {
            favs_inarray.splice(i, 1);
            localStorage.setItem('fav', JSON.stringify(favs_inarray));
        }
    }
    location.reload();
}
function reply_click2(clicked_id2) {
    var recent_inarray = JSON.parse(sessionStorage.getItem('viewed'));
    for (var i = 0; i < recent_inarray.length; i++) {
        if (recent_inarray[i] == clicked_id2) {
            recent_inarray.splice(i, 1);
            sessionStorage.setItem('viewed', JSON.stringify(recent_inarray));
        }
    }
    location.reload();
}

$('#clear_fav').click(function () {
    const empty = JSON.stringify([]);
    localStorage.setItem('fav', empty)
    location.reload();
});

$('#clear_rec').click(function () {
    const empty = JSON.stringify([]);
    sessionStorage.setItem('viewed', empty)
    location.reload();
});

$('#leave').click(function () {
    sessionStorage.setItem('state', false);
    sessionStorage.setItem('viewed', JSON.stringify([]));
    localStorage.setItem('fav', JSON.stringify([]));
    window.open('index.html', '_self');

});

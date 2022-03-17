// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Drivers/Driver?id=');
    self.displayName = 'Driver Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.DriverId = ko.observable('');
    self.DriverRef = ko.observable('');
    self.ImageUrl = ko.observable('');
    self.Name = ko.observable('');
    self.Nationality = ko.observable('');
    self.Number = ko.observable('');
    self.Races = ko.observableArray('');
    self.Url = ko.observable('');

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getDriver...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            console.log(data.DriverId);
            if (sessionStorage.getItem('viewed') == null) {
                var emp_array = [];
                emp_array.push(data.DriverId);
                sessionStorage.setItem('viewed', JSON.stringify(emp_array));
            } else {
                if (JSON.parse(sessionStorage.getItem('viewed')).includes(data.DriverId)) {
                    ;
                } else {
                    var viewed_array = JSON.parse(sessionStorage.getItem('viewed'));
                    viewed_array.push(data.DriverId);
                    sessionStorage.setItem('viewed', JSON.stringify(viewed_array));
                }
            }

            self.DriverId(data.DriverId);
            if (localStorage.getItem('fav') == null) {
                localStorage.setItem('fav', JSON.stringify([]));
                $('#add_to_favorites').css('display', 'block');
            } else {
                if (JSON.parse(localStorage.getItem('fav')).includes(data.DriverId)) {
                    $('#remove_from_favourites').css('display', 'block');

                } else {
                    $('#add_to_favorites').css('display', 'block');
                }
            }
            $('#add_to_favorites').click(function () {
                var the_array = JSON.parse(localStorage.getItem('fav'));
                the_array.push(data.DriverId);
                localStorage.setItem('fav', JSON.stringify(the_array));
                $('#add_to_favorites').css('display', 'none');
                $('#remove_from_favourites').css('display', 'block');
            });
            $('#remove_from_favourites').click(function () {
                var the_array = JSON.parse(localStorage.getItem('fav'));
                for (var i = 0; i < the_array.length; i++) {
                    if (data.DriverId == the_array[i]) {
                        the_array.splice(i, 1);
                        break;
                    }
                }
                localStorage.setItem('fav', JSON.stringify(the_array));
                $('#remove_from_favourites').css('display', 'none');
                $('#add_to_favorites').css('display', 'block');
            });

            self.DriverRef(data.DriverRef);
            self.ImageUrl(data.ImageUrl);
            self.Name(data.Name);
            self.Nationality(data.Nationality);
            self.Number(data.Number);
            self.Races(data.Races);
            self.Url(data.Url);
            hideLoading();
        });
   
    };
    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });

    }
    function showLoading() {
        $('#myModal').modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };


    //--- start ....
    showLoading();
    var pg = getUrlParameter('id');
    console.log(pg);
   
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }

};
$('#add_to_favorites').click(function () {
    var the_array = JSON.parse(localStorage.getItem('fav'));


});



$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

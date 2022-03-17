function fav() {
    

    not_fav = $(event.target).hasClass("fa-heart");
    if (not_fav == true) {
        event.target.classList.add("fa-heart-o");
        event.target.classList.remove("fa-heart");
    }
    else {
        event.target.classList.remove("fa-heart-o");
        event.target.classList.add("fa-heart");
    }

}
var viewModel = {
    currentProfit: ko.observable(150000)
};

// Evalutes to a positive value, so initially we apply the "profitPositive" class
viewModel.cfav = ko.observable('ya');


//eliminar
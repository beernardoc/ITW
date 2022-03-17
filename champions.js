console.log("foi")

function champions() {
    var namec = document.getElementById("constchampion")
    var named = document.getElementById("driverchampion")
    var championid = document.getElementById("championid")
    var constid = document.getElementById("constid")
    var champoints = document.getElementById("champoints")
    var constpoints = document.getElementById("constpoints")
    var pagchampions = document.getElementById("pagchampions")
    var yearerros = document.getElementById("yearerror")


    

    var cardriver = document.getElementById("carddriver")
    var cardconst = document.getElementById("cardconst")

    let datac = fazGet("http://192.168.160.58/Formula1/api/Statistics/CChampions")
    let constructors = JSON.parse(datac)
    let datad = fazGet("http://192.168.160.58/Formula1/api/Statistics/Champions")
    let champions = JSON.parse(datad)
    var ano = document.getElementById("ano").value
    var x = constructors.findIndex(x => x.Year == ano); // const
    var y = champions.findIndex(y => y.Year == ano);

    console.log(x,y)

    if (y != -1) {
        cardriver.classList.remove("d-none")
        cardriver.classList.add("d-block")
        champoints.innerHTML = ("Points:    " + champions[y].Points)
        championid.innerHTML = ("ID:    " + champions[y].DriverId)
        named.innerHTML = champions[y].DriverName
        var image = champions[y].ImageUrl
        if (image == null) {
            document.getElementById("foto").src = "https://static.vecteezy.com/ti/vetor-gratis/p1/2318271-icone-do-perfil-do-usuario-gr%C3%A1tis-vetor.jpg"
            console.log("entrou")
        }
        else {
            
            document.getElementById("foto").src = image
        }



    }
    else {
        cardriver.classList.add("d-none")
    }
    if (x != -1) {
        cardconst.classList.remove("d-none")
        cardconst.classList.add("d-block")
        constpoints.innerHTML = ("Points    " + constructors[x].Points)
        constid.innerHTML = ("ID:    " + constructors[x].ConstructorId)
        namec.innerHTML = constructors[x].ConstructorName
        var imagec = constructors[x].ImageUrl
        if (imagec == null) {
            document.getElementById("fotoc").style.margin = "0px 0px 0px 0px"
            document.getElementById("fotoc").src = "https://static.vecteezy.com/ti/vetor-gratis/p1/2318271-icone-do-perfil-do-usuario-gr%C3%A1tis-vetor.jpg"
            

            
        }
        else {
            document.getElementById("fotoc").src = imagec
            document.getElementById("fotoc").style.margin = "50px 0px 153px 0px"
        }

    }
    else {
        cardconst.classList.add("d-none")
    }


    if (x == -1 && y == -1) {
        yearerros.classList.remove("d-none")
        yearerros.classList.add("d-block")
    }
    else {
        yearerros.classList.add("d-none")
        yearerros.classList.remove("d-block")
    }

}





function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

let imagenes = ["aguacate.png", "ajo.png", "cebolla.png", "pepino.png", "puerro.png", "tomate.png", "zanahoria.png"];



document.querySelector(".insertarMonedas").addEventListener("click", monedasInicial);

document.querySelector(".botonTirar").disabled = true;
let monedas = 0;

function monedasInicial() {
    monedas++;
    sonarMonedas("mario-coin.mp3")
    // var audio = document.getElementById("monedasAudio").innerHTML = `<audio id="audio" controls>
    // <source type="audio/wav" src="./img/mario-coin.mp·">
    // </audio>`;

    // audio.play();


    document.querySelector(".monedas").innerHTML = monedas;

    if (monedas < 1) {
        document.querySelector(".botonTirar").disabled = true;
    } else {
        document.querySelector(".botonTirar").disabled = false;
    }
}

document.getElementById("tirar").addEventListener("click", tirar);


function sonarMonedas(audio){
    document.getElementById("sonido").src="./audios/"+audio;
    document.getElementById("sonido").play();
}


function tirar() {
    
    desactivarMonedas()


    document.querySelector(".monedas").innerHTML = monedas;
    if (monedas === 0) {
        document.querySelector(".botonTirar").disabled = true;
    
    }

    let numeroAleatorio = []
    for (let i = 0; i < 3; i++) {

        //guarda un nº aleatorio en la variable cada vuelta, hasta el máximo de imagenes
        numeroAleatorio.push((Math.floor(Math.random() * imagenes.length)))

        //se manda a la función mostrarImagenes la posición de i y el nº aleatorio
        mostrarImagenes(i, numeroAleatorio[i])

    }
    
}

let enviarDinero = []
let allResults = []

function mostrarImagenes(posicion, numero) {

    //se selecciona la class imagen en la posición que le toca, dentro se coge la img en la posición 0 ya que no hay mas y se cambia la imagen por una del array en base al numero aleatorio que se ha enviado.
    document.getElementsByClassName("imagen")[posicion].getElementsByTagName("img")[0].src = "./img/" + imagenes[numero];
    enviarDinero.push(imagenes[numero])

    console.log(enviarDinero)
    if(enviarDinero.length === 3){
    conseguirDinero(enviarDinero)
    }
}

function desactivarMonedas() {
    document.querySelector(".insertarMonedas").disabled = true;
}

// function insertarImagenes(){


//     document.querySelector("#imagenFondo").innerHTML += ` <div id="cajaImagenes">
//     <div class="ventanaImagenes">
//         <div class="imagen">
//             <img src="./img/moneda.png">
//         </div>
//     </div>
//     <div class="ventanaImagenes">
//         <div class="imagen">
//             <img src="./img/moneda.png">
//         </div>
//     </div>
//     <div class="ventanaImagenes">
//         <div class="imagen">
//             <img src="./img/moneda.png">
//         </div>
//     </div>
// </div>`

// }


document.querySelector(".botonSalir").addEventListener("click", salir);

function salir() {
    alert(`"Tienes ${monedas} monedas disponibles`)
}

function conseguirDinero(imagenes){
    debugger;
    let zanahorias = 0;
    let tomates = 0;
    let ajos = 0;
    let cebollas = 0;
    let puerros = 0;
    let pepinos = 0;
    let aguacates = 0;
    
    let winLostCoins = 0;
    
    imagenes.forEach(imagen => {
        switch(imagen){
            case "zanahoria.png":
                zanahorias++;
                break;
            case "tomate.png":
                tomates++;
                break;
            case "aguacate.png":
                aguacates++
                break;
            case "ajo.png":
                ajos++;
                break;
            case "cebolla.png":
                cebollas++;
                break;
            case "pepino.png":
                pepinos++;
                break;
            case "puerro.png":
                puerros++
                break;
        }
    });
    enviarDinero = [];
    if(zanahorias === 3){
        monedas = monedas +10;
        winLostCoins = 10;
        document.querySelector(".monedas").innerHTML = monedas;
    }
    else if(zanahorias === 2){
        monedas = monedas + 4;
        winLostCoins = 4;
        document.querySelector(".monedas").innerHTML = monedas;
    }
    else if(zanahorias === 1){
        if( tomates === 2 || aguacates === 2 || ajos === 2 || cebollas === 2 || pepinos === 2|| puerros === 2 ){
            monedas = monedas + 3;
            winLostCoins = 3;
        } else{
            winLostCoins = 1;
            monedas++;
        }
        document.querySelector(".monedas").innerHTML = monedas;
    }
    else if(tomates === 2 || aguacates === 2 || ajos === 2 || cebollas === 2 || pepinos === 2|| puerros === 2 ){
        monedas = monedas + 2;
        winLostCoins = 2
        document.querySelector(".monedas").innerHTML = monedas;
    }
    else if(tomates === 3 || aguacates === 3 || ajos === 3 || cebollas === 3 || pepinos === 3|| puerros === 3 ){
        monedas = monedas + 5;
        winLostCoins = 5;
        document.querySelector(".monedas").innerHTML = monedas;
    }
    else{
        monedas--;
        winLostCoins = -1;
        document.querySelector(".monedas").innerHTML = monedas;
        if(monedas === 0){

            document.querySelector(".botonTirar").disabled = true;
        }
    }
    let obj = {
        imgArray: imagenes,
        monedas: winLostCoins
    }
    printVelo(obj);
    winLostCoins = 0;
};

function printVelo(obj){
    let generalDiv = document.createElement("div");
    let coinsDiv = document.createElement("div");
    let imgDiv = document.createElement("div");
    let p = document.createElement("p")
    
    obj.imgArray.forEach(imagen =>{
        let img = document.createElement("img")
        img.src="./img/"+imagen;
        img.className = "imgMessage";
        imgDiv.appendChild(img);
    });

    p.innerHTML = obj.monedas;
    p.className = "monedasMensaje";
    coinsDiv.appendChild(p);

    generalDiv.appendChild(imgDiv);
    generalDiv.className = "divMensaje";
    generalDiv.appendChild(coinsDiv);
    document.querySelector("#mensaje").appendChild(generalDiv);
}
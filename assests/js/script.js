// Declaração das variáveis do form
let numSum = 0.0; // Soma dos resultados
let divEmpty = 0; // Valor que ajuda na verificação se o Local Storage está vázio
let dataLocal = JSON.parse(localStorage.getItem("dados")); // Local Storage



// Verificar se está vázio ou se tem conteúdo no Local Storage
if (dataLocal){ //se não estiver vázio
    for(i=0;i<dataLocal.length;i++){
        AddTrans(dataLocal[i]["Commodity"],dataLocal[i]["Value"],dataLocal[i]["TypeShop"]);
    }
} else { //se estiver vázio
    document.getElementById("dealResul").innerHTML =`
        <div class="merc" style="width: 100%; text-align: center;">
            <span style="width: 100%;"> Insira um valor de transação</span>
        </div>
        `;
    document.getElementById("totalValue").innerHTML ="R$ 0,00";
    document.getElementById("statusValue").innerHTML = "";
    divEmpty = 1;
    dataLocal = [];
};


// Modificação da tela em relação o hamburguer menu
function myFunction(x) {
    if (x.matches) {
        document.getElementById("menuHeader").style.display = "flex";
    } else {
        document.getElementById("menuHeader").style.display = "none";
    };
};
var x = window.matchMedia("(min-width: 768px)");
myFunction(x);
x.addListener(myFunction);


// Abrir e fechar o hamburguer menu
function hambMenu() {
    document.getElementById("menuHeader").style.display = "flex";
};

function closeMenu() {
    document.getElementById("menuHeader").style.display = "none";
};


function validaForm() {
    // Variáveis coletadas do form
    data = {
        "Commodity":document.getElementById("nameCommodity").value,
        "Value":document.getElementById("valueCommodity").value,
        "TypeShop":document.getElementById("type_deal").value
    };
    // Checar se o form está preenchido
    if (data["Commodity"] == '') {
        document.getElementById("mercNameNotice").style.display = "block";
        return false;
    } else {
        document.getElementById("mercNameNotice").style.display = "none";
        if (data["Value"] == '') {
            document.getElementById("mercValueNotice").style.display = "block";
            return false;
        } else {
            document.getElementById("mercValueNotice").style.display = "none";
            AddTrans(data["Commodity"],data["Value"],data["TypeShop"]);
            document.querySelector("form").reset();
            num = "";
            dataLocal.push(data);
            localStorage.setItem("dados", JSON.stringify(dataLocal));
            return false;
        };
    };
    
};


// Realizar a adição da tarefe no resultado de transação
function AddTrans(Commodity,Value,TypeSign){
    var sign = "+";
    if (TypeSign == "1"){
        sign = "-"
    };
    if (divEmpty == 1){
        document.getElementById("dealResul").innerHTML=""
        divEmpty = 0
    };
    document.getElementById("dealResul").innerHTML +=`
    <div class="merc">
            <span>`+ sign +` `+ Commodity +`</span>
            <span>R$ `+ Value +`</span>
        </div>
    `

    if (TypeSign == "1"){
        numSum += parseFloat(Value.replace(".","").replace(",","."))*(-1.0);
    } else{
        numSum += parseFloat(Value.replace(".","").replace(",","."));
    };

    let numSuma = applyMask(numSum.toFixed(2).toString().replace("-","").replace(".",""));
    document.getElementById("totalValue").innerHTML = "R$ " + numSuma;

    if(numSum < 0.0){
        document.getElementById("statusValue").innerHTML = "[PREJUÍZO]";
    } else if (numSum == 0.0){
        document.getElementById("statusValue").innerHTML = "";
    } else{
        document.getElementById("statusValue").innerHTML = "[LUCRO]";
    };
}


// Mascará para número
function applyMask(num){
    let value = "";
    if (num.length == 0) {
        value = "";
    } else if (num.length < 2) {
        value = "0,0" + num;
    } else if (num.length < 3) {
        value = "0," + num;
    } else {
        let divi = (num.length - 2) / 3;
        let pontoDivi = divi.toString().split('.');
        if ( divi <= 1) {
            value = num.slice(0, -2) + ',' + num.slice(-2);
        } else {
            let numPoint = ""
            if(Number.isInteger(divi)){
                for(let i=0;i<(parseInt(pontoDivi[0],10)-1);i++) {
                    let numRest = ((num.length - 2) % 3) + (i*3);
                    numPoint += "." + num.slice((numRest),(numRest+3));
                };
                value = num.slice(0, 3) + numPoint + ',' + num.slice(-2);
            } else {
                for(let i=0;i<parseInt(pontoDivi[0],10);i++) {
                    let numRest = ((num.length - 2) % 3) + (i*3);
                    numPoint += "." + num.slice((numRest),(numRest+3));
                };
                let restNum = (num.length - 2) % 3
                value = num.slice(0, restNum) + numPoint  + ',' + num.slice(-2);
            };
            
        };
        
    };
    return value;
};


// Mapeamento do teclado no input do Valor
const input = document.getElementById("valueCommodity");
let num = "";
function checkNum(e) {
    e.preventDefault();
    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"].indexOf(e.key) == -1) {
        console.log("Letra: " + e.key);
    } else {
        num += e.key;
        if (e.key == "Backspace") {
            num = num.slice(0, -10);
        };
        e.target.value = applyMask(num);
    };
};
input.addEventListener('keydown', checkNum);


// Limpar as transaçẽos e localstorage
function clearData(){
    localStorage.clear();
    document.getElementById("dealResul").innerHTML =`
        <div class="merc" style="width: 100%; text-align: center;">
            <span style="width: 100%;"> Insira um valor de transação</span>
        </div>
        `;
    document.getElementById("totalValue").innerHTML = "R$ 0,00";
    document.getElementById("statusValue").innerHTML = "";
    divEmpty = 1;
    dataLocal = [];
}
// Modificação da tela em relação o hamburguer menu
function myFunction(x) {
    if (x.matches) {
        document.getElementById("menuHeader").style.display = "flex";
    } else {
        document.getElementById("menuHeader").style.display = "none"
    }
}

var x = window.matchMedia("(min-width: 768px)")
myFunction(x)
x.addListener(myFunction)


// Abrir e fechar o hamburguer menu
function hambMenu() {
    document.getElementById("menuHeader").style.display = "flex";
}

function closeMenu() {
    document.getElementById("menuHeader").style.display = "none";
}

// Checar se o form está preenchido
function validaForm() {
    if (document.getElementById("nameCommodity").value == '') {
        document.getElementById("mercNameNotice").style.display = "block";
        return false
    } else {
        document.getElementById("mercNameNotice").style.display = "none";
        if (document.getElementById("valueCommodity").value == '') {
            document.getElementById("mercValueNotice").style.display = "block";
            return false
        } else {
            document.getElementById("mercValueNotice").style.display = "none";
        }
    }
    document.querySelector("form").reset()
}

// Mascará para número
const input = document.getElementById("valueCommodity");
let num = "";

function checkNum(e) {
    e.preventDefault();
    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"].indexOf(e.key) == -1) {
        console.log("Letra: " + e.key);
    } else {
        num += e.key;
        if (e.key == "Backspace") {
            num = num.slice(0, -10)
        }
        if (num.length == 0) {
            e.target.value = ""
        } else if (num.length < 2) {
            e.target.value = "0,0" + num;
        } else if (num.length < 3) {
            e.target.value = "0," + num;
        } else {
            let divi = (num.length - 2) / 3
            let pontoDivi = divi.toString().split('.');
            if ( divi <= 1) {
                e.target.value = num.slice(0, -2) + ',' + num.slice(-2);
            } else {
                let numPoint = ""
                if(Number.isInteger(divi)){
                    for(let i=0;i<(parseInt(pontoDivi[0],10)-1);i++) {
                        let numRest = ((num.length - 2) % 3) + (i*3)
                        numPoint += "." + num.slice((numRest),(numRest+3))
                    }
                    e.target.value = num.slice(0, 3) + numPoint + ',' + num.slice(-2);
                } else {
                    for(let i=0;i<parseInt(pontoDivi[0],10);i++) {
                        let numRest = ((num.length - 2) % 3) + (i*3)
                        numPoint += "." + num.slice((numRest),(numRest+3))
                    }
                    let restNum = (num.length - 2) % 3
                    e.target.value = num.slice(0, restNum) + numPoint  + ',' + num.slice(-2);
                }
                
            }
            
        }
    }
}

input.addEventListener('keydown', checkNum);
const FORMULARIO_CONTA = "formCriarConta";
const EMAIL_USUARIO = document.getElementById("email");
const PASSWORD_USUARIO = document.getElementById("password")
const IDADE_USUARIO = document.getElementById("idade")
const GENERO__USUARIO = document.getElementById("genero")
const ITEM_CONTAS = "contas"
const BUTAO_CRIAR_CONTA = document.getElementById("btnFazerConta")
const JOGADOR_ATUAL = "jogador"

let playerAtual = null;

let contas = []

let formulario = null;


function Utilizador(email_utilizador,password,idade,genero) {

    this.email_utilizador = email_utilizador;
    this.password = password;
    this.idade = idade;
    this.genero = genero;
}

function Conta(utilizador){
    this.utilizador = utilizador;
}

function login(){
    carregaHistoricoContas()

    let email_usuario = EMAIL_USUARIO.value;
    let password_usuario = PASSWORD_USUARIO.value;
    
    
    for(let i=0; i < contas.length; i++) {
        if(contas.length && email_usuario == contas[i]["utilizador"]["email_utilizador"] && password_usuario == contas[i]["utilizador"]["password"]) {
            playerAtual = email_usuario;
            setPlayerAtual()
            window.location = "../2.homepage/homepage.html"
            return ""
        }
    }
    alert("Conta não existe ou Password Errada")
}

function setPlayerAtual(){
    localStorage.setItem(JOGADOR_ATUAL, JSON.stringify(playerAtual));
}

function createAccount() {
    let email_usuario = EMAIL_USUARIO.value;
    carregaHistoricoContas()
    
    for(let i=0; i < contas.length; i++) {
        if(email_usuario == contas[i]["utilizador"]["email_utilizador"]) {
            alert("Este email já existe")
            return ""
        }
    }

    let conta = null;
    conta = new Conta(obtemDadosUtilizador());
    gravaContaNoHistorico(conta);

    window.location = "../1.login/login.html"


}

function obtemDadosUtilizador(){

    let email_usuario = EMAIL_USUARIO.value;
    let password = PASSWORD_USUARIO.value ;
    let idade = IDADE_USUARIO.value ;
    let genero = GENERO__USUARIO.value ;

    return new Utilizador(email_usuario,password,idade,genero)
}

function carregaHistoricoContas() {
    contas = JSON.parse(localStorage.getItem(ITEM_CONTAS)) || [];
}

function gravaHistoricoContas(){
    localStorage.setItem(ITEM_CONTAS, JSON.stringify(contas));
}

function gravaContaNoHistorico(conta){

    contas.push(conta);
    gravaHistoricoContas()

}





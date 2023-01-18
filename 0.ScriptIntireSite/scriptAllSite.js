const LI_PLAYER_ATUAL = document.getElementById("jogador") 
const JOGADOR_ATUAL = "jogador"

let jogadorAtual = null; 

window.addEventListener("load", getJogadorAtual);

function getJogadorAtual() {

    jogadorAtual = JSON.parse(localStorage.getItem(JOGADOR_ATUAL))
    addplayerAtual()
}

function addplayerAtual() {
    let textPlayer = document.createTextNode("Player: " + jogadorAtual)
    LI_PLAYER_ATUAL.appendChild(textPlayer)

}


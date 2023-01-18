const ITEM_JOGO = "Jogos"
const LI_PLAYER_ATUAL = document.getElementById("jogador") 
const JOGADOR_ATUAL = "jogador"

let jogadorAtual = null; 
let registoJogo = []

function getJogadorAtual() {

    jogadorAtual = JSON.parse(localStorage.getItem(JOGADOR_ATUAL))
    addplayerAtual()
}

function addplayerAtual() {
    let textPlayer = document.createTextNode("Player: " + jogadorAtual)
    LI_PLAYER_ATUAL.appendChild(textPlayer)

}


function carregaHistoricoJogo() {
    registoJogo = JSON.parse(localStorage.getItem(ITEM_JOGO)) || [];
}

function addRegistosNaTabela(){

    getJogadorAtual()
    carregaHistoricoJogo()

    console.log(jogadorAtual)

    let tabelaAntiga = document.getElementById("tabela")

    let tabelaNova = document.createElement("table")
    tabelaNova.setAttribute("id","tabela")

    let linhaTabela = document.createElement("tr");

    linhaTabela.innerHTML = 
                            "<th>Pokemons Derrotados</th>" +
                            "<th>Ganhou?</th>" +
                            "<th>Numero do Jogo</th>" +
                            "<th>Tempo de Jogo</th>" ;
    tabelaNova.appendChild(linhaTabela);

    let numeroJogos= 0;
    let tempoJogo = 0;
    let MelhorTempo = 0;

    for(let i=0; i< registoJogo.length; i++) {
        if( jogadorAtual == registoJogo[i]["registo"]["usuario"]) {
            numeroJogos++;
            tempoJogo = tempoJogo + parseInt(registoJogo[i]["registo"]["tempoDoJogo"])
            if(parseInt(registoJogo[i]["registo"]["tempoDoJogo"]) > MelhorTempo) {
                MelhorTempo = parseInt(registoJogo[i]["registo"]["tempoDoJogo"])
            }

        }
    }
    let numeroDoJogo = 1
    for(let i=0; i< registoJogo.length; i++) {
        if( jogadorAtual == registoJogo[i]["registo"]["usuario"]) {
            linhaTabela = document.createElement("tr");
            linhaTabela.innerHTML = 
                                    "<td>" + registoJogo[i]["registo"]["derrotados"]+"</td>" +
                                    "<td>" + registoJogo[i]["registo"]["ganhou"]+"</td>" +
                                    "<td>" + numeroDoJogo +"</td>" +
                                    "<td>" + registoJogo[i]["registo"]["tempoDoJogo"] +"</td>";
            tabelaNova.appendChild(linhaTabela);
            numeroDoJogo++
        }
    }

    tabelaAntiga.parentNode.replaceChild(tabelaNova,tabelaAntiga)

    let tabelaAntiga_1 = document.getElementById("tabela1")

    let tabelaNova_1 = document.createElement("table")
    tabelaNova_1.setAttribute("id","tabela")

    let tabelaDePerformance = document.createElement("table")
    tabelaDePerformance.setAttribute("id","tabela")
    let linhaTabelaPerformance = document.createElement("tr");
    linhaTabelaPerformance.innerHTML = "<th>Usuário</th>" +
                                       "<th>NumeroJogos</th>" +
                                       "<th>TempoJogo</th>" +
                                       "<th>MelhorTempo</th>";
    tabelaNova_1.appendChild(linhaTabelaPerformance)
    linhaTabelaPerformance = document.createElement("tr")
    linhaTabelaPerformance.innerHTML = "<td>"+jogadorAtual+"</td>" +
                            "<td>" + numeroJogos+"</td>" +
                            "<td>" + tempoJogo+"</td>" +
                            "<td>" +MelhorTempo +"</td>";
    tabelaNova_1.appendChild(linhaTabelaPerformance)

    tabelaAntiga_1.parentNode.replaceChild(tabelaNova_1,tabelaAntiga_1)


}
window.addEventListener("load",addRegistosNaTabela())

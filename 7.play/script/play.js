const TABULEIRO = document.getElementById("tabuleiro");
const TABULEIRO_BATALHA = document.getElementById("tabuleiro_batalha_pokemon");
const POKEMON_JOGADOR = document.getElementById("p_pokemon_jogador");
const JOGADOR = document.getElementById("JOGADOR");
const POKEMON_ADVERSARIO = document.getElementById("p_pokemonAdversario");
const INIMIGO = document.getElementById("INIMIGO");
const DADO = document.getElementById("dados");
const SPAN_TEMPO_JOGO = document.getElementById("time");
const JOGADOR_ATUAL = "jogador";
const ITEM_JOGO = "Jogos";

//NUMERO DE CADA TECLADO
let LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

//POSICAO DO JOGADOR
let positionX = 1, positionY = 1, andamentoX = 1, andamentoY = 1, src = 'img/ash_direita.png';

let myPokemon = null; //MEU POKEMON ATUAL
let forca_myPokemon = null; //FORCA DO MEU POKEMON

//DIFERENTES TIPOS DE POKEMON
let pokemons = ["KYOGRE","DARKRAI","GARDEVOIR","SCIZOR","RAIKOU","SNORLAX","SWAMPERT","TYRANITAR","SCEPTILE","BEEDRILL","LUCARIO","CHARIZARD","GIRATINA","KYUREM","RESHIRAM","DIALGA","MEWTWO","PALKIA"];

let pokemonAdversario = null; //POKEMON DO ADVERSARIO
let forcaPokemonAdv = null; //FORCA DO POKEMON ADVERSARIO
let pokemonAdvPositionX = null, pokemonAdvPositionY = null; //POSICAO POKEMON ADVERSARIO NAS COORDENADAS X,Y

let jogo_inicio = null; //INICIO DE JOGO
let temporizadorTempoJogo = null; //CONTADOR DO JOGO

let pokemonDerrotados = 0; //LUTAS GANHAS CONTRA POKEMONS ADVERSÁRIOS

let jogoGanho = null; //JOGOGANHO (SIM OU NAO)


// VARIOS POKEMONS COM NOME E RESPETIVA FORÇA

let KYOGRE = {
    nome : "KYOGRE",
    forca  : 9
}

let DARKRAI = {
    nome : "DARKRAI",
    forca  : 8
}

let GARDEVOIR = {
    nome : "GARDEVOIR",
    forca  : 7
}

let SCIZOR = {
    nome : "SCIZOR",
    forca  : 7
}

let RAIKOU = {
    nome : "RAIKOU",
    forca  : 5
}

let SNORLAX = {
    nome : "SNORLAX",
    forca  : 7
}

let SWAMPERT = {
    nome : "SWAMPERT",
    forca  : 5
}

let TYRANITAR = {
    nome : "TYRANITAR",
    forca  : 8
}

let SCEPTILE = {
    nome : "SCEPTILE",
    forca  : 7
}

let BEEDRILL = {
    nome : "BEEDRILL",
    forca  : 4
}

let LUCARIO = {
    nome : "LUCARIO",
    forca  : 10
}

let CHARIZARD = {
    nome : "CHARIZARD",
    forca  : 10
}

let GIRATINA = {
    nome : "GIRATINA",
    forca  : 9
}
let KYUREM = {
    nome : "KYUREM",
    forca  : 11
}
let RESHIRAM = {
    nome : "RESHIRAM",
    forca  : 11
}
let DIALGA = {
    nome : "DIALGA",
    forca  : 11
}
let MEWTWO = {
    nome : "MEWTWO",
    forca  : 12
}
let PALKIA = {
    nome : "PALKIA",
    forca  : 11
}


// LABIRINTOS DE JOGO
// 1 SIGNIFICA OBSTACULO
// P SIGNIFCA PEDRA
// 0 CAMINHO QUE PODE PASSAR
// DIFERENTES NOMES, SÃO POKEMONS

let labirinto1 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,"P",0,0,0,1,0,0,1,0,1,0,0,1,0,0,1,1,0,0,"KYOGRE",1],
    [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,0,1],
    [1,0,1,1,1,1,"DARKRAI",1,1,1,1,1,0,1,0,0,1,0,0,"P",1,0,1,1,1],
    [1,0,0,1,0,1,1,1,0,0,0,1,0,1,"P",0,"P",0,1,1,1,0,0,1,1],
    [1,1,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,"P",0,0,1],
    [1,0,0,"P",0,0,1,0,0,1,0,1,1,1,1,0,1,0,1,1,0,0,0,1,1],
    [1,1,1,1,0,1,"P",1,1,1,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,1,1,1,1,1,1,1,1,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,"GARDEVOIR",0,0,1,0,0,0,0,0,0,0,1,1,1],
    [1,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,0,1,0,1,1,0,0,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,0,"P",1,1],
    [1,1,1,0,0,0,0,0,0,0,0,0,"P",0,0,0,0,0,0,1,1,1,1,0,1],
    [1,0,1,0,0,"P",0,0,1,0,0,0,1,1,1,0,1,0,0,1,1,0,1,0,1],
    [1,0,0,0,0,1,1,1,1,1,"P",0,1,0,0,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,0,0,0,0,1,0,0,0,1,0,1,1,1,0,0,"P",1,1,1,1,1],
    [1,0,0,1,0,0,1,0,1,0,0,0,0,"SCIZOR",1,0,1,1,1,1,1,0,0,1,1],
    [1,0,0,0,0,1,1,1,1,0,1,1,1,0,1,0,0,0,0,1,1,1,0,0,1],
    [1,0,0,"P",0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
    [1,1,0,1,1,1,1,0,1,1,1,1,1,1,0,"P",1,1,1,1,0,1,1,1,1],
    [1,1,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,0,0,1,1,1,1],
    [1,0,0,0,1,0,0,0,"P",0,0,1,0,"P",0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,"P",0,1],
    [1,"RAIKOU",0,"P",1,1,0,1,1,1,1,1,0,1,0,0,1,0,0,0,0,0,1,"SNORLAX",0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];

let labirinto2 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,1,0,0,"P",0,1,0,0,"P",0,"SWAMPERT",1],
    [1,1,1,0,0,0,"TYRANITAR",0,0,0,0,0,0,0,0,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,1,1,"P",0,0,0,1,0,1,1,0,1,0,1,1],
    [1,"P",0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,1],
    [1,0,0,1,0,0,"P",0,0,1,0,1,1,1,1,0,1,0,1,1],
    [1,1,1,1,0,1,1,1,1,1,0,1,0,0,0,0,"P",0,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,"P",0,1,1,1,1,1,1,1],
    [1,0,1,1,1,0,0,0,1,1,"SCEPTILE",0,0,0,1,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,0,1,0,1],
    [1,0,1,1,1,1,"P",0,"P",1,1,1,1,0,0,0,0,1,1,1],
    [1,1,1,0,0,0,0,0,0,0,0,0,"P",0,0,0,0,0,0,1],
    [1,0,1,0,0,"P",0,0,1,0,0,0,1,1,1,0,1,0,0,1],
    [1,0,0,0,0,1,1,1,1,1,1,0,1,0,0,0,1,0,"P",1],
    [1,1,1,1,0,0,0,0,1,0,0,"BEEDRILL",1,0,1,1,1,0,0,1],
    [1,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,1,1,1],
    [1,1,0,0,0,1,1,1,1,0,1,1,1,0,1,0,0,0,0,1],
    [1,"LUCARIO",0,"P",0,0,"P",0,0,0,0,1,0,0,0,0,0,"P","CHARIZARD",0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];


let labirinto3 = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,"GIRATINA",1,0,0,0,0,1],
    [1,1,"P",0,0,0,"P",0,1,1],
    [1,0,1,1,1,"P",0,0,1,1],
    [1,0,0,1,0,1,0,1,1,1],
    [1,1,0,0,0,"KYUREM",0,0,0,1],
    [1,0,0,"P",1,1,1,1,1,1],
    [1,0,1,0,0,0,0,0,0,1],
    [1,0,0,0,"P",0,"P",1,"RESHIRAM",0],
    [1,1,1,1,1,1,1,1,1,1],
    ];

let labirinto4 = [[1,1,1,1,1],
                  [1,0,"DIALGA",0,1],
                  [1,1,"P",0,1],
                  [0,"MEWTWO",0,"PALKIA",1],
                  [1,1,1,1,1]]


// LISTA DE LABIRINTOS DO JOGO
let labirintosJogo = [labirinto1,labirinto2,labirinto3,labirinto4]

//ATRIBUTOS, NOME DE CADA LABIRINTO PARA IDENTIFICAÇÃO DO MESMO
let atributo1 = "labirinto1", atributo2 = "labirinto2", atributo3 = "labirinto3", atributo4 = "labirinto4"

//LISTA DE NOMES DOS LABIRINTOS
let atributos = [atributo1,atributo2,atributo3,atributo4]

//LABIRINTO ATUAL QUE ESTAMOS
let labirintoAtual = 0;

//GET LABIRTINTO ATUAL
let labirinto = labirintosJogo[labirintoAtual]; 

//GET NOME DO LABIRINTO ATUAL
let atributo = atributos[labirintoAtual]


window.addEventListener("load",renderizacao())

//LIMPA O TABULEIRO PARA PERMITIR O DESENHO
function limpaTabuleiro(){

    document.getElementById('tabuleiro').innerHTML = ''

}

//VERIFICA O ESTADO ATUAL DO JOGO, EM QUE LABIRINTO ESTAMOS, QUE POSICAO ESTAMOS

function verifica_estado_atual_jogo() {

    //COM DETERMINADA POSICAO O LABIRINTO VAI TROCANDO
    if(positionX == 24 && positionY == 23) {
        labirintoAtual +=1;
        labirinto = labirintosJogo[labirintoAtual]
        atributo = atributos[labirintoAtual]
        positionY = 1
        positionX = 1
        return true
    }

    if(positionX == 19 && positionY == 18) {
        labirintoAtual +=1;
        labirinto = labirintosJogo[labirintoAtual]
        atributo = atributos[labirintoAtual]
        positionY = 1
        positionX = 1
        return true
    }
    if(positionX == 9 && positionY == 8) {
        labirintoAtual +=1;
        labirinto = labirintosJogo[labirintoAtual]
        atributo = atributos[labirintoAtual]
        positionY = 1
        positionX = 1
        return true
    }
    if(positionX == 0 && positionY == 3) { 
        //SE ESTIVER NA ULTIMA POSICAO DO ULTIMO LABIRINTO, JOGO GANHO
        gameWin()
    }
}

// FUNÇÃO DESENHAR O LABIRINTO
function renderizacao(){

    for(let linha in labirinto){
        for(let coluna in labirinto[0]) {
            //CADA QUADRADO VAI SER UMA IMAGEM
            let quadrado = document.createElement('img')
            // EM CADA IMAGEM VAMOS METER UM ATRIBUTO
            quadrado.setAttribute("id", atributo)
            // E VAMOS INSERIR ESSA IMAGEM NO TABULEIRO
            TABULEIRO.appendChild(quadrado)

            let bloco = labirinto[linha][coluna]
            // CASO SEJA UM OBSTÁCULO
            if(bloco == 1) {
                if((linha == 0 || linha == labirinto.length -1 || coluna == 0  || coluna == labirinto[0].length-1)) {
                quadrado.src = 'img/cerca.jpg'
                } else {
                    quadrado.src = 'img/predios.jpg' }
            // CASO SEJA A POSICAO DO JOGADOR
            } else if(linha == positionY && coluna == positionX) {
                quadrado.src = src
            // CASO SEJA UM CAMINHO EM QUE SE PODE PASSAR
            } else if(bloco == 0){
                quadrado.src = 'img/relva.jpeg'
            // CASO SEJA UMA PEDRA
            } else if(bloco == "P") {
                quadrado.src = 'img/pedra.png'
            }
            //CASO ESTEJA NO ULTIMO LABIRINTO
            if(labirintoAtual == 3) {
                if(linha == 3 && coluna == 0) {
                    quadrado.src ='img/finish.png'
                }
            }
            // CASO SEJA POKEMONS
            if (bloco == "KYOGRE") {
                quadrado.src = 'img/kyogre.png'
            }
            if (bloco == "DARKRAI") {
                quadrado.src = 'img/darkrai.png'
            }
            if (bloco == "GARDEVOIR") {
                quadrado.src = 'img/gardevoir.png'
            }
            if (bloco == "SCIZOR") {
                quadrado.src = 'img/scizor.png'
            }
            if (bloco == "RAIKOU") {
                quadrado.src = 'img/raikou.png'
            }
            if (bloco == "SNORLAX") {
                quadrado.src = 'img/snorlax.png'       
            }
            if (bloco == "SWAMPERT") {
                quadrado.src = 'img/swampert.png'
            }
            if (bloco == "TYRANITAR") {
                quadrado.src = 'img/tyranitar.png'            
            }
            if (bloco == "SCEPTILE") {
                quadrado.src = 'img/sceptile.png'
            }
            if (bloco == "BEEDRILL") {
                quadrado.src = 'img/beedril.png'               
            }
            if (bloco == "LUCARIO") {
                quadrado.src = 'img/lucario.png'
            }
            if (bloco == "CHARIZARD") {
                quadrado.src = 'img/charizard.png'               
            }
            if (bloco == "GIRATINA") {
                quadrado.src = 'img/giratina.png'
            }
            if (bloco == "RESHIRAM") {
                quadrado.src = 'img/reshiram.png'               
            }
            if (bloco == "DIALGA") {
                quadrado.src = 'img/dialga.png'
            }
            if (bloco == "MEWTWO") {
                quadrado.src = 'img/mewto.png'
            }
            if (bloco == "PALKIA") {
                quadrado.src = 'img/palkia.png'
            }
            if (bloco == "KYUREM") {
                quadrado.src = 'img/kyurem.png'
            }           
        }
    }
    // VOLTAR A ATULIZAR A FORCA DO POKEMON DO JOGADOR, PARA IMPEDIR PERDE DE FORÇA
    if(labirintoAtual == 0) {
        forca_myPokemon = 9
    }
    if(labirintoAtual == 1) {
        forca_myPokemon = 10
    }
    if(labirintoAtual == 2) {
        forca_myPokemon = 11
    }
    if(labirintoAtual == 3) {
        forca_myPokemon = 12
    }

}

window.addEventListener("keydown", buttonClick); 


//FUNCAO PARA CASO CLICK BUTAO
function buttonClick(event){
        let key = event.keyCode;
        switch(key) {
            //CASO ESQUERDA
            case LEFT:
                src = 'img/ash_esquerda.png';
                if(labirinto[positionY][positionX - andamentoX] == 0){
                    positionX-- //CASO SEJA CAMINHO PODE PASSAR
                    //CASO SEJA POKEMON
                } else if(pokemons.includes(labirinto[positionY][positionX - andamentoX])) { 
                    //OBTER POKEMON ADVERSARIO
                    pokemonAdversario = labirinto[positionY][positionX - andamentoX]
                    //OBTER FORCA POKEMON ADVERSARIO
                    forcaPokemonAdv = retornaForcaPokemonAdv(pokemonAdversario) 
                    //OBTER A POSICAO DE ADVERSARIO
                    pokemonAdvPositionX = positionY
                    pokemonAdvPositionY = positionX - andamentoX
                    //DESENHAR CAMPO DE BATALHA
                    renderizarCampoBatalha(pokemonAdversario,forcaPokemonAdv)
                }
                break;

            case RIGHT:
                src = 'img/ash_direita.png';
                if(labirinto[positionY][positionX + andamentoX] == 0){
                    positionX++ //CASO SEJA CAMINHO PODE PASSAR
                    //CASO SEJA POKEMON
                } else if(pokemons.includes(labirinto[positionY][positionX + andamentoX])) {
                    //OBTER POKEMON ADVERSARIO
                    pokemonAdversario = labirinto[positionY][positionX + andamentoX]
                    //OBTER FORCA POKEMON ADVERSARIO
                    forcaPokemonAdv = retornaForcaPokemonAdv(pokemonAdversario)
                    //OBTER A POSICAO DE ADVERSARIO
                    pokemonAdvPositionX = positionY
                    pokemonAdvPositionY = positionX + andamentoX
                     //DESENHAR CAMPO DE BATALHA
                    renderizarCampoBatalha(pokemonAdversario,forcaPokemonAdv)
                }
                break;

            case UP:
                if(labirinto[positionY-andamentoY][positionX] == 0){
                    positionY-- //CASO SEJA CAMINHO PODE PASSAR
                    //CASO SEJA POKEMON
                } else if(pokemons.includes(labirinto[positionY-andamentoY][positionX])) {
                    //OBTER POKEMON ADVERSARIO
                    pokemonAdversario = labirinto[positionY-andamentoY][positionX]
                    //OBTER FORCA POKEMON ADVERSARIO
                    forcaPokemonAdv = retornaForcaPokemonAdv(pokemonAdversario)
                    //OBTER A POSICAO DE ADVERSARIO
                    pokemonAdvPositionX = positionY-andamentoY
                    pokemonAdvPositionY = positionX
                     //DESENHAR CAMPO DE BATALHA
                    renderizarCampoBatalha(pokemonAdversario,forcaPokemonAdv)
                }      
                break;

            case DOWN:
                if(labirinto[positionY+andamentoY][positionX] == 0){
                    positionY++  //CASO SEJA CAMINHO PODE PASSAR
                    //CASO SEJA POKEMON
                } else if(pokemons.includes(labirinto[positionY+andamentoY][positionX])) {
                    //OBTER POKEMON ADVERSARIO
                    pokemonAdversario = labirinto[positionY+andamentoY][positionX]
                    //OBTER FORCA POKEMON ADVERSARIO
                    forcaPokemonAdv = retornaForcaPokemonAdv(pokemonAdversario)
                    //OBTER A POSICAO DE ADVERSARIO
                    pokemonAdvPositionX = positionY+andamentoY
                    pokemonAdvPositionY = positionX
                     //DESENHAR CAMPO DE BATALHA
                    renderizarCampoBatalha(pokemonAdversario,forcaPokemonAdv)
                }
                break;
        }
    
    //VERIFICA ESTADO ATUAL DO JOGO
    if(verifica_estado_atual_jogo()) {
        //LIMPA TABULEIRO
        limpaTabuleiro();
        //DESENHA TABULEIRO
        renderizacao();
    }
    //LIMPA TABULEIRO
    limpaTabuleiro();
    //DESENHA TABULEIRO
    renderizacao();
}

function renderizarCampoBatalha(pokemon,f_adv = null){
    //FAZ COM QUE O TABULEIRO DESAPARECA
    $('#'+'tabuleiro').css("display","none");
    //FAZ APARECER O CAMPO DE BATALHA
    $('#'+"tabuleiro_batalha_pokemon").css("display","flex");

    //PARA DESENHAR O POKEMON JOGADOR
    let img_pokemon_jogador = document.createElement('img')
    img_pokemon_jogador.setAttribute("id","pokemon_jogador")
    img_pokemon_jogador.src = myPokemon
    POKEMON_JOGADOR.appendChild(img_pokemon_jogador)

    //PARA DESENHAR FORCA POKEMON
    let p_forca_meuPokemon = document.createElement('p')
    p_forca_meuPokemon.setAttribute("id","forcaMeuPokemon")
    let forcaMy = document.createTextNode("Força: " + forca_myPokemon)
    p_forca_meuPokemon.appendChild(forcaMy)
    JOGADOR.appendChild(p_forca_meuPokemon)

    //PARA DESENHAR O POKEMON ADVERSARIO
    let adversario = document.createElement('img')
    adversario.setAttribute("id","adversario")

    //PARA DESENHAR A FORCA DO POKEMON ADVERSARIO
    let p_forca_adversario = document.createElement('p')
    p_forca_adversario.setAttribute("id","forcaPokemonAdv")
    let forca = document.createTextNode("Força: " + f_adv)
    p_forca_adversario.appendChild(forca)
    INIMIGO.appendChild(p_forca_adversario)

    //DESENHA O POKEMON ADEQUADO
    if(pokemon == "KYOGRE") {
        adversario.src = 'img/pokemons/kyogre.png'
        POKEMON_ADVERSARIO.appendChild(adversario)   
    }
    if(pokemon == "DARKRAI") {
        adversario.src = 'img/pokemons/darkrai.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "GARDEVOIR") {
        adversario.src = 'img/pokemons/gardevoir.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "SCIZOR") {
        adversario.src = 'img/pokemons/scizor.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "RAIKOU") {
        adversario.src = 'img/pokemons/raikou.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "SNORLAX") {
        adversario.src = 'img/pokemons/snorlax.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "PALKIA") {
        adversario.src = 'img/pokemons/palkia.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "SWAMPERT") {
        adversario.src = 'img/pokemons/swampert.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "TYRANITAR") {
        adversario.src = 'img/pokemons/tyranitar.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "SCEPTILE") {
        adversario.src = 'img/pokemons/sceptile.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "BEEDRILL") {
        adversario.src = 'img/pokemons/beedrill.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "LUCARIO") {
        adversario.src = 'img/pokemons/lucario.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "CHARIZARD") {
        adversario.src = 'img/pokemons/charizard.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "GIRATINA") {
        adversario.src = 'img/pokemons/giratina.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "KYUREM") {
        adversario.src = 'img/pokemons/kyurem.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "RESHIRAM") {
        adversario.src = 'img/pokemons/reshiram.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "DIALGA") {
        adversario.src = 'img/pokemons/dialga.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
    if(pokemon == "MEWTWO") {
        adversario.src = 'img/pokemons/mewtwo.png'
        POKEMON_ADVERSARIO.appendChild(adversario)
    }
}

//FUNCAO PARA ROLAR O DADO
function rolarDado(){ 

    //ROLAR DADOS
    let sorteio1 = Math.floor(Math.random() * 6 + 1)
    let sorteio2 = Math.floor(Math.random() * 6 + 1)
    let sorteio3 = Math.floor(Math.random() * 12 + 1)

    //DADO DO JOGADOR
    let dado_face1 = document.createElement('img')
    dado_face1.setAttribute("id","face_dado")

    let dado_face2 = document.createElement('img')
    dado_face2.setAttribute("id","face_dado")

    //DADO DO ADVERSARIO
    let p_sorteio_adv = document.createElement('p')
    p_sorteio_adv.setAttribute('id', "dadoSorteioAdv")
    let sorteio_adv = document.createTextNode("DADO SORTEADO: " + sorteio3)
    p_sorteio_adv.appendChild(sorteio_adv)
    INIMIGO.appendChild(p_sorteio_adv)


    //DEPENDENDO DA COMBINACAO DO SORTEIO INSERIMOS A FACE DE DADO ADEQUADO
    if(sorteio1 == 1 && sorteio2 == 1) {
        dado_face1.src = "img/dados/1.png" 
        dado_face2.src = "img/dados/1.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2)

    } 
    if(sorteio1 == 1 && sorteio2 == 2) {
            dado_face1.src = "img/dados/1.png" 
            dado_face2.src = "img/dados/2.png" 
            DADO.appendChild(dado_face1)
            DADO.appendChild(dado_face2) 
    }
    if(sorteio1 == 1 && sorteio2 == 3){
            dado_face1.src = "img/dados/1.png" 
            dado_face2.src = "img/dados/3.png" 
            DADO.appendChild(dado_face1)
            DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 1 && sorteio2 == 4){
            dado_face1.src = "img/dados/1.png" 
            dado_face2.src = "img/dados/4.png" 
            DADO.appendChild(dado_face1)
            DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 1 && sorteio2 == 5){
        dado_face1.src = "img/dados/1.png" 
        dado_face2.src = "img/dados/5.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2)
    }
    
    if(sorteio1 == 1 && sorteio2 == 6) {
        dado_face1.src = "img/dados/1.png" 
        dado_face2.src = "img/dados/6.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }
        
    if(sorteio1 == 2 && sorteio2 == 1) {
        dado_face1.src = "img/dados/2.png" 
        dado_face2.src = "img/dados/1.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }
            
    if(sorteio1 == 2 && sorteio2 == 2) {
        dado_face1.src = "img/dados/2.png" 
        dado_face2.src = "img/dados/2.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }    
    
    if(sorteio1 == 2 && sorteio2 == 3) {
        dado_face1.src = "img/dados/2.png" 
        dado_face2.src = "img/dados/3.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }    
    
    if(sorteio1 == 2 && sorteio2 == 4) {
        dado_face1.src = "img/dados/2.png" 
        dado_face2.src = "img/dados/4.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }
    
    if(sorteio1 == 2 && sorteio2 == 5) {
        dado_face1.src = "img/dados/2.png" 
        dado_face2.src = "img/dados/5.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }
  
    if(sorteio1 == 2 && sorteio2 == 6) {
        dado_face1.src = "img/dados/2.png" 
        dado_face2.src = "img/dados/6.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 

    }

    if(sorteio1 == 3 && sorteio2 == 1) {
        dado_face1.src = "img/dados/3.png" 
        dado_face2.src = "img/dados/1.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }
    
    if(sorteio1 == 3 && sorteio2 == 2) {
        dado_face1.src = "img/dados/3.png" 
        dado_face2.src = "img/dados/2.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 3 && sorteio2 == 3) {
        dado_face1.src = "img/dados/3.png" 
        dado_face2.src = "img/dados/3.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }
    if(sorteio1 == 3 && sorteio2 == 4) {
        dado_face1.src = "img/dados/3.png" 
        dado_face2.src = "img/dados/4.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 3 && sorteio2 == 5) {
        dado_face1.src = "img/dados/3.png" 
        dado_face2.src = "img/dados/5.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }
    
    if(sorteio1 == 3 && sorteio2 == 6) {
        dado_face1.src = "img/dados/3.png" 
        dado_face2.src = "img/dados/6.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 4 && sorteio2 == 1) {
        dado_face1.src = "img/dados/4.png" 
        dado_face2.src = "img/dados/1.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    
    if(sorteio1 == 4 && sorteio2 == 2) {
        dado_face1.src = "img/dados/4.png" 
        dado_face2.src = "img/dados/2.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 4 && sorteio2 == 3) {
        dado_face1.src = "img/dados/4.png" 
        dado_face2.src = "img/dados/3.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 4 && sorteio2 == 4) {
        dado_face1.src = "img/dados/4.png" 
        dado_face2.src = "img/dados/4.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 4 && sorteio2 == 5) {
        dado_face1.src = "img/dados/4.png" 
        dado_face2.src = "img/dados/5.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    } 
    if(sorteio1 == 4 && sorteio2 == 6) {
        dado_face1.src = "img/dados/4.png" 
        dado_face2.src = "img/dados/6.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 5 && sorteio2 == 1) {
        dado_face1.src = "img/dados/5.png" 
        dado_face2.src = "img/dados/1.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 5 && sorteio2 == 2) {
        dado_face1.src = "img/dados/5.png" 
        dado_face2.src = "img/dados/2.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 5 && sorteio2 == 3) {
        dado_face1.src = "img/dados/5.png" 
        dado_face2.src = "img/dados/3.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 5 && sorteio2 == 4) {
        dado_face1.src = "img/dados/5.png" 
        dado_face2.src = "img/dados/4.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 5 && sorteio2 == 5){
        dado_face1.src = "img/dados/5.png" 
        dado_face2.src = "img/dados/5.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 5 && sorteio2 == 6) {
        dado_face1.src = "img/dados/5.png" 
        dado_face2.src = "img/dados/6.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 6 && sorteio2 == 1) {
        dado_face1.src = "img/dados/6.png" 
        dado_face2.src = "img/dados/1.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }
            
    if(sorteio1 == 6 && sorteio2 == 2) {
        dado_face1.src = "img/dados/6.png" 
        dado_face2.src = "img/dados/2.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 6 && sorteio2 == 3) {
        dado_face1.src = "img/dados/6.png" 
        dado_face2.src = "img/dados/3.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 6 && sorteio2 == 4) {
        dado_face1.src = "img/dados/6.png" 
        dado_face2.src = "img/dados/4.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 

    }

    if(sorteio1 == 6 && sorteio2 == 5) {
        dado_face1.src = "img/dados/6.png" 
        dado_face2.src = "img/dados/5.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }

    if(sorteio1 == 6 && sorteio2 == 6) {
        dado_face1.src = "img/dados/6.png" 
        dado_face2.src = "img/dados/6.png" 
        DADO.appendChild(dado_face1)
        DADO.appendChild(dado_face2) 
    }
    // RETORNA UMA LISTA COM OS SORTEIOS DO JOGADOR E ADVERSARIO
    return [sorteio1+sorteio2,sorteio3]
    
}

// DE ACORDO COM O NOME DO POKEMON RETORNA A FORCA DO MESMO
function retornaForcaPokemonAdv(pokemon){
    if (DARKRAI.nome == pokemon) {
        DARKRAI.forca = DARKRAI.forca 
        return DARKRAI.forca
    }
    if (KYOGRE.nome == pokemon) {
        KYOGRE.forca = KYOGRE.forca 
        return KYOGRE.forca
    }
    if (GARDEVOIR.nome == pokemon) {
        GARDEVOIR.forca = GARDEVOIR.forca 
        return GARDEVOIR.forca
    }
    if (SCIZOR.nome == pokemon) {
        SCIZOR.forca = SCIZOR.forca 
        return SCIZOR.forca
    }
    if (RAIKOU.nome == pokemon) {
        RAIKOU.forca = RAIKOU.forca 
        return RAIKOU.forca
    }
    if (SNORLAX.nome == pokemon) {
        SNORLAX.forca = SNORLAX.forca 
        return SNORLAX.forca
    }
    if (TYRANITAR.nome == pokemon) {
        TYRANITAR.forca = TYRANITAR.forca 
        return TYRANITAR.forca
    }
    if (SWAMPERT.nome == pokemon) {
        SWAMPERT.forca = SWAMPERT.forca 
        return SWAMPERT.forca
    }
    if (SCEPTILE.nome == pokemon) {
        SCEPTILE.forca = SCEPTILE.forca 
        return SCEPTILE.forca
    }
    if (BEEDRILL.nome == pokemon) {
        BEEDRILL.forca = BEEDRILL.forca 
        return BEEDRILL.forca
    }
    if (LUCARIO.nome == pokemon) {
        LUCARIO.forca = LUCARIO.forca 
        return LUCARIO.forca
    }
    if (CHARIZARD.nome == pokemon) {
        CHARIZARD.forca = CHARIZARD.forca 
        return CHARIZARD.forca
    }
    if (GIRATINA.nome == pokemon) {
        GIRATINA.forca = GIRATINA.forca 
        return GIRATINA.forca
    }
    if (KYUREM.nome == pokemon) {
        KYUREM.forca = KYUREM.forca 
        return KYUREM.forca
    }
    if (RESHIRAM.nome == pokemon) {
        RESHIRAM.forca = RESHIRAM.forca 
        return RESHIRAM.forca
    }
    if (DIALGA.nome == pokemon) {
        DIALGA.forca = DIALGA.forca 
        return DIALGA.forca
    }
    if (MEWTWO.nome == pokemon) {
        MEWTWO.forca = MEWTWO.forca 
        return MEWTWO.forca
    }
    if (PALKIA.nome == pokemon) {
        PALKIA.forca = PALKIA.forca 
        return PALKIA.forca
    }

}

//LIMPA CAMPO DE BATALHA PARA IMPEDIR DADOS SOBREPOSTOS
function limpaTelaBatalha(){ 
    document.getElementById('tabuleiro').innerHTML = ''
    document.getElementById('p_pokemon_jogador').innerHTML = ''

    let p_forca_meuPokemon = document.querySelector('#forcaMeuPokemon')
    p_forca_meuPokemon.parentNode.removeChild(p_forca_meuPokemon)

    document.getElementById('p_pokemonAdversario').innerHTML = ''

    let p_forca_meuPokemonAdv = document.querySelector('#forcaPokemonAdv')
    p_forca_meuPokemonAdv.parentNode.removeChild(p_forca_meuPokemonAdv)
}

//CONTADOR PARA A PRIMEIRA VEZ QUE O BUTAO DE ROLAR É PREMIDO
let contador = 0

//FUNCAO BATALHA ENTRE POKEMONS
function batalhar() {

    //CASO VENCEDOR OU PERDEDOR
    if(forca_myPokemon == 0) {
        return gameOver()
    } else if(forcaPokemonAdv == 0) {
        return gameBattleWin()
    }

    //IMPEDE QUE OS DADOS NUNCA SEJAM MOSTRADOS, POIS QUEREMOS QUE SEJAM MOSTRADOS
    if (contador > 0) {
        document.getElementById('dados').innerHTML = ''
        let p_dadoSorteioAdv = document.querySelector('#dadoSorteioAdv')
        p_dadoSorteioAdv.parentNode.removeChild(p_dadoSorteioAdv)
    }

    dado = rolarDado()
    dado_jogador = dado[0]
    dado_adversario =dado[1]

    //CASO DADO SUPERIOR OU IGUAL DO POKEMON ADVERSARIO
    if (dado_jogador >= dado_adversario) { 
        forcaPokemonAdv =  forcaPokemonAdv - 1
    }
    //CASO DADO INFERIOR OU IGUAL DO POKEMON ADVERSARIO
    if (dado_jogador < dado_adversario) {
        forca_myPokemon = forca_myPokemon -1
    }
    //LIMPA CAMPO BATALHA
    limpaTelaBatalha()
    //REDEZENHA CAMPO BATALHA
    renderizarCampoBatalha(pokemonAdversario,forcaPokemonAdv)
    contador +=1


}

// CASO GANHOU A BATALHA
function gameBattleWin() {
    limpaTelaBatalha()
    //POKEMON ADVERSARIO DESAPARECE
    labirinto[pokemonAdvPositionX][pokemonAdvPositionY] = 0
    renderizacao()
    //MOSTRA TABULEIRO
    $('#'+'tabuleiro').css("display","flex");
    //CCAMPO BATALHA DESAPARECE
    $('#'+"tabuleiro_batalha_pokemon").css("display","none");
    pokemonDerrotados ++;
}

function gameOver() {
    jogoGanho = "NAO"
    alert("PERDEU O JOGOOOOOO");
    //INTERREMPO O TEMPO
    clearInterval(temporizadorTempoJogo)
    //CRIA REGISTO DO JOGO
    criarRegisto()
    //VAI PARA A PAGINA DE ESTATISTICA
    window.location.href = "../4.scores/scores.html"


    
}

function gameWin() {
    jogoGanho = "YES"
    alert("GANHOU O JOGOOOOOO");
    //INTERREMPO O TEMPO
    clearInterval(temporizadorTempoJogo)
    //CRIA REGISTO DO JOGO
    criarRegisto()
    //VAI PARA A PAGINA DE ESTATISTICA
    window.location.href = "../4.scores/scores.html"

    
}

// LISTA DE REGISTO DOS JOGOS
let registoJogo = []


function Registo(usuario,tempoDoJogo,derrotados,ganhou){
    this.usuario = usuario;
    this.tempoDoJogo = tempoDoJogo;
    this.derrotados = derrotados;
    this.ganhou = ganhou;

}

function Registos(registo){
    this.registo = registo;
}

// FUNCAO PARA CRIAR REGISTO DE JOGO

function criarRegisto(){
    //CARREGA O HISTORICO DE JOGOS
    carregaHistoricoJogos()
    let registo = null
    registo = new Registos(obtemRegisto());
    //GRAVA OS JOGOS NO HISTORICO
    gravaJogoNoHistorico(registo)

}

//OBTEM O REGISTO DO JOGO
function obtemRegisto(){

    let usuario = JSON.parse(localStorage.getItem(JOGADOR_ATUAL))

    return new Registo(usuario,document.getElementById("time").textContent,pokemonDerrotados,jogoGanho)

}

// CARREGA HISTORICO DE JOGO
function carregaHistoricoJogos() {

    registoJogo = JSON.parse(localStorage.getItem(ITEM_JOGO)) || [];
}


//GRAVA HISTORICO DE JOGOS
function gravaHistoricoJogos(){
    localStorage.setItem(ITEM_JOGO, JSON.stringify(registoJogo));
}

//GRAVA JOGOS NO HOSTORICO
function gravaJogoNoHistorico(registo) {
    registoJogo.push(registo);
    gravaHistoricoJogos()

}

// ATUALIZA JOGO
function atualizaTela() {
    limpaTabuleiro()
    verifica_estado_atual_jogo()
    renderizacao()
}

//TEMPO DO JOGO
function mostraTempoJogo() {

    SPAN_TEMPO_JOGO.innerHTML = ( Math.floor(Date.now()/1000))-jogo_inicio ;
    
}

// FUNCAO PARA ESCOLHER O POKMEON

function choosePokemon(pokemon) {
    if(pokemon == "PIKACHU") {
        //FECHA A TELA DE ESCOLHA
        document.getElementById("escolhaPokemon").style.display="none"
        //INICIA O TABULEIRO
        $('#'+'tabuleiro').css("display","flex");
        //PEGA IMAGEM DO MEU POKEMON
        myPokemon = 'img/pokemons/pikachu.png'
        //FORCA POKEMON
        forca_myPokemon = 9
        //INICIA CONTAGEM JOGO
        jogo_inicio = Math.floor(Date.now() / 1000); 
        temporizadorTempoJogo = setInterval(mostraTempoJogo, 1000);
        atualizaTela()
    }
    
    else if(pokemon == "INFERNAPE") {
        //FECHA A TELA DE ESCOLHA
        document.getElementById("escolhaPokemon").style.display="none"
        //INICIA O TABULEIRO
        $('#'+'tabuleiro').css("display","flex");
        //PEGA IMAGEM DO MEU POKEMON
        myPokemon = 'img/pokemons/infernape.png'
        //FORCA POKEMON
        forca_myPokemon = 9
        //INICIA CONTAGEM JOGO
        jogo_inicio = Math.floor(Date.now() / 1000); 
        temporizadorTempoJogo = setInterval(mostraTempoJogo, 1000);
        atualizaTela()
    }
}




















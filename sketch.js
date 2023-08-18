//variaveis criacao bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//variaveis velocidade bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variaveis criacao minha raquete
let xMinhaRaquete = 5
let yMinhaRaquete = 150
let comprimentoRaquete = 10
let alturaRaquete = 90

//variaveis criacao raquete oponente
let colidiu = false;
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//variaveis do placar
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
    background(25,25,112);
  criacaoBolinha();
  velocidadeBolinha();
  verificaColisaoBorda();
  criacaoRaquete(xMinhaRaquete,yMinhaRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoMinhaRaquete();
  verificaColisaoRaquete(xMinhaRaquete,yMinhaRaquete);
  criacaoRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function criacaoBolinha(){
  circle(xBolinha, yBolinha, diametro);
}
  
function velocidadeBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width ||
   xBolinha - raio < 0){
  velocidadeXBolinha *= -1;
}

  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
   velocidadeYBolinha *= -1; 
  }
}

function criacaoRaquete(x,y){
  rect(x, y, comprimentoRaquete, alturaRaquete)
}


function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yMinhaRaquete -= 10;
  }
    if (keyIsDown(DOWN_ARROW)){
    yMinhaRaquete += 10;
  }
//limitanto o movimento da raquete
  yMinhaRaquete = constrain(yMinhaRaquete,10,302)
}

function verificaColisaoMinhaRaquete(){
  if(xBolinha - raio < xMinhaRaquete + comprimentoRaquete 
     && yBolinha - raio < yMinhaRaquete + alturaRaquete 
     && yBolinha + raio > yMinhaRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x,y){
  colidiu = 
collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  //velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 40;
  //yRaqueteOponente += velocidadeYOponente;
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
    if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
//limitando movimento da raquete  
  yRaqueteOponente = constrain(yRaqueteOponente,10,302)
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,40,0));
  rect(150,10,40,20);
  fill(255);
  text(meusPontos,170,26);
  fill(color(255,40,0));
  rect(450,10,40,20);
  fill(255);
  text(pontosDoOponente,470,26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
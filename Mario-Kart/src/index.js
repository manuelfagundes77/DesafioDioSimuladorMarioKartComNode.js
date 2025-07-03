import { jogadores } from './Playes.js';

async function  rolarDados() {
   return Math.floor(Math.random() * 6) + 1
}

async function getRandomBlock(){
   let random = Math.random();
   let result

   switch (true) {
      case random < 0.33:
         result = "Reta"
         break;
      case random < 0.66:
         result = "Drift"
         break;
      default:
         result = "Confronto"
         break;
   }
   return result;
}

async function logRollResult(caractername, block, diceresult, atribute) {
   console.log(`${caractername} 🎲 rolou um dado de ${block} ${diceresult} + ${atribute} de seu Atributo = ${diceresult + atribute} `);
}


async function playRaceEngine(caracter1, caracter2) {
   for(let round = 1; round <= 5; round++) {
      console.log(`🏁 Rodada ${round}`);

      //sortear bloco
      let block = await getRandomBlock();
      console.log(`🚩 Bloco: ${block}`);
      
//jogar dados
      let caracter1Dice = await rolarDados();
      let caracter2Dice = await rolarDados();

      let TotalTestSkill1 = 0;
      let TotalTestSkill2 = 0;

      if(block === "Reta"){
         TotalTestSkill1 = caracter1.velocidade + caracter1Dice;
         TotalTestSkill2 = caracter2.velocidade + caracter2Dice;

         await logRollResult(caracter1.name, "velocidade", caracter1Dice, caracter1.velocidade);
         await logRollResult(caracter2.name, "velocidade", caracter2Dice, caracter2.velocidade);
        
    
      }

      if(block === "Drift"){
         TotalTestSkill1 = caracter1.manobrabilidade + caracter1Dice;
         TotalTestSkill2 = caracter2.manobrabilidade + caracter2Dice;

         await logRollResult(caracter1.name, "manobrabilidade", caracter1Dice, caracter1.manobrabilidade);
         await logRollResult(caracter2.name, "manobrabilidade", caracter2Dice, caracter2.manobrabilidade);
      }

      if(block === "Confronto"){
         let powerResult1 = caracter1.poder + caracter1Dice;
         let powerResult2= caracter2.poder + caracter2Dice;

         console.log(` ${caracter1.name} Batalhou contra ${caracter2.name}! `);
         await logRollResult(caracter1.name, "poder", caracter1Dice, caracter1.poder);
         await logRollResult(caracter2.name, "poder", caracter2Dice, caracter2.poder);

         caracter2.pontos -= powerResult1 >  powerResult2 && caracter2.pontos > 0  ? 1 : 0;
         caracter1.pontos -= powerResult2 >  powerResult1 && caracter1.pontos > 0  ? 1 : 0;
         console.log( powerResult2 === powerResult1 ? "confronto empatado!!!" : "")  
         console.log( powerResult1 >  powerResult2 ? `${caracter1.name} venceu o confronto` : `${caracter2.name} venceu o confronto`);


      }

      //verificar vencedor
      if(TotalTestSkill1 > TotalTestSkill2){
         console.log(`🏆 Vencedor: ${caracter1.name}`);
         caracter1.pontos += 1;
         console.log (" Marcou " + caracter1.pontos + " Ponto." );
      }else if(TotalTestSkill2 > TotalTestSkill1){
         console.log(`🏆 Vencedor: ${caracter2.name}`);9
         caracter2.pontos += 1;
          console.log (" Marcou " + caracter2.pontos + " Ponto." );
      }else if(TotalTestSkill1 === TotalTestSkill2){
         console.log("");
      }

      console.log("_________________________________\n");


   }

   
}

async function declareWinner(caracter1, caracter2) {
   console.log("Resultado Final: ");
   console.log(`${caracter1.name} possui ${caracter1.pontos} pontos`);
   console.log(`${caracter2.name} possui ${caracter2.pontos} pontos`);

   if(caracter1.pontos > caracter2.pontos){
      console.log(`🏆 Vencedor: ${caracter1.name}`);
   }else if(caracter2.pontos > caracter1.pontos){
      console.log(`🏆 Vencedor: ${caracter2.name}`);
   } else {
      console.log("A competição terminou empatada.");
   }
}


(async function main() {
   const jogadoresEmbaralhados = [...jogadores].sort(() => Math.random() - 0.5); //  embaralhada

   let jogador1 = Math.floor(Math.random() * jogadoresEmbaralhados.length);
   let jogador2 = Math.floor(Math.random() * jogadoresEmbaralhados.length);
   while (jogador1 === jogador2) {
      jogador2 = Math.floor(Math.random() * jogadoresEmbaralhados.length);
   }

   console.log(`\n Corrida entre ${jogadoresEmbaralhados[jogador1].name} e ${jogadoresEmbaralhados[jogador2].name} começando...\n`);

   await playRaceEngine(jogadoresEmbaralhados[jogador1], jogadoresEmbaralhados[jogador2]);

   await declareWinner(jogadoresEmbaralhados[jogador1], jogadoresEmbaralhados[jogador2]);
})();



   

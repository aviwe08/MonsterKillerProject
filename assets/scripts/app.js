let chosenMaxLife = 100;
let hasBonusLife = true;
let battleLog = [];
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAMEOVER = 'GAMEOVER';


const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 19;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = chosenMaxLife * 0.35;

const enteredValue = prompt("Please enter the Maximum Life Value", "100");
 chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
  alert("Invalid Entry, Default Set to 100");
}

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry;
  logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  };
  switch(ev){
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = 'PLAYER';
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = 'PLAYER';
      break;
    default:
      logEntry ={} ;

  }

/*   if (ev === LOG_EVENT_PLAYER_ATTACK) {

    logEntry.target = 'MONSTER';

  } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {

    logEntry.target = 'MONSTER';

  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {

    logEntry.target = 'PLAYER';

  } else if (ev === LOG_EVENT_PLAYER_HEAL) {

    logEntry.target = 'PLAYER'

  } */
  battleLog.push(logEntry);
}


let currentMosterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackSelection(attackType) {
  const damageSelection = attackType === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const LogEvent = attackType === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

  const damage = dealMonsterDamage(damageSelection);
  currentMosterHealth -= damage;

  writeToLog(LogEvent, damage, currentMosterHealth, currentPlayerHealth);

  endRound();
}

function endRound() {
  let initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMosterHealth, currentPlayerHealth);
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    currentPlayerHealth = initialPlayerHealth;
    removeBonusLife();
    setPlayerHealth(initialPlayerHealth);
    alert("Bonus Life Used");
  }

  if (currentMosterHealth <= 0 && currentPlayerHealth > 0) {
    resetPlay();
    alert("Player Won");
    writeToLog(LOG_EVENT_MONSTER_ATTACK, "Player Won", currentMosterHealth, currentPlayerHealth);

  } else if (currentPlayerHealth <= 0 && currentMosterHealth > 0) {
    resetPlay();
    alert("Monster Won");
    writeToLog(LOG_EVENT_MONSTER_ATTACK, "Monster Won", currentMosterHealth, currentPlayerHealth);

  } else if (currentMosterHealth <= 0 && currentPlayerHealth <= 0) {
    resetPlay();
    alert("It's a draw");
    writeToLog(LOG_EVENT_MONSTER_ATTACK, "It's a draw", currentMosterHealth, currentPlayerHealth);

  }
}
function attackHandler() {
  attackSelection(MODE_ATTACK);
}

function strongAttackHandler() {
  attackSelection(MODE_STRONG_ATTACK);
}

function resetPlay() {
  resetGame(chosenMaxLife);
  currentMosterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
}

/**/

function healPlayer() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("Heal value exceeds maximum health");
    healValue = chosenMaxLife - currentPlayerHealth
  } else {
    healValue = HEAL_VALUE
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;

    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMosterHealth, currentPlayerHealth);

  endRound();
}

function printLogHandler() {
  for(let i = 0; i < battleLog.length; i++){
    console.log("--------------------");
    console.log(battleLog[i])
  }
  //console.log(battleLog);


}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayer);

logBtn.addEventListener("click", printLogHandler)
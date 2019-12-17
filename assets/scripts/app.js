let chosenMaxLife = 100;
let hasBonusLife =  true;

const enteredValue = prompt("Please enter the Maximum Life Value", "100");
chosenMaxLife = parseInt(enteredValue).

if( isNaN(chosenMaxLife) || chosenMaxLife <= 0){
  chosenMaxLife = 100;
  alert("Invalid Entry, Default Set to 100");
}
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 19;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = chosenMaxLife * 0.35;

let currentMosterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackSelection(attackType) {
  let damageSelection;
  if (attackType === "ATTACK") {
    damageSelection = ATTACK_VALUE;
  } else if (attackType === "STRONG_ATTACK") {
    damageSelection = STRONG_ATTACK_VALUE;
  } else {
    return;
  }
  const damage = dealMonsterDamage(damageSelection);
  currentMosterHealth -= damage;
  endRound();
}

function endRound() {
  let initialPlayerHealth = currentPlayerHealth; 
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if(currentPlayerHealth <= 0 && hasBonusLife ){
    hasBonusLife = false;
    currentPlayerHealth = initialPlayerHealth;
    removeBonusLife();
    setPlayerHealth(initialPlayerHealth);
    alert("Bonus Life Used");
  }

  if (currentMosterHealth <= 0 && currentPlayerHealth > 0) {
    resetPlay();
    alert("Player Won");
  } else if (currentPlayerHealth <= 0 && currentMosterHealth > 0) {
    resetPlay();
    alert("Monster Won");
  } else if (currentMosterHealth <= 0 && currentPlayerHealth <= 0) {
    resetPlay();
    alert("It's a draw");
  }
}
function attackHandler() {
  const attackMode = "ATTACK";
  attackSelection("ATTACK");
}

function strongAttackHandler() {
  attackSelection("STRONG_ATTACK");
}

function resetPlay() {
  resetGame(chosenMaxLife);
  currentMosterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
}

/**/

function healPlayer() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE ){
    alert("Heal value exceeds maximum health");
    healValue = chosenMaxLife - currentPlayerHealth
  }else{
    healValue = HEAL_VALUE
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayer);

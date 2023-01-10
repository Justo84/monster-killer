const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife
let currentPlayerHealth = chosenMaxLife
let hasBonusLife = true

adjustHealthBars(chosenMaxLife)

function endRound() {
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
    currentPlayerHealth -= playerDamage

    if (currentPlayerHealth <0 && hasBonusLife) {
        hasBonusLife = false
        removeBonusLife()
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("you won")
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("you lost")
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("Draw!")
    }
}

const attackMonster = (attackMode) => {
    let maxDamage;
    if (attackMode === "ATTACK") {
        maxDamage = ATTACK_VALUE
    } else if ("STRONG_ATTACK") {
        maxDamage = STRONG_ATTACK_VALUE
    }
    const damage = dealMonsterDamage(maxDamage)
    currentMonsterHealth -= damage
    endRound()
}

const attackHandler = () => {
    attackMonster("ATTACK")
}

const strongAttackHandler = () => {
    attackMonster("STRONG_ATTACK")
}

const healPlayerHandler = () => {
    let healValue
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        healValue = chosenMaxLife - currentPlayerHealth
    } else {
        healValue = HEAL_VALUE
    }
    increasePlayerHealth(healValue)
    currentPlayerHealth += healValue
    endRound()
}

attackBtn.addEventListener('click', attackHandler)
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healPlayerHandler)
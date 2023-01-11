const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const MODE_ATTACK = "ATTACK"
const MODE_STRONG_ATTACK = "STRONG_ATTACK"
const LOG_PLAYER_ATTACK = 'PLAYER_ATTACK'
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK'
const LOG_MONSTER_ATTACK = 'MONSTER_ATTACK'
const LOG_PLAYER_HEAL = 'PLAYER_HEAL'
const LOG_GAME_OVER = "GAME_OVER"

// const enteredHealth = prompt("Maximum life:", "100")

let chosenMaxLife = parseInt(enteredHealth);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100
}
let currentMonsterHealth = chosenMaxLife
let currentPlayerHealth = chosenMaxLife
let hasBonusLife = true

let battleLog = []

function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    }
    if (event === LOG_PLAYER_ATTACK) {
        logEntry.target = "MONSTER"
    } else if (event === LOG_PLAYER_STRONG_ATTACK) {
        logEntry.target = "MONSTER"
    } else if (event === LOG_MONSTER_ATTACK) {
        logEntry.target = "PLAYER"
    } else if (event === LOG_PLAYER_HEAL) {
        logEntry.target = "PLAYER"
    }
    battleLog.push(logEntry)
}

adjustHealthBars(chosenMaxLife)

function reset() {
    currentMonsterHealth = chosenMaxLife
    currentPlayerHealth = chosenMaxLife
    resetGame(chosenMaxLife)
    // addBonusLife()
}

function endRound() {
    let initialPlayerHealth = currentPlayerHealth
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
    currentPlayerHealth -= playerDamage
    writeToLog(LOG_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth)

    if (currentPlayerHealth < 0 && hasBonusLife) {
        hasBonusLife = false
        removeBonusLife()
        currentPlayerHealth = initialPlayerHealth
        setPlayerHealth(currentPlayerHealth)
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("you won")
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("you lost")
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("Draw!")
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset()
    }
}

const attackMonster = (attackMode) => {
    let maxDamage;
    if (attackMode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE
    } else if (MODE_STRONG_ATTACK) {
        maxDamage = STRONG_ATTACK_VALUE
    }
    const damage = dealMonsterDamage(maxDamage)
    currentMonsterHealth -= damage
    endRound()
}

const attackHandler = () => {
    attackMonster(MODE_ATTACK)
}

const strongAttackHandler = () => {
    attackMonster(MODE_STRONG_ATTACK)
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

function printLogHandler() {
    console.log(battleLog)
}

attackBtn.addEventListener('click', attackHandler)
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healPlayerHandler)
logBtn.addEventListener("click", printLogHandler)
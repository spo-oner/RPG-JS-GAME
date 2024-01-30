let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["палка"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'Палка', power: 5 },
  { name: 'Клинок', power: 30 },
  { name: 'Когтевой молоток', power: 50 },
  { name: 'Меч', power: 100 }
];
const monsters = [
  {
    name: "Слизняк",
    level: 2,
    health: 15
  },
  {
    name: "Клыкастый зверь",
    level: 8,
    health: 60
  },
  {
    name: "Дракон",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Пойти в магазин", "Пойти в пещеру", "Сразиться с драконом"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Вы находитесь на городской площади. Вы видите вывеску с надписью \"Магазин\"."
  },
  {
    name: "store",
    "button text": ["Купить 10 здоровья (10 золота)", "Купить оружие (30 золота)", "Пойти на городскую площадь"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Вы вошли в магазин."
  },
  {
    name: "cave",
    "button text": ["Сразиться со слизнем", "Сразитесь с клыкастым зверем", "Пойти на городскую площадь"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Вы входите в пещеру. Вы видите несколько монстров."
  },
  {
    name: "fight",
    "button text": ["Атака", "Уклонение", "Убежать"],
    "button functions": [attack, dodge, goTown],
    text: "Вы сражаетесь с чудовищем."
  },
  {
    name: "kill monster",
    "button text": ["Пойти на городскую площадь", "Пойти на городскую площадь", "Пойти на городскую площадь"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'Умирая, монстр кричит "Арг!". Вы получаете очки опыта и находите золото.'
  },
   {
    name: "lose",
    "button text": ["ПЕРЕИГРАТЬ?", "ПЕРЕИГРАТЬ?", "ПЕРЕИГРАТЬ?"],
    "button functions": [restart, restart, restart],
    text: "Вы умерли. ☠️"
  },
  { 
    name: "win", 
    "button text": ["ПЕРЕИГРАТЬ?", "ПЕРЕИГРАТЬ?", "ПЕРЕИГРАТЬ?"], 
    "button functions": [restart, restart, restart], 
    text: "Вы победили дракона! ВЫ ВЫИГРАЛИ ИГРУ! 🎉" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Пойти на городскую площадь?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Вы нашли секретную игру. Выберите число, указанное выше. Случайным образом будут выбраны десять чисел от 0 до 10. Если выбранное вами число совпадет с одним из случайных чисел, вы выиграете!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "У вас недостаточно золота, чтобы купить здоровье.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Теперь у вас есть " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " В вашем инвентаре есть " + inventory;
    } else {
      text.innerText = "У вас недостаточно золота, чтобы купить оружие.";
    }
  } else {
    text.innerText = "У вас уже есть самое мощное оружие!";
    button2.innerText = "Продайте оружие за 15 золотых";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Вы продали " + currentWeapon + ".";
    text.innerText += " В вашем инвентаре есть: " + inventory;
  } else {
    text.innerText = "Не продавайте свое единственное оружие!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = monsters[fighting].name + " атакует.";
  text.innerText += " Вы атакуете его своим " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Вы промахнулись.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Ваш " + inventory.pop() + " сломался.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Вы уклонились от атаки " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["палка"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Вы подобрали " + guess + ". Вот случайные числа:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Точно! Вы выиграли 20 золотых!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Неправильно! Вы теряете 10 здоровья!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
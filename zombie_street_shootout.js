
// Zombie Street Shootout — Weapons Edition

// 1. Player with inventory
const player = {
  name: "Haja",
  health: 100,
  currentWeapon: "pistol", // Change to "knife", "pistol", or "shotgun" for testing
  inventory: {
    knife: { damage: 10, ammo: Infinity },
    pistol: { damage: 25, ammo: 0 }, // Change ammo to test different cases
    shotgun: { damage: 50, ammo: 2 },
    flamethrower: { damage: 70, ammo: 1 }, // extra weapon
    axe: { damage: 30, ammo: Infinity },  // melee weapon with infinite uses
  },
};

// 2. Zombies
const zombies = [
  { type: "Walker", health: 50 },
  { type: "Runner", health: 80 },
  { type: "Brute", health: 120 },
];

let currentZombieIndex = 1; // Change to 0, 1, or 2 to pick a zombie
let currentZombie = zombies[currentZombieIndex];

// 3. Fight logic
console.log(`\n${player.name} encounters a ${currentZombie.type} Zombie!\n`);

function attack(zombie, weaponName) {
  const weapon = player.inventory[weaponName];

  if (!weapon) {
    console.log("Weapon not found in inventory!");
    return;
  }

  // Check ammo or infinite use
  if (weapon.ammo > 0 || weapon.ammo === Infinity) {
    console.log(`${player.name} attacks with ${weaponName}!`);

    // Damage zombie
    zombie.health -= weapon.damage;
    console.log(`Zombie takes ${weapon.damage} damage.`);

    // Reduce ammo if not melee
    if (weapon.ammo !== Infinity) {
      weapon.ammo--;
      console.log(`${weaponName} ammo left: ${weapon.ammo}`);
    }

    // Check if zombie still alive
    if (zombie.health > 0) {
      // Zombie counterattacks
      const zombieDamage = 15;
      player.health -= zombieDamage;
      console.log(`Zombie attacks back and deals ${zombieDamage} damage!`);
    } else {
      console.log(`Zombie is defeated!`);
    }
  } else {
    // Ammo is 0, fallback to knife
    console.log(`${weaponName} has no ammo! Switching to knife...`);
    player.currentWeapon = "knife";
    attack(zombie, "knife");
  }
}

// Run the attack
attack(currentZombie, player.currentWeapon);

// 6. Final Status
console.log("\n--- FINAL STATUS ---");
console.log(`Player Health: ${player.health}`);
console.log(`Zombie (${currentZombie.type}) Health: ${currentZombie.health}`);

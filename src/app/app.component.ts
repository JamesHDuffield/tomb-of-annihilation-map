import { Component } from '@angular/core';
import * as _ from 'lodash';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToA';
  alerts = [];
  width = 100;
  height = 200;
  partyMembers = 4;
  food = 10;
  water = 200;
  ointment = 100;
  raincatchers = 4;
  terrain = 'Jungle (No Undead)';
  survival = 3;
  canoe = false;
  hexHeight = 13 / 2;
  hexWidth = 11.15;
  mapZoom = 2;
  position = {
    y: 33,
    x: 35
  };
  baseHex = {
    top: 102,
    left: 96
  };
  pace = 'normal';

  terrains = [
    {
      id: 1,
      name: 'Beach',
      encounter: [ {name: 'Aarakocra', min: 1 , max: 7 }, {name: 'Artus Cimber', min: 8 , max: 8 }, {name: 'Cache', min: 9 , max: 10 }, {name: 'Chwinga', min: 11 , max: 12 }, {name: 'Dinosaurs, allosaurus', min: 13 , max: 14 }, {name: 'Dinosaurs, dimetrodon', min: 15 , max: 16 }, {name: 'Dinosaurs, plesiosaurus', min: 17 , max: 21 }, {name: 'Dinosaurs, pteranodon', min: 22 , max: 28 }, {name: 'Dinosaurs, quetzalcoatlus', min: 29 , max: 31 }, {name: 'Dinosaurs, velociraptor', min: 32 , max: 37 }, {name: 'Dragon, red', min: 38 , max: 40 }, {name: 'Emerald Enclave', min: 41 , max: 42 }, {name: 'Explorers', min: 43 , max: 46 }, {name: 'Flaming Fist', min: 47 , max: 49 }, {name: 'Flying monkeys', min: 50 , max: 52 }, {name: 'Flying snakes', min: 53 , max: 55 }, {name: 'Frost giants', min: 56 , max: 57 }, {name: 'Giant lizards', min: 58 , max: 63 }, {name: 'Giant snapping turtle', min: 64 , max: 67 }, {name: 'Lizardfolk', min: 68 , max: 71 }, {name: 'Red Wizard', min: 72 , max: 74 }, {name: 'Sea hags', min: 75 , max: 84 }, {name: 'Stirges', min: 85 , max: 87 }, {name: 'Swarms of bats', min: 88 , max: 89 }, {name: 'Tabaxi hunter', min: 90 , max: 94 }, {name: 'Tri-flower frond', min: 95 , max: 100 }],
      difficulty: 10,
    },
    { id: 2,
      name: 'Jungle (No Undead)',
      encounter: [ {name: 'Albino dwarves', min: 1 , max: 1 }, {name: 'Almiraj', min: 2 , max: 2 }, {name: 'Apes', min: 3 , max: 4 }, {name: 'Artus Cimber', min: 5 , max: 5 }, {name: 'Assassin vines', min: 6 , max: 7 }, {name: 'Axe beaks', min: 8 , max: 8 }, {name: 'Baboons', min: 9 , max: 9 }, {name: 'Cache', min: 10 , max: 11 }, {name: 'Cannibals', min: 12 , max: 13 }, {name: 'Chwinga', min: 14 , max: 15 }, {name: 'Cyclops', min: 16 , max: 16 }, {name: 'Dinosaurs, allosaurus', min: 17 , max: 17 }, {name: 'Dinosaurs, ankylosaurus', min: 18 , max: 18 }, {name: 'Dinosaurs, brontosaurus', min: 19 , max: 19 }, {name: 'Dinosaurs, deinonychus', min: 20 , max: 21 }, {name: 'Dinosaurs, hadrosaurus', min: 22 , max: 23 }, {name: 'Dinosaurs, pteranodon', min: 24 , max: 24 }, {name: 'Dinosaurs, stegosaurus', min: 25 , max: 26 }, {name: 'Dinosaurs, triceratops', min: 27 , max: 28 }, {name: 'Dinosaurs, tyrannosaurus', min: 29 , max: 30 }, {name: 'Dinosaurs, velociraptor', min: 31 , max: 35 }, {name: 'Dragon, faerie', min: 36 , max: 36 }, {name: 'Eblis', min: 37 , max: 37 }, {name: 'Emerald Enclave', min: 38 , max: 42 }, {name: 'Explorer, dead', min: 43 , max: 44 }, {name: 'Explorers', min: 45 , max: 45 }, {name: 'Flail snail', min: 46 , max: 46 }, {name: 'Flaming Fist', min: 47 , max: 50 }, {name: 'Flying monkeys', min: 51 , max: 51 }, {name: 'Flying snakes', min: 52 , max: 53 }, {name: 'Frost giants', min: 54 , max: 55 }, {name: 'Giant boars', min: 56 , max: 56 }, {name: 'Giant frogs', min: 57 , max: 57 }, {name: 'Giant lizards', min: 58 , max: 58 }, {name: 'Giant scorpions', min: 59 , max: 59 }, {name: 'Giant wasps', min: 60 , max: 60 }, {name: 'Girallons', min: 61 , max: 62 }, {name: 'Goblins', min: 63 , max: 64 }, {name: 'Grungs', min: 65 , max: 66 }, {name: 'Jaculis', min: 67 , max: 67 }, {name: 'Kamadans', min: 68 , max: 68 }, {name: 'Lizardfolk', min: 69 , max: 70 }, {name: 'Mad monkey mist', min: 71 , max: 72 }, {name: 'Mantraps', min: 73 , max: 73 }, {name: 'Night hag', min: 74 , max: 74 }, {name: 'Pterafolk', min: 75 , max: 75 }, {name: 'Rare plant(s)', min: 76 , max: 76 }, {name: 'Red Wizard', min: 77 , max: 77 }, {name: 'Snake, constrictor', min: 78 , max: 79 }, {name: 'Snake, giant constrictor', min: 80 , max: 80 }, {name: 'Snake, giant poisonous', min: 81 , max: 81 }, {name: 'Spiders', min: 82 , max: 82 }, {name: 'Statue of Ubtao', min: 83 , max: 85 }, {name: 'Stirges', min: 86 , max: 86 }, {name: 'Su-monsters', min: 87 , max: 87 }, {name: 'Swarms of bats', min: 88 , max: 88 }, {name: 'Swarms of insects', min: 89 , max: 89 }, {name: 'Tabaxi hunter', min: 90 , max: 90 }, {name: 'Tiger', min: 91 , max: 91 }, {name: 'Tri-flower frond', min: 92 , max: 92 }, {name: 'Vegepygmies', min: 93 , max: 93 }, {name: 'Wereboar', min: 94 , max: 94 }, {name: 'Weretiger', min: 95 , max: 95 }, {name: 'Winterscape', min: 96 , max: 96 }, {name: 'Yellow musk creeper and zombies', min: 97 , max: 97 }, {name: 'Yuan-ti', min: 98 , max: 98 }, {name: 'Zhentarim', min: 99 , max: 99 }, {name: 'Zorbos', min: 100 , max: 100 }, ],
      difficulty: 15,
    },
    { id: 3,
      name: 'Jungle (Lesser Undead)',
      encounter: [ {name: 'Albino dwarves', min: 1 , max: 1 }, {name: 'Artus Cimber', min: 2 , max: 2 }, {name: 'Assassin vines', min: 3 , max: 5 }, {name: 'Axe beaks', min: 6 , max: 6 }, {name: 'Cache', min: 7 , max: 8 }, {name: 'Cannibals', min: 9 , max: 10 }, {name: 'Dinosaurs, allosaurus', min: 11 , max: 11 }, {name: 'Dinosaurs, ankylosaurus', min: 12 , max: 12 }, {name: 'Dinosaurs, deinonychus', min: 13 , max: 13 }, {name: 'Dinosaurs, hadrosaurus', min: 14 , max: 14 }, {name: 'Dinosaurs, pteranodon', min: 15 , max: 15 }, {name: 'Dinosaurs, stegosaurus', min: 16 , max: 16 }, {name: 'Dinosaurs, triceratops', min: 17 , max: 17 }, {name: 'Dinosaurs, tyrannosaurus', min: 18 , max: 18 }, {name: 'Emerald Enclave', min: 19 , max: 20 }, {name: 'Explorer, dead', min: 21 , max: 22 }, {name: 'Explorers', min: 23 , max: 23 }, {name: 'Flaming Fist', min: 24 , max: 26 }, {name: 'Flying snakes', min: 27 , max: 27 }, {name: 'Giant lizards', min: 28 , max: 28 }, {name: 'Giant wasps', min: 29 , max: 29 }, {name: 'Girallons', min: 30 , max: 31 }, {name: 'Goblins', min: 32 , max: 33 }, {name: 'Grungs', min: 34 , max: 35 }, {name: 'Mad monkey mist', min: 36 , max: 39 }, {name: 'Mantraps', min: 40 , max: 41 }, {name: 'Night hag', min: 42 , max: 42 }, {name: 'Pterafolk', min: 43 , max: 44 }, {name: 'Rare plant(s)', min: 45 , max: 45 }, {name: 'Red Wizard', min: 46 , max: 46 }, {name: 'Snake, constrictor', min: 47 , max: 48 }, {name: 'Snake, giant constrictor', min: 49 , max: 49 }, {name: 'Snake, giant poisonous', min: 50 , max: 50 }, {name: 'Spiders', min: 51 , max: 52 }, {name: 'Statue of Ubtao', min: 53 , max: 55 }, {name: 'Stirges', min: 56 , max: 57 }, {name: 'Su-monsters', min: 58 , max: 59 }, {name: 'Swarms of bats', min: 60 , max: 62 }, {name: 'Swarms of insects', min: 63 , max: 65 }, {name: 'Tri-flower frond', min: 66 , max: 66 }, {name: 'Troll', min: 67 , max: 67 }, {name: 'Undead, ghouls', min: 68 , max: 72 }, {name: 'Undead, skeletons', min: 73 , max: 77 }, {name: 'Undead, specter', min: 78 , max: 79 }, {name: 'Undead, wight', min: 80 , max: 80 }, {name: 'Undead, zombies', min: 81 , max: 89 }, {name: 'Vegepygmies', min: 90 , max: 91 }, {name: 'Wereboar', min: 92 , max: 92 }, {name: 'Weretiger', min: 93 , max: 93 }, {name: 'Winterscape', min: 94 , max: 94 }, {name: 'Yellow musk creeper and zombies', min: 95 , max: 96 }, {name: 'Yuan-ti', min: 97 , max: 98 }, {name: 'Zhentarim', min: 99 , max: 99 }, {name: 'Zorbos', min: 100 , max: 100 }, ],
      difficulty: 15,
    },
    { id: 4,
      name: 'Jungle (Greater Undead)',
      encounter: [ {name: 'Artus Cimber', min: 1 , max: 1 }, {name: 'Assassin vines', min: 2 , max: 2 }, {name: 'Cache', min: 3 , max: 5 }, {name: 'Dinosaurs, allosaurus', min: 6 , max: 6 }, {name: 'Dinosaurs, ankylosaurus', min: 7 , max: 7 }, {name: 'Dinosaurs, hadrosaurus', min: 8 , max: 8 }, {name: 'Dinosaurs, pteranodon', min: 9 , max: 9 }, {name: 'Dinosaurs, stegosaurus', min: 10 , max: 10 }, {name: 'Dinosaurs, tyrannosaurus', min: 11 , max: 12 }, {name: 'Dinosaurs, velociraptor', min: 13 , max: 14 }, {name: 'Emerald Enclave', min: 15 , max: 16 }, {name: 'Explorer, dead', min: 17 , max: 20 }, {name: 'Explorers', min: 21 , max: 21 }, {name: 'Flaming Fist', min: 22 , max: 23 }, {name: 'Giant wasps', min: 24 , max: 24 }, {name: 'Mantraps', min: 25 , max: 25 }, {name: 'Pterafolk', min: 26 , max: 26 }, {name: 'Rare plant(s)', min: 27 , max: 27 }, {name: 'Red Wizard', min: 28 , max: 28 }, {name: 'Snake, constrictor', min: 29 , max: 31 }, {name: 'Snake, giant constrictor', min: 32 , max: 32 }, {name: 'Snake, giant poisonous', min: 33 , max: 33 }, {name: 'Spiders', min: 34 , max: 36 }, {name: 'Statue of Ubtao', min: 37 , max: 40 }, {name: 'Stirges', min: 41 , max: 44 }, {name: 'Su-monsters', min: 45 , max: 45 }, {name: 'Swarms of bats', min: 46 , max: 46 }, {name: 'Swarms of insects', min: 47 , max: 49 }, {name: 'Tri-flower frond', min: 50 , max: 50 }, {name: 'Troll', min: 51 , max: 51 }, {name: 'Undead, ghouls', min: 52 , max: 63 }, {name: 'Undead, skeletons', min: 64 , max: 67 }, {name: 'Undead, specter', min: 68 , max: 70 }, {name: 'Undead, wight', min: 71 , max: 73 }, {name: 'Undead, zombies', min: 74 , max: 85 }, {name: 'Vegepygmies', min: 86 , max: 87 }, {name: 'Wereboar', min: 88 , max: 89 }, {name: 'Weretiger', min: 90 , max: 91 }, {name: 'Winterscape', min: 92 , max: 92 }, {name: 'Yellow musk creeper and zombies', min: 93 , max: 96 }, {name: 'Yuan-ti', min: 97 , max: 98 }, {name: 'Zorbos', min: 99 , max: 100 } ],
      difficulty: 15,
    },
    { id: 5,
      name: 'Mountains',
      encounter: [ {name: 'Aarakocra', min: 1 , max: 11 }, {name: 'Albino dwarves', min: 12 , max: 17 }, {name: 'Apes', min: 18 , max: 20 }, {name: 'Baboons', min: 21 , max: 22 }, {name: 'Cache', min: 23 , max: 25 }, {name: 'Chwinga', min: 26 , max: 27 }, {name: 'Cyclops', min: 28 , max: 29 }, {name: 'Dinosaurs, pteranodon', min: 30 , max: 38 }, {name: 'Dinosaurs, quetzalcoatlus', min: 39 , max: 42 }, {name: 'Dragon, red', min: 43 , max: 45 }, {name: 'Emerald Enclave', min: 46 , max: 47 }, {name: 'Explorer, dead', min: 48 , max: 50 }, {name: 'Explorers', min: 51 , max: 53 }, {name: 'Flying monkeys', min: 54 , max: 59 }, {name: 'Flying snakes', min: 60 , max: 61 }, {name: 'Giant boars', min: 62 , max: 62 }, {name: 'Giant lizards', min: 63 , max: 63 }, {name: 'Giant wasps', min: 64 , max: 65 }, {name: 'Girallons', min: 66 , max: 70 }, {name: 'Night hag', min: 71 , max: 73 }, {name: 'Pterafolk', min: 74 , max: 80 }, {name: 'Red Wizard', min: 81 , max: 81 }, {name: 'Snake, giant poisonous', min: 82 , max: 84 }, {name: 'Stirges', min: 85 , max: 87 }, {name: 'Swarms of bats', min: 88 , max: 90 }, {name: 'Tabaxi hunter', min: 91 , max: 92 }, {name: 'Troll', min: 93 , max: 97 }, {name: 'Wereboar', min: 98 , max: 100 }, ],
      difficulty: 15,
    },
    {
      id: 6,
      name:  'Rivers',
      encounter: [ {name: 'Aarakocra', min: 1 , max: 3 }, {name: 'Aldani', min: 4 , max: 7 }, {name: 'Artus Cimber', min: 8 , max: 9 }, {name: 'Assassin vines', min: 10 , max: 10 }, {name: 'Cache', min: 11 , max: 12 }, {name: 'Cannibals', min: 13 , max: 15 }, {name: 'Chwinga', min: 16 , max: 18 }, {name: 'Crocodiles', min: 19 , max: 23 }, {name: 'Dinosaurs, brontosaurus', min: 24 , max: 24 }, {name: 'Dinosaurs, dimetrodon', min: 25 , max: 26 }, {name: 'Dinosaurs, hadrosaurus', min: 27 , max: 28 }, {name: 'Dinosaurs, plesiosaurus', min: 29 , max: 31 }, {name: 'Dinosaurs, pteranodon', min: 32 , max: 34 }, {name: 'Dinosaurs, quetzalcoatlus', min: 35 , max: 36 }, {name: 'Dragon, faerie', min: 37 , max: 37 }, {name: 'Eblis', min: 38 , max: 40 }, {name: 'Emerald Enclave', min: 41 , max: 43 }, {name: 'Explorer, dead', min: 44 , max: 45 }, {name: 'Explorers', min: 46 , max: 49 }, {name: 'Flaming Fist', min: 50 , max: 51 }, {name: 'Flying monkeys', min: 52 , max: 53 }, {name: 'Flying snakes', min: 54 , max: 55 }, {name: 'Giant crocodile', min: 56 , max: 58 }, {name: 'Giant frogs', min: 59 , max: 60 }, {name: 'Giant snapping turtle', min: 61 , max: 62 }, {name: 'Giant wasps', min: 63 , max: 63 }, {name: 'Grungs', min: 64 , max: 66 }, {name: 'Jaculis', min: 67 , max: 67 }, {name: 'Lizardfolk', min: 68 , max: 68 }, {name: 'Mad monkey mist', min: 69 , max: 70 }, {name: 'Pterafolk', min: 71 , max: 72 }, {name: 'Rare plant(s)', min: 73 , max: 73 }, {name: 'Red Wizard', min: 74 , max: 74 }, {name: 'Sea hags', min: 75 , max: 76 }, {name: 'Snake, constrictor', min: 77 , max: 79 }, {name: 'Snake, giant constrictor', min: 80 , max: 80 }, {name: 'Statue of Ubtao', min: 81 , max: 81 }, {name: 'Stirges', min: 82 , max: 83 }, {name: 'Swarms of insects', min: 84 , max: 85 }, {name: 'Swarms of quippers', min: 86 , max: 91 }, {name: 'Tabaxi hunter', min: 92 , max: 93 }, {name: 'Undead, ghouls', min: 94 , max: 94 }, {name: 'Undead, skeletons', min: 95 , max: 95 }, {name: 'Undead, zombies', min: 96 , max: 96 }, {name: 'Yuan-ti', min: 97 , max: 98 }, {name: 'Zhentarim', min: 99 , max: 100 } ],
      difficulty: 10,
    },
    {
      id: 7,
      name: 'Ruins',
      encounter: [ {name: 'Albino dwarves', min: 1 , max: 2 }, {name: 'Almiraj', min: 3 , max: 3 }, {name: 'Apes', min: 4 , max: 6 }, {name: 'Artus Cimber', min: 7 , max: 8 }, {name: 'Assassin vines', min: 9 , max: 12 }, {name: 'Baboons', min: 13 , max: 14 }, {name: 'Cache', min: 15 , max: 18 }, {name: 'Chwinga', min: 19 , max: 19 }, {name: 'Cyclops', min: 20 , max: 21 }, {name: 'Dinosaurs, deinonychus', min: 22 , max: 22 }, {name: 'Dinosaurs, velociraptor', min: 23 , max: 23 }, {name: 'Emerald Enclave', min: 24 , max: 26 }, {name: 'Explorer, dead', min: 27 , max: 28 }, {name: 'Explorers', min: 29 , max: 31 }, {name: 'Flail snail', min: 32 , max: 33 }, {name: 'Flaming Fist', min: 34 , max: 36 }, {name: 'Flying monkeys', min: 37 , max: 38 }, {name: 'Flying snakes', min: 39 , max: 39 }, {name: 'Frost giants', min: 40 , max: 41 }, {name: 'Giant lizards', min: 42 , max: 42 }, {name: 'Giant scorpions', min: 43 , max: 45 }, {name: 'Giant wasps', min: 46 , max: 48 }, {name: 'Girallons', min: 49 , max: 50 }, {name: 'Goblins', min: 51 , max: 52 }, {name: 'Jaculis', min: 53 , max: 54 }, {name: 'Kamadans', min: 55 , max: 57 }, {name: 'Lizardfolk', min: 58 , max: 58 }, {name: 'Mad monkey mist', min: 59 , max: 60 }, {name: 'Night hag', min: 61 , max: 61 }, {name: 'Rare plant(s)', min: 62 , max: 62 }, {name: 'Red Wizard', min: 63 , max: 63 }, {name: 'Snake, giant poisonous', min: 64 , max: 66 }, {name: 'Spiders', min: 67 , max: 68 }, {name: 'Statue of Ubtao', min: 69 , max: 73 }, {name: 'Stirges', min: 74 , max: 75 }, {name: 'Swarms of bats', min: 76 , max: 77 }, {name: 'Tabaxi hunter', min: 78 , max: 78 }, {name: 'Tri-flower frond', min: 79 , max: 80 }, {name: 'Troll', min: 81 , max: 81 }, {name: 'Undead, ghouls', min: 82 , max: 84 }, {name: 'Undead, skeletons', min: 85 , max: 87 }, {name: 'Undead, specter', min: 88 , max: 89 }, {name: 'Undead, wight', min: 90 , max: 91 }, {name: 'Undead, zombies', min: 92 , max: 93 }, {name: 'Weretiger', min: 94 , max: 94 }, {name: 'Winterscape', min: 95 , max: 95 }, {name: 'Yellow musk creeper and zombies', min: 96 , max: 96 }, {name: 'Yuan-ti', min: 97 , max: 98 }, {name: 'Zhentarim', min: 99 , max: 100 } ],
      difficulty: 15,
    },
    {
      id: 8,
      name: 'Swamp',
      encounter: [ {name: 'Aldani', min: 1 , max: 10 }, {name: 'Artus Cimber', min: 11 , max: 11 }, {name: 'Assassin vines', min: 12 , max: 14 }, {name: 'Chwinga', min: 15 , max: 16 }, {name: 'Crocodiles', min: 17 , max: 21 }, {name: 'Dinosaurs, allosaurus', min: 22 , max: 22 }, {name: 'Dinosaurs, ankylosaurus', min: 23 , max: 23 }, {name: 'Dinosaurs, brontosaurus', min: 24 , max: 25 }, {name: 'Dinosaurs, dimetrodon', min: 26 , max: 30 }, {name: 'Dinosaurs, hadrosaurus', min: 31 , max: 33 }, {name: 'Dinosaurs, pteranodon', min: 34 , max: 35 }, {name: 'Eblis', min: 36 , max: 39 }, {name: 'Explorer, dead', min: 40 , max: 41 }, {name: 'Explorers', min: 42 , max: 45 }, {name: 'Flail snail', min: 46 , max: 47 }, {name: 'Flying snakes', min: 48 , max: 50 }, {name: 'Giant crocodile', min: 51 , max: 53 }, {name: 'Giant frogs', min: 54 , max: 56 }, {name: 'Giant lizards', min: 57 , max: 58 }, {name: 'Giant snapping turtle', min: 59 , max: 60 }, {name: 'Giant wasps', min: 61 , max: 62 }, {name: 'Grungs', min: 63 , max: 64 }, {name: 'Lizardfolk', min: 65 , max: 66 }, {name: 'Mad monkey mist', min: 67 , max: 69 }, {name: 'Mephits', min: 70 , max: 70 }, {name: 'Night hag', min: 71 , max: 71 }, {name: 'Rare plant(s)', min: 72 , max: 72 }, {name: 'Shambling mound', min: 73 , max: 76 }, {name: 'Snake, constrictor', min: 77 , max: 80 }, {name: 'Snake, giant constrictor', min: 81 , max: 82 }, {name: 'Statue of Ubtao', min: 83 , max: 85 }, {name: 'Stirges', min: 86 , max: 87 }, {name: 'Swarms of bats', min: 88 , max: 89 }, {name: 'Swarms of insects', min: 90 , max: 94 }, {name: 'Undead, ghouls', min: 95 , max: 95 }, {name: 'Undead, skeletons', min: 96 , max: 97 }, {name: 'Undead, zombies', min: 98 , max: 98 }, {name: 'Yellow musk creeper and zombies', min: 99 , max: 99 }, {name: 'Yuan-ti', min: 100 , max: 100 } ],
      difficulty: 15,
    },
    {
      id: 9,
      name: 'Wasteland',
      encounter: [ {name: 'Artus Cimber', min: 1 , max: 1 }, {name: 'Cache', min: 2 , max: 5 }, {name: 'Dragon, red', min: 6 , max: 9 }, {name: 'Explorer, dead', min: 10 , max: 18 }, {name: 'Explorers', min: 19 , max: 19 }, {name: 'Firenewts', min: 20 , max: 37 }, {name: 'Giant scorpions', min: 38 , max: 45 }, {name: 'Magmins', min: 46 , max: 54 }, {name: 'Mephits', min: 55 , max: 71 }, {name: 'Night hag', min: 72 , max: 78 }, {name: 'Statue of Ubtao', min: 79 , max: 79 }, {name: 'Troll', min: 80 , max: 83 }, {name: 'Undead, ghouls', min: 84 , max: 85 }, {name: 'Undead, skeletons', min: 86 , max: 95 }, {name: 'Undead, wight', min: 96 , max: 97 }, {name: 'Undead, zombies', min: 98 , max: 98 }, {name: 'Zhentarim', min: 99 , max: 100 } ],
      difficulty: 15,
    }];

  rain = 'Light';

  constructor(db: AngularFirestore) {}

  rollDX(x: number) {
    return Math.floor(Math.random() * x) + 1;
  }

  rollYDX(y: number, x: number) {
    let sum = 0;
    for (let i = 0; i < y; i++) {
      sum += this.rollDX(x);
    }
    return sum;
  }

  currentTerrain() {
    return _.find(this.terrains, t => t.name === this.terrain);
  }

  lookupEncounter() {
    const roll = this.rollDX(100);
    const enc = _.find(this.currentTerrain().encounter, encounter => roll >= encounter.min && roll <= encounter.max);
    return enc.name;
  }

  rollForEncounter(timeframe: string) {
    if (this.rollDX(20) >= 18) {
      this.alerts.push(`Encounter at ${timeframe}: ${this.lookupEncounter()}`);
    }
  }

  moveDirection(direction: number) {
    switch (direction) {
      case 1: // North
        this.position.y -= 2;
        return;
      case 2: // North-east
        this.position.y -= 1;
        this.position.x += 1;
        return;
      case 3: // South-east
        this.position.y += 1;
        this.position.x += 1;
        return;
      case 4: // South
        this.position.y += 2;
        return;
      case 5: // South-west
        this.position.y += 1;
        this.position.x -= 1;
        return;
      case 6:
        this.position.y -= 1;
        this.position.x -= 1;
    }
  }

  changePace(pace: string) {
    this.pace = pace;
  }

  endDay(desiredDirection: number) {
    this.alerts = [];
    // Encounters
    this.rollForEncounter('Morning');
    this.rollForEncounter('Afternoon');
    this.rollForEncounter('Evening');
    // Rain
    if (this.rollDX(4) === 4) {
      this.rain = 'Heavy';
      this.water += this.raincatchers;
    } else {
      this.rain = 'Light';
    }
    // Insects
    this.ointment -= this.partyMembers;
    if (this.ointment < 0) {
      this.alerts.push(`${this.ointment * -1} player(s) have no insect repellant!`);
      this.ointment = 0;
    }
    // Water
    this.water -= (this.partyMembers * 2);
    if (this.water < 0) {
      this.alerts.push(`${Math.round(this.water * -1 / 2)} player(s) have not enough water!`);
      this.water = 0;
    }
    // Food
    this.food -= this.partyMembers;
    if (this.food < 0) {
      this.alerts.push(`${this.food * -1} player(s) have not enough food!`);
      this.food = 0;
    }
    // Survival
    const roll = this.rollDX(20) + this.survival;
    let DC = this.currentTerrain().difficulty;
    if (this.pace === 'slow') { DC -= 5; }
    if (this.pace === 'fast') { DC += 5; }

    let direction = desiredDirection;
    if (roll < DC) {
      // Lost
      direction = this.rollDX(6);
      this.alerts.push(`Navigation failed and the players are lost! They moved ${direction}`);
    }
    // Movement
    let movement = 1;
    if (this.pace === 'fast' && this.rollDX(4) >= 3) {
      movement++;
    } else if (this.pace === 'slow' && this.rollDX(4) <= 2) {
      movement--;
    }
    if (this.canoe) {
      movement++;
    }
    // TODO move on grid
    this.moveDirection(direction);
  }


}

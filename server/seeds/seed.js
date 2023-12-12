const db = require("../config/connection")
const { Booster, CardIndex, Summon, Summoner, Trap, Spell } = require("../models")

// All data is setup via external google doc sheet and when that is modified, can quickly be updated here.

const summonData = [
  {cardId: '00001', name: 'Ahenerax Icewolf', tribe: 'Elf', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '10000101'},
  {cardId: '00002', name: 'Anneh Greatboar', tribe: 'Elf', level: '1', attack: '1', defense: '4', abiltyId: '00000', ability: 'None', direction: '01001001'},
  {cardId: '00003', name: 'Ifilis Lashmastet', tribe: 'Elf', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '00101100'},
  {cardId: '00004', name: 'Ilocar Spinetracer', tribe: 'Elf', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '11010000'},
  {cardId: '00005', name: 'Leray Ironcurser', tribe: 'Elf', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '01100010'},
  {cardId: '00006', name: 'Loyefeid Bravecurser', tribe: 'Elf', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '00010110'},
  {cardId: '00007', name: 'Rikalena Strongtear', tribe: 'Elf', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '10100100'},
  {cardId: '00008', name: 'Senva Nightlash', tribe: 'Elf', level: '1', attack: '4', defense: '1', abiltyId: '00000', ability: 'None', direction: '00010011'},
  {cardId: '00009', name: 'Zerafter Bleakdream', tribe: 'Elf', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '01000101'},
  {cardId: '00010', name: 'Zololac Warriorwarper', tribe: 'Elf', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '10001001'},
  {cardId: '00011', name: 'Sidwell Klein', tribe: 'Human', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '01110000'},
  {cardId: '00012', name: 'Broderick Jameson', tribe: 'Human', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '10001010'},
  {cardId: '00013', name: 'Mattie Ambris', tribe: 'Human', level: '1', attack: '1', defense: '4', abiltyId: '00000', ability: 'None', direction: '00101001'},
  {cardId: '00014', name: 'Kaylyn Embros', tribe: 'Human', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '01010100'},
  {cardId: '00015', name: 'Gunter Jerick', tribe: 'Human', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '00101010'},
  {cardId: '00016', name: 'Hernando Ramez', tribe: 'Human', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '10010100'},
  {cardId: '00017', name: 'Bilk Smiggins', tribe: 'Human', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '10100010'},
  {cardId: '00018', name: 'Heala Blockins', tribe: 'Human', level: '1', attack: '4', defense: '1', abiltyId: '00000', ability: 'None', direction: '00011100'},
  {cardId: '00019', name: 'Palan Decker', tribe: 'Human', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '01000011'},
  {cardId: '00020', name: 'Samwise Colins', tribe: 'Human', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '10101000'},
  {cardId: '00021', name: 'Tarl Stoenroc', tribe: 'Dwarf', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '01010010'},
  {cardId: '00022', name: 'Gust Boarjaw', tribe: 'Dwarf', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '10001100'},
  {cardId: '00023', name: 'Edgin Mienhorn', tribe: 'Dwarf', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '00010011'},
  {cardId: '00024', name: 'Gimle Mudslide', tribe: 'Dwarf', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '01100100'},
  {cardId: '00025', name: 'Daarly Undercrag', tribe: 'Dwarf', level: '1', attack: '1', defense: '4', abiltyId: '00000', ability: 'None', direction: '10011000'},
  {cardId: '00026', name: 'Bash Grumblegard', tribe: 'Dwarf', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '00100110'},
  {cardId: '00027', name: 'Duun Kegsmasher', tribe: 'Dwarf', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '11010000'},
  {cardId: '00028', name: 'Thogrim Holdkeep', tribe: 'Dwarf', level: '1', attack: '4', defense: '1', abiltyId: '00000', ability: 'None', direction: '00101001'},
  {cardId: '00029', name: 'Arto Moleskin', tribe: 'Dwarf', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '01001010'},
  {cardId: '00030', name: 'Emrick Cavehold', tribe: 'Dwarf', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '10010001'},
  {cardId: '00031', name: 'Lylrot', tribe: 'Monster', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '01000101'},
  {cardId: '00032', name: 'Flumgrum', tribe: 'Monster', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '10110000'},
  {cardId: '00033', name: 'Dirgj', tribe: 'Monster', level: '1', attack: '1', defense: '4', abiltyId: '00000', ability: 'None', direction: '00000111'},
  {cardId: '00034', name: 'Bulgus', tribe: 'Monster', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '01101000'},
  {cardId: '00035', name: 'Mudlud', tribe: 'Monster', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '10010010'},
  {cardId: '00036', name: 'Tutbad', tribe: 'Monster', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '01100100'},
  {cardId: '00037', name: 'Bogrim', tribe: 'Monster', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '00100101'},
  {cardId: '00038', name: 'Gult', tribe: 'Monster', level: '1', attack: '4', defense: '1', abiltyId: '00000', ability: 'None', direction: '10001001'},
  {cardId: '00039', name: 'Narg', tribe: 'Monster', level: '1', attack: '2', defense: '3', abiltyId: '00000', ability: 'None', direction: '11100000'},
  {cardId: '00040', name: 'Jrot', tribe: 'Monster', level: '1', attack: '3', defense: '2', abiltyId: '00000', ability: 'None', direction: '00101100'},
  {cardId: '00041', name: 'Viggo', tribe: 'Merc', level: '2', attack: '4', defense: '4', abiltyId: '00000', ability: 'None', direction: '10101010'},
  {cardId: '00042', name: 'Bjorn', tribe: 'Merc', level: '2', attack: '3', defense: '5', abiltyId: '00000', ability: 'None', direction: '01110010'},
  {cardId: '00043', name: 'Astrid', tribe: 'Merc', level: '2', attack: '5', defense: '3', abiltyId: '00000', ability: 'None', direction: '11000101'},
  {cardId: '00044', name: 'Raynor', tribe: 'Merc', level: '2', attack: '4', defense: '4', abiltyId: '00000', ability: 'None', direction: '01100110'},
  {cardId: '00045', name: 'Triggs', tribe: 'Merc', level: '2', attack: '2', defense: '6', abiltyId: '00000', ability: 'None', direction: '00101011'},
  {cardId: '00046', name: 'Lothar', tribe: 'Merc', level: '2', attack: '5', defense: '3', abiltyId: '00000', ability: 'None', direction: '00011101'},
  {cardId: '00047', name: 'Agata', tribe: 'Merc', level: '2', attack: '6', defense: '2', abiltyId: '00000', ability: 'None', direction: '11100010'},
  {cardId: '00048', name: 'Vasmund', tribe: 'Merc', level: '2', attack: '4', defense: '4', abiltyId: '00000', ability: 'None', direction: '01011100'},
  {cardId: '00049', name: 'Haldan', tribe: 'Merc', level: '2', attack: '2', defense: '6', abiltyId: '00000', ability: 'None', direction: '10101010'},
  {cardId: '00050', name: 'Fjordn', tribe: 'Merc', level: '2', attack: '5', defense: '3', abiltyId: '00000', ability: 'None', direction: '01010101'},
  {cardId: '00051', name: 'Aerode Verdant', tribe: 'Elf', level: '2', attack: '3', defense: '4', abiltyId: '00000', ability: 'None', direction: '10101010'},
  {cardId: '00052', name: 'Tanyth Glumglade', tribe: 'Elf', level: '2', attack: '2', defense: '5', abiltyId: '00000', ability: 'None', direction: '01110010'},
  {cardId: '00053', name: 'Marikoth Verdant', tribe: 'Elf', level: '2', attack: '5', defense: '2', abiltyId: '00000', ability: 'None', direction: '11000101'},
  {cardId: '00054', name: 'Jearda Willowish', tribe: 'Elf', level: '2', attack: '4', defense: '3', abiltyId: '00000', ability: 'None', direction: '01100110'},
  {cardId: '00055', name: 'Bellas Glenspell', tribe: 'Elf', level: '2', attack: '1', defense: '6', abiltyId: '00000', ability: 'None', direction: '00101011'},
  {cardId: '00056', name: 'Fabian Mont', tribe: 'Human', level: '2', attack: '3', defense: '4', abiltyId: '00000', ability: 'None', direction: '00011101'},
  {cardId: '00057', name: 'Jesef Halk', tribe: 'Human', level: '2', attack: '4', defense: '3', abiltyId: '00000', ability: 'None', direction: '11100010'},
  {cardId: '00058', name: 'Brandt Killian', tribe: 'Human', level: '2', attack: '5', defense: '2', abiltyId: '00000', ability: 'None', direction: '01011100'},
  {cardId: '00059', name: 'Hadrian Fleck', tribe: 'Human', level: '2', attack: '2', defense: '5', abiltyId: '00000', ability: 'None', direction: '10101010'},
  {cardId: '00060', name: 'Aila Swiftspear', tribe: 'Human', level: '2', attack: '6', defense: '1', abiltyId: '00000', ability: 'None', direction: '01010101'},
  {cardId: '00061', name: 'Ramrin Oathrune', tribe: 'Dwarf', level: '2', attack: '3', defense: '4', abiltyId: '00000', ability: 'None', direction: '11101000'},
  {cardId: '00062', name: 'Brond Spearbreaker', tribe: 'Dwarf', level: '2', attack: '4', defense: '3', abiltyId: '00000', ability: 'None', direction: '00011110'},
  {cardId: '00063', name: 'Saana Lightlime', tribe: 'Dwarf', level: '2', attack: '5', defense: '2', abiltyId: '00000', ability: 'None', direction: '00100111'},
  {cardId: '00064', name: 'Dortan Bronzebiter', tribe: 'Dwarf', level: '2', attack: '2', defense: '5', abiltyId: '00000', ability: 'None', direction: '10101100'},
  {cardId: '00065', name: 'Led Reachforge', tribe: 'Dwarf', level: '2', attack: '1', defense: '6', abiltyId: '00000', ability: 'None', direction: '01111000'},
  {cardId: '00066', name: 'Teaf', tribe: 'Monster', level: '2', attack: '3', defense: '4', abiltyId: '00000', ability: 'None', direction: '01000111'},
  {cardId: '00067', name: 'Slagus', tribe: 'Monster', level: '2', attack: '4', defense: '3', abiltyId: '00000', ability: 'None', direction: '10011001'},
  {cardId: '00068', name: 'Zeog', tribe: 'Monster', level: '2', attack: '5', defense: '2', abiltyId: '00000', ability: 'None', direction: '01110100'},
  {cardId: '00069', name: 'Sklum', tribe: 'Monster', level: '2', attack: '2', defense: '5', abiltyId: '00000', ability: 'None', direction: '11001010'},
  {cardId: '00070', name: 'Gargorl', tribe: 'Monster', level: '2', attack: '6', defense: '1', abiltyId: '00000', ability: 'None', direction: '01101001'},
  {cardId: '00071', name: 'Belgrit', tribe: 'Merc', level: '3', attack: '5', defense: '5', abiltyId: '00000', ability: 'None', direction: '10110101'},
  {cardId: '00072', name: 'Alrick', tribe: 'Merc', level: '3', attack: '4', defense: '6', abiltyId: '00000', ability: 'None', direction: '11101100'},
  {cardId: '00073', name: 'Valdemar', tribe: 'Merc', level: '3', attack: '6', defense: '4', abiltyId: '00000', ability: 'None', direction: '01011110'},
  {cardId: '00074', name: 'Alef', tribe: 'Merc', level: '3', attack: '3', defense: '7', abiltyId: '00000', ability: 'None', direction: '10110101'},
  {cardId: '00075', name: 'Kessa', tribe: 'Merc', level: '3', attack: '7', defense: '3', abiltyId: '00000', ability: 'None', direction: '11101100'},
  {cardId: '00076', name: 'Helemir Leafsfall', tribe: 'Elf', level: '3', attack: '3', defense: '6', abiltyId: '00000', ability: 'None', direction: '10110101'},
  {cardId: '00077', name: 'Abarath Quiteblade', tribe: 'Elf', level: '3', attack: '4', defense: '5', abiltyId: '00000', ability: 'None', direction: '11101100'},
  {cardId: '00078', name: 'Sylas Brooks', tribe: 'Elf', level: '3', attack: '5', defense: '4', abiltyId: '00000', ability: 'None', direction: '01011110'},
  {cardId: '00079', name: 'Olander Hayward', tribe: 'Human', level: '3', attack: '5', defense: '4', abiltyId: '00000', ability: 'None', direction: '10111001'},
  {cardId: '00080', name: 'Sylva Turner', tribe: 'Human', level: '3', attack: '4', defense: '5', abiltyId: '00000', ability: 'None', direction: '11101100'},
  {cardId: '00081', name: 'Flyn Hall', tribe: 'Human', level: '3', attack: '6', defense: '3', abiltyId: '00000', ability: 'None', direction: '00111110'},
  {cardId: '00082', name: 'Old Ironbeard', tribe: 'Dwarf', level: '3', attack: '4', defense: '5', abiltyId: '00000', ability: 'None', direction: '11001110'},
  {cardId: '00083', name: 'Burlo Sharoguard', tribe: 'Dwarf', level: '3', attack: '5', defense: '4', abiltyId: '00000', ability: 'None', direction: '01100111'},
  {cardId: '00084', name: 'Tam Armorborn', tribe: 'Dwarf', level: '3', attack: '2', defense: '7', abiltyId: '00000', ability: 'None', direction: '11011001'},
  {cardId: '00085', name: 'Thruglud', tribe: 'Monster', level: '3', attack: '7', defense: '2', abiltyId: '00000', ability: 'None', direction: '11110100'},
  {cardId: '00086', name: 'Orgo', tribe: 'Monster', level: '3', attack: '4', defense: '5', abiltyId: '00000', ability: 'None', direction: '00111110'},
  {cardId: '00087', name: 'Snogog', tribe: 'Monster', level: '3', attack: '5', defense: '4', abiltyId: '00000', ability: 'None', direction: '11011001'},
  {cardId: '00088', name: 'Anders Hammerfist', tribe: 'Merc', level: '4', attack: '6', defense: '6', abiltyId: '00000', ability: 'None', direction: '10111011'},
  {cardId: '00089', name: 'Freya Fireblood', tribe: 'Merc', level: '4', attack: '9', defense: '3', abiltyId: '00000', ability: 'None', direction: '01111101'},
  {cardId: '00090', name: 'Aerlyn Galadra', tribe: 'Elf', level: '4', attack: '2', defense: '9', abiltyId: '00000', ability: 'None', direction: '10111011'},
  {cardId: '00091', name: 'Oburn Borealis ', tribe: 'Elf', level: '4', attack: '5', defense: '6', abiltyId: '00000', ability: 'None', direction: '01111101'},
  {cardId: '00092', name: 'Tor Dubois', tribe: 'Human', level: '4', attack: '6', defense: '5', abiltyId: '00000', ability: 'None', direction: '10101111'},
  {cardId: '00093', name: 'Orion Burgart', tribe: 'Human', level: '4', attack: '8', defense: '3', abiltyId: '00000', ability: 'None', direction: '01111110'},
  {cardId: '00094', name: 'Grol Rumbletooth', tribe: 'Dwarf', level: '4', attack: '5', defense: '6', abiltyId: '00000', ability: 'None', direction: '10011111'},
  {cardId: '00095', name: 'Balgria Hammerchin', tribe: 'Dwarf', level: '4', attack: '2', defense: '9', abiltyId: '00000', ability: 'None', direction: '11111001'},
  {cardId: '00096', name: 'Umbrug', tribe: 'Monster', level: '4', attack: '9', defense: '2', abiltyId: '00000', ability: 'None', direction: '11111100'},
  {cardId: '00097', name: 'Waaga', tribe: 'Monster', level: '4', attack: '6', defense: '5', abiltyId: '00000', ability: 'None', direction: '01011111'},
  {cardId: '00098', name: 'Archfae Lyriandra', tribe: 'Elf', level: '5', attack: '4', defense: '9', abiltyId: '00000', ability: 'None', direction: '11111101'},
  {cardId: '00099', name: 'Valvorick the Sword', tribe: 'Human', level: '5', attack: '9', defense: '4', abiltyId: '00000', ability: 'None', direction: '11110111'},
  {cardId: '00100', name: 'Borjak HillKing', tribe: 'Dwarf', level: '5', attack: '5', defense: '8', abiltyId: '00000', ability: 'None', direction: '11101111'},
  {cardId: '00101', name: 'Zothask the Hunger', tribe: 'Monster', level: '5', attack: '9', defense: '4', abiltyId: '00000', ability: 'None', direction: '10111111'},
  {cardId: '00102', name: 'Orm Runsespear', tribe: 'Merc', level: '5', attack: '7', defense: '7', abiltyId: '00000', ability: 'None', direction: '11111011'}
]

const trapData = [
  {cardId: '00151', name: 'Snaring Vines', tribe: 'Elf', effectId: '03001', effect: 'Moves activating creature to the space trap was on and prevents it from attacking.'},
  {cardId: '00152', name: 'Fools Luck', tribe: 'Human', effectId: '03002', effect: 'Reverse board control with your opponent. (Any tiles that are yours are now theirs and vice versa)'},
  {cardId: '00153', name: 'Dwarvish Land Mine', tribe: 'Dwarf', effectId: '03003', effect: 'Destroy all creatures touching this space in all 8 directions.'},
  {cardId: '00154', name: 'Ambush', tribe: 'Monster', effectId: '03004', effect: 'Trap owner claims all spaces in line with activating creature and destroys all creatures on spaces claimed.'},
  {cardId: '00155', name: 'Toxic Fumes', tribe: 'Any', effectId: '03005', effect: 'If activating creature is killed in combat, summoner loses twice as much life.'},
  {cardId: '00156', name: 'Land Reclaim', tribe: 'Any', effectId: '03006', effect: 'At end of turn all spaces on the board are reset to neutral ownership except those occupied.'},
  {cardId: '00157', name: 'Mana Sap', tribe: 'Any', effectId: '03007', effect: 'Activating summoner loses all mana.'},
  {cardId: '00158', name: 'Espionage', tribe: 'Any', effectId: '03008', effect: 'Activating summoner must randomly show a facedown spell if one is available.'},
  {cardId: '00159', name: 'Life Tap', tribe: 'Any', effectId: '03009', effect: 'Activating summoner loses 2 life.'},
  {cardId: '00160', name: 'Mana Stone', tribe: 'Any', effectId: '03010', effect: 'Activating summoner gains 5 mana.'},
  {cardId: '00161', name: 'Strength Ritual', tribe: 'Any', effectId: '03011', effect: 'Activating creature is moved to trap location and attacks from there with double attack.'},
  {cardId: '00162', name: 'Barrier Ritual', tribe: 'Any', effectId: '03012', effect: 'Activating creature is moved to trap location and attacks from there with double life.'},
  {cardId: '00163', name: 'Scroll in a Bottle', tribe: 'Any', effectId: '03013', effect: 'Activating summoner is allowed to cast one spell this turn if they have not already for 0 mana.'}
]

const summonerData = [
  {cardId: '00176', name: 'Axirubad Eyecutter', tribe: 'Elf', health: '22', passiveId: '01001', passive: 'Elves recieve +1 Defense', activationId: '02001', activation: 'All your creatures on the board attack as if they were just played. Lose 3 life.'},
  {cardId: '00177', name: 'Ashera Quitumal', tribe: 'Elf', health: '18', passiveId: '01002', passive: 'Everytime you draw a card, recieve one mana.', activationId: '02002', activation: 'Receive 2 life for every creature in play. Lose all your mana.'},
  {cardId: '00178', name: 'Jackson Stang', tribe: 'Human', health: '18', passiveId: '01003', passive: 'For every human soul gain, recieve one mana.', activationId: '02003', activation: 'Discard all cards in your hand. Draw 5 cards.'},
  {cardId: '00179', name: 'Lillit Greycape', tribe: 'Human', health: '21', passiveId: '01004', passive: 'Spells your opponent casts, cost 1 additional mana.', activationId: '02004', activation: 'Opponent discards two cards from their hand at random'},
  {cardId: '00180', name: 'Goztrah Dlanor', tribe: 'Dwarf', health: '22', passiveId: '01005', passive: 'Reveal traps 2 turns after being placed.', activationId: '02005', activation: 'Remove all traps from the board.'},
  {cardId: '00181', name: 'Amethys Graniteheart', tribe: 'Dwarf', health: '20', passiveId: '01006', passive: 'Gain 1 soul for activating a trap.', activationId: '02006', activation: 'Immediately place an additional trap card down.'},
  {cardId: '00182', name: 'Uzth', tribe: 'Monster', health: '18', passiveId: '01007', passive: 'Monsters recieve +1 Attack.', activationId: '02007', activation: 'Immediately place an additional summon card down.'},
  {cardId: '00183', name: 'Thazgol', tribe: 'Monster', health: '17', passiveId: '01008', passive: 'Monster kills do 1 additional damage to opponent.', activationId: '02008', activation: 'Swap souls with your opponent'}
]

const spellData = [
  {cardId: '00200', name: 'Shock', tribe: 'Any', mana: '5', abilityId: '00001', ability: 'Deal 3 damage to target summon.'},
  {cardId: '00201', name: 'Fireball', tribe: 'Any', mana: '12', abilityId: '00002', ability: 'Deal 3 damage to target summoner.'},
  {cardId: '00202', name: 'Forked Lightning', tribe: 'Any', mana: '16', abilityId: '00003', ability: 'Deal 3 damage to target, and 3 damage to that targets summoner.'},
  {cardId: '00203', name: 'Enlightenment', tribe: 'Any', mana: '10', abilityId: '00004', ability: 'Draw 2 cards and discard 1 of them.'},
  {cardId: '00204', name: 'Buried Treasure', tribe: 'Any', mana: '15', abilityId: '00005', ability: 'Draw a card.'},
  {cardId: '00205', name: 'Mana Drain', tribe: 'Any', mana: '20', abilityId: '00006', ability: 'Opponent loses 10 mana, you gain 5 mana.'},
  {cardId: '00206', name: 'Flaming Weapon', tribe: 'Any', mana: '10', abilityId: '00007', ability: 'Any creature played this turn recieves +1 attack until your next turn.'},
  {cardId: '00207', name: 'Ice Armor', tribe: 'Any', mana: '10', abilityId: '00008', ability: 'Target creature gets +1 defense until your next turn.'},
  {cardId: '00208', name: 'Dark Pact', tribe: 'Elf', mana: '12', abilityId: '00009', ability: 'Select one of your creatures in play and sacrifice it. You gain no souls for this creature, however you gain life equal to its defense.'},
  {cardId: '00209', name: 'Sneak Peak', tribe: 'Human', mana: '8', abilityId: '00010', ability: 'Randomly reveal one opponent spell card.'},
  {cardId: '00210', name: 'Trap Detection', tribe: 'Dwarf', mana: '8', abilityId: '00011', ability: 'Flip target trap on the board face up. It remains in play as normal but is now revealed.'},
  {cardId: '00211', name: 'Natural Reflex', tribe: 'Monster', mana: '10', abilityId: '00012', ability: 'Target creature gains first attack until next turn.'}
]

const cardIndexData = [
  {cardId: '00001', cardType: 'Summon'},
  {cardId: '00002', cardType: 'Summon'},
  {cardId: '00003', cardType: 'Summon'},
  {cardId: '00004', cardType: 'Summon'},
  {cardId: '00005', cardType: 'Summon'},
  {cardId: '00006', cardType: 'Summon'},
  {cardId: '00007', cardType: 'Summon'},
  {cardId: '00008', cardType: 'Summon'},
  {cardId: '00009', cardType: 'Summon'},
  {cardId: '00010', cardType: 'Summon'},
  {cardId: '00011', cardType: 'Summon'},
  {cardId: '00012', cardType: 'Summon'},
  {cardId: '00013', cardType: 'Summon'},
  {cardId: '00014', cardType: 'Summon'},
  {cardId: '00015', cardType: 'Summon'},
  {cardId: '00016', cardType: 'Summon'},
  {cardId: '00017', cardType: 'Summon'},
  {cardId: '00018', cardType: 'Summon'},
  {cardId: '00019', cardType: 'Summon'},
  {cardId: '00020', cardType: 'Summon'},
  {cardId: '00021', cardType: 'Summon'},
  {cardId: '00022', cardType: 'Summon'},
  {cardId: '00023', cardType: 'Summon'},
  {cardId: '00024', cardType: 'Summon'},
  {cardId: '00025', cardType: 'Summon'},
  {cardId: '00026', cardType: 'Summon'},
  {cardId: '00027', cardType: 'Summon'},
  {cardId: '00028', cardType: 'Summon'},
  {cardId: '00029', cardType: 'Summon'},
  {cardId: '00030', cardType: 'Summon'},
  {cardId: '00031', cardType: 'Summon'},
  {cardId: '00032', cardType: 'Summon'},
  {cardId: '00033', cardType: 'Summon'},
  {cardId: '00034', cardType: 'Summon'},
  {cardId: '00035', cardType: 'Summon'},
  {cardId: '00036', cardType: 'Summon'},
  {cardId: '00037', cardType: 'Summon'},
  {cardId: '00038', cardType: 'Summon'},
  {cardId: '00039', cardType: 'Summon'},
  {cardId: '00040', cardType: 'Summon'},
  {cardId: '00041', cardType: 'Summon'},
  {cardId: '00042', cardType: 'Summon'},
  {cardId: '00043', cardType: 'Summon'},
  {cardId: '00044', cardType: 'Summon'},
  {cardId: '00045', cardType: 'Summon'},
  {cardId: '00046', cardType: 'Summon'},
  {cardId: '00047', cardType: 'Summon'},
  {cardId: '00048', cardType: 'Summon'},
  {cardId: '00049', cardType: 'Summon'},
  {cardId: '00050', cardType: 'Summon'},
  {cardId: '00051', cardType: 'Summon'},
  {cardId: '00052', cardType: 'Summon'},
  {cardId: '00053', cardType: 'Summon'},
  {cardId: '00054', cardType: 'Summon'},
  {cardId: '00055', cardType: 'Summon'},
  {cardId: '00056', cardType: 'Summon'},
  {cardId: '00057', cardType: 'Summon'},
  {cardId: '00058', cardType: 'Summon'},
  {cardId: '00059', cardType: 'Summon'},
  {cardId: '00060', cardType: 'Summon'},
  {cardId: '00061', cardType: 'Summon'},
  {cardId: '00062', cardType: 'Summon'},
  {cardId: '00063', cardType: 'Summon'},
  {cardId: '00064', cardType: 'Summon'},
  {cardId: '00065', cardType: 'Summon'},
  {cardId: '00066', cardType: 'Summon'},
  {cardId: '00067', cardType: 'Summon'},
  {cardId: '00068', cardType: 'Summon'},
  {cardId: '00069', cardType: 'Summon'},
  {cardId: '00070', cardType: 'Summon'},
  {cardId: '00071', cardType: 'Summon'},
  {cardId: '00072', cardType: 'Summon'},
  {cardId: '00073', cardType: 'Summon'},
  {cardId: '00074', cardType: 'Summon'},
  {cardId: '00075', cardType: 'Summon'},
  {cardId: '00076', cardType: 'Summon'},
  {cardId: '00077', cardType: 'Summon'},
  {cardId: '00078', cardType: 'Summon'},
  {cardId: '00079', cardType: 'Summon'},
  {cardId: '00080', cardType: 'Summon'},
  {cardId: '00081', cardType: 'Summon'},
  {cardId: '00082', cardType: 'Summon'},
  {cardId: '00083', cardType: 'Summon'},
  {cardId: '00084', cardType: 'Summon'},
  {cardId: '00085', cardType: 'Summon'},
  {cardId: '00086', cardType: 'Summon'},
  {cardId: '00087', cardType: 'Summon'},
  {cardId: '00088', cardType: 'Summon'},
  {cardId: '00089', cardType: 'Summon'},
  {cardId: '00090', cardType: 'Summon'},
  {cardId: '00091', cardType: 'Summon'},
  {cardId: '00092', cardType: 'Summon'},
  {cardId: '00093', cardType: 'Summon'},
  {cardId: '00094', cardType: 'Summon'},
  {cardId: '00095', cardType: 'Summon'},
  {cardId: '00096', cardType: 'Summon'},
  {cardId: '00097', cardType: 'Summon'},
  {cardId: '00098', cardType: 'Summon'},
  {cardId: '00099', cardType: 'Summon'},
  {cardId: '00100', cardType: 'Summon'},
  {cardId: '00101', cardType: 'Summon'},
  {cardId: '00102', cardType: 'Summon'},
  {cardId: '00103', cardType: 'Summon'},
  {cardId: '00104', cardType: 'Summon'},
  {cardId: '00105', cardType: 'Summon'},
  {cardId: '00106', cardType: 'Summon'},
  {cardId: '00107', cardType: 'Summon'},
  {cardId: '00108', cardType: 'Summon'},
  {cardId: '00109', cardType: 'Summon'},
  {cardId: '00110', cardType: 'Summon'},
  {cardId: '00111', cardType: 'Summon'},
  {cardId: '00112', cardType: 'Summon'},
  {cardId: '00113', cardType: 'Summon'},
  {cardId: '00114', cardType: 'Summon'},
  {cardId: '00115', cardType: 'Summon'},
  {cardId: '00116', cardType: 'Summon'},
  {cardId: '00117', cardType: 'Summon'},
  {cardId: '00118', cardType: 'Summon'},
  {cardId: '00119', cardType: 'Summon'},
  {cardId: '00120', cardType: 'Summon'},
  {cardId: '00121', cardType: 'Summon'},
  {cardId: '00122', cardType: 'Summon'},
  {cardId: '00123', cardType: 'Summon'},
  {cardId: '00124', cardType: 'Summon'},
  {cardId: '00125', cardType: 'Summon'},
  {cardId: '00126', cardType: 'Summon'},
  {cardId: '00127', cardType: 'Summon'},
  {cardId: '00128', cardType: 'Summon'},
  {cardId: '00129', cardType: 'Summon'},
  {cardId: '00130', cardType: 'Summon'},
  {cardId: '00131', cardType: 'Summon'},
  {cardId: '00132', cardType: 'Summon'},
  {cardId: '00133', cardType: 'Summon'},
  {cardId: '00134', cardType: 'Summon'},
  {cardId: '00135', cardType: 'Summon'},
  {cardId: '00136', cardType: 'Summon'},
  {cardId: '00137', cardType: 'Summon'},
  {cardId: '00138', cardType: 'Summon'},
  {cardId: '00139', cardType: 'Summon'},
  {cardId: '00140', cardType: 'Summon'},
  {cardId: '00141', cardType: 'Summon'},
  {cardId: '00142', cardType: 'Summon'},
  {cardId: '00143', cardType: 'Summon'},
  {cardId: '00144', cardType: 'Summon'},
  {cardId: '00145', cardType: 'Summon'},
  {cardId: '00146', cardType: 'Summon'},
  {cardId: '00147', cardType: 'Summon'},
  {cardId: '00148', cardType: 'Summon'},
  {cardId: '00149', cardType: 'Summon'},
  {cardId: '00150', cardType: 'Summon'},
  {cardId: '00151', cardType: 'Trap'},
  {cardId: '00152', cardType: 'Trap'},
  {cardId: '00153', cardType: 'Trap'},
  {cardId: '00154', cardType: 'Trap'},
  {cardId: '00155', cardType: 'Trap'},
  {cardId: '00156', cardType: 'Trap'},
  {cardId: '00157', cardType: 'Trap'},
  {cardId: '00158', cardType: 'Trap'},
  {cardId: '00159', cardType: 'Trap'},
  {cardId: '00160', cardType: 'Trap'},
  {cardId: '00161', cardType: 'Trap'},
  {cardId: '00162', cardType: 'Trap'},
  {cardId: '00163', cardType: 'Trap'},
  {cardId: '00164', cardType: 'Trap'},
  {cardId: '00165', cardType: 'Trap'},
  {cardId: '00166', cardType: 'Trap'},
  {cardId: '00167', cardType: 'Trap'},
  {cardId: '00168', cardType: 'Trap'},
  {cardId: '00169', cardType: 'Trap'},
  {cardId: '00170', cardType: 'Trap'},
  {cardId: '00171', cardType: 'Trap'},
  {cardId: '00172', cardType: 'Trap'},
  {cardId: '00173', cardType: 'Trap'},
  {cardId: '00174', cardType: 'Trap'},
  {cardId: '00175', cardType: 'Trap'},
  {cardId: '00176', cardType: 'Summoner'},
  {cardId: '00177', cardType: 'Summoner'},
  {cardId: '00178', cardType: 'Summoner'},
  {cardId: '00179', cardType: 'Summoner'},
  {cardId: '00180', cardType: 'Summoner'},
  {cardId: '00181', cardType: 'Summoner'},
  {cardId: '00182', cardType: 'Summoner'},
  {cardId: '00183', cardType: 'Summoner'},
  {cardId: '00184', cardType: 'Summon'},
  {cardId: '00185', cardType: 'Summon'},
  {cardId: '00186', cardType: 'Summon'},
  {cardId: '00187', cardType: 'Summon'},
  {cardId: '00188', cardType: 'Summon'},
  {cardId: '00189', cardType: 'Summon'},
  {cardId: '00190', cardType: 'Summon'},
  {cardId: '00191', cardType: 'Summon'},
  {cardId: '00192', cardType: 'Summon'},
  {cardId: '00193', cardType: 'Summon'},
  {cardId: '00194', cardType: 'Summon'},
  {cardId: '00195', cardType: 'Summon'},
  {cardId: '00196', cardType: 'Summon'},
  {cardId: '00197', cardType: 'Summon'},
  {cardId: '00198', cardType: 'Summon'},
  {cardId: '00199', cardType: 'Summon'},
  {cardId: '00200', cardType: 'Summon'},
  {cardId: '00201', cardType: 'Spell'},
  {cardId: '00202', cardType: 'Spell'},
  {cardId: '00203', cardType: 'Spell'},
  {cardId: '00204', cardType: 'Spell'},
  {cardId: '00205', cardType: 'Spell'},
  {cardId: '00206', cardType: 'Spell'},
  {cardId: '00207', cardType: 'Spell'},
  {cardId: '00208', cardType: 'Spell'},
  {cardId: '00209', cardType: 'Spell'},
  {cardId: '00210', cardType: 'Spell'},
  {cardId: '00211', cardType: 'Spell'},
  {cardId: '00212', cardType: 'Spell'},
  {cardId: '00213', cardType: 'Spell'},
  {cardId: '00214', cardType: 'Spell'},
  {cardId: '00215', cardType: 'Spell'},
  {cardId: '00216', cardType: 'Spell'},
  {cardId: '00217', cardType: 'Spell'},
  {cardId: '00218', cardType: 'Spell'},
  {cardId: '00219', cardType: 'Spell'},
  {cardId: '00220', cardType: 'Spell'},
  {cardId: '00221', cardType: 'Spell'},
  {cardId: '00222', cardType: 'Spell'},
  {cardId: '00223', cardType: 'Spell'},
  {cardId: '00224', cardType: 'Spell'},
  {cardId: '00225', cardType: 'Spell'}
]

const boosterData = [
  {boosterName: "ElfStarter", cardArray: ['00001','00002','00003','00004','00005','00006','00007','00008','00009','00010','00051','00052','00053','00054','00055','00076','00077','00078','00090','00091','00098','00041','00042','00043','00044','00045','00046','00047','00048','00049','00050','00071','00072','00073','00151','00156','00158','00161','00162','00208','00201','00204','00205','00207','00176'], cardType: ["Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Trap","Trap","Trap","Trap","Trap","Spell","Spell","Spell","Spell","Spell","Summoner"], cardPercents: [200,400,600,800,1000,1200,1400,1600,1800,2000,2200,2400,2600,2800,3000,3200,3400,3600,3800,4000,4200,4400,4600,4800,5000,5200,5400,5600,5800,6000,6200,6400,6600,6800,7000,7200,7400,7600,7800,8000,8200,8400,8600,8800,10000]},
  {boosterName: "HumanStarter", cardArray: ['00011','00012','00013','00014','00015','00016','00017','00018','00019','00020','00021','00022','00023','00024','00025','00079','00080','00081','00092','00093','00099','00041','00042','00043','00044','00045','00046','00047','00048','00049','00050','00072','00074','00075','00152','00156','00157','00158','00159','00209','00201','00204','00205','00206','00178'], cardType:["Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Trap","Trap","Trap","Trap","Trap","Spell","Spell","Spell","Spell","Spell","Summoner"], cardPercents: [200,400,600,800,1000,1200,1400,1600,1800,2000,2200,2400,2600,2800,3000,3200,3400,3600,3800,4000,4200,4400,4600,4800,5000,5200,5400,5600,5800,6000,6200,6400,6600,6800,7000,7200,7400,7600,7800,8000,8200,8400,8600,8800,10000]},
  {boosterName: "DwarfStarter", cardArray: ['00021','00022','00023','00024','00025','00026','00027','00028','00029','00030','00061','00062','00063','00064','00065','00082','00083','00084','00094','00095','00100','00041','00042','00043','00044','00045','00046','00047','00048','00049','00050','00071','00073','00074','00153','00155','00159','00160','00162','00210','00201','00204','00205','00207','00180'], cardType:["Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Trap","Trap","Trap","Trap","Trap","Spell","Spell","Spell","Spell","Spell","Summoner"], cardPercents: [200,400,600,800,1000,1200,1400,1600,1800,2000,2200,2400,2600,2800,3000,3200,3400,3600,3800,4000,4200,4400,4600,4800,5000,5200,5400,5600,5800,6000,6200,6400,6600,6800,7000,7200,7400,7600,7800,8000,8200,8400,8600,8800,10000]},
  {boosterName: "MonsterStarter", cardArray: ['00031','00032','00033','00034','00035','00036','00037','00038','00039','00040','00041','00042','00043','00044','00045','00085','00086','00087','00096','00097','00101','00041','00042','00043','00044','00045','00046','00047','00048','00049','00050','00071','00074','00075','00154','00155','00157','00161','00163','00211','00201','00200','00202','00203','00182'], cardType:["Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Summon","Trap","Trap","Trap","Trap","Trap","Spell","Spell","Spell","Spell","Spell","Summoner"], cardPercents: [200,400,600,800,1000,1200,1400,1600,1800,2000,2200,2400,2600,2800,3000,3200,3400,3600,3800,4000,4200,4400,4600,4800,5000,5200,5400,5600,5800,6000,6200,6400,6600,6800,7000,7200,7400,7600,7800,8000,8200,8400,8600,8800,10000]}
]

db.once('open', async () => {
  await Summon.insertMany(summonData)
  await Trap.insertMany(trapData)
  await Summoner.insertMany(summonerData)
  await Spell.insertMany(spellData)
  await CardIndex.insertMany(cardIndexData)
  await Booster.insertMany(boosterData)
  console.log("seeding complete")
  process.exit(0)
});
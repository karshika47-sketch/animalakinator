/**
 * 🐾 ANIMAL AKINATOR - CORE GAME ENGINE
 * Features:
 * - 55 Detailed Animals with facts & categorical traits
 * - 35 Rich Questions covering anatomy, habitat, behavior, diet
 * - Information Gain / Entropy Binary-Split Question Selection
 * - Max 20 Questions Strict Enforcement
 * - Early Guess Detection (Single Candidate or Undifferentiated Pool)
 * - Undo Support & Fallback Best-Score Guessing
 * - Synthesized Web Audio Sound Effects (100% Offline)
 * - Celebratory Canvas Confetti
 * - Wrong Guess Memory & Learning Form
 */

// ============================================================================
// 1. QUESTIONS DATABASE (35 Diverse Questions)
// ============================================================================
const QUESTIONS = [
  { id: 'land', text: 'Does it live on land?' },
  { id: 'water', text: 'Does it live in or spend most of its time in water?' },
  { id: 'fly', text: 'Can it fly through the air?' },
  { id: 'swim', text: 'Can it swim proficiently in water?' },
  { id: 'four_legs', text: 'Does it have four legs?' },
  { id: 'wings', text: 'Does it have wings?' },
  { id: 'fur', text: 'Does it have fur or hair on its body?' },
  { id: 'feathers', text: 'Does it have feathers?' },
  { id: 'scales', text: 'Does it have scales on its skin?' },
  { id: 'tail', text: 'Does it have a visible tail?' },
  { id: 'horns', text: 'Does it have horns or antlers on its head?' },
  { id: 'sharp_teeth', text: 'Does it have sharp teeth, fangs, or a serrated beak?' },
  { id: 'claws', text: 'Does it have sharp claws or talons?' },
  { id: 'bigger_than_human', text: 'Is it bigger or heavier than an average human?' },
  { id: 'smaller_than_dog', text: 'Is it smaller than an average domestic dog?' },
  { id: 'eats_meat', text: 'Does it eat meat or fish (carnivore or omnivore)?' },
  { id: 'eats_plants', text: 'Does it eat plants, grass, leaves, or fruit (herbivore or omnivore)?' },
  { id: 'omnivore', text: 'Does it eat both plants and meat?' },
  { id: 'dangerous_to_humans', text: 'Is it generally considered dangerous to humans?' },
  { id: 'lives_in_groups', text: 'Does it naturally live in groups, herds, flocks, or packs?' },
  { id: 'lives_in_forest', text: 'Does it naturally inhabit forests or jungles?' },
  { id: 'lives_in_cold', text: 'Does it live in cold, snowy, or icy regions?' },
  { id: 'lives_in_desert', text: 'Can it survive in deserts or arid scrublands?' },
  { id: 'climbs_trees', text: 'Can it climb trees skillfully?' },
  { id: 'nocturnal', text: 'Is it active primarily at night?' },
  { id: 'stripes', text: 'Does it have stripes on its coat or body?' },
  { id: 'spots', text: 'Does it have spots or rosettes on its body?' },
  { id: 'long_neck', text: 'Does it have a conspicuously long neck?' },
  { id: 'long_trunk', text: 'Does it have a long muscular trunk?' },
  { id: 'shell', text: 'Does it have a hard protective outer shell?' },
  { id: 'domestic', text: 'Is it commonly kept as a household pet or on a farm?' },
  { id: 'mammal', text: 'Is it a mammal (gives birth to live young & nurses with milk)?' },
  { id: 'venomous', text: 'Does it produce venom or have a venomous sting/bite?' },
  { id: 'insect', text: 'Is it an insect or tiny bug with six or more legs?' },
  { id: 'pouch', text: 'Does it carry its baby in a pouch (marsupial)?' }
];

// ============================================================================
// 2. ANIMALS DATABASE (55 Animals with full attribute matrix)
// ============================================================================
const ANIMALS = [
  {
    id: 'dog',
    name: 'Dog',
    emoji: '🐶',
    tags: ['🐾 Mammal', '🥩 Carnivore/Omnivore', '🏡 Domestic'],
    fact: 'Dogs have a sense of smell that is up to 100,000 times more sensitive than a human\'s!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: false, eats_meat: true, eats_plants: true,
      omnivore: true, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'cat',
    name: 'Cat',
    emoji: '🐱',
    tags: ['🐾 Mammal', '🥩 Carnivore', '🏡 Domestic'],
    fact: 'Cats spend roughly 70% of their lives sleeping and 15% of their day grooming themselves.',
    traits: {
      land: true, water: false, fly: false, swim: false, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'lion',
    name: 'Lion',
    emoji: '🦁',
    tags: ['🐾 Mammal', '🥩 Carnivore', '🌍 Savannah'],
    fact: 'A lion\'s majestic roar can reach up to 114 decibels and be heard from 5 miles (8 km) away!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: true, smaller_than_dog: false, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: true, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'tiger',
    name: 'Tiger',
    emoji: '🐯',
    tags: ['🐾 Mammal', '🥩 Carnivore', '🌲 Jungle'],
    fact: 'No two tigers have the exact same stripe pattern; their stripes are as unique as human fingerprints!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: true, smaller_than_dog: false, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: true, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: true,
      stripes: true, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'leopard',
    name: 'Leopard',
    emoji: '🐆',
    tags: ['🐾 Mammal', '🥩 Carnivore', '🌳 Tree Climber'],
    fact: 'Leopards are so strong they can drag prey weighing three times their own body weight up into trees!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: false, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: true, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: true,
      stripes: false, spots: true, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'cheetah',
    name: 'Cheetah',
    emoji: '🐆',
    tags: ['🐾 Mammal', '⚡ Fastest Land Animal', '🌍 Savannah'],
    fact: 'Cheetahs can sprint from 0 to 60 mph in just 3 seconds, faster than most sports cars!',
    traits: {
      land: true, water: false, fly: false, swim: false, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: false, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: true, lives_in_groups: false, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: true, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'elephant',
    name: 'Elephant',
    emoji: '🐘',
    tags: ['🐾 Mammal', '🌿 Herbivore', '👑 Giant'],
    fact: 'An elephant\'s trunk contains over 40,000 distinct muscles and can lift up to 700 pounds!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: false, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: false, bigger_than_human: true, smaller_than_dog: false, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: true, lives_in_groups: true, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: true, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'giraffe',
    name: 'Giraffe',
    emoji: '🦒',
    tags: ['🐾 Mammal', '🌿 Herbivore', '🦒 Tallest Animal'],
    fact: 'Even though a giraffe\'s neck is 6 feet long, it contains only 7 neck vertebrae — exactly the same as humans!',
    traits: {
      land: true, water: false, fly: false, swim: false, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: true, sharp_teeth: false,
      claws: false, bigger_than_human: true, smaller_than_dog: false, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: true, long_neck: true, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'zebra',
    name: 'Zebra',
    emoji: '🦓',
    tags: ['🐾 Mammal', '🌿 Herbivore', '🦓 African Plains'],
    fact: 'Zebra stripes confuse biting flies and create optical illusions that baffle predatory lions!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: false, bigger_than_human: true, smaller_than_dog: false, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: true, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'horse',
    name: 'Horse',
    emoji: '🐴',
    tags: ['🐾 Mammal', '🌿 Herbivore', '🚜 Domestic'],
    fact: 'Horses can sleep both lying down and standing up thanks to a unique lock-joint leg mechanism!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: false, bigger_than_human: true, smaller_than_dog: false, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'cow',
    name: 'Cow',
    emoji: '🐮',
    tags: ['🐾 Mammal', '🌿 Herbivore', '🚜 Farm Animal'],
    fact: 'Cows have best friends and get noticeably stressed when separated from their favorite herd-mates!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: true, sharp_teeth: false,
      claws: false, bigger_than_human: true, smaller_than_dog: false, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: true, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'goat',
    name: 'Goat',
    emoji: '🐐',
    tags: ['🐾 Mammal', '🌿 Herbivore', '⛰️ Mountain Climber'],
    fact: 'Goats have rectangular pupils that give them an incredible 320-degree panoramic field of view!',
    traits: {
      land: true, water: false, fly: false, swim: false, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: true, sharp_teeth: false,
      claws: false, bigger_than_human: false, smaller_than_dog: false, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'sheep',
    name: 'Sheep',
    emoji: '🐑',
    tags: ['🐾 Mammal', '🌿 Herbivore', '🚜 Woolly'],
    fact: 'Sheep have remarkable memories and can remember and recognize up to 50 individual faces for years!',
    traits: {
      land: true, water: false, fly: false, swim: false, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: true, sharp_teeth: false,
      claws: false, bigger_than_human: false, smaller_than_dog: false, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'rabbit',
    name: 'Rabbit',
    emoji: '🐰',
    tags: ['🐾 Mammal', '🌿 Herbivore', '🥕 Agile Hopper'],
    fact: 'When rabbits are joyful, they do an acrobatic twisting leap into the air known as a "binky"!',
    traits: {
      land: true, water: false, fly: false, swim: false, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'deer',
    name: 'Deer',
    emoji: '🦌',
    tags: ['🐾 Mammal', '🌿 Herbivore', '🌲 Forest Resident'],
    fact: 'Antlers are the fastest-growing bone tissue in the world, growing up to an inch per day in spring!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: true, sharp_teeth: false,
      claws: false, bigger_than_human: true, smaller_than_dog: false, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: true,
      lives_in_cold: true, lives_in_desert: false, climbs_trees: false, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'monkey',
    name: 'Monkey',
    emoji: '🐒',
    tags: ['🐾 Mammal', '🍌 Omnivore', '🌳 Canopy Acrobat'],
    fact: 'Some monkey species use prehensile tails as a "fifth hand" to grip branches and hold fruit!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: false, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: true,
      omnivore: true, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'gorilla',
    name: 'Gorilla',
    emoji: '🦍',
    tags: ['🐾 Mammal', '🌿 Herbivore', '🦍 Gentle Giant'],
    fact: 'Despite their colossal strength, gorillas are peaceful vegetarians that share 98% of their DNA with humans!',
    traits: {
      land: true, water: false, fly: false, swim: false, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: false, horns: false, sharp_teeth: true,
      claws: false, bigger_than_human: true, smaller_than_dog: false, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: true, lives_in_groups: true, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'bear',
    name: 'Bear',
    emoji: '🐻',
    tags: ['🐾 Mammal', '🐟 Omnivore', '🌲 Forest Apex'],
    fact: 'During winter hibernation, a bear\'s heart rate drops from 40 beats per minute to just 8!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: true, smaller_than_dog: false, eats_meat: true, eats_plants: true,
      omnivore: true, dangerous_to_humans: true, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: true, lives_in_desert: false, climbs_trees: true, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'panda',
    name: 'Panda',
    emoji: '🐼',
    tags: ['🐾 Mammal', '🎋 Bamboo Specialist', '🇨🇳 China'],
    fact: 'A giant panda can spend up to 14 hours every single day eating over 25 pounds of bamboo!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: true, smaller_than_dog: false, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: true, lives_in_desert: false, climbs_trees: true, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'wolf',
    name: 'Wolf',
    emoji: '🐺',
    tags: ['🐾 Mammal', '🥩 Carnivore', '🌕 Pack Hunter'],
    fact: 'A wolf\'s howl can be heard across an astonishing 10 miles of open wilderness to assemble the pack!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: false, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: true, lives_in_groups: true, lives_in_forest: true,
      lives_in_cold: true, lives_in_desert: false, climbs_trees: false, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'fox',
    name: 'Fox',
    emoji: '🦊',
    tags: ['🐾 Mammal', '🥩 Omnivore', '🌲 Clever Scavenger'],
    fact: 'Foxes use the Earth\'s magnetic field to hunt, judging distance and pouncing accurately on mice buried in snow!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: true,
      omnivore: true, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: true, lives_in_desert: true, climbs_trees: false, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'kangaroo',
    name: 'Kangaroo',
    emoji: '🦘',
    tags: ['🐾 Mammal', '🌿 Herbivore', '🇦🇺 Marsupial'],
    fact: 'Kangaroos cannot walk backwards because of their thick, muscular, balance-providing tails!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: false, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: true, bigger_than_human: true, smaller_than_dog: false, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: true, climbs_trees: false, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: true
    }
  },
  {
    id: 'koala',
    name: 'Koala',
    emoji: '🐨',
    tags: ['🐾 Mammal', '🌿 Herbivore', '🇦🇺 Marsupial'],
    fact: 'Koalas eat toxic eucalyptus leaves that would kill other animals, sleeping up to 20 hours a day to digest them!',
    traits: {
      land: true, water: false, fly: false, swim: false, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: false, horns: false, sharp_teeth: false,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: true
    }
  },
  {
    id: 'camel',
    name: 'Camel',
    emoji: '🐫',
    tags: ['🐾 Mammal', '🌿 Herbivore', '🏜️ Desert Nomad'],
    fact: 'A camel\'s humps store dense energy-rich fat — not water! A thirsty camel can drink 40 gallons of water in 13 minutes.',
    traits: {
      land: true, water: false, fly: false, swim: false, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: false, bigger_than_human: true, smaller_than_dog: false, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: true, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: true, long_trunk: false, shell: false,
      domestic: true, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'pig',
    name: 'Pig',
    emoji: '🐷',
    tags: ['🐾 Mammal', '🌽 Omnivore', '🚜 Farm Animal'],
    fact: 'Pigs are among the top 5 smartest animals on Earth, capable of solving puzzles and learning joystick video games!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: false, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: false, bigger_than_human: true, smaller_than_dog: false, eats_meat: true, eats_plants: true,
      omnivore: true, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'rat',
    name: 'Rat',
    emoji: '🐀',
    tags: ['🐾 Mammal', '🧀 Omnivore', '🏙️ Urban/Wild'],
    fact: 'Rats laugh ultrasonically when tickled and display genuine empathy by saving companion rats trapped in cages!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: true,
      omnivore: true, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'mouse',
    name: 'Mouse',
    emoji: '🐭',
    tags: ['🐾 Mammal', '🌾 Omnivore', '🧀 Tiny Rodent'],
    fact: 'A mouse can squeeze its entire body through a tiny hole no larger than the width of an ordinary ballpoint pen!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: true,
      omnivore: true, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'squirrel',
    name: 'Squirrel',
    emoji: '🐿️',
    tags: ['🐾 Mammal', '🌰 Herbivore', '🌳 Tree Resident'],
    fact: 'Millions of oak trees worldwide are accidentally planted every year because squirrels forget where they buried acorns!',
    traits: {
      land: true, water: false, fly: false, swim: false, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: false,
      stripes: true, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'snake',
    name: 'Snake',
    emoji: '🐍',
    tags: ['🦎 Reptile', '🥩 Carnivore', '⚠️ Legless Hunter'],
    fact: 'Snakes smell the air using their forked tongues, collecting scent molecules and delivering them to their roof of mouth!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: false, wings: false,
      fur: false, feathers: false, scales: true, tail: true, horns: false, sharp_teeth: true,
      claws: false, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: true, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: true, climbs_trees: true, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: false, venomous: true, insect: false, pouch: false
    }
  },
  {
    id: 'crocodile',
    name: 'Crocodile',
    emoji: '🐊',
    tags: ['🦎 Reptile', '🥩 Carnivore', '🌊 Ancient Predator'],
    fact: 'Crocodiles have the strongest bite force ever measured in any living animal — up to 3,700 pounds per square inch!',
    traits: {
      land: true, water: true, fly: false, swim: true, four_legs: true, wings: false,
      fur: false, feathers: false, scales: true, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: true, smaller_than_dog: false, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: true, lives_in_groups: false, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'turtle',
    name: 'Turtle',
    emoji: '🐢',
    tags: ['🦎 Reptile', '🌿 Herbivore/Omnivore', '🛡️ Shelled'],
    fact: 'A turtle\'s shell is not an external suit of armor; it is fused directly to its backbone and rib cage!',
    traits: {
      land: true, water: true, fly: false, swim: true, four_legs: true, wings: false,
      fur: false, feathers: false, scales: true, tail: true, horns: false, sharp_teeth: false,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: true,
      domestic: true, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'frog',
    name: 'Frog',
    emoji: '🐸',
    tags: ['🐸 Amphibian', '🦗 Insectivore', '💧 Wetland Resident'],
    fact: 'Frogs absorb water and oxygen directly through their moist skin instead of drinking through their mouths!',
    traits: {
      land: true, water: true, fly: false, swim: true, four_legs: true, wings: false,
      fur: false, feathers: false, scales: false, tail: false, horns: false, sharp_teeth: false,
      claws: false, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: true,
      stripes: false, spots: true, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'penguin',
    name: 'Penguin',
    emoji: '🐧',
    tags: ['🦅 Bird', '🐟 Carnivore', '❄️ Antarctic'],
    fact: 'Penguins convert their wings into underwater flippers, flying through icy seas at speeds over 20 mph!',
    traits: {
      land: true, water: true, fly: false, swim: true, four_legs: false, wings: true,
      fur: false, feathers: true, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: true, bigger_than_human: false, smaller_than_dog: false, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: true, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'eagle',
    name: 'Eagle',
    emoji: '🦅',
    tags: ['🦅 Bird of Prey', '🥩 Carnivore', '⛰️ Sky Apex'],
    fact: 'An eagle\'s vision is 4 to 8 times sharper than a human\'s, spotting a rabbit from over 2 miles away!',
    traits: {
      land: true, water: false, fly: true, swim: false, four_legs: false, wings: true,
      fur: false, feathers: true, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: false, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: true, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'parrot',
    name: 'Parrot',
    emoji: '🦜',
    tags: ['🦅 Bird', '🍓 Herbivore', '🌴 Tropical'],
    fact: 'Some parrots can live up to 80 years and learn vocabularies of over 100 words with contextual understanding!',
    traits: {
      land: true, water: false, fly: true, swim: false, four_legs: false, wings: true,
      fur: false, feathers: true, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'owl',
    name: 'Owl',
    emoji: '🦉',
    tags: ['🦅 Bird of Prey', '🥩 Carnivore', '🌙 Silent Hunter'],
    fact: 'Specialized feather fringes silence an owl\'s flight completely, letting them glide undetected over prey!',
    traits: {
      land: true, water: false, fly: true, swim: false, four_legs: false, wings: true,
      fur: false, feathers: true, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: true,
      stripes: false, spots: true, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'peacock',
    name: 'Peacock',
    emoji: '🦚',
    tags: ['🦅 Bird', '🌾 Omnivore', '✨ Colorful Feathered'],
    fact: 'Only the males are peacocks (females are peahens), and their train feathers display shimmering iridescent micro-crystals!',
    traits: {
      land: true, water: false, fly: true, swim: false, four_legs: false, wings: true,
      fur: false, feathers: true, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: true, bigger_than_human: false, smaller_than_dog: false, eats_meat: true, eats_plants: true,
      omnivore: true, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: false,
      stripes: false, spots: true, long_neck: true, long_trunk: false, shell: false,
      domestic: true, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'sparrow',
    name: 'Sparrow',
    emoji: '🐦',
    tags: ['🦅 Songbird', '🌾 Granivore', '🏙️ Common City Bird'],
    fact: 'Sparrows flap their wings up to 15 times per second and can fly at speeds of 24 miles per hour!',
    traits: {
      land: true, water: false, fly: true, swim: false, four_legs: false, wings: true,
      fur: false, feathers: true, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: true, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'flamingo',
    name: 'Flamingo',
    emoji: '🦩',
    tags: ['🦅 Bird', '🦐 Filter Feeder', '💖 Pink Wader'],
    fact: 'Flamingos are naturally gray-white; they turn vibrant pink from carotenoid pigments in the brine shrimp they eat!',
    traits: {
      land: true, water: true, fly: true, swim: true, four_legs: false, wings: true,
      fur: false, feathers: true, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: false, bigger_than_human: false, smaller_than_dog: false, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: true, long_trunk: false, shell: false,
      domestic: false, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'duck',
    name: 'Duck',
    emoji: '🦆',
    tags: ['🦅 Waterfowl', '🌾 Omnivore', '🌊 Pond Swimmer'],
    fact: 'A duck\'s feathers are completely waterproof thanks to a special waxy preen gland near the base of their tail!',
    traits: {
      land: true, water: true, fly: true, swim: true, four_legs: false, wings: true,
      fur: false, feathers: true, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: false, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: true,
      omnivore: true, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'chicken',
    name: 'Chicken',
    emoji: '🐔',
    tags: ['🦅 Bird', '🌽 Omnivore', '🚜 Farm Animal'],
    fact: 'Chickens communicate using over 30 distinct vocal calls, warning flock-mates of specific predators!',
    traits: {
      land: true, water: false, fly: false, swim: false, four_legs: false, wings: true,
      fur: false, feathers: true, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: true,
      omnivore: true, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'dolphin',
    name: 'Dolphin',
    emoji: '🐬',
    tags: ['🐾 Marine Mammal', '🐟 Carnivore', '🌊 Ocean Explorer'],
    fact: 'Dolphins sleep with only one brain hemisphere at a time, keeping one eye open to watch for sharks and breathe!',
    traits: {
      land: false, water: true, fly: false, swim: true, four_legs: false, wings: false,
      fur: false, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: false, bigger_than_human: true, smaller_than_dog: false, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'whale',
    name: 'Whale',
    emoji: '🐋',
    tags: ['🐾 Marine Mammal', '🦐 Ocean Giant', '🌊 Deep Ocean'],
    fact: 'The blue whale is the largest animal to have ever lived on Earth — its heart alone is the size of a small car!',
    traits: {
      land: false, water: true, fly: false, swim: true, four_legs: false, wings: false,
      fur: false, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: false, bigger_than_human: true, smaller_than_dog: false, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: true, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'shark',
    name: 'Shark',
    emoji: '🦈',
    tags: ['🐟 Cartilaginous Fish', '🥩 Apex Predator', '🌊 Deep Sea'],
    fact: 'Sharks have existed for over 400 million years, meaning they are older than trees and older than dinosaurs!',
    traits: {
      land: false, water: true, fly: false, swim: true, four_legs: false, wings: false,
      fur: false, feathers: false, scales: true, tail: true, horns: false, sharp_teeth: true,
      claws: false, bigger_than_human: true, smaller_than_dog: false, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: true, lives_in_groups: false, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'octopus',
    name: 'Octopus',
    emoji: '🐙',
    tags: ['🌊 Cephalopod', '🦀 Carnivore', '🧠 Invertebrate Genius'],
    fact: 'An octopus has 3 hearts, blue copper-based blood, and nine brains (one central brain plus one in each arm)!',
    traits: {
      land: false, water: true, fly: false, swim: true, four_legs: false, wings: false,
      fur: false, feathers: false, scales: false, tail: false, horns: false, sharp_teeth: true,
      claws: false, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: false, venomous: true, insect: false, pouch: false
    }
  },
  {
    id: 'seal',
    name: 'Seal',
    emoji: '🦭',
    tags: ['🐾 Semi-Aquatic Mammal', '🐟 Carnivore', '❄️ Coastal'],
    fact: 'Seals can hold their breath underwater for up to two hours by slowing their heart rate down by 90%!',
    traits: {
      land: true, water: true, fly: false, swim: true, four_legs: false, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: true, smaller_than_dog: false, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: true, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: true, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'crab',
    name: 'Crab',
    emoji: '🦀',
    tags: ['🌊 Crustacean', '🐚 Scavenger', '🏖️ Coastal'],
    fact: 'Crabs communicate by drumming their claws and have teeth inside their stomachs to grind up food!',
    traits: {
      land: true, water: true, fly: false, swim: true, four_legs: false, wings: false,
      fur: false, feathers: false, scales: false, tail: false, horns: false, sharp_teeth: false,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: true,
      omnivore: true, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: true,
      domestic: false, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'butterfly',
    name: 'Butterfly',
    emoji: '🦋',
    tags: ['🐛 Insect', '🌸 Nectar Feeder', '✨ Metamorphosis'],
    fact: 'Butterflies taste the sweetness of flowers using sensitive chemoreceptors located on their feet!',
    traits: {
      land: true, water: false, fly: true, swim: false, four_legs: false, wings: true,
      fur: false, feathers: false, scales: false, tail: false, horns: false, sharp_teeth: false,
      claws: false, bigger_than_human: false, smaller_than_dog: true, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: true, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: false, venomous: false, insect: true, pouch: false
    }
  },
  {
    id: 'bee',
    name: 'Bee',
    emoji: '🐝',
    tags: ['🐛 Insect', '🍯 Pollinator', '🐝 Hive Master'],
    fact: 'Honeybees communicate the precise location and distance of flowers by performing a complex "waggle dance"!',
    traits: {
      land: true, water: false, fly: true, swim: false, four_legs: false, wings: true,
      fur: true, feathers: false, scales: false, tail: false, horns: false, sharp_teeth: false,
      claws: false, bigger_than_human: false, smaller_than_dog: true, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: true, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: false, venomous: true, insect: true, pouch: false
    }
  },
  {
    id: 'bat',
    name: 'Bat',
    emoji: '🦇',
    tags: ['🐾 Flying Mammal', '🦟 Insectivore', '🌙 Nocturnal Master'],
    fact: 'Bats are the only mammals on planet Earth capable of true, sustained flapping flight!',
    traits: {
      land: true, water: false, fly: true, swim: false, four_legs: false, wings: true,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: true, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'hippo',
    name: 'Hippo',
    emoji: '🦛',
    tags: ['🐾 Mammal', '🌿 Herbivore', '🌊 River Giant'],
    fact: 'Hippos secrete an oily natural pink substance called "blood sweat" that acts as sunblock and antibiotic moisturizer!',
    traits: {
      land: true, water: true, fly: false, swim: true, four_legs: true, wings: false,
      fur: false, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: false, bigger_than_human: true, smaller_than_dog: false, eats_meat: false, eats_plants: true,
      omnivore: false, dangerous_to_humans: true, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'platypus',
    name: 'Platypus',
    emoji: '🦆',
    tags: ['🐾 Monotreme', '🦐 Carnivore', '🇦🇺 Enigmatic Wonder'],
    fact: 'The platypus is one of only two mammals that lay eggs, and males have venomous spurs on their hind ankles!',
    traits: {
      land: true, water: true, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: false,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: true, insect: false, pouch: false
    }
  },
  {
    id: 'chameleon',
    name: 'Chameleon',
    emoji: '🦎',
    tags: ['🦎 Reptile', '🦗 Insectivore', '🌈 Master of Disguise'],
    fact: 'A chameleon\'s tongue can shoot out at twice the length of its body in less than a fraction of a second!',
    traits: {
      land: true, water: false, fly: false, swim: false, four_legs: true, wings: false,
      fur: false, feathers: false, scales: true, tail: true, horns: false, sharp_teeth: false,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: true, climbs_trees: true, nocturnal: false,
      stripes: false, spots: true, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: false, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'hedgehog',
    name: 'Hedgehog',
    emoji: '🦔',
    tags: ['🐾 Mammal', '🐛 Insectivore', '🛡️ Spiny Shield'],
    fact: 'An adult hedgehog carries between 5,000 and 7,000 sharp, hollow spines made of keratin!',
    traits: {
      land: true, water: false, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: true,
      omnivore: true, dangerous_to_humans: false, lives_in_groups: false, lives_in_forest: true,
      lives_in_cold: false, lives_in_desert: false, climbs_trees: false, nocturnal: true,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: true, mammal: true, venomous: false, insect: false, pouch: false
    }
  },
  {
    id: 'otter',
    name: 'Otter',
    emoji: '🦦',
    tags: ['🐾 Semi-Aquatic Mammal', '🐟 Carnivore', '🌊 Playful Swimmer'],
    fact: 'Sea otters hold hands while sleeping in kelp forests so they don\'t drift apart in ocean currents!',
    traits: {
      land: true, water: true, fly: false, swim: true, four_legs: true, wings: false,
      fur: true, feathers: false, scales: false, tail: true, horns: false, sharp_teeth: true,
      claws: true, bigger_than_human: false, smaller_than_dog: true, eats_meat: true, eats_plants: false,
      omnivore: false, dangerous_to_humans: false, lives_in_groups: true, lives_in_forest: false,
      lives_in_cold: true, lives_in_desert: false, climbs_trees: false, nocturnal: false,
      stripes: false, spots: false, long_neck: false, long_trunk: false, shell: false,
      domestic: false, mammal: true, venomous: false, insect: false, pouch: false
    }
  }
];

// Total count check
console.log(`🐾 Animal Database Loaded: ${ANIMALS.length} Animals, ${QUESTIONS.length} Questions`);

// ============================================================================
// 3. SOUND SYNTHESIZER (Web Audio API - 100% Offline & Reliable)
// ============================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.15) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  playStart() {
    if (this.muted) return;
    const notes = [440, 554, 659, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.25, 0.2), idx * 70);
    });
  }

  playYes() {
    this.playTone(600, 'sine', 0.1, 0.15);
    setTimeout(() => this.playTone(880, 'sine', 0.18, 0.15), 60);
  }

  playNo() {
    this.playTone(380, 'sawtooth', 0.12, 0.12);
    setTimeout(() => this.playTone(280, 'sine', 0.2, 0.12), 70);
  }

  playWhoosh() {
    this.playTone(320, 'sine', 0.15, 0.08);
  }

  playFanfare() {
    if (this.muted) return;
    const melody = [523.25, 659.25, 783.99, 1046.50];
    melody.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'triangle', 0.35, 0.25), i * 110);
    });
  }

  playDefeat() {
    if (this.muted) return;
    const melody = [400, 360, 320, 260];
    melody.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sine', 0.25, 0.15), i * 120);
    });
  }
}

// ============================================================================
// 4. CONFETTI SYSTEM
// ============================================================================
class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  launch(count = 90) {
    this.resize();
    this.particles = [];
    const colors = ['#f59e0b', '#8b5cf6', '#10b981', '#38bdf8', '#ec4899', '#f43f5e'];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width * (0.2 + Math.random() * 0.6),
        y: this.canvas.height * 0.6,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 18 - 8,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.45,
        opacity: 1
      });
    }

    if (!this.animId) {
      this.update();
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.007;

      if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.update());
    } else {
      this.animId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// ============================================================================
// 5. GAME ENGINE CONTROLLER
// ============================================================================
class AkinatorGame {
  constructor() {
    this.sfx = new SoundFX();
    this.confetti = new ConfettiEngine('confetti-canvas');

    // DOM Elements
    this.screens = {
      start: document.getElementById('screen-start'),
      play: document.getElementById('screen-play'),
      guess: document.getElementById('screen-guess'),
      defeat: document.getElementById('screen-defeat')
    };

    this.el = {
      soundBtn: document.getElementById('sound-btn'),
      soundIcon: document.getElementById('sound-icon'),
      helpBtn: document.getElementById('help-btn'),
      helpModal: document.getElementById('help-modal'),
      modalCloseBtn: document.getElementById('modal-close-btn'),
      modalGotItBtn: document.getElementById('modal-got-it-btn'),
      startBtn: document.getElementById('start-btn'),
      questionIndicator: document.getElementById('question-indicator'),
      confidenceVal: document.getElementById('confidence-val'),
      progressBarFill: document.getElementById('progress-bar-fill'),
      candidatesText: document.getElementById('candidates-text'),
      oracleFace: document.getElementById('oracle-face'),
      thoughtText: document.getElementById('thought-text'),
      questionCard: document.getElementById('question-card'),
      questionPill: document.getElementById('question-pill'),
      questionText: document.getElementById('question-text'),
      btnYes: document.getElementById('btn-yes'),
      btnNo: document.getElementById('btn-no'),
      btnUndo: document.getElementById('btn-undo'),
      btnRestart: document.getElementById('btn-restart'),
      revealedEmoji: document.getElementById('revealed-emoji'),
      revealedName: document.getElementById('revealed-name'),
      revealedTags: document.getElementById('revealed-tags'),
      revealedFact: document.getElementById('revealed-fact'),
      guessSummaryPill: document.getElementById('guess-summary-pill'),
      btnPlayAgain: document.getElementById('btn-play-again'),
      btnWrongGuess: document.getElementById('btn-wrong-guess'),
      learningForm: document.getElementById('learning-form'),
      userAnimalInput: document.getElementById('user-animal-input'),
      defeatFeedback: document.getElementById('defeat-feedback'),
      defeatFeedbackText: document.getElementById('defeat-feedback-text'),
      btnRestartFromDefeat: document.getElementById('btn-restart-from-defeat')
    };

    // State Variables
    this.currentQuestionNumber = 1;
    this.maxQuestions = 20;
    this.candidatePool = [...ANIMALS];
    this.askedQuestionIds = new Set();
    this.currentQuestion = null;
    this.history = []; // stack of { question, answer (boolean), candidatesBefore, candidatesAfter }
    this.guessedAnimal = null;

    this.initEventListeners();
  }

  initEventListeners() {
    // Sound Toggle
    this.el.soundBtn.addEventListener('click', () => {
      const isMuted = this.sfx.toggleMute();
      this.el.soundIcon.textContent = isMuted ? '🔇' : '🔊';
      this.el.soundBtn.title = isMuted ? 'Unmute Sound' : 'Mute Sound';
    });

    // Help Modal
    this.el.helpBtn.addEventListener('click', () => this.toggleModal(true));
    this.el.modalCloseBtn.addEventListener('click', () => this.toggleModal(false));
    this.el.modalGotItBtn.addEventListener('click', () => this.toggleModal(false));
    this.el.helpModal.addEventListener('click', (e) => {
      if (e.target === this.el.helpModal) this.toggleModal(false);
    });

    // Start Button
    this.el.startBtn.addEventListener('click', () => {
      this.sfx.init();
      this.sfx.playStart();
      this.startNewGame();
    });

    // Answer Buttons
    this.el.btnYes.addEventListener('click', () => this.handleAnswer(true));
    this.el.btnNo.addEventListener('click', () => this.handleAnswer(false));

    // Secondary Controls
    this.el.btnUndo.addEventListener('click', () => this.undoLastAnswer());
    this.el.btnRestart.addEventListener('click', () => this.startNewGame());

    // Result Buttons
    this.el.btnPlayAgain.addEventListener('click', () => {
      this.sfx.playStart();
      this.startNewGame();
    });
    this.el.btnWrongGuess.addEventListener('click', () => this.showDefeatScreen());

    // Defeat / Learning Form
    this.el.learningForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleTeachOracle();
    });
    this.el.btnRestartFromDefeat.addEventListener('click', () => {
      this.sfx.playStart();
      this.startNewGame();
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Don't capture keys if typing in the form input
      if (document.activeElement === this.el.userAnimalInput) return;

      if (!this.screens.play.classList.contains('hidden')) {
        const key = e.key.toLowerCase();
        if (key === 'y') {
          e.preventDefault();
          this.handleAnswer(true);
        } else if (key === 'n') {
          e.preventDefault();
          this.handleAnswer(false);
        } else if (key === 'z') {
          e.preventDefault();
          this.undoLastAnswer();
        }
      }
    });
  }

  switchScreen(screenKey) {
    Object.keys(this.screens).forEach((key) => {
      if (key === screenKey) {
        this.screens[key].classList.remove('hidden');
        // Trigger transition
        setTimeout(() => this.screens[key].classList.add('active'), 10);
      } else {
        this.screens[key].classList.remove('active');
        this.screens[key].classList.add('hidden');
      }
    });
  }

  toggleModal(show) {
    if (show) {
      this.el.helpModal.classList.remove('hidden');
    } else {
      this.el.helpModal.classList.add('hidden');
    }
  }

  // ==========================================================================
  // GAMEPLAY FLOW
  // ==========================================================================

  startNewGame() {
    this.candidatePool = [...ANIMALS];
    this.askedQuestionIds.clear();
    this.history = [];
    this.currentQuestionNumber = 1;
    this.guessedAnimal = null;

    this.el.defeatFeedback.classList.add('hidden');
    this.el.userAnimalInput.value = '';

    this.switchScreen('play');
    this.presentNextQuestion();
  }

  /**
   * Intelligently selects the best question using information gain (Entropy / Binary split)
   * Scores questions by how close they divide the candidate pool in half (50/50 split).
   */
  findBestNextQuestion() {
    const remainingCount = this.candidatePool.length;
    if (remainingCount <= 1) return null;

    let bestQuestion = null;
    let bestSplitDifference = Infinity;

    // Check all unasked questions
    for (const q of QUESTIONS) {
      if (this.askedQuestionIds.has(q.id)) continue;

      let yesCount = 0;
      for (const animal of this.candidatePool) {
        if (animal.traits[q.id] === true) {
          yesCount++;
        }
      }

      const noCount = remainingCount - yesCount;

      // Skip questions that don't differentiate ANY animals in the current candidate pool
      if (yesCount === 0 || noCount === 0) continue;

      // We want |yesCount - noCount| to be as small as possible (optimal median split)
      const diff = Math.abs(yesCount - noCount);

      if (diff < bestSplitDifference) {
        bestSplitDifference = diff;
        bestQuestion = q;

        // Perfect 50/50 split found
        if (diff <= 1) break;
      }
    }

    return bestQuestion;
  }

  presentNextQuestion() {
    // 1. Check if only 1 animal remains -> Instant Guess!
    if (this.candidatePool.length === 1) {
      this.makeGuess(this.candidatePool[0]);
      return;
    }

    // 2. Check if Question 20 reached or no candidates left
    if (this.currentQuestionNumber > this.maxQuestions) {
      this.guessBestMatch();
      return;
    }

    // 3. Find optimal question to ask next
    const nextQ = this.findBestNextQuestion();

    // If no remaining question can differentiate between candidates, make the guess now!
    if (!nextQ) {
      this.guessBestMatch();
      return;
    }

    this.currentQuestion = nextQ;
    this.updatePlayUI();
  }

  updatePlayUI() {
    // Update question indicator & pill
    this.el.questionIndicator.textContent = `Question ${this.currentQuestionNumber} / ${this.maxQuestions}`;
    this.el.questionPill.textContent = `QUESTION ${this.currentQuestionNumber}`;

    // Progress Bar (1 to 20)
    const progressPercent = (this.currentQuestionNumber / this.maxQuestions) * 100;
    this.el.progressBarFill.style.width = `${progressPercent}%`;

    // Dynamic Mind Power / Confidence Meter calculation
    const totalAnimals = ANIMALS.length;
    const remaining = this.candidatePool.length;
    // Calculation reflects decreasing candidates and increasing questions asked
    let confidence = Math.round(
      Math.min(99, Math.max(12,
        (1 - (remaining - 1) / totalAnimals) * 70 + (this.currentQuestionNumber / this.maxQuestions) * 30
      ))
    );
    if (remaining <= 2) confidence = Math.max(confidence, 90);
    this.el.confidenceVal.textContent = `${confidence}%`;

    // Remaining Possibilities tracker
    this.el.candidatesText.textContent = `${remaining} ${remaining === 1 ? 'possibility' : 'possibilities'}`;

    // Oracle thought reactions
    this.updateOracleReactions(remaining);

    // Card Animation & Text
    this.el.questionCard.classList.add('question-flip');
    setTimeout(() => {
      this.el.questionText.textContent = this.currentQuestion.text;
      this.el.questionCard.classList.remove('question-flip');
    }, 140);

    // Undo button state
    this.el.btnUndo.disabled = this.history.length === 0;
  }

  updateOracleReactions(remaining) {
    const faces = ['🧙‍♂️', '🤔', '🧐', '✨', '🔮', '💡'];
    if (remaining > 35) {
      this.el.oracleFace.textContent = '🧙‍♂️';
      this.el.thoughtText.textContent = 'Searching the animal kingdom...';
    } else if (remaining > 15) {
      this.el.oracleFace.textContent = '🧐';
      this.el.thoughtText.textContent = 'Narrowing down the species...';
    } else if (remaining > 5) {
      this.el.oracleFace.textContent = '🤔';
      this.el.thoughtText.textContent = 'The vision is becoming clear!';
    } else if (remaining > 1) {
      this.el.oracleFace.textContent = '🔮';
      this.el.thoughtText.textContent = 'I can sense its distinctive traits!';
    } else {
      this.el.oracleFace.textContent = '💡';
      this.el.thoughtText.textContent = 'I know what you are thinking of!';
    }
  }

  handleAnswer(isYes) {
    if (!this.currentQuestion) return;

    if (isYes) {
      this.sfx.playYes();
    } else {
      this.sfx.playNo();
    }

    const qId = this.currentQuestion.id;
    this.askedQuestionIds.add(qId);

    const candidatesBefore = [...this.candidatePool];

    // Filter candidate pool
    const candidatesAfter = this.candidatePool.filter(animal => {
      return animal.traits[qId] === isYes;
    });

    // Save to history stack for Undo
    this.history.push({
      questionNumber: this.currentQuestionNumber,
      question: this.currentQuestion,
      answer: isYes,
      candidatesBefore,
      candidatesAfter: candidatesAfter.length > 0 ? candidatesAfter : candidatesBefore
    });

    // If filtering eliminates all animals (e.g. unexpected answer), keep best previous candidates
    if (candidatesAfter.length > 0) {
      this.candidatePool = candidatesAfter;
    }

    this.currentQuestionNumber++;

    // Check guess trigger or continue
    this.presentNextQuestion();
  }

  undoLastAnswer() {
    if (this.history.length === 0) return;

    this.sfx.playWhoosh();
    const lastStep = this.history.pop();
    this.askedQuestionIds.delete(lastStep.question.id);
    this.candidatePool = [...lastStep.candidatesBefore];
    this.currentQuestionNumber = lastStep.questionNumber;
    this.currentQuestion = lastStep.question;

    this.updatePlayUI();
  }

  /**
   * Guess the animal with the highest number of matching characteristics
   * when 20 questions are reached or when candidates can't be further separated.
   */
  guessBestMatch() {
    if (this.candidatePool.length === 0) {
      this.candidatePool = [...ANIMALS];
    }

    let bestAnimal = this.candidatePool[0];
    let highestScore = -1;

    for (const animal of this.candidatePool) {
      let score = 0;
      for (const step of this.history) {
        if (animal.traits[step.question.id] === step.answer) {
          score++;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestAnimal = animal;
      }
    }

    this.makeGuess(bestAnimal);
  }

  makeGuess(animal) {
    this.guessedAnimal = animal;
    this.sfx.playFanfare();
    this.confetti.launch(110);

    // Populate Guess Screen
    this.el.revealedEmoji.textContent = animal.emoji;
    this.el.revealedName.textContent = animal.name.toUpperCase();

    // Tags
    this.el.revealedTags.innerHTML = '';
    animal.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'meta-tag';
      span.textContent = tag;
      this.el.revealedTags.appendChild(span);
    });

    // Fact
    this.el.revealedFact.textContent = animal.fact;

    // Summary
    const finalQuestionCount = Math.min(this.maxQuestions, Math.max(1, this.currentQuestionNumber - 1));
    const certainty = this.candidatePool.length === 1 ? '99%' : '94%';
    this.el.guessSummaryPill.innerHTML = `Guessed in <strong>${finalQuestionCount}</strong> questions with <strong>${certainty}</strong> certainty!`;

    this.switchScreen('guess');
  }

  showDefeatScreen() {
    this.sfx.playDefeat();
    this.el.defeatFeedback.classList.add('hidden');
    this.el.userAnimalInput.value = '';
    this.switchScreen('defeat');
    setTimeout(() => this.el.userAnimalInput.focus(), 200);
  }

  handleTeachOracle() {
    const inputVal = this.el.userAnimalInput.value.trim();
    if (!inputVal) return;

    this.sfx.playYes();
    this.el.defeatFeedbackText.textContent = `Aha! The wondrous ${inputVal}! My mystical scrolls have recorded this knowledge for next time. ✨`;
    this.el.defeatFeedback.classList.remove('hidden');

    // Optionally save locally
    try {
      const learned = JSON.parse(localStorage.getItem('akinator_learned_animals') || '[]');
      learned.push(inputVal);
      localStorage.setItem('akinator_learned_animals', JSON.stringify(learned));
    } catch (e) {
      // safe fallback
    }
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.akinatorApp = new AkinatorGame();
});

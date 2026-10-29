const jungle = document.querySelector('#jungle');
const bgm = document.querySelector('#bgm');
const speciesName = document.querySelector('#species-name');
const specimenCard = document.querySelector('#specimen-card');
const soundFiles = Array.from({ length: 15 }, (_, index) => `sounds/s${index + 1}.wav`);
const latinNames = [
  'Panthera nebulosa', 'Vulpes viridens', 'Lynx aurora', 'Canis silvarum',
  'Felis rubriflora', 'Ursus noctiluca', 'Mustela caelestis', 'Pardus umbratus',
  'Cervus ferox', 'Aquila muscaria', 'Lutra grandis', 'Rupicapra fulgens',
  'Sciurus astralis', 'Procyon florens', 'Tigris paludosa', 'Bubo argentum'
];
bgm.volume = 0.12;
function shuffled(items) { return [...items].sort(() => Math.random() - 0.5); }
const assignedSounds = [...shuffled(soundFiles), soundFiles[Math.floor(Math.random() * soundFiles.length)]];
let activeCall;
function playAnimalCall(animal) {
  if (activeCall) { activeCall.pause(); activeCall.currentTime = 0; }
  activeCall = new Audio(animal.sound);
  activeCall.volume = 0.72;
  activeCall.play();
  speciesName.textContent = animal.name;
  specimenCard.hidden = false;
  bgm.play().catch(() => {});
}
const animals = Array.from({ length: 16 }, (_, index) => {
  const image = document.createElement('img');
  const fileNumber = String(index).padStart(2, '0');
  image.src = `images/my_diffusion_${fileNumber}.png`;
  image.alt = `Imagined animal ${index + 1}`;
  image.className = 'animal';
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `Hear ${latinNames[index]}`);
  jungle.append(image);
  const size = Math.min(Math.max(window.innerWidth * 0.11, 76), 170);
  const animal = { image, name: latinNames[index], sound: assignedSounds[index], size, x: Math.random() * Math.max(1, window.innerWidth - size), y: Math.random() * Math.max(1, window.innerHeight - size), dx: (Math.random() * 1.15 + .35) * (Math.random() < .5 ? -1 : 1), dy: (Math.random() * 1.15 + .35) * (Math.random() < .5 ? -1 : 1) };
  image.addEventListener('click', () => playAnimalCall(animal));
  image.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); playAnimalCall(animal); }
  });
  return animal;
});
function moveAnimals() {
  const width = window.innerWidth, height = window.innerHeight;
  animals.forEach(animal => {
    animal.x += animal.dx; animal.y += animal.dy;
    if (animal.x <= 0 || animal.x + animal.size >= width) { animal.dx *= -1; animal.x = Math.max(0, Math.min(animal.x, width - animal.size)); }
    if (animal.y <= 0 || animal.y + animal.size >= height) { animal.dy *= -1; animal.y = Math.max(0, Math.min(animal.y, height - animal.size)); }
    animal.image.style.transform = `translate(${animal.x}px, ${animal.y}px)`;
  });
  requestAnimationFrame(moveAnimals);
}
window.addEventListener('resize', () => animals.forEach(animal => { animal.size = Math.min(Math.max(window.innerWidth * .11, 76), 170); animal.x = Math.min(animal.x, window.innerWidth - animal.size); animal.y = Math.min(animal.y, window.innerHeight - animal.size); }));
moveAnimals();

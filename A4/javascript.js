const promptInput = document.querySelector('#prompt');
const generateButton = document.querySelector('#generate-button');
const characterCount = document.querySelector('#character-count');
const image = document.querySelector('#generated-image');
const placeholder = document.querySelector('#artwork-placeholder');
const loading = document.querySelector('#loading-layer');
const status = document.querySelector('#status');
const downloadButton = document.querySelector('#download-button');

promptInput.addEventListener('input', () => {
  characterCount.textContent = `${promptInput.value.length} / 1000`;
});
characterCount.textContent = `${promptInput.value.length} / 1000`;

function titleFromPrompt(prompt) {
  const clean = prompt.replace(/[.,;:!?]+/g, '').trim().split(/\s+/).slice(0, 5).join(' ');
  return clean ? `${clean.charAt(0).toUpperCase()}${clean.slice(1)}` : 'Untitled';
}

generateButton.addEventListener('click', async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) { promptInput.focus(); return; }
  generateButton.disabled = true;
  generateButton.innerHTML = 'Creating…';
  loading.hidden = false;
  status.textContent = 'IN PROGRESS';
  try {
    const response = await fetch('/generate', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'The artwork could not be created.');
    image.src = result.image;
    image.hidden = false;
    placeholder.hidden = true;
    document.querySelector('#art-title').innerHTML = `<em>${result.metadata.title}</em>`;
    document.querySelector('#artist-name').textContent = result.metadata.artist;
    document.querySelector('#year').textContent = result.metadata.year;
    document.querySelector('#medium').textContent = result.metadata.medium;
    document.querySelector('#dimensions').textContent = result.metadata.dimensions;
    document.querySelector('#provenance').textContent = result.metadata.provenance;
    document.querySelector('#credit-line').textContent = result.metadata.credit_line;
    downloadButton.hidden = false;
    status.textContent = 'CATALOGUED';
  } catch (error) {
    status.textContent = 'PLEASE TRY AGAIN';
    alert(error.message);
  } finally {
    loading.hidden = true;
    generateButton.disabled = false;
    generateButton.innerHTML = 'Create artwork <span aria-hidden="true">↗</span>';
  }
});

downloadButton.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = image.src; link.download = 'prompt-gallery-artwork.png'; link.click();
});

# Wild Tongues — CART 498 A5

A responsive single-page field archive of 16 generated imagined animals and their fictional language.

I grabbed this animal training dataset on hugginface to train my model. I used the notebook that was provided to us in class for training process/image generation and sound generation.

I unfortunately ran into a couple issues when creating this jungle. After a lot of trial and errors with the image generation process, I eventually ran out of gpu allocation, naturally, I didn't want to spend more money than i should've so I had to downgrade to cpu usage, which multiplied the waiting time tenfolds; it took around 3 hours to generate the final images. I didn't change the amount of training steps because I was curious to see the quality of 5000 steps.

The sound generation took way less time. I used a prompt to generate me an 8-bit background music and animal sounds. For the naming convention of the animals i chose to make their names latin to make it sound a bit more sophisticated.

For the language of the animals I asked codex to translate gibberish into something witty. 

I used codex for the building of the whole website and helped me with the script.

[Open the project in your browser](./index.html)

## Run / host

Open `index.html` in a browser, or deploy this folder unchanged with GitHub Pages, Netlify, or Vercel. There is no build step.

## Animal-language prompt

> Invent a short, speakable phrase for a fictional animal. Use 2–5 syllables, soft consonant clusters, and no recognizable real language. Give an English field-note gloss describing a social, emotional, or environmental meaning.

The resulting 15 phrases are in `script.js`, paired with each generated image.



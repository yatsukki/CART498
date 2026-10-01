from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Define the poem
poem = """
One must have a mind of winter
To regard the frost and the boughs
Of the pine-trees crusted with snow;
And have been cold a long time
To behold the junipers shagged with ice,
The spruces rough in the distant glitter
Of the January sun; and not to think
Of any misery in the sound of the wind,
In the sound of a few leaves,
Which is the sound of the land
Full of the same wind
That is blowing in the same bare place
For the listener, who listens in the snow,
And, nothing himself, beholds
Nothing that is not there and the nothing that is.
"""

# Load pre-trained GPT-2 model and tokenizer
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Set pad_token for batch encoding if not already set
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

modified_lines = []

for line in poem.strip().split('\n'):
    # Skip empty lines
    if not line.strip():
        modified_lines.append(line)
        continue

    words = line.split()
    if not words:
        modified_lines.append(line)
        continue

    # Separate the last word from the rest of the line
    last_word = words[-1]
    prefix = " ".join(words[:-1])

    # Encode the prefix
    inputs = tokenizer.encode(prefix, return_tensors='pt', add_special_tokens=False)

    # Get model predictions for the next token
    with torch.no_grad():
        outputs = model(inputs)
        predictions = outputs.logits[0, -1, :]

    # Get the top token probabilities
    # We need to filter out tokens that are not printable or are special tokens if we want better readability
    # For simplicity, we'll take the raw top tokens and then try to clean them if needed.
    sorted_indices = torch.argsort(predictions, descending=True)

    # Find the 7th highest probability token that is reasonably decodable
    chosen_token = None
    for i in range(len(sorted_indices)):
        token_id = sorted_indices[i].item()
        decoded_token = tokenizer.decode(token_id).strip()
        # Filter out empty strings, special tokens, or tokens that are just punctuation if possible
        if decoded_token and not tokenizer.convert_ids_to_tokens(token_id).startswith('<') and '\n' not in decoded_token:
            if i == 40: # 0-indexed 7th highest
                chosen_token = decoded_token
                break

    if chosen_token is None: # Fallback if 7th valid token isn't found, e.g., if many special tokens are at the top
        chosen_token = tokenizer.decode(sorted_indices[0].item()).strip() # Use the most probable one as fallback
        if not chosen_token: chosen_token = last_word # Fallback to original if even top token is problematic

    # Reconstruct the line with the new last word
    # Attempt to preserve original capitalization and punctuation for the new word if it makes sense.
    # This is a simplification, a more robust solution would involve more NLP. 
    new_last_word = chosen_token
    if last_word and last_word[-1] in ['.', ',', ';', ':', '!', '?']:
        punctuation = last_word[-1]
        if chosen_token.endswith(punctuation): # Avoid double punctuation
            new_last_word = chosen_token
        else:
            new_last_word = chosen_token + punctuation
    
    # Check if the new_last_word starts with an uppercase letter if the original last_word did
    if last_word and last_word[0].isupper() and new_last_word and new_last_word[0].islower():
        new_last_word = new_last_word.capitalize()

    modified_line = f"{prefix} {new_last_word}"
    modified_lines.append(modified_line)

# Store the altered lines in the provided variable
altered_lines_p17 = modified_lines

# Print the modified poem
print("\n".join(altered_lines_p17))
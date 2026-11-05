import ollama
 
MODEL = "llama3.2:1b"
 
response = ollama.chat(
    model=MODEL,
    messages=[{"role": "user", "content": "Hello!"}],
)
 
print(response.message.content)
 
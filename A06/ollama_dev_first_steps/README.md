# Ollama basics (for developers)
 
A minimal Python example that sends `Hello!` to a local Ollama model and prints the reply. Everything runs on your own computer, with no account, API key, or paid plan.

## Requirements

- macOS, Windows, or Linux
- Python 3.9 or newer
- Ollama installed and running
- About 1.3 GB of disk space for the `llama3.2:1b` model

Responses may be slower on computers with limited memory or no supported GPU.

## 1. Install Ollama

- **macOS:** Download the app from https://ollama.com/download, open it, and leave it running (it appears in the menu bar).
- **Windows:** Download the installer from https://ollama.com/download, run it, and leave Ollama running in the system tray.
- **Linux:** Run `curl -fsSL https://ollama.com/install.sh | sh`. This normally starts the Ollama service automatically. If it isn't running, start it with `ollama serve` in a separate terminal.

Check the install by opening a new terminal and running:

```bash
ollama --version
```

If the command isn't found on macOS, run `export PATH="/Applications/Ollama.app/Contents/Resources:$PATH"` and try again.

## 2. Create the project files

Create a folder for the project and add two files to it.

**`requirements.txt`**: copy this in exactly:

```text
ollama
```

**`app.py`**: copy this in exactly:

```python
import ollama

MODEL = "llama3.2:1b"

response = ollama.chat(
    model=MODEL,
    messages=[{"role": "user", "content": "Hello!"}],
)

print(response.message.content)
```

## 3. Set up and run

Open a terminal in the project folder, then follow the steps for your system.

### macOS and Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
ollama pull llama3.2:1b
python app.py
```

### Windows (PowerShell)

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
ollama pull llama3.2:1b
python app.py
```

If PowerShell blocks the activation script, run `Set-ExecutionPolicy -Scope Process RemoteSigned` and try again. In Command Prompt, activate with `.venv\Scripts\activate.bat` instead.

The first `ollama pull` downloads the model, and later runs reuse it. You should see a short greeting printed in your terminal.

## How it works

```text
app.py ── ollama.chat(...) ──> Ollama running on this computer ──> llama3.2:1b
  <──────────────────────────── reply text ────────────────────────────────
```

The Python package talks to the Ollama service on your machine (by default at `http://localhost:11434`), which loads the model and returns the reply.

## Customize it

- **Change the message:** edit the `content` value in `app.py`.
- **Try another model:** run `ollama pull llama3.2`, then change `MODEL` to `"llama3.2"`. Browse more at https://ollama.com/library.
- **See what's installed:** run `ollama list`.

## Troubleshooting

- **`ConnectionError` or "connection refused":** Ollama isn't running. Open the Ollama app (macOS/Windows) or run `ollama serve` (Linux).
- **`model not found`:** Run `ollama pull llama3.2:1b` and make sure `MODEL` in `app.py` matches.
- **`ollama: command not found`:** Reopen your terminal after installing, or see the PATH note in step 1.
- **Very slow replies:** Close other heavy programs, or stay with the 1B model.

## Project notes

- **Pipeline diagram:** shown above.
- **Creative piece documentation:** add a link to your video, audio, images, or screenshots here.
- **Slides:** add your public slide link here before presenting.

## References

Ollama. n.d. “Quickstart.” Accessed October 29, 2026. https://docs.ollama.com/quickstart.

Ollama. n.d. “Python Library.” Accessed October 29, 2026. https://github.com/ollama/ollama-python.

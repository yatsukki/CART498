# Ollama Basics: Run a Local AI Model from the Terminal in Under 30 Minutes

This guide gets an AI model running **on your own computer** using only the terminal. You will install the Ollama app, download a small model, and chat with it. No programming is required, and another student should be able to follow it from scratch in under 30 minutes.

## At a glance

| Question | Answer |
| --- | --- |
| **Cost** | $0. Ollama and the `llama3.2:1b` model are free to download and use. |
| **Accounts needed** | None. No sign-up, API key, or paid plan. |
| **Internet needed** | Only to download Ollama and the model (about 1.5 GB total). The model runs offline afterward. |
| **Time** | About 10 to 20 minutes, mostly download time. |

## Requirements

**Operating system** (Ollama n.d.a):

- macOS 14 (Sonoma) or newer
- Windows 10 (version 22H2) or newer, or Windows 11
- Linux (a recent distribution)

**Hardware:**

- 8 GB of RAM recommended. The small model used here may run with less, but slowly.
- About 5 GB of free disk space (the app plus the 1.3 GB model).
- A GPU is not required. Replies are slower on computers without a supported GPU.

Check the current requirements on the Ollama download page before you start, since they can change.

## Step 1: Open a terminal

- **macOS:** Open **Terminal** (Applications > Utilities > Terminal, or search with Spotlight).
- **Windows:** Open **PowerShell** (search for it in the Start menu).
- **Linux:** Open your terminal application.

## Step 2: Install Ollama from the terminal (about 5 minutes)

Run the command for your system.

### macOS

This uses [Homebrew](https://brew.sh). If you do not have it, download the app from https://ollama.com/download instead (see the note below).

```bash
brew install --cask ollama
```

Then start the app so its background service is running:

```bash
open -a Ollama
```

### Windows (PowerShell)

```powershell
winget install Ollama.Ollama
```

When it finishes, Ollama runs in the system tray (bottom-right of the screen, possibly under the `^` arrow). Close PowerShell and open a **new** PowerShell window so the `ollama` command is available.

### Linux

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

This normally starts the Ollama service automatically. If it is not running, start it in a separate terminal with `ollama serve`.

> **Prefer a regular installer?** On macOS and Windows you can instead download the Ollama app from https://ollama.com/download, open it, and follow the prompts (Ollama n.d.a). Leave it running, then continue with step 3.

### Check that it worked

In a terminal, run:

```bash
ollama --version
```

If you see a version number, you are ready. If macOS says the command is not found, run this and try again:

```bash
export PATH="/Applications/Ollama.app/Contents/Resources:$PATH"
```

## Step 3: Download the model (about 5 to 10 minutes)

```bash
ollama pull llama3.2:1b
```

This downloads about 1.3 GB the first time. Later runs reuse it.

## Step 4: Run it

```bash
ollama run llama3.2:1b
```

When you see the `>>>` prompt, type a message and press Enter:

```text
>>> Hello!
```

The model will print a short reply. The exact wording varies from run to run. To quit, type `/bye` and press Enter (or press `Ctrl+D`).

You can also send a single message without opening the chat:

```bash
ollama run llama3.2:1b "Hello!"
```

## Pipeline diagram

```text
Terminal ── ollama run ──> Ollama running on this computer ──> llama3.2:1b
   <──────────────────────────── reply text ────────────────────────────
```

1. You type a message in the terminal.
2. The `ollama` command sends it to the Ollama app running locally on your computer.
3. Ollama loads `llama3.2:1b` and generates a reply.
4. The reply text is printed back in your terminal.

Nothing leaves your computer after the model is downloaded (Ollama n.d.b).

## Troubleshooting

- **"could not connect to ollama" or "connection refused":** Ollama is not running. Open the Ollama app (macOS or Windows), or run `ollama serve` (Linux).
- **`ollama: command not found`:** Close and reopen your terminal after installing. On macOS, see the PATH note in step 2.
- **`brew` or `winget` not found:** Use the regular installer from https://ollama.com/download instead.
- **Model not found:** Run `ollama pull llama3.2:1b` again and check the spelling.
- **Very slow replies:** Close other heavy programs and stay with the 1B model.

## Useful commands

| Command | What it does |
| --- | --- |
| `ollama list` | Shows the models you have downloaded |
| `ollama pull llama3.2` | Downloads a larger, more capable model (needs more RAM and disk space) |
| `ollama rm llama3.2:1b` | Deletes a model to free up disk space |
| `ollama --help` | Lists all commands |

## Project notes

- **Creative piece documentation:** add a link to your video, audio, images, or screenshots here.
- **Slides:** add your public slide link here before presenting.

## References

Ollama. n.d.a. "Download Ollama." Accessed November 2, 2026. https://ollama.com/download.

Ollama. n.d.b. "Quickstart." Accessed November 2, 2026. https://docs.ollama.com/quickstart.

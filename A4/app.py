"""Prompt Gallery server. Install dependencies: pip install flask openai"""
import base64
import os
from datetime import datetime

from flask import Flask, jsonify, request, send_from_directory
from openai import OpenAI

app = Flask(__name__, static_folder=".", static_url_path="")

# API KEY SETUP: Paste your key between the quotes, or set OPENAI_API_KEY in your environment.
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")


@app.get("/")
def home():
    return send_from_directory(".", "index.html")


@app.post("/generate")
def generate():
    prompt = (request.get_json(silent=True) or {}).get("prompt", "").strip()
    if not prompt:
        return jsonify(error="Please enter a prompt."), 400
    if OPENAI_API_KEY == "PASTE_YOUR_OPENAI_API_KEY_HERE":
        return jsonify(error="Add your OpenAI API key in app.py before generating an image."), 500

    try:
        client = OpenAI(api_key=OPENAI_API_KEY)
        result = client.images.generate(
            model="gpt-image-1",
            prompt=prompt,
            size="1024x1024",
            quality="medium",
            output_format="png",
        )
        image_data = result.data[0].b64_json
        image_url = f"data:image/png;base64,{image_data}"
    except Exception as error:
        return jsonify(error=f"Image generation failed: {error}"), 500

    words = prompt.replace("\n", " ").strip().split()
    title = " ".join(words[:6]).capitalize() or "Untitled"
    year = str(datetime.now().year)
    return jsonify(image=image_url, metadata={
        "title": title,
        "artist": "Prompt Gallery Studio",
        "year": year,
        "medium": "Digital image, generated from text",
        "dimensions": "1024 × 1024 px",
        "provenance": "Generated for this collection",
        "credit_line": "Courtesy of the artist and Prompt Gallery",
    })


if __name__ == "__main__":
    app.run(debug=True)

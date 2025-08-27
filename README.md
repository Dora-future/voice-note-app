# Voice Notes (Web)

Lightweight, installable web app for **voice‑dictated note taking**. Uses the **Web Speech API** for speech‑to‑text, and **localStorage** for offline persistence.

## Features
- Start/stop microphone to **dictate notes**
- **Search** notes (includes tags: use `#yourtag` in search)
- **Tags** per note
- **Export/Import** JSON backup
- **PWA**: add to home screen and use offline

> Works best in Chrome/Edge on desktop and Android. iOS Safari supports Web Speech for dictation in mic mode (availability can vary).

## Quick Start
```bash
# 1) Extract, then inside the folder:
npm install
npm run dev

# 2) Open the shown URL (usually http://localhost:5173)
```

## Build
```bash
npm run build
npm run preview
```

## Notes
- If your browser denies microphone, allow it in the address bar.
- Dictation language is set to `en-GB`; update in `useSpeechToText.js` if desired.
- All data is stored locally in your browser. Use **Export** to back it up.

# TODO: Fix PDF Export for Non-Latin Scripts

## Steps to Complete

- [x] Update downloadUtils.js to embed fonts and switch based on language
- [ ] Obtain base64 encoded Noto Sans fonts for supported languages
- [ ] Replace placeholder base64 strings in downloadUtils.js
- [x] Test PDF export with Latin script languages only (non-Latin languages removed)
- [x] Ensure text is plain Unicode (UTF-8) - already handled by stripping HTML tags

## Font Requirements

- Hindi (hi-IN): NotoSansDevanagari-Regular.ttf → base64
- Chinese (zh-CN): NotoSansSC-Regular.ttf → base64
- Japanese (ja-JP): NotoSansJP-Regular.ttf → base64
- Arabic (ar-SA): NotoSansArabic-Regular.ttf → base64

## Instructions for Font Conversion

Since jspdf-fontconverter is not available, use one of these methods:

### Method 1: Online Converter

1. Download TTF fonts from Google Fonts:
   - https://fonts.google.com/noto/specimen/Noto+Sans+Devanagari
   - https://fonts.google.com/noto/specimen/Noto+Sans+SC
   - https://fonts.google.com/noto/specimen/Noto+Sans+JP
   - https://fonts.google.com/noto/specimen/Noto+Sans+Arabic
2. Use an online base64 converter like https://base64.guru/converter/encode/font
3. Replace the PLACEHOLDER*BASE64*... strings in downloadUtils.js

### Method 2: Node.js Script

Create a script to convert TTF to base64:

```javascript
const fs = require("fs");
const fontPath = "path/to/font.ttf";
const base64 = fs.readFileSync(fontPath).toString("base64");
console.log(base64);
```

### Method 3: Use existing jsPDF font tools

Check if jsPDF has built-in support or use another package like 'ttf2base64' if available.

## Notes

- The code is ready to use the fonts once base64 strings are provided
- For multi-language documents, the current implementation switches font based on selected language
- If text contains multiple scripts, may need to detect and use appropriate fonts per section

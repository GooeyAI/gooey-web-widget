# Quick Setup Guide

1. Install Node LTS version (v18) using [nvm](https://github.com/nvm-sh/nvm)
```bash
nvm install 18.12.0
```
2. Clone this repo
```bash
git clone https://github.com/GooeyAI/gooey-web-widget.git
```
4. cd into your cloned directory & install dependencies
```bash
npm install
```
5. Start React server
```bash
npm run dev
```
6. Open [localhost:5173](http://localhost:5173) in your browser
7. Build library
 ```bash
npm run build
```
8. Find the output in `dist/`
9. Test injection by opening `test-site/index.html`

## Notes

- `src/widgets/*` -> List of Embeddable React Components

- `/test-site/index.html` -> Test Injection in html file

- `src/lib.ts` -> Library entry point

- `vite.config.js` -> Configuration for bundling the library

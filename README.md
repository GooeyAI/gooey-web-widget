# Widget Setup Guide
1. Copy below code inside `<body>` in the target html file (where you want to embed the widget)
```bash
<gooey-embed-copilot></gooey-embed-copilot>
<script src="https://cdn.jsdelivr.net/gh/GooeyAI/gooey-web-widget@v1.0.20/dist/lib.js"></script>
<script>
    const config = {
      type: "copilot-fab", // type of widget (copilot-fab / copilot-direct)
      bot_id: "BOT_ID", // Bot ID
      bot_profile: {
        title: "Farmer.CHAT",
        description:
          "An AI Assistant designed to help farmer extension agents in India.",
        created_by: "Digital Green",
        display_picture:
          "https://digitalgreen.org/wp-content/themes/digital-green/images/favicons/apple-touch-icon.png",
        creator_link: "https://digitalgreen.org/",
      },
      link_color: "#FFD700",
      widget_text: "Help",
      questions: [
        "When should I plant chili?",
        "How can I get rid of black ants on my coffee?",
        "What is the best time to grow pepper in India?",
      ],
      show_gooey_branding: true,
      show_sources: false,
    }
    GooeyEmbed.mount(config);
</script>
```

2. Replace "API_SECRET_KEY" and "BOT_ID" with your values

- `/test.html` -> Refer to this file to check how html code should look like

## Widget Types

#### `copilot-fab`: This type renders a Floating Action Button in the window with pop-up widget.
<img width="400" alt="Screenshot 2024-04-11 at 4 43 31 PM" src="https://github.com/GooeyAI/gooey-web-widget/assets/65861855/677fc8b5-340c-426b-a140-81aefa4c88b8">

#### `copilot-direct`: This will directly insert the widget in the targeted div.
<img width="400" alt="Screenshot 2024-04-11 at 4 39 57 PM" src="https://github.com/GooeyAI/gooey-web-widget/assets/65861855/33fd3a35-4bf0-4700-be48-dc0d169d6ed3">


# Project Setup Guide

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

- `src/lib.ts` -> Library entry point

- `vite.config.js` -> Configuration for bundling the library

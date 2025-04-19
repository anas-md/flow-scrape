# Flow Scrape

<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="next.js" />
    <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react" />
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=4169E1" alt="postgresql" />
    <img src="https://img.shields.io/badge/-Puppeteer-black?style=for-the-badge&logoColor=white&logo=puppeteer&color=40B5A4" alt="puppeteer" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=white&logo=prisma&color=2D3748" alt="prisma" />
  </div>
</div>

This is a highly customizable web scraper built with Next.js 14, PostgreSQL, Prisma, and React Flow. It enables users to create, manage, and execute complex web scraping workflows with a visual, no-code/low-code interface. The scraper comes with advanced features such as AI-based data extraction.

## <a name="tech-stack">Tech Stack</a>

- Next.js 14 (with Server Actions)
- React Flow
- PostgreSQL (with Neon DB)
- Puppeteer
- Prisma

## Features

- **Launch Browser**: Initiates a browser instance to begin the web scraping process, enabling interaction with web pages.
- **Page to HTML**: Extracts the complete HTML content of the current page for detailed analysis and processing.
- **Extract Text from Element**: Retrieves the text content from a specified HTML element using a given CSS selector.
- **Fill Input**: Automatically fills a specified input field with a desired value, emulating user input.
- **Click Element**: Simulates a click action on a specified HTML element, triggering any associated events or navigation.
- **Scroll to Element**: Scrolls to a specified element on the page, emulating user behavior for dynamic content loading.
- **Wait for Element**: Pauses the workflow until a specified element becomes visible or hidden on the page.
- **Extract Data via AI**: Uses AI to parse HTML content and extract structured data based on a custom prompt, returning JSON output.
- **Read JSON**: Reads and retrieves a specific key or property from a JSON object for use in workflows.
- **Build JSON**: Adds or updates data within an existing JSON object or creates a new one with the specified properties.
- **Deliver via Webhook**: Sends the scraped data to an external API endpoint through a POST request for further processing or storage.
- **Navigate to URL**: Navigates to a specified URL, loading the desired web page for scraping or interaction.

## Getting Started

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (Node Package Manager) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

**Cloning the Repository**

```bash
git clone https://github.com/your-username/flow-scrape.git # Replace with your repo URL if different
cd flow-scrape
```

**Installation**

Install the project dependencies (choose one):

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

**Running the Project**

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified in the output) in your browser to view the project.


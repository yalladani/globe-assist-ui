# Globe – CSM Assistant

Welcome to **Globe**, an internal support platform built to serve Customer Success Managers (CSMs) at Global-e.

This tool provides CSMs with fast, clear access to key product information in response to merchant questions across three main areas:
- Shipments  
- Payments  
- Configuration

The user interface integrates seamlessly with our internal AI agent built using **Cursor** and **Atlassian MCP**.


## 🚀 Quick Start

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository
git clone https://github.com/YOUR_USERNAME/globe-assist-ui.git

# Step 2: Navigate to the project directory.
cd globe-assist-ui

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server
npm run dev
```

## 🛠️ Development

### Local Development
```sh
npm run dev
```

### Build for Production
```sh
npm run build
```

### Preview Production Build
```sh
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/            # shadcn/ui components
│   └── ...            # Custom components
├── pages/             # Page components
├── types/             # TypeScript types
├── data/              # Mock data
└── lib/               # Utilities
```

## 🛠️ Technologies

This project is built with:

- **Vite** - Fast build tool
- **TypeScript** - Type safety
- **React 18** - UI framework
- **shadcn/ui** - Component library
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **TanStack Query** - Data fetching


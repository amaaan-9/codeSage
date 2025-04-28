# CodeSage - AI-Powered Code Review Tool

![CodeSage Logo](public/logo.png)

## Overview

CodeSage is a modern web application that provides AI-powered code reviews. It uses Google's Generative AI (Gemini) to analyze code and provide detailed feedback, suggestions for improvements, and best practices.

## Features

- 🎨 Modern, responsive UI with smooth animations
- 🤖 AI-powered code analysis and review
- ✨ Syntax highlighting for multiple languages
- 📋 One-click code copying
- 🌈 Custom scrollbars and animations
- 🔄 Real-time code review feedback
- 💾 Code and review state management

## Tech Stack

### Frontend
- React 19
- Vite
- PrismJS for syntax highlighting
- Locomotive Scroll for smooth scrolling
- React Simple Code Editor

### Backend
- Node.js
- Express
- Google Generative AI (Gemini)
- CORS
- dotenv

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
code-reviewer/
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   ├── App.css          # Main styles
│   │   ├── main.jsx         # Entry point
│   │   └── styles/          # Additional styles
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
└── backend/
    ├── src/
    │   ├── app.js           # Express application setup
    │   ├── controllers/     # Request handlers
    │   ├── routes/          # API routes
    │   └── services/        # Business logic
    ├── .env                 # Environment variables
    └── package.json         # Backend dependencies

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Generative AI for providing the code review capabilities
- React team for the amazing frontend framework
- All contributors and users of the project

# AI Quiz Master

## Overview
An AI-powered quiz application that generates dynamic multiple-choice questions using OpenRouter's DeepSeek API. Users can test their knowledge in VLSI, React, and Digital Signals with timed challenges and instant feedback.

## Features
- **AI Question Generation**: Leverages DeepSeek API to create unique quiz questions
- **Three Categories**: VLSI, React, and Digital Signals
- **Flexible Configuration**: 5-20 questions, 1-5 minute timers
- **Real-time Quiz Experience**: Live countdown timer with automatic submission
- **Instant Feedback**: Immediate answer validation after each question
- **Detailed Results**: Score breakdown with question-by-question review
- **Learning Resources Hub**: Comprehensive learning materials with curated YouTube videos
- **Dark Mode Support**: Full theme switching capability
- **Responsive Design**: Optimized for desktop and mobile

## Tech Stack
- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **API**: OpenRouter DeepSeek API for question generation
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter

## Project Structure
```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── quiz/
│   │   │   │   ├── QuizSetup.tsx       # Category, timer, count selection
│   │   │   │   ├── QuizInterface.tsx   # Question display and timer
│   │   │   │   └── QuizResults.tsx     # Score and review screen
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx                # Main quiz orchestrator
│   │   │   ├── LearningResources.tsx   # Learning hub with tutorials
│   │   │   ├── Notes.tsx               # Notes page with sidebar
│   │   │   └── notes/
│   │   │       ├── DigitalElectronicsNotes.tsx
│   │   │       ├── VerilogNotes.tsx
│   │   │       └── VLSINotes.tsx
│   │   └── App.tsx
├── server/
│   ├── routes.ts                       # API endpoint for quiz generation
│   └── storage.ts                      # Storage interface (minimal)
└── shared/
    └── schema.ts                       # TypeScript types and Zod schemas
```

## API Endpoints
- `POST /api/quiz/generate` - Generate quiz questions
  - Request: `{ category: string, questionCount: number }`
  - Response: `{ questions: Array<QuizQuestion> }`

## Environment Variables
- `OPENROUTER_API_KEY` - OpenRouter API key for DeepSeek integration

## User Flow
1. **Setup**: Select category, question count (5-20), and timer (1-5 minutes)
2. **Quiz**: Answer multiple-choice questions with live timer
3. **Results**: View score, performance badge, and detailed answer review

## Learning Resources Page
The new Learning Resources page (`/learning`) provides a comprehensive learning hub with:

### Sections
1. **Notes**: Essential study tips and best practices for Digital Electronics, Verilog, and VLSI
   - Click on any note card to access detailed notes pages (`/notes`)
   - Sidebar navigation for easy topic switching
   - Comprehensive explanations with examples and formulas
2. **Tutorials**: Curated YouTube video playlists from top educators:
   - Neso Academy (Digital Electronics & Verilog)
   - The Organic Chemistry Tutor
   - NPTEL IIT Kharagpur & IIT Madras (VLSI)
   - Intel FPGA
3. **Topic Library**: Structured breakdown of all major topics with subtopics:
   - Number Systems and Codes
   - Boolean Algebra and Logic Gates
   - Combinational & Sequential Logic
   - Verilog HDL Fundamentals & Advanced Concepts
   - VLSI Design Fundamentals
4. **Key Concepts**: Quick reference glossary of essential terms and definitions

### Features
- Tabbed interface for easy navigation
- Expandable accordion sections for video tutorials
- Direct links to YouTube resources
- Responsive design with mobile optimization
- Dark mode support

## Recent Changes
- Added comprehensive Learning Resources page with curated educational content
- Integrated navigation between Quiz and Learning sections
- Initial project setup with full quiz functionality
- Implemented OpenRouter DeepSeek API integration
- Created responsive UI with theme support
- Added comprehensive error handling and validation

## Design System
- **Primary Color**: Vibrant blue (#4F9BF8) for CTAs and timer
- **Success Color**: Green for correct answers
- **Error Color**: Red for incorrect answers
- **Typography**: Inter font family for clean, modern look
- **Spacing**: Consistent 4, 6, 8, 12, 16 unit system
- **Interactions**: Smooth transitions with hover/active states

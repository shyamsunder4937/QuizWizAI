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
│   │   │   └── Home.tsx                # Main quiz orchestrator
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

## Recent Changes
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

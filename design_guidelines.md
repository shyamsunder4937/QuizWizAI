# Design Guidelines: AI-Powered Quiz Application

## Design Approach
**System-Based Approach** with inspiration from modern quiz platforms (Typeform, Kahoot, Quizlet). Focus on clarity, readability, and minimal cognitive load during quiz-taking with clean, professional aesthetics suitable for technical educational content.

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 239 84% 67% (Vibrant blue for actions, timer, progress)
- Secondary: 217 91% 60% (Accent for hover states)
- Success: 142 71% 45% (Correct answers)
- Error: 0 84% 60% (Incorrect answers)
- Warning: 38 92% 50% (Timer warnings)
- Background: 0 0% 98% (Main background)
- Surface: 0 0% 100% (Cards, question containers)
- Text Primary: 222 47% 11% (Headings, questions)
- Text Secondary: 215 16% 47% (Descriptions, labels)
- Border: 214 32% 91% (Dividers, card borders)

**Dark Mode:**
- Primary: 239 84% 67% (Consistent with light mode)
- Secondary: 217 91% 60%
- Success: 142 71% 55%
- Error: 0 84% 70%
- Warning: 38 92% 60%
- Background: 222 47% 11% (Deep dark background)
- Surface: 217 33% 17% (Elevated surfaces)
- Text Primary: 210 40% 98% (High contrast text)
- Text Secondary: 215 20% 65% (Muted text)
- Border: 217 33% 23% (Subtle borders)

### B. Typography
- **Primary Font:** Inter (Google Fonts) - Clean, highly legible
- **Headings:** 
  - Quiz Title: text-3xl to text-4xl, font-bold
  - Question Text: text-xl to text-2xl, font-semibold
  - Section Headers: text-lg, font-medium
- **Body Text:**
  - Options: text-base, font-normal
  - Labels/Metadata: text-sm, font-medium
  - Timer: text-2xl to text-3xl, font-bold, tabular-nums
- **Line Height:** Generous (leading-relaxed) for readability

### C. Layout System
- **Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16 (p-4, m-8, gap-6, etc.)
- **Max-Width Constraints:**
  - Quiz container: max-w-3xl (centered)
  - Setup screen: max-w-2xl
  - Results: max-w-4xl
- **Vertical Rhythm:** Consistent py-8 to py-12 for sections, gap-6 between components

### D. Component Library

**Quiz Setup Screen:**
- Card-based layout with shadow-lg elevation
- Category selector: Grid of 3 cards (grid-cols-1 md:grid-cols-3) with hover states, icons for each category (code brackets for React, chip for VLSI, sine wave for Digital Signals)
- Question count: Segmented control or dropdown (5, 10, 15, 20 options)
- Timer selector: Radio buttons or button group (1, 2, 5 minutes)
- Start Quiz CTA: Large, prominent button (w-full md:w-auto)

**Quiz Interface:**
- Sticky header with: Timer (prominent, top-right), Progress indicator (Question X of Y), Topic badge
- Question card: Generous padding (p-8), subtle border, centered content
- Options: Full-width radio buttons with:
  - Clear hover states (bg-opacity-50)
  - Selected state with border accent
  - After answer: Green background for correct, red for incorrect
  - Smooth transitions (transition-all duration-200)
- Navigation: Next/Submit button (bottom-right, large, sticky on mobile)

**Timer Component:**
- Circular progress ring OR horizontal progress bar
- Color transitions: Blue → Yellow (last 30s) → Red (last 10s)
- Pulse animation when under 10 seconds
- Clear time remaining display

**Results Screen:**
- Hero-style score display: Large percentage (text-6xl), animated count-up
- Performance badge: Visual indicator (Excellent/Good/Needs Practice)
- Question-by-question breakdown: Accordion or card list showing:
  - Question text
  - User's answer vs correct answer
  - Color-coded result indicator
- Action buttons: Retake Quiz, Try Different Topic

**Shared Components:**
- Buttons: Rounded (rounded-lg), consistent padding (px-6 py-3), clear hover/active states
- Cards: Rounded corners (rounded-xl), subtle shadows (shadow-md), white/surface backgrounds
- Form controls: Large touch targets (min-h-12), clear focus states with ring

### E. Interaction & Feedback
- **Loading States:** Skeleton screens while generating questions, spinner with "AI is crafting your questions..." message
- **Transitions:** Smooth page transitions (fade), question changes (slide)
- **Feedback:** Toast notifications for errors, checkmark/X icons for instant answer feedback
- **Micro-interactions:** Scale on button press, subtle bounce on correct answer

## Images
**NO large hero images** - This is a utility-focused app. Use:
- Small decorative illustrations on empty states (before quiz starts)
- Icon system for categories and feedback states
- Optional: Small abstract pattern in background (very subtle, low opacity)

## Accessibility
- High contrast ratios (WCAG AA minimum)
- Clear focus indicators with ring-2 and ring-offset-2
- Keyboard navigation support (Tab through options, Enter to submit)
- Screen reader friendly labels
- Timer alerts don't rely solely on color
- Consistent dark mode with proper input field backgrounds

## Mobile Optimization
- Touch-friendly targets (min 48px height)
- Sticky timer and navigation on mobile
- Single column layout on small screens
- Reduced padding (p-4 instead of p-8) on mobile
- Bottom sheet style for results on mobile
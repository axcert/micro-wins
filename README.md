# MicroWins - Small Goal Tracking App

*AI Agent Development Guidelines - This README serves as the primary reference for automated code generation*

## 🤖 Agent Instructions

**CRITICAL: All code generated must strictly follow these guidelines. This document defines the project's DNA.**

---

## 📋 Project Overview

### Project Type
- **Application Type**: Mobile App (React Native) with Backend API
- **Architecture Pattern**: Client-Server with Microservices Backend
- **Primary Languages**: JavaScript/TypeScript (Frontend), Node.js/Python (Backend)
- **Frontend Framework**: React Native with Expo
- **Backend Framework**: Node.js + Express.js (Primary) / FastAPI (Alternative)
- **Database**: PostgreSQL (Primary), Redis (Caching)

### Core Mission
Transform overwhelming goals into 100 micro-actions, each representing 1% progress toward the ultimate objective. Help users achieve their dreams through manageable daily steps.

### Core Principles
1. **Simplicity First** - One primary action per screen
2. **Celebration** - Make completing tasks feel rewarding
3. **Progress Visibility** - Always show how far users have come
4. **Gentle Nudges** - Encouraging, not demanding
5. **Accessibility** - High contrast, clear typography, inclusive design

---

## 🏗️ Architecture Guidelines

### Frontend Architecture (React Native)
```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Generic components (Button, Card, etc.)
│   │   ├── forms/          # Form-specific components
│   │   └── animations/     # Lottie and custom animations
│   ├── screens/            # Screen-level components
│   │   ├── auth/          # Authentication screens
│   │   ├── goals/         # Goal-related screens
│   │   ├── dashboard/     # Main dashboard
│   │   └── profile/       # User profile screens
│   ├── navigation/         # Navigation configuration
│   ├── store/             # Redux Toolkit store
│   │   ├── slices/        # Redux slices (goals, user, tasks)
│   │   └── api/           # RTK Query API slices
│   ├── services/          # API services and external integrations
│   │   ├── api/           # Backend API calls
│   │   ├── ai/            # AI integration (OpenAI/Claude)
│   │   ├── auth/          # Firebase Auth integration
│   │   └── notifications/ # Push notification handling
│   ├── utils/             # Helper functions and utilities
│   ├── hooks/             # Custom React hooks
│   ├── constants/         # App constants and configuration
│   ├── types/             # TypeScript type definitions
│   └── assets/            # Images, fonts, animations
├── __tests__/             # Test files
└── docs/                  # Component documentation
```

### Backend Architecture (Node.js + Express)
```
backend/
├── src/
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── goalController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── services/          # Business logic layer
│   │   ├── goalService.js
│   │   ├── aiService.js
│   │   ├── notificationService.js
│   │   └── analyticsService.js
│   ├── models/            # Database models (Sequelize/Prisma)
│   │   ├── User.js
│   │   ├── Goal.js
│   │   ├── MicroStep.js
│   │   └── UserProgress.js
│   ├── middleware/        # Express middleware
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── routes/            # API route definitions
│   │   ├── auth.js
│   │   ├── goals.js
│   │   ├── tasks.js
│   │   └── users.js
│   ├── utils/             # Utility functions
│   ├── config/            # Configuration files
│   │   ├── database.js
│   │   ├── redis.js
│   │   └── env.js
│   └── validators/        # Input validation schemas
├── tests/                 # Test files
├── migrations/            # Database migrations
└── docs/                  # API documentation
```

### File Naming Conventions
- **React Components**: `PascalCase.tsx` (e.g., `GoalCard.tsx`)
- **Screens**: `PascalCase.tsx` (e.g., `CreateGoalScreen.tsx`)
- **Services**: `camelCase.ts` (e.g., `goalService.ts`)
- **Hooks**: `use + PascalCase.ts` (e.g., `useGoalProgress.ts`)
- **Constants**: `UPPER_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)
- **Types**: `PascalCase.ts` (e.g., `GoalTypes.ts`)
- **Backend Controllers**: `camelCase + Controller.js` (e.g., `goalController.js`)
- **Backend Models**: `PascalCase.js` (e.g., `Goal.js`)

---


## 🎨 UI/UX Guidelines

### Design System
```tsx
// ✅ Theme constants
export const colors = {
  primary: '#6C63FF',
  secondary: '#FF6584',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    card: '#FFFFFF'
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    muted: '#9CA3AF'
  },
  border: '#E5E7EB'
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20
  }
};
```

## 3. Core Features

### 3.1 Goal Creation Flow
1. **Goal Input Screen**
   - Natural language input field
   - Category selection (optional)
   - Difficulty preference (Easy/Medium/Hard)
   - Timeline preference (30/60/90/365 days)

2. **AI Goal Processing**
   - Analyze user's goal
   - Generate 100 sequential micro-steps
   - Ensure logical progression
   - Add variety to maintain engagement

3. **Goal Review & Customization**
   - Preview generated steps
   - Edit individual steps
   - Reorder if needed
   - Approve and start

### 3.2 Daily Experience
1. **Today's Mission**
   - Single card showing today's 1% task
   - Clear, actionable instruction
   - Optional hints/tips
   - "Complete" button

2. **Progress Tracking**
   - Visual progress bar (0-100%)
   - Streak counter
   - Calendar heat map
   - Statistics dashboard

3. **Motivation System**
   - Daily notifications
   - Milestone celebrations
   - Achievement badges
   - Progress sharing

### 3.3 Additional Features
- **Multiple Active Goals**: Track up to 3 goals simultaneously
- **Community**: Share and discover goal templates
- **Flexibility**: Skip, swap, or modify daily tasks
- **Reflection**: Weekly check-ins and progress reviews
- **Integration**: Calendar sync, widget support

## 4. Data Models

### User
```json
{
  "id": "uuid",
  "email": "string",
  "name": "string",
  "created_at": "timestamp",
  "preferences": {
    "notification_time": "09:00",
    "difficulty_preference": "medium"
  }
}
```

### Goal
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "title": "Attract people",
  "category": "social",
  "created_at": "timestamp",
  "target_days": 100,
  "status": "active|paused|completed"
}
```

### MicroStep
```json
{
  "id": "uuid",
  "goal_id": "uuid",
  "order": 1,
  "title": "Make eye contact with 3 strangers",
  "description": "When walking today, practice making brief eye contact...",
  "tips": ["Start with people walking dogs", "Smile gently"],
  "completed_at": "timestamp|null"
}
```

## 5. User Flow Diagrams

### New User Journey
1. Onboarding → 2. Create First Goal → 3. Review 100 Steps → 4. Set Notification Time → 5. Complete First Task

### Daily User Journey
1. Notification → 2. Open App → 3. View Today's Task → 4. Complete Task → 5. See Progress Update → 6. Share Achievement (optional)

## 6. Monetization Strategy

### Freemium Model
- **Free**: 1 active goal, basic features
- **Premium** ($4.99/month):
  - Unlimited goals
  - AI goal coach
  - Advanced analytics
  - Custom themes
  - Priority support

### Additional Revenue
- Goal template marketplace
- Coaching add-ons
- Corporate/team plans

## 7. Success Metrics

### User Engagement
- Daily Active Users (DAU)
- Average session duration
- Task completion rate
- Streak length distribution

### Business Metrics
- User retention (D1, D7, D30)
- Conversion to premium
- Customer Lifetime Value (CLV)
- Net Promoter Score (NPS)

## 8. MVP Feature Set

### Phase 1 (Launch)
- Single goal tracking
- AI goal decomposition
- Daily task delivery
- Basic progress tracking
- Push notifications

### Phase 2 (Month 2-3)
- Multiple goals
- Community templates
- Streak system
- Social sharing

### Phase 3 (Month 4-6)
- Advanced analytics
- AI coaching
- Team challenges
- Integrations

## 9. Design Principles

### UI/UX Guidelines
- **Use suitable css, tailwind or any style to make interface attractive
- **Simplicity First**: One primary action per screen
- **Celebration**: Make completing tasks feel rewarding
- **Progress Visibility**: Always show how far they've come
- **Gentle Nudges**: Encouraging, not demanding
- **Accessibility**: High contrast, clear typography

### Brand Personality
- Supportive friend, not drill sergeant
- Celebrates small wins
- Growth-minded
- Inclusive and non-judgmental




## ⚠️ Critical Rules for AI Agent

### MUST DO
- ✅ **Follow React Native best practices** - Use proper component lifecycle and hooks
- ✅ **Implement comprehensive error handling** - Try-catch blocks for all async operations
- ✅ **Use TypeScript types** - Define interfaces for all data structures
- ✅ **Include loading states** - Show spinners and skeleton screens
- ✅ **Add accessibility props** - accessibilityLabel, accessibilityHint for all interactive elements
- ✅ **Implement offline support** - Use AsyncStorage and handle network failures
- ✅ **Follow security best practices** - Validate inputs, secure token storage
- ✅ **Add celebration animations** - Use Lottie for milestone achievements
- ✅ **Include proper navigation** - Use React Navigation with proper typing

### NEVER DO
- ❌ **Skip error boundaries** - Always wrap screens in error boundaries
- ❌ **Hardcode API endpoints** - Use environment configuration
- ❌ **Store sensitive data insecurely** - Use Keychain/Keystore for tokens
- ❌ **Ignore performance** - Optimize lists with FlatList, memoize components
- ❌ **Break platform conventions** - Follow iOS/Android design guidelines
- ❌ **Skip input validation** - Validate both client and server side
- ❌ **Ignore accessibility** - Support screen readers and keyboard navigation
- ❌ **Use blocking operations** - Keep UI responsive with proper async handling

### CODE QUALITY CHECKLIST
Before submitting any code, ensure:
- [ ] All async operations have proper error handling
- [ ] TypeScript types are defined for new interfaces
- [ ] Components are responsive and work on all screen sizes
- [ ] Loading states are implemented for all async operations
- [ ] Error states are handled gracefully with user-friendly messages
- [ ] Accessibility attributes are included for all interactive elements
- [ ] Performance is optimized (memoization, lazy loading)
- [ ] Security best practices are followed
- [ ] Offline functionality is considered
- [ ] Celebration animations enhance user experience
- [ ] Navigation flows are intuitive and consistent
- [ ] API responses are properly typed and validated

---

## 📚 Development Resources

### Documentation Links
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [Firebase Documentation](https://rnfirebase.io/)
- [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)

### External APIs
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Push Notifications Guide](https://rnfirebase.io/messaging/usage)

---

*This README serves as the definitive guide for MicroWins app development. The AI development agent must strictly adhere to these guidelines to ensure consistent, high-quality code generation that delivers an exceptional user experience.*

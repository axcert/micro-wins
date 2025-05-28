# Small Goal Tracking App - Architecture & Design

## 1. App Overview

**Name**: MicroWins / StepBy / 1Percent (working titles)

**Core Concept**: Transform overwhelming goals into 100 micro-actions, each representing 1% progress toward the ultimate objective.

## 2. Technical Architecture

### Frontend
- **Framework**: React Native (cross-platform iOS/Android)
- **State Management**: Redux Toolkit or Zustand
- **UI Library**: React Native Elements or NativeBase
- **Navigation**: React Navigation
- **Animations**: Lottie for celebration animations
- **Storage**: AsyncStorage for offline capability
- **Styles**: use Tailwind.css for styling

### Backend
- **API**: Node.js + Express or FastAPI (Python)
- **Database**: PostgreSQL for user data, Redis for caching
- **AI Integration**: OpenAI API or Claude API for goal decomposition
- **Authentication**: Firebase Auth or Auth0
- **Push Notifications**: Firebase Cloud Messaging
- **Analytics**: Mixpanel or Amplitude

### Infrastructure
- **Hosting**: AWS or Google Cloud Platform
- **CDN**: CloudFront for media assets
- **Monitoring**: Sentry for error tracking

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
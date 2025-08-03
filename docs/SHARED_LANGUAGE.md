# Shared Language Reference

This document provides a quick reference for the shared language used across the Global-e Agent platform.

## 🏗️ Layout Zones

### Header Zone
- **Purpose**: Global navigation and status indicators
- **Key Elements**: Logo, title, MCP status, action buttons
- **File**: `Header.tsx`

### Home Zone  
- **Purpose**: Landing page with hero section and prompt input
- **Key Elements**: Hero section, feature pills, prompt input, recent conversations
- **File**: `HomeScreen.tsx`

### Conversation Zone
- **Purpose**: Chat interface for user-agent interactions
- **Key Elements**: Message list, input area, feedback system
- **File**: `ConversationPanel.tsx`

### Knowledge Zone
- **Purpose**: Display knowledge base and Atlassian MCP data
- **Key Elements**: Tabs (Knowledge Base, Atlassian MCP Data), content cards
- **File**: `KnowledgePanel.tsx`

## 🧩 Core Components

### Header Components
- `Header` - Main navigation bar
- `MCPStatusIndicator` - Atlassian connection status

### Home Components
- `HeroSection` - Welcome message and branding
- `FeaturePills` - Feature highlights
- `PromptInput` - Main interaction input
- `RecentConversations` - Previous conversation list

### Conversation Components
- `MessageBubble` - Individual chat messages
- `MessageFeedback` - Feedback system for AI responses
- `TypingIndicator` - Loading animation for AI responses

### Knowledge Components
- `KnowledgeCard` - Knowledge base response display
- `AtlassianResults` - Jira and Confluence data display
- `StatusBadge` - Response status indicators

## 📝 Naming Conventions

### Components
- **PascalCase**: `HomeScreen`, `ConversationPanel`
- **Descriptive**: `AtlassianConfig` not `Config`
- **Zone suffixes**: `Panel`, `Screen`, `Zone`

### Functions
- **Action verbs**: `onSubmit`, `onResumeConversation`
- **Event handlers**: `handleMessageSend`, `handleFeedback`
- **Async functions**: `checkMCPStatus`, `fetchKnowledgeData`

### Variables
- **Descriptive**: `recentConversations`, `isLoading`
- **Boolean prefixes**: `is`, `has`, `can` (e.g., `isLoading`, `hasError`)
- **Status variables**: `connected`, `status`, `error`

### CSS Classes
- **BEM-like**: `globe-surface`, `globe-text-primary`
- **Semantic**: `bg-globe-surface`, `text-globe-text-secondary`
- **Consistent prefixes**: `globe-` for custom classes

## 🎨 Design Elements

### Colors
- **Primary**: `#007AFF` (Blue)
- **Success**: `#28A745` (Green)
- **Warning**: `#FFC107` (Yellow)
- **Error**: `#DC3545` (Red)
- **Surface**: `#FFFFFF` (White)
- **Text Primary**: `#212529` (Dark Gray)
- **Text Secondary**: `#6C757D` (Medium Gray)

### Typography
- **H1**: `text-4xl font-bold` (Hero titles)
- **H2**: `text-lg font-semibold` (Section headers)
- **Body**: `text-sm` (Regular text)
- **Caption**: `text-xs` (Small text, labels)

## 🔄 Interaction Patterns

### Navigation
- **Home Navigation**: Always accessible via header button
- **Back Navigation**: Contextual back buttons when needed
- **Tab Navigation**: Used in Knowledge Panel for switching data sources

### Input
- **Primary Input**: Large, prominent prompt input on home screen
- **Secondary Input**: Compact input in conversation panel
- **Category Selection**: Dropdown for conversation categorization

### Feedback
- **Message Feedback**: Thumbs up/down on AI responses
- **Status Indicators**: Visual feedback for connection states
- **Loading States**: Consistent loading animations

## 📱 Responsive Design

### Breakpoints
- **Mobile**: Default (mobile-first)
- **Tablet**: `md:` prefix
- **Desktop**: `lg:` prefix

### Common Patterns
```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">

// Responsive spacing
<div className="p-4 md:p-6 lg:p-8">
```

## 🚀 Usage Guidelines

### When to Use Each Zone
1. **Home Zone**: First-time users, new conversations
2. **Conversation Zone**: Active chat sessions
3. **Knowledge Zone**: Viewing responses and related data

### Component Selection
1. **Use existing components** before creating new ones
2. **Follow naming conventions** strictly
3. **Maintain consistency** in styling and behavior
4. **Document new components** when added

### Best Practices
- **Mobile-first** approach
- **Consistent spacing** using Tailwind scale
- **Semantic color usage** (avoid hardcoded colors)
- **Accessibility** with proper ARIA labels
- **Performance** with lazy loading when possible

## 📋 Quick Commands

### Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Documentation
- **Design System**: `docs/DESIGN_SYSTEM.md`
- **Component Examples**: `docs/COMPONENT_EXAMPLES.md`
- **Documentation Overview**: `docs/README.md`

---

*This shared language ensures consistency across the entire platform and team.* 
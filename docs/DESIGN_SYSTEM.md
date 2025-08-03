# Global-e Agent Design System

## Overview
This document defines the shared language, components, and design patterns for the Global-e Agent platform. It serves as a single source of truth for all UI/UX decisions and naming conventions.

## Table of Contents
1. [Layout Zones](#layout-zones)
2. [Component Catalog](#component-catalog)
3. [Interaction Patterns](#interaction-patterns)
4. [Naming Conventions](#naming-conventions)
5. [Color System](#color-system)
6. [Typography](#typography)

---

## Layout Zones

### Primary Layout Areas

#### 1. **Header Zone** (`Header.tsx`)
- **Purpose**: Global navigation and status indicators
- **Components**: Logo, title, MCP status, action buttons
- **Height**: 64px (h-16)
- **Background**: `bg-globe-surface`

#### 2. **Home Zone** (`HomeScreen.tsx`)
- **Purpose**: Landing page with hero section and prompt input
- **Components**: Hero section, feature pills, prompt input, recent conversations
- **Layout**: Centered, max-width 2xl

#### 3. **Conversation Zone** (`ConversationPanel.tsx`)
- **Purpose**: Chat interface for user-agent interactions
- **Components**: Message list, input area, feedback system
- **Layout**: Full height, scrollable messages

#### 4. **Knowledge Zone** (`KnowledgePanel.tsx`)
- **Purpose**: Display knowledge base and Atlassian MCP data
- **Components**: Tabs (Knowledge Base, Atlassian MCP Data), content cards
- **Layout**: Tabbed interface with scrollable content

---

## Component Catalog

### Core Components

#### 1. **Header Components**
- `Header` - Main navigation bar
- `MCPStatusIndicator` - Atlassian connection status
- `ActionButton` - Share, Home navigation buttons

#### 2. **Home Components**
- `HeroSection` - Welcome message and branding
- `FeaturePills` - Feature highlights (Instant Answers, Verified Sources, CSM Focused)
- `PromptInput` - Main interaction input
- `RecentConversations` - Previous conversation list
- `QuickExamples` - Suggested prompts

#### 3. **Conversation Components**
- `MessageBubble` - Individual chat messages
- `MessageFeedback` - Feedback system for AI responses
- `TypingIndicator` - Loading animation for AI responses

#### 4. **Knowledge Components**
- `KnowledgeCard` - Knowledge base response display
- `AtlassianResults` - Jira and Confluence data display
- `StatusBadge` - Response status indicators

#### 5. **Atlassian Integration Components**
- `AtlassianConfig` - MCP connection configuration
- `JiraIssueCard` - Individual Jira issue display
- `ConfluencePageCard` - Individual Confluence page display

---

## Interaction Patterns

### 1. **Navigation Patterns**
- **Home Navigation**: Always accessible via header button
- **Back Navigation**: Contextual back buttons when needed
- **Tab Navigation**: Used in Knowledge Panel for switching between data sources

### 2. **Input Patterns**
- **Primary Input**: Large, prominent prompt input on home screen
- **Secondary Input**: Compact input in conversation panel
- **Category Selection**: Dropdown for conversation categorization

### 3. **Feedback Patterns**
- **Message Feedback**: Thumbs up/down on AI responses
- **Status Indicators**: Visual feedback for connection states
- **Loading States**: Consistent loading animations

### 4. **Data Display Patterns**
- **Card Layout**: Consistent card-based content display
- **List Layout**: Scrollable lists for conversations and results
- **Tab Layout**: Organized content switching

---

## Naming Conventions

### Component Naming
- **PascalCase** for component names: `HomeScreen`, `ConversationPanel`
- **Descriptive names**: `AtlassianConfig` not `Config`
- **Zone suffixes**: `Panel`, `Screen`, `Zone` for layout components

### CSS Class Naming
- **BEM-like structure**: `globe-surface`, `globe-text-primary`
- **Semantic naming**: `bg-globe-surface`, `text-globe-text-secondary`
- **Consistent prefixes**: `globe-` for custom design system classes

### Function Naming
- **Action verbs**: `onSubmit`, `onResumeConversation`
- **Event handlers**: `handleMessageSend`, `handleFeedback`
- **Async functions**: `checkMCPStatus`, `fetchKnowledgeData`

### Variable Naming
- **Descriptive**: `recentConversations`, `isLoading`
- **Boolean prefixes**: `is`, `has`, `can` (e.g., `isLoading`, `hasError`)
- **Status variables**: `connected`, `status`, `error`

---

## Color System

### Primary Colors
- **Primary**: `#007AFF` (Blue)
- **Secondary**: `#6C757D` (Gray)
- **Success**: `#28A745` (Green)
- **Warning**: `#FFC107` (Yellow)
- **Error**: `#DC3545` (Red)

### Surface Colors
- **Surface**: `#FFFFFF` (White)
- **Surface Secondary**: `#F8F9FA` (Light Gray)
- **Border**: `#E9ECEF` (Light Gray)

### Text Colors
- **Primary**: `#212529` (Dark Gray)
- **Secondary**: `#6C757D` (Medium Gray)
- **Muted**: `#ADB5BD` (Light Gray)

---

## Typography

### Font Hierarchy
- **H1**: `text-4xl font-bold` (Hero titles)
- **H2**: `text-lg font-semibold` (Section headers)
- **H3**: `text-base font-medium` (Subsection headers)
- **Body**: `text-sm` (Regular text)
- **Caption**: `text-xs` (Small text, labels)

### Font Weights
- **Bold**: `font-bold` (700)
- **Semibold**: `font-semibold` (600)
- **Medium**: `font-medium` (500)
- **Regular**: `font-normal` (400)

---

## Usage Guidelines

### When to Use Each Zone
1. **Home Zone**: First-time users, new conversations
2. **Conversation Zone**: Active chat sessions
3. **Knowledge Zone**: Viewing responses and related data

### Component Selection
1. **Use existing components** before creating new ones
2. **Follow naming conventions** strictly
3. **Maintain consistency** in styling and behavior
4. **Document new components** when added

### Responsive Design
- **Mobile-first** approach
- **Consistent breakpoints** across components
- **Touch-friendly** interactions on mobile

---

## Maintenance

### Adding New Components
1. Add to appropriate section in this document
2. Follow naming conventions
3. Include usage examples
4. Update component catalog

### Updating Existing Components
1. Maintain backward compatibility
2. Update documentation
3. Test across all zones
4. Validate naming consistency

---

*Last updated: [Current Date]*
*Version: 1.0* 
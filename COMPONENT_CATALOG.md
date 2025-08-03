# Component Catalog - Globe Assist UI

## Main Components

### 1. Header.tsx
**Purpose**: Main application header
**Location**: `src/components/Header.tsx`
**Description**: Header component with logo and navigation

### 2. HomeScreen.tsx
**Purpose**: Main home screen
**Location**: `src/components/HomeScreen.tsx`
**Description**: Main screen with navigation options

### 3. ConversationPanel.tsx
**Purpose**: Conversation panel
**Location**: `src/components/ConversationPanel.tsx`
**Description**: Displays conversations and enables interaction

### 4. PromptInput.tsx
**Purpose**: Message input field
**Location**: `src/components/PromptInput.tsx`
**Description**: Text field for entering messages and questions

### 5. KnowledgePanel.tsx
**Purpose**: Knowledge panel
**Location**: `src/components/KnowledgePanel.tsx`
**Description**: Displays relevant information and knowledge

### 6. AtlassianConfig.tsx
**Purpose**: Atlassian settings
**Location**: `src/components/AtlassianConfig.tsx`
**Description**: Configuration for Atlassian connection

### 7. AtlassianResults.tsx
**Purpose**: Atlassian results
**Location**: `src/components/AtlassianResults.tsx`
**Description**: Displays search results from Atlassian

### 8. FeedbackStats.tsx
**Purpose**: Feedback statistics
**Location**: `src/components/FeedbackStats.tsx`
**Description**: Displays statistics and feedback

### 9. MessageFeedback.tsx
**Purpose**: Message feedback
**Location**: `src/components/MessageFeedback.tsx`
**Description**: Allows users to provide feedback on messages

### 10. RecentConversations.tsx
**Purpose**: Recent conversations
**Location**: `src/components/RecentConversations.tsx`
**Description**: Displays list of recent conversations

### 11. CategorySelect.tsx
**Purpose**: Category selection
**Location**: `src/components/CategorySelect.tsx`
**Description**: Allows selection of categories for navigation

## UI Components (shadcn/ui)

### Location: `src/components/ui/`

#### Form Components
- `button.tsx` - Buttons
- `input.tsx` - Input fields
- `textarea.tsx` - Long text fields
- `form.tsx` - Forms
- `label.tsx` - Labels

#### Layout Components
- `card.tsx` - Cards
- `separator.tsx` - Separators
- `aspect-ratio.tsx` - Aspect ratios
- `scroll-area.tsx` - Scroll areas

#### Navigation Components
- `navigation-menu.tsx` - Navigation menu
- `breadcrumb.tsx` - Breadcrumbs
- `tabs.tsx` - Tabs

#### Feedback Components
- `alert.tsx` - Alerts
- `toast.tsx` - Short messages
- `progress.tsx` - Progress bars
- `skeleton.tsx` - Loading skeletons

#### Data Display Components
- `table.tsx` - Tables
- `badge.tsx` - Badges
- `avatar.tsx` - Avatars
- `calendar.tsx` - Calendar

#### Overlay Components
- `dialog.tsx` - Dialogs
- `popover.tsx` - Popovers
- `tooltip.tsx` - Tooltips
- `hover-card.tsx` - Hover cards

#### Interactive Components
- `checkbox.tsx` - Checkboxes
- `radio-group.tsx` - Radio buttons
- `switch.tsx` - Switches
- `slider.tsx` - Sliders
- `select.tsx` - Dropdown lists

## Services

### Location: `src/services/`
- `atlassianService.ts` - Atlassian services
- `mcpProxy.ts` - MCP services

## Pages

### Location: `src/pages/`
- `Index.tsx` - Main page
- `NotFound.tsx` - 404 page

## Hooks

### Location: `src/hooks/`
- `use-mobile.tsx` - Mobile detection hook
- `use-toast.ts` - Toast messages hook

## Types

### Location: `src/types/`
- `globe.ts` - Globe types

## Data

### Location: `src/data/`
- `mockData.ts` - Mock data

---

## Using the Catalog

### To find a component:
1. Search by component name
2. Check the file location
3. Read the description to understand the purpose

### To add a new component:
1. Create the file in the appropriate location
2. Add to the catalog with description
3. Update the catalog

### To modify a component:
1. Find the component in the catalog
2. Go to the file location
3. Make the changes
4. Update the description in the catalog if needed 
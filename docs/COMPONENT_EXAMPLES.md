# Component Usage Examples

This document provides practical examples of how to use each component according to the design system guidelines.

## Header Zone Components

### Header Component
```tsx
// Basic usage
<Header />

// With back navigation
<Header 
  showBackButton={true} 
  onBackToHome={() => navigate('/')} 
/>
```

### MCP Status Indicator
```tsx
// Automatically included in Header
// Shows: Connecting..., MCP Connected, or MCP Disconnected
<div className="flex items-center gap-2 px-3 py-1 rounded-full border border-globe-border-subtle bg-globe-accent-light">
  <CheckCircle className="w-3 h-3 text-green-500" />
  <span className="text-xs text-globe-text-secondary">MCP Connected</span>
</div>
```

## Home Zone Components

### Hero Section
```tsx
<div className="text-center mb-12">
  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
    <img src="/logo.png" alt="Global-e Logo" className="w-12 h-12 object-contain" />
  </div>
  
  <h1 className="text-4xl font-bold text-globe-text-primary mb-4">
    Welcome to Global-e Agent
  </h1>
  
  <p className="text-lg text-globe-text-secondary mb-8 leading-relaxed">
    Your AI-powered Customer Success assistant.
  </p>
</div>
```

### Feature Pills
```tsx
<div className="flex flex-wrap justify-center gap-3 mb-8">
  <div className="flex items-center gap-2 bg-globe-surface px-4 py-2 rounded-full border border-globe-border-subtle">
    <Zap className="w-4 h-4 text-primary" />
    <span className="text-sm text-globe-text-secondary">Instant Answers</span>
  </div>
  <div className="flex items-center gap-2 bg-globe-surface px-4 py-2 rounded-full border border-globe-border-subtle">
    <Shield className="w-4 h-4 text-primary" />
    <span className="text-sm text-globe-text-secondary">Verified Sources</span>
  </div>
</div>
```

### Prompt Input
```tsx
// Primary input on home screen
<PromptInput onSubmit={handleSubmit} isLoading={isLoading} />

// Secondary input in conversation panel
<PromptInput 
  onSubmit={handleSubmit} 
  isLoading={isLoading} 
  lockedCategory={currentCategory} 
/>
```

## Conversation Zone Components

### Message Bubble
```tsx
// User message
<div className="flex gap-3 justify-end">
  <div className="max-w-xs rounded-lg px-3 py-2 bg-primary text-primary-foreground">
    <p className="text-sm">{message.content}</p>
    <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
  </div>
  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
    <User className="w-4 h-4 text-secondary-foreground" />
  </div>
</div>

// AI message
<div className="flex gap-3 justify-start">
  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
    <Bot className="w-4 h-4 text-primary" />
  </div>
  <div className="max-w-xs rounded-lg px-3 py-2 bg-muted text-globe-text-primary">
    <p className="text-sm">{message.content}</p>
    <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
    <MessageFeedback messageId={message.id} onFeedback={handleFeedback} />
  </div>
</div>
```

### Message Feedback
```tsx
<MessageFeedbackComponent
  messageId={message.id}
  currentFeedback={message.feedback}
  onFeedback={onFeedback}
  showExtended={true}
/>
```

## Knowledge Zone Components

### Knowledge Card
```tsx
<Card className="border-globe-border-subtle shadow-globe-sm">
  <CardHeader>
    <div className="flex items-start justify-between gap-4">
      <CardTitle className="text-globe-text-primary leading-relaxed">
        {response.summary}
      </CardTitle>
      <Badge className={statusColors[response.status]}>
        <StatusIcon className="w-3 h-3 mr-1" />
        {response.status.replace('_', ' ')}
      </Badge>
    </div>
  </CardHeader>
  
  <CardContent className="space-y-6">
    <div>
      <h4 className="text-sm font-medium text-globe-text-primary mb-2">Details</h4>
      <p className="text-sm text-globe-text-secondary leading-relaxed">
        {response.details}
      </p>
    </div>
  </CardContent>
</Card>
```

### Atlassian Results
```tsx
<AtlassianResults
  jiraIssues={atlassianResults.jiraIssues}
  confluencePages={atlassianResults.confluencePages}
  onViewJiraIssue={handleViewJiraIssue}
  onViewConfluencePage={handleViewConfluencePage}
/>
```

## Atlassian Integration Components

### Jira Issue Card
```tsx
<div className="border border-globe-border-subtle rounded-lg p-4 hover:bg-globe-accent-light transition-colors">
  <div className="flex items-start justify-between mb-2">
    <h3 className="font-medium text-globe-text-primary">{issue.key}</h3>
    <Badge variant={getPriorityVariant(issue.priority)}>
      {issue.priority}
    </Badge>
  </div>
  <p className="text-sm text-globe-text-secondary mb-3">{issue.summary}</p>
  <div className="flex items-center gap-4 text-xs text-globe-text-secondary">
    <span>Status: {issue.status}</span>
    <span>Assignee: {issue.assignee}</span>
  </div>
</div>
```

### Confluence Page Card
```tsx
<div className="border border-globe-border-subtle rounded-lg p-4 hover:bg-globe-accent-light transition-colors">
  <div className="flex items-start justify-between mb-2">
    <h3 className="font-medium text-globe-text-primary">{page.title}</h3>
    <Badge variant="outline">{page.space}</Badge>
  </div>
  <p className="text-sm text-globe-text-secondary mb-3">{page.excerpt}</p>
  <div className="flex items-center gap-4 text-xs text-globe-text-secondary">
    <span>Updated: {page.lastModified}</span>
    <span>Version: {page.version}</span>
  </div>
</div>
```

## Common Patterns

### Loading States
```tsx
// Spinner loading
<div className="flex items-center gap-2">
  <RefreshCw className="h-4 w-4 animate-spin" />
  <span className="text-sm text-muted-foreground">Loading...</span>
</div>

// Dots loading
<div className="flex space-x-1">
  <div className="w-2 h-2 bg-globe-text-secondary rounded-full animate-bounce"></div>
  <div className="w-2 h-2 bg-globe-text-secondary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
  <div className="w-2 h-2 bg-globe-text-secondary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
</div>
```

### Status Badges
```tsx
// Success status
<Badge className="bg-green-100 text-green-800 border-green-200">
  <CheckCircle className="w-3 h-3 mr-1" />
  Connected
</Badge>

// Warning status
<Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
  <Clock className="w-3 h-3 mr-1" />
  Pending
</Badge>

// Error status
<Badge className="bg-red-100 text-red-800 border-red-200">
  <AlertTriangle className="w-3 h-3 mr-1" />
  Error
</Badge>
```

### Empty States
```tsx
<div className="text-center py-8">
  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
  <h3 className="text-lg font-medium text-globe-text-primary mb-2">
    No Data Available
  </h3>
  <p className="text-globe-text-secondary">
    Start a conversation to see results here.
  </p>
</div>
```

## Responsive Design Examples

### Mobile-First Layout
```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Welcome to Global-e Agent
</h1>

// Responsive spacing
<div className="p-4 md:p-6 lg:p-8">
  {/* Content */}
</div>
```

## Best Practices

### 1. **Consistent Spacing**
- Use Tailwind spacing scale: `p-4`, `m-6`, `gap-3`
- Maintain consistent spacing between related elements

### 2. **Color Usage**
- Always use design system colors: `text-globe-text-primary`
- Avoid hardcoded colors: `text-black` ❌

### 3. **Component Composition**
- Compose complex components from simple ones
- Reuse existing components before creating new ones

### 4. **Accessibility**
- Include proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios

### 5. **Performance**
- Lazy load components when possible
- Optimize re-renders with proper state management
- Use React.memo for expensive components 
# Atlassian MCP Integration

This document explains how the Atlassian MCP (Model Context Protocol) integration works in the Global-e Agent UI.

## Overview

The application now includes a real-time integration with Atlassian services (Jira and Confluence) through the MCP protocol. This allows users to search and access information from their Atlassian instance directly within the application.

## Features

### 🔗 Real-time Connection
- **MCP Server**: Connected to Atlassian via `mcp-remote`
- **Cloud ID**: `97dda470-29da-47e8-b3a8-ee663b322db9`
- **Instance**: `https://global-e.atlassian.net`

### 📊 Status Monitoring
- **Connection Status**: Real-time monitoring of MCP connection
- **User Info**: Display connected user details
- **Resource Count**: Show available Jira projects and Confluence spaces

### 🔍 Search Capabilities
- **Jira Issues**: Search across all projects using JQL
- **Confluence Pages**: Search documentation using CQL
- **Real-time Results**: Instant access to live data

### 🎯 Integration Points

#### 1. Home Screen
- **MCP Status Card**: Shows connection status and user info
- **Resource Counts**: Displays available Jira projects and Confluence spaces
- **Quick Actions**: Direct links to Jira and Confluence

#### 2. Search Results
- **Jira Issues**: Display with status, priority, assignee, and project info
- **Confluence Pages**: Show with space, version, and content preview
- **Direct Links**: One-click access to original items

#### 3. Knowledge Panel
- **Dual Tabs**: Knowledge Base + Atlassian MCP Data
- **Real-time Data**: Live results from Jira and Confluence
- **Contextual Information**: Relevant issues and documentation

## Technical Implementation

### MCP Configuration
```json
{
  "mcpServers": {
    "atlassian": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v1/sse"]
    }
  }
}
```

### Service Architecture
1. **MCP Proxy Service** (`src/services/mcpProxy.ts`)
   - Handles communication with MCP server
   - Maps function calls to MCP endpoints
   - Provides fallback to mock data

2. **Atlassian Service** (`src/services/atlassianService.ts`)
   - High-level interface for Atlassian operations
   - Integrates with MCP proxy
   - Handles data transformation

3. **UI Components**
   - `AtlassianConfig`: Status monitoring
   - `AtlassianResults`: Results display
   - `KnowledgePanel`: Integrated view

### Available MCP Functions

#### Jira Operations
- `searchJiraIssuesUsingJql`: Search issues with JQL
- `getJiraIssue`: Get specific issue details
- `getVisibleJiraProjects`: List accessible projects

#### Confluence Operations
- `searchConfluenceUsingCql`: Search pages with CQL
- `getConfluencePage`: Get specific page details
- `getConfluenceSpaces`: List available spaces

## Usage Examples

### Searching for Issues
```typescript
const issues = await atlassianService.searchJiraIssues('payment gateway');
// Returns: Array of JiraIssue objects
```

### Searching Documentation
```typescript
const pages = await atlassianService.searchConfluencePages('shipping configuration');
// Returns: Array of ConfluencePage objects
```

### Getting Specific Items
```typescript
const issue = await atlassianService.getJiraIssue('GLOB-123');
const page = await atlassianService.getConfluencePage('123456');
```

## Benefits

### 🚀 Real-time Access
- No need to switch between applications
- Instant access to current information
- Live status updates

### 📈 Enhanced Productivity
- Contextual information in one place
- Quick access to related issues and documentation
- Streamlined workflow

### 🔒 Secure Integration
- Uses official Atlassian MCP
- No credential storage in application
- Secure token-based authentication

## Troubleshooting

### Connection Issues
1. Check MCP server status in the status card
2. Verify network connectivity to Atlassian
3. Ensure proper authentication

### Search Problems
1. Verify search terms are relevant
2. Check if user has access to searched resources
3. Review JQL/CQL syntax for complex queries

### Data Display Issues
1. Check browser console for errors
2. Verify MCP function responses
3. Ensure proper data transformation

## Future Enhancements

### Planned Features
- **Advanced Search**: Filters and saved searches
- **Notifications**: Real-time updates for issues
- **Collaboration**: Comments and mentions
- **Analytics**: Usage statistics and insights

### Technical Improvements
- **Caching**: Improve performance with local caching
- **Offline Support**: Basic functionality when offline
- **Webhooks**: Real-time updates from Atlassian
- **API Rate Limiting**: Optimize request patterns

## Support

For issues with the MCP integration:
1. Check the status card on the home screen
2. Review browser console for error messages
3. Verify Atlassian instance accessibility
4. Contact the development team with specific error details

---

**Note**: This integration requires proper Atlassian permissions and network access to function correctly. 
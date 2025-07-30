# Atlassian MCP Integration Setup

This guide explains how to set up the Atlassian MCP (Model Context Protocol) integration for the Global-e Agent UI.

## Prerequisites

1. **Atlassian Cloud Account**: You need access to an Atlassian Cloud instance (Jira and/or Confluence)
2. **Access Token**: You'll need to generate an Atlassian API access token
3. **Cloud ID**: Your Atlassian Cloud instance ID

## Step 1: Get Your Atlassian Cloud ID

1. Go to your Atlassian Cloud instance (e.g., `https://your-domain.atlassian.net`)
2. The Cloud ID is typically found in the URL or can be extracted from your instance URL
3. For example, if your URL is `https://company.atlassian.net`, your Cloud ID might be something like `12345678-1234-1234-1234-123456789012`

## Step 2: Generate an Atlassian Access Token

1. Go to [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click "Create API token"
3. Give it a meaningful name (e.g., "Global-e Agent MCP")
4. Copy the generated token (you won't be able to see it again)

## Step 3: Configure MCP in Cursor

1. Open your project in Cursor
2. The MCP configuration is already set up in `.cursor/mcp.json`
3. Replace the placeholder values with your actual credentials:

```json
{
  "mcpServers": {
    "atlassian": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-atlassian"],
      "env": {
        "ATLASSIAN_CLOUD_ID": "your-actual-cloud-id",
        "ATLASSIAN_ACCESS_TOKEN": "your-actual-access-token"
      }
    }
  }
}
```

## Step 4: Install MCP Server

The Atlassian MCP server will be automatically installed when you first use it, but you can also install it manually:

```bash
npm install -g @modelcontextprotocol/server-atlassian
```

## Step 5: Test the Integration

1. Start your development server: `npm run dev`
2. Open the application in your browser
3. Submit a question in the chat interface
4. Check the "Atlassian Data" tab in the knowledge panel to see if Jira issues and Confluence pages are being retrieved

## Troubleshooting

### Common Issues

1. **"Failed to connect to Atlassian"**
   - Verify your Cloud ID is correct
   - Ensure your access token is valid and not expired
   - Check that your Atlassian instance is accessible

2. **"No results found"**
   - This might be normal if there are no matching issues/pages
   - Try searching for common terms like "test" or "documentation"

3. **MCP Server not found**
   - Make sure the MCP server is installed: `npm install -g @modelcontextprotocol/server-atlassian`
   - Restart Cursor after installation

### Debug Mode

To see detailed MCP communication logs, you can enable debug mode in your browser's developer console. Look for messages starting with "MCP:" or "Atlassian:".

## Security Notes

- Your Atlassian credentials are stored locally in your browser
- The MCP server runs locally and doesn't share your credentials with external services
- Consider using environment variables for production deployments
- Regularly rotate your Atlassian access tokens

## Features

Once configured, the integration provides:

- **Jira Issue Search**: Search for relevant issues across your Jira projects
- **Confluence Page Search**: Find documentation and knowledge base articles
- **Real-time Results**: Live search results as you type questions
- **Direct Links**: Click to view issues and pages directly in Atlassian

## API Endpoints Used

The MCP integration uses these Atlassian APIs:
- Jira REST API v3
- Confluence REST API v2
- Search APIs for both platforms

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Atlassian credentials
3. Ensure your Atlassian instance allows API access
4. Contact your Atlassian administrator if needed 
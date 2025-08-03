// Atlassian MCP Service
// This service handles communication with Atlassian products via MCP

import { mcpProxyService } from './mcpProxy';

// Types for Atlassian data
export interface JiraIssue {
  id: string;
  key: string;
  summary: string;
  description: string;
  status: string;
  priority: string;
  assignee: string | null;
  reporter: string;
  created: string;
  updated: string;
  project: {
    key: string;
    name: string;
  };
}

export interface ConfluencePage {
  id: string;
  title: string;
  space: {
    key: string;
    name: string;
  };
  status: string;
  version: {
    number: number;
  };
  body: {
    storage: {
      value: string;
    };
  };
  _links: {
    webui: string;
  };
}

export interface SearchResults {
  jiraIssues: JiraIssue[];
  confluencePages: ConfluencePage[];
  totalResults: number;
}

class AtlassianService {
  private config: {
    cloudId: string;
  };
  private isConnected: boolean = false;

  constructor() {
    this.config = {
      cloudId: '97dda470-29da-47e8-b3a8-ee663b322db9' // Global-e Atlassian instance
    };
    this.initializeConnection();
  }

  private async initializeConnection() {
    try {
      // Try to establish real MCP connection
      this.isConnected = await this.testMCPConnection();
      console.log('Atlassian MCP connection status:', this.isConnected);
    } catch (error) {
      console.error('Failed to initialize Atlassian MCP connection:', error);
      this.isConnected = false;
    }
  }

  private async testMCPConnection(): Promise<boolean> {
    try {
      // Test the connection by trying to get available projects
      const result = await mcpProxyService.callMCPFunction('getVisibleJiraProjects', {});
      return result && result.values && result.values.length > 0;
    } catch (error) {
      console.error('MCP connection test failed:', error);
      return false;
    }
  }

  // Main search function that queries both Jira and Confluence
  async searchAll(query: string): Promise<SearchResults> {
    console.log('Searching Atlassian for:', query);
    
    try {
      // Perform parallel searches
      const [jiraResults, confluenceResults] = await Promise.all([
        this.searchJiraIssues(query),
        this.searchConfluencePages(query)
      ]);

      const totalResults = jiraResults.length + confluenceResults.length;

      return {
        jiraIssues: jiraResults,
        confluencePages: confluenceResults,
        totalResults
      };
    } catch (error) {
      console.error('Error in Atlassian search:', error);
      throw new Error('Failed to search Atlassian services');
    }
  }

  // Search Jira issues using JQL
  private async searchJiraIssues(query: string): Promise<JiraIssue[]> {
    try {
      // Create JQL query for the search
      const jql = `text ~ "${query}" OR summary ~ "${query}" OR description ~ "${query}" ORDER BY updated DESC`;
      
      const result = await mcpProxyService.callMCPFunction('searchJiraIssuesUsingJql', {
        jql: jql
      });

      if (!result || !result.issues) {
        return [];
      }

      // Transform the raw Jira data to our interface
      return result.issues.map((issue: any) => ({
        id: issue.id,
        key: issue.key,
        summary: issue.fields.summary,
        description: issue.fields.description || '',
        status: issue.fields.status.name,
        priority: issue.fields.priority.name,
        assignee: issue.fields.assignee?.displayName || null,
        reporter: issue.fields.reporter.displayName,
        created: issue.fields.created,
        updated: issue.fields.updated,
        project: {
          key: issue.fields.project.key,
          name: issue.fields.project.name
        }
      }));
    } catch (error) {
      console.error('Error searching Jira issues:', error);
      return [];
    }
  }

  // Search Confluence pages using CQL
  private async searchConfluencePages(query: string): Promise<ConfluencePage[]> {
    try {
      // Create CQL query for the search
      const cql = `text ~ "${query}" OR title ~ "${query}" ORDER BY lastmodified DESC`;
      
      const result = await mcpProxyService.callMCPFunction('searchConfluenceUsingCql', {
        cql: cql
      });

      if (!result || !result.results) {
        return [];
      }

      // Transform the raw Confluence data to our interface
      return result.results.map((page: any) => ({
        id: page.id,
        title: page.title,
        space: {
          key: page.space.key,
          name: page.space.name
        },
        status: page.status,
        version: {
          number: page.version.number
        },
        body: {
          storage: {
            value: page.body.storage.value
          }
        },
        _links: {
          webui: page._links.webui
        }
      }));
    } catch (error) {
      console.error('Error searching Confluence pages:', error);
      return [];
    }
  }

  // Get detailed Jira issue
  async getJiraIssue(issueKey: string): Promise<JiraIssue | null> {
    try {
      const result = await mcpProxyService.callMCPFunction('getJiraIssue', {
        issueIdOrKey: issueKey
      });

      if (!result) {
        return null;
      }

      return {
        id: result.id,
        key: result.key,
        summary: result.fields.summary,
        description: result.fields.description || '',
        status: result.fields.status.name,
        priority: result.fields.priority.name,
        assignee: result.fields.assignee?.displayName || null,
        reporter: result.fields.reporter.displayName,
        created: result.fields.created,
        updated: result.fields.updated,
        project: {
          key: result.fields.project.key,
          name: result.fields.project.name
        }
      };
    } catch (error) {
      console.error('Error getting Jira issue:', error);
      return null;
    }
  }

  // Get detailed Confluence page
  async getConfluencePage(pageId: string): Promise<ConfluencePage | null> {
    try {
      const result = await mcpProxyService.callMCPFunction('getConfluencePage', {
        pageId: pageId
      });

      if (!result) {
        return null;
      }

      return {
        id: result.id,
        title: result.title,
        space: {
          key: result.space.key,
          name: result.space.name
        },
        status: result.status,
        version: {
          number: result.version.number
        },
        body: {
          storage: {
            value: result.body.storage.value
          }
        },
        _links: {
          webui: result._links.webui
        }
      };
    } catch (error) {
      console.error('Error getting Confluence page:', error);
      return null;
    }
  }

  // Check connection status
  async checkConnection(): Promise<boolean> {
    return this.isConnected;
  }

  // Get available projects
  async getAvailableProjects(): Promise<any[]> {
    try {
      const result = await mcpProxyService.callMCPFunction('getVisibleJiraProjects', {});
      return result?.values || [];
    } catch (error) {
      console.error('Error getting available projects:', error);
      return [];
    }
  }

  // Get available spaces
  async getAvailableSpaces(): Promise<any[]> {
    try {
      const result = await mcpProxyService.callMCPFunction('getConfluenceSpaces', {});
      return result?.results || [];
    } catch (error) {
      console.error('Error getting available spaces:', error);
      return [];
    }
  }

  // Public method to get connection status
  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  // Public method to reconnect
  async reconnect(): Promise<void> {
    console.log('Attempting to reconnect to Atlassian MCP...');
    this.isConnected = false;
    await this.initializeConnection();
  }
}

export const atlassianService = new AtlassianService(); 
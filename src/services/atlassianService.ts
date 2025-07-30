// Atlassian MCP Service
// This service handles communication with Atlassian products via MCP

export interface AtlassianConfig {
  cloudId: string;
  accessToken: string;
}

export interface JiraIssue {
  id: string;
  key: string;
  summary: string;
  description: string;
  status: string;
  priority: string;
  assignee?: string;
  reporter: string;
  created: string;
  updated: string;
  project: {
    key: string;
    name: string;
  };
  issueType: {
    name: string;
    iconUrl: string;
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

export interface AtlassianSearchResult {
  jiraIssues: JiraIssue[];
  confluencePages: ConfluencePage[];
  totalResults: number;
}

class AtlassianService {
  private config: AtlassianConfig | null = null;

  setConfig(config: AtlassianConfig) {
    this.config = config;
  }

  async searchJiraIssues(query: string, projectKey?: string): Promise<JiraIssue[]> {
    if (!this.config) {
      console.warn('Atlassian configuration not set, using mock data');
      return this.getMockJiraIssues(query);
    }

    try {
      // This would be replaced with actual MCP calls
      // For now, we'll simulate the structure
      const jql = projectKey 
        ? `project = ${projectKey} AND text ~ "${query}"`
        : `text ~ "${query}"`;

      // Simulate MCP call to search Jira issues
      console.log('Searching Jira issues with JQL:', jql);
      
      // This would be the actual MCP call:
      // return await mcpAtlassianSearchJiraIssuesUsingJql({
      //   cloudId: this.config.cloudId,
      //   jql: jql,
      //   maxResults: 10
      // });

      // For now, return mock data
      return this.getMockJiraIssues(query);
    } catch (error) {
      console.error('Error searching Jira issues:', error);
      return this.getMockJiraIssues(query);
    }
  }

  async searchConfluencePages(query: string, spaceKey?: string): Promise<ConfluencePage[]> {
    if (!this.config) {
      console.warn('Atlassian configuration not set, using mock data');
      return this.getMockConfluencePages(query);
    }

    try {
      // This would be replaced with actual MCP calls
      console.log('Searching Confluence pages with query:', query);
      
      // This would be the actual MCP call:
      // return await mcpAtlassianSearchConfluenceUsingCql({
      //   cloudId: this.config.cloudId,
      //   cql: `text ~ "${query}"${spaceKey ? ` AND space = "${spaceKey}"` : ''}`
      // });

      // For now, return mock data
      return this.getMockConfluencePages(query);
    } catch (error) {
      console.error('Error searching Confluence pages:', error);
      return this.getMockConfluencePages(query);
    }
  }

  async getJiraIssue(issueKey: string): Promise<JiraIssue> {
    if (!this.config) {
      throw new Error('Atlassian configuration not set');
    }

    console.log('Getting Jira issue:', issueKey);
    
    // This would be the actual MCP call:
    // return await mcpAtlassianGetJiraIssue({
    //   cloudId: this.config.cloudId,
    //   issueIdOrKey: issueKey
    // });

    // For now, return mock data
    return this.getMockJiraIssue(issueKey);
  }

  async getConfluencePage(pageId: string): Promise<ConfluencePage> {
    if (!this.config) {
      throw new Error('Atlassian configuration not set');
    }

    console.log('Getting Confluence page:', pageId);
    
    // This would be the actual MCP call:
    // return await mcpAtlassianGetConfluencePage({
    //   cloudId: this.config.cloudId,
    //   pageId: pageId
    // });

    // For now, return mock data
    return this.getMockConfluencePage(pageId);
  }

  async searchAll(query: string): Promise<AtlassianSearchResult> {
    try {
      const [jiraIssues, confluencePages] = await Promise.all([
        this.searchJiraIssues(query),
        this.searchConfluencePages(query)
      ]);

      return {
        jiraIssues,
        confluencePages,
        totalResults: jiraIssues.length + confluencePages.length
      };
    } catch (error) {
      console.error('Error in searchAll:', error);
      // Return empty results instead of throwing
      return {
        jiraIssues: [],
        confluencePages: [],
        totalResults: 0
      };
    }
  }

  // Mock data methods (to be replaced with actual MCP calls)
  private getMockJiraIssues(query: string): JiraIssue[] {
    return [
      {
        id: '10001',
        key: 'GLOB-123',
        summary: `Issue related to ${query}`,
        description: 'This is a mock Jira issue description for testing purposes.',
        status: 'In Progress',
        priority: 'Medium',
        assignee: 'john.doe@global-e.com',
        reporter: 'jane.smith@global-e.com',
        created: '2024-01-15T10:00:00.000Z',
        updated: '2024-01-20T14:30:00.000Z',
        project: {
          key: 'GLOB',
          name: 'Global-e Platform'
        },
        issueType: {
          name: 'Bug',
          iconUrl: 'https://example.com/bug-icon.png'
        }
      },
      {
        id: '10002',
        key: 'GLOB-124',
        summary: `Feature request for ${query}`,
        description: 'This is another mock Jira issue for testing.',
        status: 'To Do',
        priority: 'High',
        assignee: undefined,
        reporter: 'admin@global-e.com',
        created: '2024-01-16T09:00:00.000Z',
        updated: '2024-01-16T09:00:00.000Z',
        project: {
          key: 'GLOB',
          name: 'Global-e Platform'
        },
        issueType: {
          name: 'Story',
          iconUrl: 'https://example.com/story-icon.png'
        }
      }
    ];
  }

  private getMockConfluencePages(query: string): ConfluencePage[] {
    return [
      {
        id: '123456',
        title: `Documentation for ${query}`,
        space: {
          key: 'TECH',
          name: 'Technical Documentation'
        },
        status: 'current',
        version: {
          number: 1
        },
        body: {
          storage: {
            value: `<p>This is mock Confluence content about ${query}.</p><p>It contains relevant information for troubleshooting and implementation.</p>`
          }
        },
        _links: {
          webui: 'https://example.atlassian.net/wiki/spaces/TECH/pages/123456'
        }
      },
      {
        id: '123457',
        title: `Best Practices: ${query}`,
        space: {
          key: 'KB',
          name: 'Knowledge Base'
        },
        status: 'current',
        version: {
          number: 2
        },
        body: {
          storage: {
            value: `<p>Best practices guide for ${query}.</p><ul><li>Step 1: Configuration</li><li>Step 2: Testing</li><li>Step 3: Deployment</li></ul>`
          }
        },
        _links: {
          webui: 'https://example.atlassian.net/wiki/spaces/KB/pages/123457'
        }
      }
    ];
  }

  private getMockJiraIssue(issueKey: string): JiraIssue {
    return {
      id: '10001',
      key: issueKey,
      summary: `Detailed issue: ${issueKey}`,
      description: 'This is a detailed mock Jira issue description with more information about the problem and solution.',
      status: 'In Progress',
      priority: 'Medium',
      assignee: 'john.doe@global-e.com',
      reporter: 'jane.smith@global-e.com',
      created: '2024-01-15T10:00:00.000Z',
      updated: '2024-01-20T14:30:00.000Z',
      project: {
        key: 'GLOB',
        name: 'Global-e Platform'
      },
      issueType: {
        name: 'Bug',
        iconUrl: 'https://example.com/bug-icon.png'
      }
    };
  }

  private getMockConfluencePage(pageId: string): ConfluencePage {
    return {
      id: pageId,
      title: 'Detailed Documentation Page',
      space: {
        key: 'TECH',
        name: 'Technical Documentation'
      },
      status: 'current',
      version: {
        number: 1
      },
      body: {
        storage: {
          value: `<h1>Detailed Documentation</h1><p>This is a comprehensive documentation page with detailed information about the topic.</p><h2>Overview</h2><p>This section provides an overview of the topic.</p><h2>Implementation</h2><p>This section covers implementation details.</p><h2>Troubleshooting</h2><p>Common issues and their solutions.</p>`
        }
      },
      _links: {
        webui: `https://example.atlassian.net/wiki/spaces/TECH/pages/${pageId}`
      }
    };
  }
}

export const atlassianService = new AtlassianService(); 
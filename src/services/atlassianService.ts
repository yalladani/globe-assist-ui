// Atlassian MCP Service
// This service handles communication with Atlassian products via MCP

import { mcpProxyService } from './mcpProxy';

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
      const jql = projectKey 
        ? `project = ${projectKey} AND text ~ "${query}"`
        : `text ~ "${query}"`;

      console.log('Searching Jira issues with JQL:', jql);
      
      // Use the MCP proxy service to search Jira issues
      const searchResult = await mcpProxyService.callMCPFunction('searchJiraIssuesUsingJql', {
        cloudId: this.config.cloudId,
        jql: jql,
        maxResults: 10
      });

      if (searchResult && searchResult.issues) {
        return searchResult.issues.map((issue: any) => ({
          id: issue.id,
          key: issue.key,
          summary: issue.fields.summary || '',
          description: issue.fields.description || '',
          status: issue.fields.status?.name || 'Unknown',
          priority: issue.fields.priority?.name || 'Medium',
          assignee: issue.fields.assignee?.displayName,
          reporter: issue.fields.reporter?.displayName || '',
          created: issue.fields.created,
          updated: issue.fields.updated,
          project: {
            key: issue.fields.project.key,
            name: issue.fields.project.name
          },
          issueType: {
            name: issue.fields.issuetype.name,
            iconUrl: issue.fields.issuetype.iconUrl
          }
        }));
      }

      return [];
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
      console.log('Searching Confluence pages with query:', query);
      
      // Use the MCP proxy service to search Confluence pages
      const cql = `text ~ "${query}"${spaceKey ? ` AND space = "${spaceKey}"` : ''}`;
      const searchResult = await mcpProxyService.callMCPFunction('searchConfluenceUsingCql', {
        cloudId: this.config.cloudId,
        cql: cql,
        limit: 10
      });

      if (searchResult && searchResult.results) {
        return searchResult.results.map((page: any) => ({
          id: page.id,
          title: page.title,
          space: {
            key: page.space?.key || '',
            name: page.space?.name || ''
          },
          status: page.status || 'current',
          version: {
            number: page.version?.number || 1
          },
          body: {
            storage: {
              value: page.body?.storage?.value || ''
            }
          },
          _links: {
            webui: page._links?.webui || ''
          }
        }));
      }

      return [];
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
    
    try {
      const issue = await mcpProxyService.callMCPFunction('getJiraIssue', {
        cloudId: this.config.cloudId,
        issueIdOrKey: issueKey
      });

      if (issue) {
        return {
          id: issue.id,
          key: issue.key,
          summary: issue.fields.summary || '',
          description: issue.fields.description || '',
          status: issue.fields.status?.name || 'Unknown',
          priority: issue.fields.priority?.name || 'Medium',
          assignee: issue.fields.assignee?.displayName,
          reporter: issue.fields.reporter?.displayName || '',
          created: issue.fields.created,
          updated: issue.fields.updated,
          project: {
            key: issue.fields.project.key,
            name: issue.fields.project.name
          },
          issueType: {
            name: issue.fields.issuetype.name,
            iconUrl: issue.fields.issuetype.iconUrl
          }
        };
      }

      throw new Error('Issue not found');
    } catch (error) {
      console.error('Error getting Jira issue:', error);
      return this.getMockJiraIssue(issueKey);
    }
  }

  async getConfluencePage(pageId: string): Promise<ConfluencePage> {
    if (!this.config) {
      throw new Error('Atlassian configuration not set');
    }

    console.log('Getting Confluence page:', pageId);
    
    try {
      const page = await mcpProxyService.callMCPFunction('getConfluencePage', {
        cloudId: this.config.cloudId,
        pageId: pageId
      });

      if (page) {
        return {
          id: page.id,
          title: page.title,
          space: {
            key: page.space?.key || '',
            name: page.space?.name || ''
          },
          status: page.status || 'current',
          version: {
            number: page.version?.number || 1
          },
          body: {
            storage: {
              value: page.body?.storage?.value || ''
            }
          },
          _links: {
            webui: page._links?.webui || ''
          }
        };
      }

      throw new Error('Page not found');
    } catch (error) {
      console.error('Error getting Confluence page:', error);
      return this.getMockConfluencePage(pageId);
    }
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
      return {
        jiraIssues: [],
        confluencePages: [],
        totalResults: 0
      };
    }
  }

  // Mock data methods (fallback)
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
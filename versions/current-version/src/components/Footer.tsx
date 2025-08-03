export const Footer = () => {
  return (
    <footer className="bg-globe-surface border-t border-globe-border-subtle py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-globe-text-secondary">
              © 2024 Global-e Agent. Powered by AI and Atlassian MCP.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-globe-text-secondary">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Connected to Atlassian MCP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 
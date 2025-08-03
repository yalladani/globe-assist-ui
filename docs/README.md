# Global-e Agent Documentation

This directory contains the design system and documentation for the Global-e Agent platform.

## 📚 Documentation Structure

### Core Documents

#### 1. [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
The main design system document that defines:
- **Layout Zones**: Header, Home, Conversation, Knowledge zones
- **Component Catalog**: All available components and their purposes
- **Interaction Patterns**: Navigation, input, feedback patterns
- **Naming Conventions**: Consistent naming for components, functions, variables
- **Color System**: Design system colors and usage
- **Typography**: Font hierarchy and weights

#### 2. [COMPONENT_EXAMPLES.md](./COMPONENT_EXAMPLES.md)
Practical examples showing how to use each component:
- **Code Examples**: Real code snippets for each component
- **Best Practices**: Guidelines for implementation
- **Common Patterns**: Loading states, status badges, empty states
- **Responsive Design**: Mobile-first examples

#### 3. [SHARED_LANGUAGE.md](./SHARED_LANGUAGE.md)
Quick reference for the shared language used across the platform:
- **Layout Zones**: Quick overview of all zones
- **Core Components**: Essential component list
- **Naming Conventions**: Key naming rules
- **Design Elements**: Colors and typography
- **Interaction Patterns**: Common user interactions

## 🎯 How to Use This Documentation

### For Developers
1. **Start with DESIGN_SYSTEM.md** - Understand the overall structure
2. **Reference COMPONENT_EXAMPLES.md** - See how to implement components
3. **Follow naming conventions** - Maintain consistency across the codebase
4. **Use existing components** - Before creating new ones

### For Designers
1. **Review Layout Zones** - Understand the overall structure
2. **Check Component Catalog** - See available components
3. **Follow Color System** - Use consistent colors
4. **Maintain Typography** - Follow font hierarchy

### For Product Managers
1. **Understand Zones** - Know where features should be placed
2. **Review Patterns** - Understand user interaction flows
3. **Check Guidelines** - Ensure consistency in feature requests

## 🔄 Maintenance

### Adding New Components
1. Add to appropriate section in `DESIGN_SYSTEM.md`
2. Create examples in `COMPONENT_EXAMPLES.md`
3. Follow naming conventions strictly
4. Update this README if needed

### Updating Existing Components
1. Maintain backward compatibility
2. Update both documentation files
3. Test across all zones
4. Validate naming consistency

## 📋 Quick Reference

### Layout Zones
- **Header Zone**: Global navigation and status
- **Home Zone**: Landing page and prompt input
- **Conversation Zone**: Chat interface
- **Knowledge Zone**: Response and data display

### Key Components
- **Header**: Global navigation with MCP status
- **HomeScreen**: Landing page with hero section
- **ConversationPanel**: Chat interface
- **KnowledgePanel**: Response display with tabs
- **AtlassianResults**: Jira and Confluence data

### Naming Conventions
- **Components**: PascalCase (`HomeScreen`)
- **Functions**: camelCase (`handleSubmit`)
- **CSS Classes**: kebab-case with `globe-` prefix
- **Variables**: camelCase with descriptive names

## 🚀 Getting Started

1. **Read DESIGN_SYSTEM.md** - Understand the overall structure
2. **Review COMPONENT_EXAMPLES.md** - See implementation examples
3. **Follow the guidelines** - Maintain consistency
4. **Ask questions** - If something isn't clear

## 📞 Support

If you have questions about the design system or need clarification:
1. Check the existing documentation first
2. Look at existing component implementations
3. Follow the established patterns
4. Update documentation when making changes

---

*Last updated: [Current Date]*
*Version: 1.0* 
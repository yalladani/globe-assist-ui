# 🌍 Globe Assist UI - Version Management

This directory contains all versions of the Globe Assist UI project, organized chronologically.

## 📋 Version History

### [v1.0.0](./v1.0.0/) - Initial Release
- **Date**: July 29, 2025
- **Status**: ✅ Stable
- **Description**: Complete Global-e Agent with branding and favicon
- **Features**: Full UI, chat interface, knowledge panel, responsive design

## 🔄 How to Use Versions

### To restore a specific version:
1. Navigate to the version folder (e.g., `v1.0.0/`)
2. Copy all files to your main project directory
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start development server

### To create a new version:
1. Make your changes to the main project
2. Create a new folder: `mkdir versions/v1.1.0`
3. Copy all files: `Copy-Item -Path * -Destination versions/v1.1.0/ -Recurse`
4. Create a `VERSION_INFO.md` file with details
5. Update this README with the new version

## 📁 Directory Structure
```
versions/
├── README.md              # This file
├── v1.0.0/               # Initial release
│   ├── VERSION_INFO.md   # Version details
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies
│   └── ...               # Other files
└── v1.1.0/               # Future versions
```

## 🎯 Best Practices
- ✅ Always create a `VERSION_INFO.md` for each version
- ✅ Include all necessary files (src, public, config files)
- ✅ Test each version before archiving
- ✅ Keep versions organized by date/version number
- ✅ Document major changes between versions

## 🚀 Quick Commands

### Create new version:
```powershell
# Create new version folder
mkdir versions/v1.1.0

# Copy all files
Copy-Item -Path * -Destination versions/v1.1.0/ -Recurse -Exclude versions

# Create version info
New-Item -Path "versions/v1.1.0/VERSION_INFO.md" -ItemType File
```

### Restore version:
```powershell
# Copy version files to main directory
Copy-Item -Path "versions/v1.0.0/*" -Destination "./" -Recurse -Force

# Install dependencies
npm install

# Start development
npm run dev
``` 
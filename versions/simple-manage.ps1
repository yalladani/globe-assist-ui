# Globe Assist UI - Simple Version Management Script

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("create", "restore", "list", "info")]
    [string]$Action,
    
    [Parameter(Mandatory=$false)]
    [string]$Version
)

function Show-Help {
    Write-Host "Globe Assist UI - Version Management" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\simple-manage.ps1 create v1.1.0    # Create new version"
    Write-Host "  .\simple-manage.ps1 restore v1.0.0   # Restore specific version"
    Write-Host "  .\simple-manage.ps1 list             # List all versions"
    Write-Host "  .\simple-manage.ps1 info v1.0.0      # Show version info"
    Write-Host ""
}

function Create-Version {
    param([string]$VersionNumber)
    
    Write-Host "Creating version $VersionNumber..." -ForegroundColor Green
    
    $versionPath = "$VersionNumber"
    if (Test-Path $versionPath) {
        Write-Host "Version $VersionNumber already exists!" -ForegroundColor Red
        return
    }
    
    New-Item -ItemType Directory -Path $versionPath -Force | Out-Null
    
    Write-Host "Copying files..." -ForegroundColor Yellow
    Get-ChildItem -Path ".." -Exclude "versions", "node_modules", ".git" | 
        Copy-Item -Destination $versionPath -Recurse -Force
    
    $versionInfo = @"
# Version $VersionNumber

## Release Date
$(Get-Date -Format "MMMM dd, yyyy")

## What's New
- [Add new features here]

## Features
- [List features]

## Files Included
- All source files
- Configuration files
- Dependencies list

## Technologies
- React 18
- TypeScript
- Vite
- shadcn/ui
- Tailwind CSS

## Notes
[Add any important notes]
"@
    
    Set-Content -Path "$versionPath\VERSION_INFO.md" -Value $versionInfo
    
    Write-Host "Version $VersionNumber created successfully!" -ForegroundColor Green
    Write-Host "Location: $versionPath" -ForegroundColor Cyan
}

function Restore-Version {
    param([string]$VersionNumber)
    
    Write-Host "Restoring version $VersionNumber..." -ForegroundColor Green
    
    $versionPath = "$VersionNumber"
    if (-not (Test-Path $versionPath)) {
        Write-Host "Version $VersionNumber not found!" -ForegroundColor Red
        return
    }
    
    $backupPath = "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
    Write-Host "Creating backup..." -ForegroundColor Yellow
    Get-ChildItem -Path ".." -Exclude "versions", "node_modules", ".git" | 
        Copy-Item -Destination $backupPath -Recurse -Force
    
    Write-Host "Restoring files..." -ForegroundColor Yellow
    Get-ChildItem -Path $versionPath | 
        Copy-Item -Destination ".." -Recurse -Force
    
    Write-Host "Version $VersionNumber restored successfully!" -ForegroundColor Green
    Write-Host "Backup saved to: $backupPath" -ForegroundColor Cyan
    Write-Host "Run 'npm install' to install dependencies" -ForegroundColor Yellow
}

function List-Versions {
    Write-Host "Available Versions:" -ForegroundColor Green
    Write-Host ""
    
    $versions = Get-ChildItem -Path "." -Directory | Sort-Object Name
    foreach ($version in $versions) {
        $versionInfoPath = Join-Path $version.FullName "VERSION_INFO.md"
        if (Test-Path $versionInfoPath) {
            $firstLine = Get-Content $versionInfoPath | Select-Object -First 1
            Write-Host "  $($version.Name) - $firstLine" -ForegroundColor Cyan
        } else {
            Write-Host "  $($version.Name)" -ForegroundColor Cyan
        }
    }
}

function Show-VersionInfo {
    param([string]$VersionNumber)
    
    $versionPath = "$VersionNumber"
    $versionInfoPath = "$versionPath\VERSION_INFO.md"
    
    if (-not (Test-Path $versionInfoPath)) {
        Write-Host "Version info not found for $VersionNumber!" -ForegroundColor Red
        return
    }
    
    Write-Host "Version Info for $VersionNumber" -ForegroundColor Green
    Write-Host ""
    Get-Content $versionInfoPath | Write-Host
}

# Main script logic
switch ($Action) {
    "create" {
        if (-not $Version) {
            Write-Host "Please specify a version number!" -ForegroundColor Red
            Show-Help
            exit 1
        }
        Create-Version $Version
    }
    "restore" {
        if (-not $Version) {
            Write-Host "Please specify a version number!" -ForegroundColor Red
            Show-Help
            exit 1
        }
        Restore-Version $Version
    }
    "list" {
        List-Versions
    }
    "info" {
        if (-not $Version) {
            Write-Host "Please specify a version number!" -ForegroundColor Red
            Show-Help
            exit 1
        }
        Show-VersionInfo $Version
    }
    default {
        Show-Help
    }
} 
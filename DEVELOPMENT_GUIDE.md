# 💻 Development Guide - VS Code Setup

*Auto-generated guide for setting up and running the project in VS Code*

## 📋 Quick Start

**Last Updated:** 2025-05-30 12:36:17  
**Project Type:** frontend_spa  
**Primary Technologies:** javascript, typescript, python, php, ruby, go

## 🚀 Initial Setup

### 1. Clone the Repository
```bash
# Clone the repository
git clone <your-repository-url>
cd <project-directory>

# Switch to development branch
git checkout dev-agent
```

### 2. VS Code Extensions

Install the following recommended extensions:

#### Essential Extensions
```json
{
  "recommendations": [
    "ms-vscode.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next"
,
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
,
    "ms-python.python",
    "ms-python.pylint",
    "ms-python.black-formatter",
    "ms-python.isort"
,
    "ms-azuretools.vscode-docker"

  ]
}
```

#### Installation Commands
```bash
# Install extensions via command line
code --install-extension ms-vscode.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-python.python
code --install-extension ms-python.pylint
code --install-extension ms-python.black-formatter

```

### 3. Environment Setup

#### Node.js Setup
```bash
# Check Node.js version (should be 18+)
node --version
npm --version

# Install dependencies
npm install

# Or using yarn
yarn install
```

#### Python Setup
```bash
# Check Python version (should be 3.11+)
python --version
pip --version

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Environment Variables
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
code .env
```

## 🛠️ Development Commands

### Terminal Commands in VS Code

#### Open Integrated Terminal
- **Windows/Linux:** `Ctrl + \``
- **macOS:** `Cmd + \``

### Project-Specific Commands

#### Next.js Commands
```bash
# Development server
npm run dev
# or
yarn dev

# Production build
npm run build
yarn build

# Start production server
npm start
yarn start

# Linting
npm run lint
yarn lint
```

### Testing Commands

### Database Commands

#### PostgreSQL
```bash
# Connect to database
psql -h localhost -U username -d database_name

# Run migrations (if using Django)
python manage.py migrate

# Run migrations (if using Node.js with Prisma)
npx prisma migrate dev

# Reset database
python manage.py flush  # Django
npx prisma migrate reset  # Prisma
```

### Docker Commands
```bash
# Build Docker image
docker build -t project-app .

# Run container
docker run -p 3000:3000 project-app

# Build and run with docker-compose
docker-compose up
docker-compose up -d  # Run in background

# Stop containers
docker-compose down

# Rebuild containers
docker-compose up --build

# View logs
docker-compose logs
docker-compose logs -f  # Follow logs

# Execute command in running container
docker-compose exec app bash
```

## 🎛️ VS Code Configuration

### Settings.json Configuration
Create or update `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "python.defaultInterpreterPath": "./venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black",
  "typescript.preferences.quoteStyle": "single",
  "javascript.preferences.quoteStyle": "single",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/.DS_Store": true,
    "**/venv": true,
    "**/__pycache__": true
  }
}
```

### Launch.json Configuration
Create `.vscode/launch.json` for debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    },
    {
      "name": "Attach to Node",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "restart": true
    },    {
      "name": "Python: Current File",
      "type": "python",
      "request": "launch",
      "program": "${file}",
      "console": "integratedTerminal"
    },
    {
      "name": "Python: Django",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/manage.py",
      "args": ["runserver"],
      "django": true
    }
  ]
}
```

### Tasks.json Configuration
Create `.vscode/tasks.json` for custom tasks:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "npm: start",
      "type": "npm",
      "script": "start",
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "label": "npm: test",
      "type": "npm",
      "script": "test",
      "group": "test"
    },    {
      "label": "Python: Run Tests",
      "type": "shell",
      "command": "pytest",
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ]
}
```

## 🔧 Debugging

### JavaScript/TypeScript Debugging
1. Set breakpoints in VS Code
2. Run "Launch Chrome" configuration
3. Or attach to running Node.js process

### Python Debugging
1. Set breakpoints in VS Code
2. Run "Python: Current File" or "Python: Django"
3. Use integrated terminal for debugging

## 🚀 Git Workflow

### Branch Management
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Stage changes
git add .

# Commit changes
git commit -m "feat: add your feature description"

# Push to remote
git push origin feature/your-feature-name

# Create pull request (use GitHub CLI)
gh pr create --title "Your PR Title" --body "Description"
```

### Pre-commit Hooks
```bash
# Install pre-commit hooks
npm run prepare  # If using husky
pre-commit install  # If using pre-commit

# Run hooks manually
npm run lint
npm run format
```

## 📚 Useful VS Code Shortcuts

### General
- `Ctrl+Shift+P` / `Cmd+Shift+P`: Command Palette
- `Ctrl+P` / `Cmd+P`: Quick Open
- `Ctrl+Shift+E` / `Cmd+Shift+E`: Explorer
- `Ctrl+J` / `Cmd+J`: Toggle Panel

### Editing
- `Alt+Up/Down`: Move line up/down
- `Shift+Alt+Up/Down`: Copy line up/down
- `Ctrl+D` / `Cmd+D`: Select word (repeat for multiple)
- `Ctrl+Shift+L` / `Cmd+Shift+L`: Select all occurrences

### Navigation
- `Ctrl+G` / `Cmd+G`: Go to line
- `F12`: Go to definition
- `Alt+F12`: Peek definition
- `Shift+F12`: Go to references

## 🔍 Troubleshooting

### Common Issues

#### Node.js Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for outdated packages
npm outdated
```

#### Python Issues
```bash
# Recreate virtual environment
rm -rf venv
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Fix import issues
export PYTHONPATH="${PYTHONPATH}:${PWD}"
```

#### VS Code Issues
- Reload window: `Ctrl+Shift+P` → "Developer: Reload Window"
- Reset settings: Delete `.vscode` folder and recreate
- Check extension conflicts: Disable extensions one by one

---

*This guide is automatically maintained by the Development Agent and updated with new project requirements.*

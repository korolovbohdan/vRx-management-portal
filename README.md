# vRx Management Portal

A microfrontend application built with Angular and Module Federation using `@angular-architects/native-federation`. This project follows a microfrontend architecture where multiple independent applications (remotes) are orchestrated by a shell application (host).

## 📁 Project Structure

```
projects/
├── shell/          # Host application (orchestrates all remotes)
├── assets/         # Remote application for asset management
├── findings/       # Remote application for findings management
├── users/          # Remote application for user management
└── shared/         # Shared library (common code, services, utilities)
```

### Folder Purposes

- **`shell/`** - The host application that loads and orchestrates all remote microfrontends. This is the main entry point of the application.
- **`assets/`** - Remote microfrontend for managing assets (list, details, etc.)
- **`findings/`** - Remote microfrontend for managing findings
- **`users/`** - Remote microfrontend for managing users
- **`shared/`** - Shared library containing:
  - Common services (e.g., HTTP service)
  - Shared DTOs and models
  - UI components
  - Utilities
  - Enums

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

## 🏃 Running the Application

### Development Mode

#### Option 1: Run All Applications (Recommended)

You need to run the shell and all remote applications simultaneously. Open multiple terminal windows:

**Terminal 1 - Shell (Host):**
```bash
npm start
# or
ng serve shell
```
Shell runs on: `http://localhost:4200`

**Terminal 2 - Assets (Remote):**
```bash
npm run start:assets
# or
ng serve assets
```
Assets runs on: `http://localhost:4202`

**Terminal 3 - Findings (Remote):**
```bash
npm run start:findings
# or
ng serve findings
```
Findings runs on: `http://localhost:4203`

**Terminal 4 - Users (Remote):**
```bash
npm run start:users
# or
ng serve users
```
Users runs on: `http://localhost:4204`

#### Option 2: Using npm scripts

The `package.json` includes convenient scripts:
- `npm start` - Starts the shell application
- `npm run start:assets` - Starts the assets remote
- `npm run start:findings` - Starts the findings remote
- `npm run start:users` - Starts the users remote

### Port Configuration

| Application | Port | URL |
|------------|------|-----|
| Shell (Host) | 4200 | http://localhost:4200 |
| Assets | 4202 | http://localhost:4202 |
| Findings | 4203 | http://localhost:4203 |
| Users | 4204 | http://localhost:4204 |

**Important:** All applications must be running simultaneously for the microfrontend architecture to work properly. The shell loads remote applications dynamically at runtime.

## 📦 Building

### Build All Applications

```bash
npm run build
```

This builds all applications (shell and remotes) for production.

### Build Individual Applications

```bash
# Build shell
ng build shell

# Build assets remote
ng build assets

# Build findings remote
ng build findings

# Build users remote
ng build users
```

#
## 🧪 Testing

### Run All Tests

```bash
npm test
# or
ng test
```

### Run Tests for Specific Project

```bash
# Test shell
ng test shell

# Test assets
ng test assets

# Test findings
ng test findings

# Test users
ng test users

# Test shared library
ng test shared
```

## 🏗️ Architecture Overview

### Module Federation Configuration

Each remote application has a `federation.config.js` file that defines:
- **Name**: Unique identifier for the remote
- **Exposes**: Modules/components exposed to other applications
- **Shared**: Dependencies shared across applications

### Federation Manifest

The shell application uses `projects/shell/public/federation.manifest.json` to map remote names to their entry points:

```json
{
  "assets": "http://localhost:4202/remoteEntry.json",
  "findings": "http://localhost:4203/remoteEntry.json",
  "users": "http://localhost:4204/remoteEntry.json"
}
```

### Routing

The shell application loads remote routes dynamically using `safeMfaLoader` utility from the shared library. Routes are defined in:
- Shell routes: `projects/shell/src/app/app.routes.ts`
- Remote routes: Each remote exposes routes via `./Routes` (e.g., `projects/assets/src/app/data-access/routes.ts`)

## ➕ Adding a New Remote Application

Follow these steps to add a new remote microfrontend:

### Step 1: Generate the Application

```bash
ng generate application <remote-name>
```

For example:
```bash
ng generate application products
```

### Step 2: Configure Module Federation

Create `projects/<remote-name>/federation.config.js`:

```javascript
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: '<remote-name>', // e.g., 'products'

  exposes: {
    './Routes': './projects/<remote-name>/src/app/data-access/routes.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
  ],

  features: {
    ignoreUnusedDeps: true
  }
});
```

### Step 3: Configure Angular Build

Update `angular.json` to add the remote application configuration. Copy the configuration from an existing remote (e.g., `assets`) and update:
- Project name
- Root paths
- Port number (use an available port, e.g., 4205)
- Source paths

Key sections to update:
- `projects.<remote-name>.architect.serve-original.options.port` - Set to a unique port
- `projects.<remote-name>.architect.build.builder` - Should be `@angular-architects/native-federation:build`
- `projects.<remote-name>.architect.serve.builder` - Should be `@angular-architects/native-federation:build`

### Step 4: Create Routes File

Create `projects/<remote-name>/src/app/data-access/routes.ts`:

```typescript
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    loadComponent: () => import('../feature/list/list').then(m => m.List)
  },
  // Add more routes as needed
];
```

### Step 5: Update Shell Configuration

#### Add to Federation Manifest

Update `projects/shell/public/federation.manifest.json`:

```json
{
  "assets": "http://localhost:4202/remoteEntry.json",
  "findings": "http://localhost:4203/remoteEntry.json",
  "users": "http://localhost:4204/remoteEntry.json",
  "<remote-name>": "http://localhost:<port>/remoteEntry.json"
}
```

#### Add Route in Shell

Update `projects/shell/src/app/app.routes.ts`:

```typescript
import {Routes} from '@angular/router';
import {safeMfaLoader} from '../../../shared/src/lib/utils/safe-mfa-loader.util';

export const routes: Routes = [
  // ... existing routes
  {
    path: '<remote-name>',
    loadChildren: () => safeMfaLoader('<remote-name>', './Routes').then(m => m.routes)
  },
];
```

### Step 6: Add npm Scripts

Update `package.json` to add convenient scripts:

```json
{
  "scripts": {
    "start:<remote-name>": "ng serve <remote-name>"
  }
}
```

### Step 7: Create Application Structure

Follow the existing pattern in other remotes:
- `src/app/data-access/` - Services, stores, mappers, models, DTOs
- `src/app/feature/` - Feature components
- `src/app/app.config.ts` - Application configuration
- `public/` - Public assets (favicon, etc.)

### Step 8: Test the Integration

1. Start the shell: `npm start`
2. Start the new remote: `npm run start:<remote-name>`
3. Navigate to `http://localhost:4200/<remote-name>` in your browser
4. Verify the remote loads correctly

## 📚 Shared Library

The `shared` library contains code shared across all applications:

### Structure

```
projects/shared/src/lib/
├── dto/           # Data Transfer Objects
├── enums/         # Shared enumerations
├── models/        # Shared models
├── services/      # Shared services (e.g., HttpService)
├── ui/            # Shared UI components
└── utils/         # Utility functions
```

### Using the Shared Library

Import from the shared library in any application:

```typescript
import { HttpService } from 'shared';
import { SomeModel } from 'shared';
```

### Building the Shared Library

```bash
npm run build:shared
```

The built library is available in `dist/shared/` and is automatically consumed by applications that import from `shared`.

## 🔧 Development Tips

1. **Hot Reload**: All applications support hot reload. Changes in remotes are reflected immediately in the shell.

2. **Shared Library Changes**: After modifying the shared library, rebuild it:
   ```bash
   npm run build:shared
   ```
   Or use watch mode:
   ```bash
   npm run watch:shared
   ```

3. **Port Conflicts**: If a port is already in use, Angular CLI will automatically use the next available port. Update the federation manifest if the port changes.

4. **Debugging**: Each remote can be accessed directly at its port for independent testing and debugging.

5. **Production Build**: For production, build all applications and deploy them. Update the federation manifest URLs to point to production endpoints.

## 🛠️ Technology Stack

- **Angular** 20.3.0
- **Module Federation** - `@angular-architects/native-federation` 20.1.7
- **NgRx Signals** - State management
- **PrimeNG** - UI component library
- **RxJS** - Reactive programming
- **TypeScript** 5.9.2

## 📝 Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Native Federation Documentation](https://www.npmjs.com/package/@angular-architects/native-federation)
- [Module Federation Guide](https://webpack.js.org/concepts/module-federation/)

## 🤝 Contributing

When adding new features:
1. Follow the existing project structure
2. Write tests for new code
3. Update this README if adding new remotes or changing architecture
4. Ensure all applications build and run successfully

## 📄 License

[Add your license information here]

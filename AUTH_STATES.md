### Goal
Separate unauthenticated (login + onboarding) and authenticated UI flows in the renderer, with a clear routing and state model that is easy to maintain.

### High-level approach
- **Single source of truth**: `AuthContext` exposes `authState` and user info.
- **Explicit states**: `loading`, `unauthenticated` (login), `onboarding`, `authenticated`.
- **Router split**: Public routes (`/login`, `/onboarding/*`) vs protected app routes (`/app/*`).
- **Guards**: `ProtectedRoute` redirects to `login` or `onboarding` based on `authState`.

### Final Clean File Structure
```text
src/renderer/
├── states/                           # 🎯 MAIN FEATURE STATES
│   ├── unauth/                       # 🔴 PUBLIC ROUTES (unauthenticated)
│   │   ├── index.tsx                 # Export barrel
│   │   ├── login/
│   │   │   └── LoginPage.tsx         # Login functionality
│   │   └── onboarding/
│   │       └── OnboardingRouter.tsx  # Onboarding flow
│   └── auth/                         # 🟢 PROTECTED ROUTES (authenticated)
│       ├── index.tsx                 # Export barrel
│       └── app/
│           ├── dashboard/
│           │   └── Dashboard.tsx     # Main dashboard
│           └── recorder/
│               └── ScreenRecorder.tsx # Screen recording functionality
├── auth/                             # 🔐 AUTHENTICATION SYSTEM
│   ├── AuthContext.tsx               # Auth state management
│   └── ProtectedRoute.tsx            # Route guard component
├── layouts/                          # 🎨 LAYOUT SHELLS
│   ├── UnauthLayout.tsx              # Layout for unauth states
│   └── AppLayout.tsx                 # Layout for auth states
├── routes/
│   └── AppRouter.tsx                 # 🚦 Main routing configuration
├── components/                       # 🧩 REUSABLE UI COMPONENTS
│   ├── index.ts                      # Component exports
│   ├── ui/button.tsx                 # UI components
│   ├── SourceSelector.tsx            # Recording components
│   ├── RecordingControls.tsx
│   ├── VideoPreview.tsx
│   └── RecordingStatus.tsx
├── hooks/
│   └── useScreenRecording.ts         # 🎣 Custom hooks
├── lib/
│   └── utils.ts                      # 🛠️ Utility functions
├── types/
│   └── index.ts                      # 📝 TypeScript definitions
└── App.tsx                           # 🚀 App entry point
```


### ✅ Structure Complete & Clean
- ✅ **ORGANIZED**: Clear separation between `unauth/` (public) and `auth/` (protected) states
- ✅ **MOVED**: Existing `ScreenRecorder` functionality to `states/auth/app/recorder/ScreenRecorder.tsx`
- ✅ **PRESERVED**: All components (`SourceSelector`, `RecordingControls`, `VideoPreview`, `RecordingStatus`) functional under `components/`
- ✅ **CLEANED**: Removed redundant files and empty folders:
  - Removed empty `components/Sidebar/` directory
  - Removed unnecessary `hooks/index.ts` barrel export (direct imports used)
  - Removed duplicate `src/lib/utils.ts` (kept renderer version)
  - Removed empty directories: `src/assets/`, `src/styles/`, `src/types/`
- ✅ **ACCESSIBLE**: Screen recording functionality at `/app/record` in authenticated layout

### Onboarding flow
- Implement `OnboardingRouter` that switches between steps and sets `authState` to `authenticated` upon completion.
- Example paths: `/onboarding`, `/onboarding/permissions`, `/onboarding/finish`.

### Layouts
- `UnauthLayout`: Minimal shell (logo + centered card) for Login/Onboarding.
- `AppLayout`: App chrome (sidebar/topbar) wrapping authenticated routes.

### Notes
- Keep redirects centralized in `ProtectedRoute`.
- Persist auth token in a secure store (Electron: consider `keytar` or OS credential vault). Defer sensitive logic to the main process when feasible.
- If you need deep linking later, consider `HashRouter` instead of `MemoryRouter` for easier URL sharing; Electron generally works fine with `MemoryRouter`.



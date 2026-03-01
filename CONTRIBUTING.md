# Contributing to Cane-Pro

First off, thank you for considering contributing to Cane-Pro! Your help is what makes this project great.

## Development Workflow

1. **Fork the Repository**
2. **Create a Feature Branch:** `git checkout -b feature/your-feature-name`
3. **Commit your Changes:**
   Use clear, descriptive commit messages.
   ```bash
   git commit -m "feat: implement advanced spatial tracking visualization"
   ```
4. **Push to your Branch:** `git push origin feature/your-feature-name`
5. **Open a Pull Request (PR)**

## Code Style & Guidelines

- **TypeScript Standard:** Enable strict checking and avoid `any` wherever possible. Define models via `type` or `interface` clearly in the `/utils` or `/context` layers.
- **React Components:** Use Functional Components with Hooks. Break down massive components into granular, reusable pieces.
- **Styling:** Adhere to the defined variables in `index.css`. Keep the "Glassmorphic Dark Theme" consistent. Do not mix inline styles unless for highly dynamic transform animations.
- **Linting:** Before submitting, always run `npm run lint` and verify there are no ESLint errors.

## Reporting Bugs
If you find a bug, please open an Issue with:
- A clear, concise title.
- Steps to reproduce.
- Expected behavior vs. actual behavior.
- Screenshots if it's a UI issue.

## Feature Requests
We'd love to hear your ideas! Please submit an Issue detailing your feature request, why it's beneficial, and optional thoughts on implementation.

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Standard Open-Source repository documents (`CODE_OF_CONDUCT.md`, `SECURITY.md`, `.github/ISSUE_TEMPLATE.md`, `.github/PULL_REQUEST_TEMPLATE.md`).
- High-level architecture diagrams to `ARCHITECTURE.md`.

## [1.0.0] - 2026-03-01

### Added
- **Global Data Simulation Layer:** Central state management using React Context API to provide unified real-time data across components.
- **Unified Stream & Real-Time Computer Vision Mockup:** Implementation of `UnifiedStream` for representing real-time object tracking and quality analysis.
- **Sensor Twin Dashboard:** Digital twin architecture via `SensorTwin` for detailed equipment and sensor diagnostics.
- **Calibration Management:** Predictive tracking capabilities added via `CalibrationManager`.
- **Spatial Tracking Maps:** Initial integration of `SpatialTracking` to trace sugarcane origin geographically.
- **Premium Styling:** Full rollout of glassmorphic dark theme across all primary layout components (`Sidebar`, `TopNav`, `Overview`).
- **Comprehensive Markdown Docs:** Added primary documentation including `README.md`, `ARCHITECTURE.md`, `FEATURES.md`, and `CONTRIBUTING.md`.

### Changed
- **Renamed Project:** Changed project identity to **Cane-Pro** (previously Sugarnxt). Updated `package.json` references and underlying structure to match.
- **Dashboard Layout Refactoring:** Switched the `App.tsx` layout to a dynamic tab-rendering approach, decoupling sidebar navigation from global state loops.

### Fixed
- Stabilized chart re-rendering via `recharts` when navigating between spatial tracking and predictive calibration views.

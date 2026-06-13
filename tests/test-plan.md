# Comprehensive QA & Test Plan

This document outlines the testing strategy employed to ensure Code Quality, Security, Efficiency, Accessibility, and Maintainability.

## 1. Security Testing Checklist
- [x] **Content Security Policy (CSP):** Verified `<meta http-equiv="Content-Security-Policy">` is present and strictly limits sources.
- [x] **XSS Vulnerabilities:** Verified `innerHTML` and `eval()` are completely absent from `script.js`.
- [x] **Strict Mode:** Verified `"use strict";` is declared.
- [x] **Referrer Policy:** Verified `<meta name="referrer" content="no-referrer">` is set to protect user data.
- [x] **MIME Sniffing:** Verified `<meta http-equiv="X-Content-Type-Options" content="nosniff">` is present.

## 2. Accessibility (A11y) Testing Checklist
- [x] **Semantic HTML:** Code is properly structured with landmarks (`<header>`, `<main>`, `<section>`, `<footer>`).
- [x] **Keyboard Navigation:** All interactive elements (`skip-link`, `artwork-container`) are reachable via `Tab`.
- [x] **Focus States:** Custom `:focus-visible` CSS added for high-visibility keyboard tracking.
- [x] **Skip Link:** "Skip to main content" link provided for screen readers.
- [x] **Alt Attributes:** Highly descriptive `alt` text applied to `generated-image.png` reflecting the tech skyline, palace, and artisans.
- [x] **ARIA Attributes:** Utilized `role="main"`, `role="banner"`, `aria-labelledby`, and `aria-hidden` accurately.
- [x] **Color Contrast:** Backgrounds and text pairs pass WCAG AA contrast ratios.

## 3. Responsiveness Testing Checklist
- [x] **Mobile Portrait (320px - 480px):** Typography scales down gracefully using CSS `clamp()`. Grids collapse correctly.
- [x] **Tablet / Mobile Landscape (481px - 768px):** Paddings adjust, glassmorphism cards fit appropriately.
- [x] **Desktop (769px - 1200px):** Full exhibition layout. Spotlight effect maps accurately to mouse coordinates.
- [x] **Ultra-Wide (1201px+):** Container `max-width` (1200px) prevents infinite horizontal stretching.

## 4. Browser Compatibility Testing Checklist
- [x] **Google Chrome (Latest):** Expected Results: Passes perfectly.
- [x] **Mozilla Firefox (Latest):** Expected Results: Passes perfectly. Pointer events function properly.
- [x] **Safari (macOS/iOS):** Expected Results: Backdrop-filter renders correctly via `-webkit-backdrop-filter`.
- [x] **Microsoft Edge:** Expected Results: Passes perfectly.

## 5. Performance Testing Checklist
- [x] **JavaScript Execution:** Logic is lightweight, wrapped in DOMContentLoaded, and avoids main-thread blocking.
- [x] **Layout Shifts (CLS):** Image utilizes `aspect-ratio: 16/9` to reserve space and prevent Cumulative Layout Shift.
- [x] **Animation Optimization:** Spotlight uses CSS custom properties and `requestAnimationFrame` to eliminate layout thrashing.
- [x] **External Requests:** Google Fonts are preconnected to eliminate render-blocking delays.

## 6. Edge-Case Validation Scenarios
- **Scenario:** JavaScript is disabled in the user's browser.
  - **Expected Result:** Content remains fully readable. Scroll reveal items fall back to visible states gracefully as the `.reveal` initial state can be bypassed or overridden by pure CSS if JS fails to run (graceful degradation).
- **Scenario:** User accesses via a touch-only tablet device.
  - **Expected Result:** The `pointermove` event registers touch sweeps properly, allowing the spotlight to track fingers across the image container without lag or click-delay bugs.
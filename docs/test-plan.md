# Test Plan — the-internet.herokuapp.com

## Objective

Verify core functionality across a selected set of features on 
the-internet.herokuapp.com, using a mix of automated UI testing and 
manual exploratory testing. This plan covers scope, approach, and 
detailed test cases for each feature area.

## Scope

### In scope
- Login / Authentication (`/login`)
- Logout flow
- Dynamic content loading (`/dynamic_loading/1` and `/2`)
- Dropdown selection (`/dropdown`)
- File upload (`/upload`)
- Cross-browser testing (Chrome, firefox, webkit)

### Out of scope
- Full coverage of every example on the site (over 40 available) — 
  a representative subset was chosen to demonstrate breadth across 
  different interaction types (forms, async content, selection 
  controls, file handling) rather than exhaustive coverage of a 
  practice site.
- Performance and load testing
- Accessibility testing

## Approach

- **Automated testing** (Playwright, TypeScript) for all in-scope 
  areas — chosen for repeatability and CI integration
- **Manual exploratory testing** performed first, on every feature, 
  before writing automated cases — used to understand actual 
  behavior, uncover edge cases, and identify the bug documented in 
  `bug-reports.md`
- Both success (happy path) and failure (negative path) cases are 
  covered deliberately for each feature, not just happy-path testing
- Shared setup (authentication) extracted into a reusable fixture 
  to avoid duplication and keep test intent clear

## Test Environment

- Target: https://the-internet.herokuapp.com
- Browser: Chromium (via Playwright)
- Execution: Locally and via GitHub Actions CI on every push

## Test Cases

### Login / Authentication

| ID | Test Case | Steps | Expected Result |
|---|---|---|---|
| AUTH-01 | Successful login | Enter valid username/password, submit | Redirected to secure area; success message shown |
| AUTH-02 | Invalid username | Enter invalid username, valid password, submit | Error message shown; remains on login page |
| AUTH-03 | Invalid password | Enter valid username, invalid password, submit | Error message shown; remains on login page |
| AUTH-04 | Empty fields | Submit with no input | Error message shown; remains on login page |
| AUTH-05 | Logout | Log in, then click logout | Redirected to login page; logout confirmation shown |

### Dynamic Loading

| ID | Test Case | Steps | Expected Result |
|---|---|---|---|
| DYN-01 | Example 1 — element visibility after load | Click "Start", wait for load | Hidden element becomes visible with correct text |
| DYN-02 | Example 2 — element added to DOM after load | Click "Start", wait for load | Element is created and attached to the DOM, then visible with correct text |

*Note: Example 1 and Example 2 differ in underlying behavior — Example 1's 
element exists but is hidden; Example 2's element doesn't exist in the DOM 
until loading completes. Test design reflects this distinction explicitly 
(see README for reasoning).*

### Dropdown

| ID | Test Case | Steps | Expected Result |
|---|---|---|---|
| DROP-01 | Default state | Load page | No meaningful option selected by default |
| DROP-02 | Select Option 1 | Select "Option 1" | Dropdown value updates to reflect Option 1 |
| DROP-03 | Select Option 2 | Select "Option 2" | Dropdown value updates to reflect Option 2 |

*Note: selection is performed by option `value` rather than visible label 
or index, as `value` is the more stable, functionally meaningful identifier 
(see README for reasoning).*

### File Upload

| ID | Test Case | Steps | Expected Result |
|---|---|---|---|
| UPLOAD-01 | Successful upload | Select a valid file, click Upload | Confirmation shown with correct filename |
| UPLOAD-02 | Submit with no file selected | Click Upload with no file chosen | **Actual:** Internal Server Error (bug — see `bug-reports.md`). **Expected:** graceful validation message |

## Exploratory Testing Notes

Manual exploratory testing was performed on each feature before automation, 
including:
- Attempting submission with no file selected on the upload page (led to 
  the documented bug)
- Comparing DOM state before/after loading on both dynamic loading examples, 
  to confirm the visibility-vs-attachment distinction before writing 
  assertions around it
- Manually testing the dropdown's default/disabled first option to confirm 
  it can't be re-selected once another option is chosen

## Known Issues

See [`bug-reports.md`](./bug-reports.md) for full details.

- **UPLOAD-02**: Submitting the upload form with no file selected returns 
  an Internal Server Error instead of a validation message. Tracked and 
  documented; corresponding automated test records current (buggy) behavior.
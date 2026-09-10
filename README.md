# Playwright QA Portfolio

An automated test suite built against [the-internet.herokuapp.com](https://the-internet.herokuapp.com), 
a public practice site for test automation. This project was built to demonstrate 
end-to-end QA skills: test case design, automated UI and negative-path testing, 
reusable test infrastructure, CI integration, and structured bug reporting.

## Why this project exists

I'm a self-taught developer, moving toward test engineering.
This project is a hands-on demonstration of core testing skills - 
test design, automation, and documentation - built independently to show practical 
ability rather than just familiarity with concepts.

## Tech stack

- **[Playwright](https://playwright.dev/)** (TypeScript) - browser automation and testing framework
- **GitHub Actions** - CI pipeline, runs the full suite on every push
- **Node.js**

## Project structure

```
playwright-qa-portfolio/
├── .github/workflows/       # CI pipeline config
├── fixtures/
│   └── auth.fixture.ts      # reusable authenticated-session fixture
├── test-data/
│   └── sample-upload.txt    # sample file used in upload tests
├── tests/
│   ├── form-authentication.spec.ts
│   ├── logout.spec.ts
│   ├── dynamic-loading.spec.ts
│   ├── dropdown.spec.ts
│   └── file-upload.spec.ts
├── docs/
│   └── bug-reports.md       # written bug report(s) found during testing
├── playwright.config.ts
└── README.md
```

## What's covered

| Area | File | What it tests |
|---|---|---|
| Login / Authentication | `form-authentication.spec.ts` | Valid login, invalid username, invalid password, empty fields |
| Logout | `logout.spec.ts` | Logout flow, using a shared auth fixture |
| Dynamic content loading | `dynamic-loading.spec.ts` | Elements that become visible vs. elements added to the DOM after an async delay |
| Dropdown selection | `dropdown.spec.ts` | Native `<select>` interaction and default/selected state |
| File upload | `file-upload.spec.ts` | Successful upload, and a negative case that surfaced a real bug (see below) |

Both success and failure paths are covered deliberately — not just happy-path testing.

## How to run it

```bash
npm install
npx playwright install
npx playwright test
```

Run a single file:
```bash
npx playwright test tests/form-authentication.spec.ts
```

Run with the browser visible (useful for debugging):
```bash
npx playwright test --headed
```

View the HTML report after a run:
```bash
npx playwright show-report
```

## CI

Every push runs the full suite automatically via GitHub Actions 
(`.github/workflows/playwright.yml`). See the **Actions** tab on this repo 
for run history.

## Key design decisions

**Authentication fixture (`fixtures/auth.fixture.ts`)**  
Login setup was originally duplicated across tests. It's now extracted into a 
custom Playwright fixture that handles authentication and asserts the login 
precondition once, so individual test files stay focused only on the behavior 
they're actually testing (e.g. `logout.spec.ts` never re-tests login itself).

**`toBeAttached()` vs `toBeVisible()` (`dynamic-loading.spec.ts`)**  
The two dynamic loading examples on the target site behave differently under 
the hood: one hides/shows an already-existing element, the other adds the 
element to the DOM only after loading completes. The test suite reflects that 
distinction explicitly, using `toBeAttached()` where existence - not just 
visibility - is the meaningful thing being verified. This mirrors a common 
real-world cause of flaky tests.

**Auto-waiting over hardcoded waits**  
All waiting in this suite relies on Playwright's built-in auto-waiting 
assertions rather than fixed sleeps (`waitForTimeout`), which either waste 
time or cause flakiness when real-world timing varies - as seen directly 
during development, where a fixed 5s timeout on the dynamic loading example 
occasionally wasn't enough on slower runs.

**`selectOption()` by `value`, not label or index (`dropdown.spec.ts`)**  
Selection is done by the option's `value` attribute rather than its visible 
label or position. Labels can change for cosmetic/copy reasons without any 
functional change, and index-based selection breaks if options are reordered 
or new ones are added - `value` is the more stable, functionally meaningful 
identifier.

**Honest note on dropdown test depth**  
The dropdown tests verify correct interaction with a native `<select>` 
element, but the target page has no downstream behavior tied to the 
selection - so these tests largely confirm standard browser behavior rather 
than meaningful application logic. In a real application, I'd assert on 
whatever effect the selection has, not just the selection itself.

## Bug found

While writing negative-path coverage for file upload, submitting the form 
with no file selected produced an Internal Server Error rather than a 
graceful validation message. Full write-up, including severity/priority 
reasoning, is in [`docs/bug-reports.md`](./docs/bug-reports.md). The 
corresponding test in `file-upload.spec.ts` documents this as the current 
(buggy) actual behavior, and is linked from the bug report so it can be 
updated if the underlying issue is ever fixed.

## Use of AI tooling

Claude Code was used throughout this project's development,
debugging failing assertions (e.g. diagnosing a flaky `toBeAttached()` 
timeout as a timing issue rather than a logic bug), and 
reviewing test design decisions like fixture structure and selector strategy. 
I'm comfortable incorporating AI-assisted tools into a testing workflow 
while still reasoning through and owning the underlying decisions myself.
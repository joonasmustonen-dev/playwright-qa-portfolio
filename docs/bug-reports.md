# Bug Report: File Upload — Empty Submission Causes Server Error

## Summary
Submitting the file upload form without selecting a file results in an 
Internal Server Error, rather than a graceful client-side or server-side 
validation message.

## Environment
- **URL:** https://the-internet.herokuapp.com/upload
- **Browser:** Chromium (Playwright), v1.63.0
- **Date found:** 1.1.2026
- **Found via:** Automated test suite (see `tests/file-upload.spec.ts`)

## Steps to Reproduce
1. Navigate to `/upload`
2. Without selecting a file, click the "Upload" button

## Expected Result
The form should either:
- Prevent submission client-side (e.g. disable the Upload button until a 
  file is selected), or
- Return a clear, user-facing validation message (e.g. "Please select a 
  file before uploading")

## Actual Result
The server returns an Internal Server Error page. No file-selection 
validation occurs at any layer.

## Severity / Priority
**Severity:** Low — this is a public demo/practice site, not a production 
application, and the failure doesn't corrupt data or affect other users.

**Priority:** Would be Medium in a production context, for two reasons:
1. **UX** — users are shown a raw server error instead of a clear, 
   actionable message, which is a poor experience for a very common 
   mistake (forgetting to select a file).
2. **Security consideration** — returning raw server errors instead of 
   handling invalid input gracefully can potentially expose stack traces 
   or internal implementation details, which is generally considered 
   poor practice from a security standpoint even when the immediate 
   impact is minor.

## Additional Notes
This was found incidentally while writing automated negative-path test 
coverage for the file upload feature — a reminder that testing "empty" 
or missing-input states, not just invalid ones, can surface real issues 
even on simple forms.

## Related Test
Automated regression coverage for this exact scenario exists in 
`tests/file-upload.spec.ts` → `'submitting with no file selected results 
in a server error'`, which currently documents this as the actual 
(buggy) behavior. If this is fixed, that test should be updated to 
assert the new, correct behavior instead.
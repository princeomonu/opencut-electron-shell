# Contributing to OpenCut Electron Shell

Thanks for contributing. This project is a small Electron shell around the hosted OpenCut application, so changes should preserve the security boundary between the remote site and the local machine.

## Before you start

- Search existing issues before opening a new one.
- Open an issue first for substantial behavior, security, or packaging changes.
- Do not submit OpenCut user data, credentials, or private projects in issues, logs, or pull requests.

## Development setup

Requirements:

- Node.js 22 or newer
- pnpm 11 or newer

```bash
pnpm install --frozen-lockfile
pnpm start
```

## Making changes

- Keep changes focused and explain the user-visible effect.
- Do not enable Node integration or expose Electron APIs to the hosted OpenCut page.
- Preserve the production profile path in `main.js` unless a migration plan is included.
- Update documentation when installation, storage, security, or packaging behavior changes.
- Test the packaged artifact for every platform affected by your change.

## Pull requests

Include:

- A concise description of the problem and solution.
- Testing performed, including OS and package format where relevant.
- Screenshots or logs for user-interface or packaging changes when useful.
- A linked issue for non-trivial changes.

## Reporting security issues

Do not disclose security-sensitive issues in public GitHub issues. Until a dedicated security policy is published, contact the maintainer at `hello@princeomonu.com`.

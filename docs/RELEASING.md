# Releasing

GitHub Actions creates a release when a version tag beginning with `v` is pushed. The tag must match the version in `package.json`.

## Before releasing

- Update `package.json` with the intended version.
- Update release notes or changelog content as needed.
- Test the Linux artifacts locally.
- Commit and push the release changes to `main`.

## Create a release

For version `0.4.0`:

```bash
git tag -a v0.4.0 -m "OpenCut Electron Shell v0.4.0"
git push origin v0.4.0
```

The workflow validates the tag/version match, builds on native runners, and publishes one GitHub Release containing:

- Linux x64 AppImage and Debian package
- Windows x64 NSIS installer and portable ZIP
- macOS x64 DMG and ZIP
- macOS arm64 DMG and ZIP
- `SHA256SUMS`

Tags containing a prerelease suffix, such as `v0.4.0-beta.1`, are published as GitHub prereleases.

## After publishing

- Download and install each artifact on its target platform before recommending it broadly.
- Confirm persistent storage, exports/downloads, external links, and relaunch behavior.
- Mark Windows and macOS releases as beta until that testing is complete.
- Do not delete or retag published releases; publish a new version instead.

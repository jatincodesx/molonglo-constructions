# Molonglo Constructions Windows Paperclip Setup

## Project

- Project name: Molonglo Construction SEO site
- GitHub repo URL: https://github.com/jatincodesx/molonglo-constructions
- Recommended branch to start from on Windows: `draft/premium-scroll-ui`
- Package manager: npm

## Branches Pushed

- `draft/premium-scroll-ui`
- `feature/build-journey-scroll`
- `feature/house-walkthrough-scroll`
- `feature/site-wide-scroll-language-v2`
- `main`

## Windows Clone Commands

Run these in Windows PowerShell:

```powershell
git clone https://github.com/jatincodesx/molonglo-constructions.git
cd molonglo-constructions
git fetch --all --tags
git branch -a
git checkout draft/premium-scroll-ui
```

## Safe AI Working Branch

Create a new branch before using Paperclip or Codex:

```powershell
git checkout draft/premium-scroll-ui
git pull --ff-only
git switch -c paperclip/windows-setup-work
```

Use a new branch name for each separate piece of work.

## Install And Run

Install dependencies:

```powershell
npm install
```

Start local development:

```powershell
npm run dev
```

Build the site:

```powershell
npm run build
```

Optional checks:

```powershell
npm run typecheck
npm run lint
```

Cloudflare build is available, but do not deploy without Jatin approval:

```powershell
npm run build:cf
```

## Notes For Paperclip And Codex

- Work on branches only.
- Do not push to `main` directly.
- Do not deploy without Jatin approval.
- Do not commit secrets.
- Do not commit `.env`, `.env.local`, `.dev.vars`, `.wrangler`, `.open-next`, `node_modules`, `.next`, or OS files such as `.DS_Store`.
- Keep production and deployment settings unchanged unless Jatin explicitly approves the change.

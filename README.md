This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# GitHub Workflow Best Practices

This document outlines a concise GitHub workflow for managing branches and code changes, ensuring an organized and efficient development process.

## 1. Use `main` Branch for Production

- The `main` branch should always represent the stable production code.
- No one should push directly to the `main` branch.
- Protect the `main` branch, allowing only pull requests (PRs) that pass reviews and tests to be merged.

## 2. Use a `staging` Branch

- The `staging` branch serves as the testing environment before deploying to production.
- Merge smaller feature branches into `staging` for integration and testing.

## 3. Create Feature Branches for Every Task

- When working on a task or feature, create a feature branch from `staging` (or another feature branch if needed).
- Use meaningful names for your branches, such as `feature/add-login`, `fix/bug-123`, or `chore/update-dependencies`.

### Example:

```bash
git checkout -b feature/add-login staging
```

## 4. Commit Frequently with Meaningful Message

- Write small, logical commits with clear commit messages.

### Example:

```bash
git commit -m "Fix issue #123: Add login form validation"
```

## 5. Push Feature Branch to Remote

- Push your feature branch to the remote repository frequently to back up your work and collaborate.

### Example:

```bash
git push origin feature/add-login
```

# 6. Open a Pull Request (PR)

- Once your feature is complete, open a pull request from your feature branch to the staging branch.
- Make sure your PR has a clear description of the work done and any related issue numbers.
- Include checklists if needed for tasks like tests or code reviews.

# 7. Review and Testing

- Reviewers should review the PR before merging.
- Ensure code passes all tests and follows coding standards.
- Optionally, use automated CI/CD pipelines to test and lint code on PRs.

# 8. Delete Branch After Merge

- After merging a feature or fix into staging or main, delete the branch to keep the repository clean.

### Example:

```bash
git branch -d feature/add-login
git push origin --delete feature/add-login
```

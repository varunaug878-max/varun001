# Monthly Expense Tracker (LocalStorage)

A minimal black-themed monthly expense tracker website built with HTML, CSS, and JavaScript.

## Features

- Multi-user signup/login using LocalStorage
- Separate user data by account
- Monthly budget tracking
- Add/edit/delete payments
- Filter payments by category and paid/unpaid status
- Dashboard with total budget, spent amount, remaining amount, and category breakdown

## Pages

- `login.html`
- `signup.html`
- `dashboard.html`
- `payments.html`
- `payment-form.html`
- `budget.html`
- `settings.html`

## Run

Use any static server, for example:

```bash
python3 -m http.server 5500
```

Then open:

- <http://localhost:5500/login.html>

## Netlify Deployment

This app is a static site and does not require a bundler build.

- `package.json` includes a no-op `build` script so `npm run build` succeeds on Netlify.
- `netlify.toml` publishes the repository root (`.`) and redirects `/` to `login.html`.

If your Netlify UI has old settings, update them to:

- Base directory: *(leave empty)*
- Build command: `npm run build`
- Publish directory: `.`

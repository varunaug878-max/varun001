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

## Run Locally

Use any static server, for example:

```bash
python3 -m http.server 5500
```

Then open:

- <http://localhost:5500/login.html>

## Netlify Deployment

This project is a plain static site (no bundler required).

### Recommended settings (static deploy)

- Base directory: *(leave empty)*
- Build command: *(leave empty)*
- Publish directory: `.`

### Optional settings (if you prefer running npm build)

- Base directory: *(leave empty)*
- Build command: `npm run build`
- Publish directory: `.`

`netlify.toml` already publishes the repository root and redirects `/` to `login.html`.


## Merge-Conflict Troubleshooting

If GitHub shows merge conflicts in `README.md`, `index.html`, `login.html`, or `signup.html`, keep the latest versions from this branch and remove all Git conflict marker lines before committing.

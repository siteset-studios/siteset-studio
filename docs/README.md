# Siteset Studio — Static Website

This folder contains the static website files for **Siteset Studio** — a digital agency helping Indian local businesses build a strong online presence.

The `/docs` folder is served directly by GitHub Pages. No build step is required.

---

## How to Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. In the left sidebar, click **Pages**
4. Under **Source**, select **Deploy from a branch**
5. Set **Branch** to `main` and **Folder** to `/docs`
6. Click **Save**

Your site will be live at:
`https://<your-username>.github.io/<your-repo-name>/`

> **Note:** A GitHub Actions workflow (`.github/workflows/deploy.yml`) is also included that auto-deploys the `/docs` folder whenever you push to the `main` branch using the modern Pages Actions method. Both methods work — use whichever you prefer.

---

## How to Connect a Custom Domain

1. In **Settings → Pages**, scroll down to **Custom domain**
2. Enter your domain (e.g. `sitesetstudios.com` or `www.sitesetstudios.com`)
3. Click **Save**
4. Go to your domain registrar (GoDaddy, Namecheap, etc.) and add DNS records:

### For a `www` subdomain:
| Type  | Name | Value                          |
|-------|------|--------------------------------|
| CNAME | www  | `<your-username>.github.io`    |

### For an apex/root domain (e.g. `sitesetstudios.com`):
Add all four of these A records:
| Type | Name | Value         |
|------|------|---------------|
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

5. Wait 10–30 minutes for DNS to propagate
6. Back in GitHub Pages settings, enable **Enforce HTTPS** — free SSL certificate included

---

## Contact

- Email: sitesetstudios@gmail.com
- WhatsApp: +91 93301 38050

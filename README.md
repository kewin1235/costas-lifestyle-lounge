# Costa's Lifestyle Lounge — Website

A premium, mobile-first multi-page website for **Costa's Lifestyle Lounge** in
Postmasburg, Northern Cape — with a luxury dark theme, full-screen video hero,
glass-morphism floating navigation, photo carousels, filterable gallery, booking
forms that open WhatsApp, and SEO optimisation throughout.

> *"It's not a Party, it's a Celebration!"*

---

## ✦ What's Inside

```
costas-lifestyle-lounge/
├── index.html               ← Home (full-screen video hero + slideshow)
├── about.html               ← About / Story
├── restaurant.html          ← Restaurant & Bar (with menu)
├── events.html              ← Events (live music, DJ, karaoke, brunch)
├── venue-hire.html          ← Venue Hire (4 packages + booking form)
├── gallery.html             ← Filterable photo gallery + lightbox + videos
├── reviews.html             ← Reviews & social proof
├── contact.html             ← Contact, map, full booking form
├── css/
│   └── styles.css           ← Single, well-commented stylesheet
├── js/
│   └── main.js              ← Vanilla JS (nav, slideshow, filters, etc.)
├── public/media/
│   ├── logo/                ← Drop logo.png here
│   ├── videos/              ← Drop hero-video.mp4 here
│   └── gallery/             ← Drop gallery-1.jpg … gallery-6.jpg here
├── netlify.toml             ← One-click Netlify deployment
├── vercel.json              ← Vercel deployment config
└── README.md                ← This file
```

---

## ✦ Quick Start

### Test locally

You can simply double-click `index.html` to view it in a browser, but for the
floating-nav blur and other modern features to work properly, serve the files
from a local web server:

```bash
# Option 1 — Python (built-in, no install)
cd costas-lifestyle-lounge
python3 -m http.server 8080

# Option 2 — Node
npx serve .

# Then open
http://localhost:8080
```

---

## ✦ Replacing Placeholders With Your Real Photos & Videos

The site is fully styled and functional with **decorative placeholders** so you
can deploy immediately. To swap them for your real assets from Facebook,
Instagram or TikTok, follow the steps below.

### 1) Logo

1. Save your logo as `public/media/logo/logo.png` (transparent square PNG, 512×512+).
2. Open `index.html` and find the comment `REPLACE: replace inner .hero-mark-letter…`
   — replace the inner block with:
   ```html
   <div class="hero-mark">
     <img src="public/media/logo/logo.png" alt="Costa's Lifestyle Lounge" style="width:100%;height:100%;object-fit:cover;border-radius:50%">
   </div>
   ```
3. In **every** HTML file, find `REPLACE: <span class="nav-brand-mark">` and swap to:
   ```html
   <img src="public/media/logo/logo.png" alt="Costa's"
        style="width:38px;height:38px;border-radius:50%">
   ```

### 2) Hero Video (Homepage)

1. Save your video as `public/media/videos/hero-video.mp4`
   (recommended: 720–1080p, 10–30 sec loop, under 8 MB — use HandBrake or compress.video).
2. Open `index.html` and find the commented-out `<video>` block — uncomment it:
   ```html
   <video class="hero-video" autoplay muted loop playsinline preload="auto">
     <source src="public/media/videos/hero-video.mp4" type="video/mp4" />
   </video>
   ```
3. Until you do this, the hero shows a beautiful animated gradient fallback.

### 3) Gallery Photos

1. Save photos to `public/media/gallery/` as `gallery-1.jpg` through `gallery-6.jpg`
   (1600 px wide minimum, JPEG, optimised — try [Squoosh](https://squoosh.app)).
2. In each HTML file, search for `class="slide-bg bg-1"` (or `bg-2`, `bg-3`, etc.)
   and replace the `<div>` with:
   ```html
   <img src="public/media/gallery/gallery-1.jpg" alt="Costa's interior"
        style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
   ```
3. The split-image decorative boxes (`<div class="split-image">`) should also
   be replaced with `<img>` tags pointing at e.g. `welcome.jpg`, `about-story.jpg`,
   `restaurant.jpg`, `venue-hire.jpg`, `why-costas.jpg` — see comments in the HTML.

### 4) Gallery Video Clips

In `gallery.html`, find the three video tile blocks under "In Motion" — uncomment
the `<video>` tags and update the `src` to your files (e.g. `clip-1.mp4`).

---

## ✦ Editing Text, Phone, Socials

### Phone Number

The phone number `063 050 1133` (international: `+27 63 050 1133`) appears in:

| Location                         | Format used                          |
| -------------------------------- | ------------------------------------ |
| Display text (header/footer)     | `063 050 1133`                       |
| `tel:` links                     | `tel:+27630501133`                   |
| WhatsApp links                   | `https://wa.me/27630501133`          |
| `js/main.js` — `WHATSAPP` const  | `27630501133`                        |

Use **Find & Replace** across all `.html` files plus `js/main.js` to change it.

### Social Media Links

Search any HTML file for the `socials` section in the footer or contact page.
Update these URLs:

```html
<a href="https://www.facebook.com/costaslifestylelounge">Facebook</a>
<a href="https://www.instagram.com/explore/locations/costaslifestylelounge">Instagram</a>
<a href="https://www.tiktok.com/discover/costas-lifestyle-lounge">TikTok</a>
```

### Tagline / Slogan

The tagline *"It's not a Party, it's a Celebration!"* appears in `index.html`
(hero) and every footer. Use Find & Replace to update everywhere at once.

---

## ✦ How the Booking Forms Work

Every form in the site uses `data-whatsapp` and is intercepted by `js/main.js`.
On submit, the JS:

1. Reads all form fields,
2. Builds a formatted WhatsApp message,
3. Opens `https://wa.me/27630501133?text=…` in a new tab.

That means **every booking enquiry lands directly in your WhatsApp**, with
all the customer's details pre-filled. No backend, no email setup, no spam —
just instant conversations.

To switch the destination number, edit the `WHATSAPP` constant near the top
of `js/main.js`.

---

## ✦ Deployment

### Option A — Netlify (recommended, easiest)

1. Visit [netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `costas-lifestyle-lounge` folder onto the page.
3. Site is live in ~10 seconds. You'll get a `*.netlify.app` URL immediately.
4. Connect your custom domain (e.g. `costaslifestylelounge.co.za`) in Site Settings.

The included `netlify.toml` handles caching headers and security automatically.

### Option B — Vercel

1. Push the folder to a GitHub repo.
2. Visit [vercel.com](https://vercel.com), click "Import Project", select the repo.
3. Click "Deploy". Done.

The included `vercel.json` configures caching.

### Option C — Any web host

This is plain HTML/CSS/JS. Upload all files to your hosting via FTP/cPanel
into the `public_html` (or equivalent) folder. Done.

---

## ✦ SEO Already Built In

- Page-specific `<title>` and `<meta description>` on every page
- Keyword targeting: *Costa's Lifestyle Lounge Postmasburg*, *lounge in Postmasburg*,
  *rooftop Postmasburg*, *venue hire Postmasburg*, *Boichoko lounge*, *Northern Cape*
- Open Graph tags for clean Facebook/WhatsApp link previews
- Semantic HTML structure
- Mobile-first responsive design (Google's primary ranking signal)

After launch, submit your sitemap at [search.google.com/search-console](https://search.google.com/search-console)
to start ranking on Google.

---

## ✦ Browser Support

- ✅ Chrome / Edge / Brave / Opera (latest)
- ✅ Safari (latest, including iOS)
- ✅ Firefox (latest)
- ✅ Samsung Internet
- ✅ Mobile, tablet, desktop, ultra-wide

---

## ✦ Need Help?

Every section of HTML is commented with `REPLACE:` markers showing exactly what
to change. Search the codebase for `REPLACE:` to see every editable point in
one place.

---

**Built with care for Costa's Lifestyle Lounge — Postmasburg's premier venue.**

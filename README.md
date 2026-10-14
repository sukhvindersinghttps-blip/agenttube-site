# AgentTube — New Landing Page (Futuristic)

Static website — HTML/CSS/JS only. **No build tools, no npm, no backend.**
Live site (old version) is at **agenttube.in**. This folder is the NEW version.
**Do NOT publish until you have read "Go live" below.**

## Files

| File | What it is | Who edits it |
|---|---|---|
| `index.html` | The whole website (design + sections) | Only when changing layout/text of fixed sections |
| `products.json` | **ALL product data** — name, price, description, image, badge | You / your editor — this is the main file you touch |
| `config.js` | Razorpay Key ID + store name | You — once, to go live |
| `images/` | Product images | You / your editor |
| `README.md` | This guide | — |

---

## 1) GO LIVE — Razorpay setup (do this FIRST, one time)

The checkout uses **Razorpay Checkout** (the secure Razorpay payment window).
No secret keys are in this website. Razorpay Dashboard shows all your
orders/payments — no backend needed.

**Step 1 — Get your Key ID:**
1. Log in to [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Go to **Settings → API Keys**
3. Click **Generate Key** (use **Live mode** for real payments, **Test mode** to try it first)
4. Copy the **Key ID** (looks like `rzp_live_xxxxxxxxxxxx` or `rzp_test_xxxxxxxxxxxx`)

**Step 2 — Paste it into the site:**
1. Open `config.js` in any text editor (Notepad, TextEdit, VS Code)
2. Find this line: `const RAZORPAY_KEY_ID = "PASTE_YOUR_RAZORPAY_KEY_ID_HERE";`
3. Replace ONLY the text between the quotes with your real Key ID:
   `const RAZORPAY_KEY_ID = "rzp_live_xxxxxxxxxxxx";`
4. Save the file.

**Step 3 — Test it:** open the site, add the product to cart, checkout with
your own name/email/mobile, pay ₹1 in **Test mode** (or a real small payment
in Live mode). The payment appears in Razorpay Dashboard → Transactions.

**Step 4 — After a real customer pays:** Razorpay shows the order in your
Dashboard (customer name, email, mobile, amount). **You send the PDF manually**
to their email/WhatsApp. There is no automatic delivery.

⚠️ Never paste the **Key Secret** anywhere in this website — only the Key ID.

---

## 2) How the shop works (for you)

1. Customer clicks **Add to Cart** (or **Buy Now** → goes straight to checkout)
2. Cart drawer opens — items, quantity +/−, total, **Checkout** button
3. Checkout form asks ONLY: **Name, Email, Mobile Number**
   (name must not be empty · email must look like name@example.com ·
   mobile must be exactly 10 digits)
4. **Pay Securely with Razorpay** opens the Razorpay window with their
   name/email/mobile already filled in. Amount = cart total.
5. **Success** → Thank You screen with the order summary
   ("Payment successful! We'll send the PDF to your email/WhatsApp shortly.")
   **Failure** → error message + **Try Again** button.
6. You see the order in Razorpay Dashboard and send the PDF manually.

---

## 3) Change a product (price / text / image) — NO AI NEEDED

Everything about a product lives in **`products.json`**. Open it, change the
text, save. That is all.

Example — change the price from ₹4,999 to ₹2,999:
1. Open `products.json`
2. Find `"price": "₹4,999"` → change to `"price": "₹2,999"`
3. Find `"pricePaise": 499900` → change to `"pricePaise": 299900`
   (pricePaise = price in paise: ₹2,999 = 299900 paise. Always update BOTH.)
4. Save. Refresh the website — the card shows the new price.

Other fields you can change the same way:
- `"name"` — product name on the card
- `"description"` — short text under the name
- `"features"` — the ✓ bullet list (each line in quotes, separated by commas)
- `"oldPrice"` — the crossed-out price (delete the line to hide it)
- `"badge"` — the corner label (e.g. "BESTSELLER", "NEW"; delete to hide)
- `"image"` — path to the product picture (see §5)
- `"deliveryNote"` — the small line under the buttons

⚠️ Keep the quotes and commas exactly as they are. If the page stops showing
products, you likely deleted a comma or quote — undo the last change.

## 4) Add a NEW product card — NO AI NEEDED

1. Open `products.json`
2. Copy one whole `{ ... }` product block (from `{` to `}`), paste it after
   the existing one, and put a comma `,` between the two blocks.
3. Change the copy's fields: give it a NEW `"id"` (e.g. `"my-second-pack"`),
   new `"name"`, `"price"`, `"pricePaise"`, `"description"`, `"features"`,
   `"image"`, `"badge"`.
4. Save. The new card appears automatically — **no HTML editing needed.**

To remove a product: delete its whole `{ ... }` block (and the comma after
it if it is not the last one).

## 5) Change / add a product image — NO AI NEEDED

1. Put the new image file in the `images/` folder
   (JPG, PNG, SVG or WEBP — keep it under ~500 KB so the page stays fast)
2. In `products.json`, set `"image": "images/your-new-image.jpg"`
3. Save. The card shows the new image.

Tip: square-ish or 16:10 images look best. Name files simply, no spaces
(e.g. `thumbnail-pack.jpg`, not `My Image (1).jpg`).

## 6) Change hero / section text — NO AI NEEDED

Fixed text (hero headline, process steps, channels, contact) lives in
`index.html`. Open it, find the sentence, change the words, save.
Do not touch anything between `<script>` and `</script>` unless you know JS.

## 7) Preview before publishing

Because the site loads `products.json` with JavaScript, opening `index.html`
by double-clicking may show "Products are loading…" in some browsers.
Preview properly one of these ways:
- **Easiest:** upload the files to GitHub (see §8) — GitHub Pages serves
  everything correctly.
- **Local:** run a tiny server in this folder:
  `python3 -m http.server 8000` then open http://localhost:8000

## 8) Publish to agenttube.in

The live site is the GitHub repo `sukhvindersinghttps-blip/agenttube-site`
(GitHub Pages, CNAME = agenttube.in). To publish this new version:
1. **Back up first:** the old `index.html` is still in the repo history.
2. Copy these files into the repo (replacing the old `index.html`):
   `index.html`, `products.json`, `config.js`, `images/`
3. Make sure the repo still has the `CNAME` file containing `agenttube.in`
   (do NOT delete it — it keeps the custom domain working).
4. Commit + push. GitHub Pages rebuilds in ~1 minute.
5. Open https://agenttube.in and test: Add to Cart → Checkout → Razorpay.

**Do NOT publish until `config.js` has your real Razorpay Key ID** —
otherwise checkout shows "Checkout is not set up yet".

## 9) If something breaks

- Products not showing → `products.json` has a typo (missing comma/quote).
  Re-open it and undo the last edit, or restore from GitHub history.
- "Checkout is not set up yet" → `config.js` still has the placeholder Key ID.
- Payment window doesn't open → no internet, or the Key ID is wrong.
- Orders not visible → check **Razorpay Dashboard → Transactions**
  (orders live there, not on this website).

## 10) What is NOT in this website (by design)

- No customer accounts, no login
- No automatic PDF delivery (you send it manually after payment)
- No backend, no database, no secrets — Razorpay handles the money

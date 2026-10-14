# AgentTube — New Landing Page (Futuristic)

Static website — HTML/CSS/JS only. **No build tools, no npm, no backend.**
Live site (old version) is at **agenttube.in**. This folder is the NEW version.
**Do NOT publish until you have read "Go live" below.**

## Files

| File | What it is | Who edits it |
|---|---|---|
| `index.html` | The whole website (design + sections) | Only when changing layout/text of fixed sections |
| `products.json` | **ALL product data** — name, price, description, image, badge | You / your editor — this is the main file you touch |
| `config.js` | Razorpay.me payment link + store name | You — once, to go live |
| `images/` | Product images | You / your editor |
| `README.md` | This guide | — |

---

## 1) GO LIVE — Payments (Razorpay Payment Links + Razorpay.me fallback — CURRENT setup)

Your Razorpay **API Keys option is restricted**, so the site does NOT use
Razorpay Checkout.js / a Key ID for now. Instead, the site uses
fixed-amount **Razorpay Payment Links** (no API needed), with your generic
**Razorpay.me page** as the fallback. No secret keys are in this website.
Razorpay Dashboard shows all your payments — no backend needed.

**How it works for the customer:**
1. They fill in Name / Email / Mobile and see an order summary.
2. They click **"Pay ₹X on Razorpay"** → a Razorpay payment page opens.
3. **Amount auto-filled when the cart matches a Payment Link exactly:**
   - Prompt Pack × 1 → its Payment Link (₹749)
   - Content Pilot AI × 1 → its Payment Link (₹4,999)
   - Prompt Pack × 1 + Content Pilot AI × 1 → the COMBO Payment Link (₹5,748)
   
   **Anything else** (a Payment Link not set yet, quantity > 1, or another
   mix): the generic Razorpay.me page opens and they enter the
   **exact amount** shown on the site.
4. You see the payment in **Razorpay Dashboard → Transactions** and match it
   to the customer (amount + email/mobile they entered).
   **You send the product manually** to their email/WhatsApp.
   The site never claims the payment is confirmed — it only sends them to pay.

### Set up THREE Payment Links (do this once)

A Payment Link has a FIXED amount, so make one for each exact cart that
must auto-fill — **three links total:**

| # | Cart | Amount | Where the link goes |
|---|------|--------|---------------------|
| 1 | AI Image Prompt Pack × 1 | ₹749 | That product's `paymentLink` in `products.json` |
| 2 | Content Pilot AI × 1 | ₹4,999 | That product's `paymentLink` in `products.json` |
| 3 | BOTH products × 1 each | ₹5,748 (749 + 4,999) | `BOTH_PRODUCTS_PAYMENT_LINK` in `config.js` |

Steps (repeat for each of the three):
1. Log in to [dashboard.razorpay.com](https://dashboard.razorpay.com).
2. Go to **Payments → Payment Links → Create Payment Link**.
3. Set the **amount** to the exact price from the table above.
   Give it a clear title (e.g. "Prompt Pack", "Content Pilot AI", "Both Products").
   Create it.
4. Copy the Payment Link URL (looks like `https://rzp.io/l/xxxxxxxx`).
5. Paste it in the right place from the table:
   - Links 1–2: in `products.json`, replace that product's placeholder:
     `"paymentLink": "PASTE_PAYMENT_LINK_HERE"` →
     `"paymentLink": "https://rzp.io/l/xxxxxxxx"`
   - Link 3: in `config.js`, replace:
     `const BOTH_PRODUCTS_PAYMENT_LINK = "PASTE_BOTH_COMBO_LINK_HERE";` →
     `const BOTH_PRODUCTS_PAYMENT_LINK = "https://rzp.io/l/xxxxxxxx";`
6. Save.

**If a price changes:** make NEW Payment Links at the new prices (old links
still charge the old amounts) — and the Both link must equal the SUM of the
two new prices. Update `products.json` / `config.js` with the new links.

**To change the fallback payment page:** open `config.js` and replace the link:
`const RAZORPAY_ME_LINK = "https://razorpay.me/@sukhvindersingh5057";`

**Step — Test it:** open the site, add ONE product (quantity 1) to cart,
checkout with your own name/email/mobile, click Pay, and check that the
payment page opens with the amount already filled in. Then test the BOTH
cart (Prompt Pack × 1 + Content Pilot AI × 1) — it should open the combo
link with ₹5,748 filled in. Then test quantity 2 — it should open the
Razorpay.me page, where you enter the exact amount. (Do a small real
payment and confirm it appears in Razorpay Dashboard → Transactions.)

**Limits to know:** Payment Links can only auto-fill the three exact carts
above. Full auto-fill for ANY cart total (any mix/quantity) needs
API access — Razorpay Checkout.js — once it is unrestricted (see below).

### Switching BACK to Razorpay Checkout.js later (when API access is unrestricted)

When Razorpay lifts the restriction on API Keys, you can switch back to the
Razorpay Checkout window (payment happens on the site, with automatic
success/failure confirmation):

1. **Get your Key ID:** log in to [dashboard.razorpay.com](https://dashboard.razorpay.com)
   → **Settings → API Keys** → **Generate Key** (use **Live mode** for real
   payments, **Test mode** to try it first). Copy the **Key ID**
   (looks like `rzp_live_xxxxxxxxxxxx` or `rzp_test_xxxxxxxxxxxx`).
2. **In `config.js`:** replace the `RAZORPAY_ME_LINK` line with:
   `const RAZORPAY_KEY_ID = "rzp_live_xxxxxxxxxxxx";`
3. **In `index.html`:** restore the Checkout.js flow — add back the script tag
   `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>`
   after the `config.js` script tag, and restore the `startPayment()` handler
   version that opens `new Razorpay(options)` with the Key ID, amount,
   prefill (name/email/contact), and success/failure handlers.
   (The previous version is in this repo's Git history — find the commit
   before the "Switch to Razorpay.me" change.)
4. **Test it:** checkout with your own details, pay ₹1 in **Test mode**
   (or a real small payment in Live mode). The payment appears in
   Razorpay Dashboard → Transactions.

⚠️ Never paste the **Key Secret** anywhere in this website — only the Key ID
(and only when you switch back to Checkout.js).

---

## 2) How the shop works (for you)

1. Customer clicks **Add to Cart** (or **Buy Now** → goes straight to checkout)
2. Cart drawer opens — items, quantity +/−, total, **Checkout** button
3. Checkout form asks ONLY: **Name, Email, Mobile Number**
   (name must not be empty · email must look like name@example.com ·
   mobile must be exactly 10 digits)
4. **Pay ₹X on Razorpay** opens a Razorpay payment page in a new tab.
   Single product × 1 with a Payment Link set → the amount is already
   filled in. Anything else (quantity > 1, multi-product cart, or a
   product whose Payment Link is not set yet) → the generic Razorpay.me
   page opens and the customer enters the **exact amount** shown on the
   site. The site does NOT confirm the payment — it only sends them to
   pay. The cart stays intact.
5. You see the payment in **Razorpay Dashboard → Transactions** and match it
   to the customer (amount + email/mobile they entered), then send the
   product manually.

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
- `"paymentLink"` — the product's fixed-amount Razorpay Payment Link
  (see §1). If you change the product's price, make a NEW Payment Link
  at the new price and paste it here — the old link still charges the
  old amount.

⚠️ Keep the quotes and commas exactly as they are. If the page stops showing
products, you likely deleted a comma or quote — undo the last change.

## 4) Add a NEW product card — NO AI NEEDED

1. Open `products.json`
2. Copy one whole `{ ... }` product block (from `{` to `}`), paste it after
   the existing one, and put a comma `,` between the two blocks.
3. Change the copy's fields: give it a NEW `"id"` (e.g. `"my-second-pack"`),
   new `"name"`, `"price"`, `"pricePaise"`, `"description"`, `"features"`,
   `"image"`, `"badge"`, and a NEW `"paymentLink"` (make a fresh Payment
   Link at the new product's price — see §1).
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
5. Open https://agenttube.in and test: Add to Cart → Checkout → Pay button
   opens your Razorpay.me page with the right amount.

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

/* ============================================================
   AgentTube — site config
   ONLY EDIT THIS FILE to change checkout settings.
   No secret keys here — nothing in this file is secret.
   ============================================================ */

// 1) PAYMENT — Razorpay.me link (CURRENT setup):
//    The owner's Razorpay API Keys option is RESTRICTED, so the site
//    does NOT use Razorpay Checkout.js / a Key ID for now. Instead,
//    customers are sent to a Razorpay payment page to pay.
//    To change the payment page, replace the link below (keep quotes).
const RAZORPAY_ME_LINK = "https://razorpay.me/@sukhvindersingh5057";

// 1b) COMBO Payment Link — BOTH products together (Rs 5,748 = 749 + 4,999):
//     Create this fixed-amount Razorpay Payment Link in the Razorpay
//     Dashboard (Payments → Payment Links → Create, amount Rs 5,748)
//     and paste its URL here. Used ONLY when the cart is exactly
//     Prompt Pack × 1 + Content Pilot AI × 1, so the amount auto-fills.
//     If a price changes, make a NEW combo link at the new sum
//     (old links still charge old amounts).
const BOTH_PRODUCTS_PAYMENT_LINK = "https://rzp.io/rzp/WczmL1Nz";

// 2) Store name shown on the site:
const STORE_NAME = "AgentTube";

// 3) Currency (do not change unless you sell in another currency):
const CURRENCY = "INR";

// --- SWITCHING BACK TO CHECKOUT.JS LATER ---
// When Razorpay API access is UNRESTRICTED, the owner can switch back
// to the Razorpay Checkout.js window by:
//   a) Getting a Key ID from Razorpay Dashboard → Settings → API Keys
//      (starts with rzp_live_ for real payments, rzp_test_ for testing).
//   b) Replacing RAZORPAY_ME_LINK above with:
//      const RAZORPAY_KEY_ID = "rzp_live_xxxxxxxxxxxx";
//   c) Restoring the Checkout.js flow in index.html (script tag +
//      startPayment() handler) — the previous version is in Git history.
//   See README "Payments" for the full steps.

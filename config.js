/* ============================================================
   AgentTube — site config
   ONLY EDIT THIS FILE to change checkout settings.
   No secret keys here — the Key ID below is PUBLIC and safe
   to put in a website (it only identifies your Razorpay
   account; payments are verified by Razorpay itself).
   ============================================================ */

// 1) PASTE YOUR RAZORPAY KEY ID HERE:
//    Razorpay Dashboard → Settings → API Keys → copy "Key ID"
//    (starts with rzp_live_ for real payments, rzp_test_ for testing)
//    Replace the placeholder text below, keep the quotes.
const RAZORPAY_KEY_ID = "PASTE_YOUR_RAZORPAY_KEY_ID_HERE";

// 2) Store name shown inside the Razorpay payment window:
const STORE_NAME = "AgentTube";

// 3) Currency (do not change unless you sell in another currency):
const CURRENCY = "INR";

import { sendToSQS } from "../../lib/sqs";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { m_payment_id, pf_payment_id, payment_status, amount, email_address } = req.body;

  const merchantKey = process.env.PAYFAST_MERCHANT_KEY || "your-payfast-merchant-key";
  const signature = req.headers["pf-signature"];
  const dataString = Object.keys(req.body)
    .sort()
    .map((key) => `${key}=${encodeURIComponent(req.body[key]).replace(/%20/g, "+")}`)
    .join("&");
  const calculatedSignature = crypto.createHash("md5").update(dataString + `&passphrase=${merchantKey}`).digest("hex");

  if (signature !== calculatedSignature) {
    return res.status(400).send("Invalid signature");
  }

  if (payment_status === "COMPLETE") {
    const order = {
      id: m_payment_id,
      restaurant_id: email_address,
      products: [],
      total_amount: parseFloat(amount),
      date: new Date().toISOString(),
      payment_id: pf_payment_id,
    };
    await sendToSQS(order);
    res.status(200).send("Payment received");
  } else {
    res.status(400).send("Payment failed");
  }
}
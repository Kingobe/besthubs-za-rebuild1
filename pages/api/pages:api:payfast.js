import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const order = req.body;

  const merchantId = process.env.PAYFAST_MERCHANT_ID || "your-payfast-merchant-id";
  const merchantKey = process.env.PAYFAST_MERCHANT_KEY || "your-payfast-merchant-key";
  const payfastUrl = process.env.PAYFAST_ENV === "production"
    ? "https://www.payfast.co.za/eng/process"
    : "https://sandbox.payfast.co.za/eng/process";

  const data = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: "https://besthubs.co.za/thank-you",
    cancel_url: "https://besthubs.co.za/cart",
    notify_url: "https://besthubs.co.za/api/notify",
    name_first: order.restaurant_id.split("@")[0],
    email_address: order.restaurant_id,
    m_payment_id: order.id,
    amount: order.total_amount.toFixed(2),
    item_name: "Best Hubs Order",
  };

  const sortedData = Object.keys(data)
    .sort()
    .map((key) => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`)
    .join("&");
  data.signature = crypto.createHash("md5").update(sortedData).digest("hex");

  const paymentUrl = `${payfastUrl}?${Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`)
    .join("&")}`;

  res.status(200).json({ paymentUrl });
}
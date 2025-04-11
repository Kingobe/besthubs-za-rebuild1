const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const { sendEmail } = require("../lib/ses");

exports.handler = async (event) => {
  const order = JSON.parse(event.Records[0].body);
  const invoice = {
    invoice_id: order.id,
    restaurant_id: order.restaurant_id,
    date: order.date,
    products: order.products,
    total_amount: order.total_amount,
    payment_id: order.payment_id,
    shipping_address: "2/686 Ostrich Street, Sandton, Johannesburg, South Africa",
    note: "Shisha delivered in foil packets, 10 packets per plastic container.",
  };

  await dynamoDB.put({ TableName: "Orders", Item: { ...order, invoice } }).promise();

  const emailBody = `Order #${order.id}\nTotal: R${order.total_amount}\n${invoice.note}`;
  await sendEmail(order.restaurant_id, "Best Hubs Order Confirmation", emailBody);
  await sendEmail("besthubs@digisphere.co.za", "New Order Received", emailBody);

  return { statusCode: 200 };
};
import AWS from "aws-sdk";

AWS.config.update({ region: "af-south-1" });
const sqs = new AWS.SQS();

export const sendToSQS = async (order) => {
  const params = {
    QueueUrl: "https://sqs.af-south-1.amazonaws.com/165637392708/besthubs-orders-queue", // You’ll update this later
    MessageBody: JSON.stringify(order),
  };
  await sqs.sendMessage(params).promise();
};
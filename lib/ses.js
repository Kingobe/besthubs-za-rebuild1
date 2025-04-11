import AWS from "aws-sdk";

AWS.config.update({ region: "af-south-1" });
const ses = new AWS.SES();

export const sendEmail = async (to, subject, body) => {
  const params = {
    Destination: { ToAddresses: [to] },
    Message: {
      Body: { Text: { Data: body } },
      Subject: { Data: subject },
    },
    Source: "no-reply@besthubs.co.za",
  };
  await ses.sendEmail(params).promise();
};
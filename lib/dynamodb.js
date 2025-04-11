import AWS from "aws-sdk";

AWS.config.update({ region: "af-south-1" });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const query = async (tableName, params) => {
  const data = await dynamoDB.scan({ TableName: tableName, ...params }).promise();
  return data;
};

export const put = async (tableName, item) => {
  await dynamoDB.put({ TableName: tableName, Item: item }).promise();
};
import amqplib from "amqplib";
const QUEUE_NAME = "rpc_queue";
const rabbitmqServer =
  "amqps://pupxqbpo:pCldmvWbGv77RbhJQdClP5_AfDCuZlPM@hummingbird.rmq.cloudamqp.com/pupxqbpo";
const sum = (x, y) => {
  return x + y;
};
export const consume = async () => {
  try {
    const connection = await amqplib.connect(rabbitmqServer);
    const channel = await connection.createChannel();
    channel.consume(QUEUE_NAME, (message) => {
      const data = JSON.parse(message.content.toString());
      console.log(sum(data.x, data.y)); // sum two numbers
      channel.ack(message); // to tell rabbitmq the message is handled successfully
    });
  } catch (e) {
    console.log(e);
  }
};
consume();

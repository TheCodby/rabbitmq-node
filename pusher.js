import { v4 as uuidv4 } from "uuid";
import amqplib from "amqplib";
const QUEUE_NAME = "rpc_queue";
const rabbitmqServer =
  "amqps://pupxqbpo:pCldmvWbGv77RbhJQdClP5_AfDCuZlPM@hummingbird.rmq.cloudamqp.com/pupxqbpo";
const [x, y] = [process.argv[2], process.argv[3]];
async function main() {
  try {
    const connection = await amqplib.connect(rabbitmqServer);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    channel.sendToQueue(
      QUEUE_NAME,
      Buffer.from(
        JSON.stringify({
          x: +x,
          y: +y,
        })
      ),
      {
        persistent: true,
      }
    );
    console.log(`Job Sent Successfully`);
    await channel.close();
    await connection.close();
  } catch (e) {
    console.log(e);
  }
}
main();

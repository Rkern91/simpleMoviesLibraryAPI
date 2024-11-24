import amqp from "amqplib";

export const sendMessage = async (queue: string, message: string) => {
  try
  {
    const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    const channel    = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(message));

    console.log(`Mensagem enviada para a fila ${queue}: ${message}`);

    await channel.close();
    await connection.close();
  }
  catch (error)
  {
    console.error('Erro ao enviar mensagem:', error);
  }
};

import amqp from 'amqplib';

export const startConsumer = async (queue: string) => {
  try
  {
    const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    const channel    = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });

    console.log(`Aguardando mensagens na fila ${queue}...`);

    channel.consume(queue, (message) => {
      if (message) {
        console.log(`Mensagem recebida: ${message.content.toString()}`);
        channel.ack(message);
      }
    });
  }
  catch (error)
  {
    console.error('Erro ao consumir mensagens:', error);
  }
};

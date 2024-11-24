import express         from 'express';
import { sendMessage } from '../controllers/PublisherController';
import Auth            from '../controllers/AuthController';

const RouterNotification = express.Router();

RouterNotification.post('/notificar', Auth.hasAuthorization, async(req, res) => {
  const { queue, message } = req.body;

  try
  {
    await sendMessage(queue, message);
    res.status(200).json({ success: true, message: 'Mensagem enviada!' });
  }
  catch (error)
  {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default RouterNotification;

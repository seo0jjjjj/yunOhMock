import session from "express-session";

const messages = [];

export function addMessageHandler(socket, clients, io) {

  const sendAllMessages = () => {
    console.log(`  📨  request all chats ${messages.length}`);

    socket.emit('response-all-chats', messages);
  }

  const replyMessage = (message) => {
    const id = socket.request.session.id

    if (!message?.sessionId) {
      message.sessionId = id;
    }

    // 오후 NN:NN:NN => 오후 NN:NN
    message.time = new Date().toLocaleTimeString().slice(0, -3);

    console.log(`  📤  message arrived => ${JSON.stringify(message, null, 2)}`);

    messages.push(message);
    console.log(messages);
    io.emit('chat-from-server', message);
  };

  // handler
  socket.on('request-all-chats', sendAllMessages);
  socket.on('chat-to-server', replyMessage);

  return messages;
}
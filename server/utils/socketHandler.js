import session from "express-session";
const messages = [];
let queue = [];
let matchInterval = null;

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

    message.time = new Date()

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

export function handleMatching(socket, io) {

  // 매칭 시작
  socket.on('match-start', (data) => {
    if (!data?._id) {
      socket.emit('match-fail', { message: 'no data' });
      return;
    }

    console.log(queue.length);
    const hasAlreadyJoined = queue.find((element) => {
      return element.userInfo._id === data._id
    });

    // 중복 접속 시, 기존 접속을 끊는다.
    if (hasAlreadyJoined) {
      console.log(`  ❌  match fail + ${data.username} 가 중복 접속 하였습니다.`);
      io.to(hasAlreadyJoined.socketId).emit('match-fail', { message: '같은 아이디로 중복 접속이 발생하였습니다.' });

      //remove queue
      queue = queue.filter((element) => {
        return element.userInfo._id !== data._id
      });
    }

    socket.join('match-queue')
    queue.push({ userInfo: data, sessionId: socket.request.session.id, socketId: socket.id });

    console.log('  🎲  match start request : from ' + data?.username);
    console.log("  현재 매칭 중인 유저 수 : " + queue.length);


    if (queue.length >= 2) {
      console.log("  🎲  매칭 성공");
      const matchedUsers = queue.splice(0, 2);
      const id = matchedUsers[0].userInfo._id + matchedUsers[1].userInfo._id;
      console.log("  room created : " + id);
      // 처음이 흰돌
      const data = {
        roomId: id,
        game: { white: matchedUsers[0].userInfo, black: matchedUsers[1].userInfo }
      }

      io.to(matchedUsers[0].socketId).emit('match-success', data);
      io.to(matchedUsers[1].socketId).emit('match-success', data);

      queue = queue.filter((element) => {
        return element.userInfo._id !== matchedUsers[0].userInfo._id && element.userInfo._id !== matchedUsers[1].userInfo._id
      });



    }
  });

  socket.on('match-cancel', (data) => {
    console.log('  🎲  match cancel request : from ' + data?.username);

    socket.leave('match-queue')

    //remove queue
    const index = queue.findIndex((item) => {
      if (item.userInfo._id === data._id) {
        return true;
      }
    });
    if (index === -1) return;
    queue.splice(index, 1);
    console.log("  현재 매칭 중인 유저 수 : " + queue.length);
    socket.emit('match-cancel', { message: '매칭 취소' });

  });


}
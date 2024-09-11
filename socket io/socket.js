export const setupSocket = (io) => {
    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);
  
      socket.on('subscribe', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} subscribed to notifications`);
      });
  
      socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
      });
    });
  };
  
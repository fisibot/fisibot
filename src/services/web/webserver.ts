import { createServer, IncomingMessage, ServerResponse } from 'http';

const requestListener = (_req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200);
  res.end('Fisibot status: OK');
};

const PORT = process.env.PORT || 3000;
const server = createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

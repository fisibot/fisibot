import { createServer, IncomingMessage, ServerResponse } from 'http';

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200);
  res.end('Fisibot status: OK');
};

const server = createServer(requestListener);

server.listen(process.env.PORT ?? 3000, () => {
  console.log('Server running at http://localhost:3000/');
});

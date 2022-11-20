import fetch from 'node-fetch';

// Send simple request to Discord API
async function discordRequest(endpoint: string, method = 'GET') {
  const endpointToFetch = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  const res = await fetch(`https://discord.com/api/v9/${endpointToFetch}`, {
    method,
    headers: {
      Authorization: `Bot ${process.env.CLIENT_TOKEN}`,
      // docs say this is required, but it doesn't seem to be
      // UserAgent: 'DiscordBot ({process.env.WEB_APPLICATION_URL}, 1.0.0)',
    },
  });
  return res.json();
}

export default discordRequest;

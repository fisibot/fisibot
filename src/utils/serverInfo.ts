import os from 'os';
import osu from 'node-os-utils';

// See https://github.com/moleculerjs/moleculer/blob/2f7d3d0d1a39511bc6bb9b71c6729326a3e8afad/src/health.js#L21
// Also see https://nodejs.org/api/os.html#osloadavg for the Windows problem
// eslint-disable-next-line import/prefer-default-export
export const getCPUInfo = async () => {
  const { model } = os.cpus()[0];
  const cores = os.cpus().length;

  const usage = process.platform === 'win32'
    ? await osu.cpu.usage()
    : Math.min(Math.floor((os.loadavg()[0] / cores) * 100), 100);

  return { model, cores, usage };
};

export const getRAMInfo = () => {
  const total = os.totalmem();
  const used = total - os.freemem();
  const totalGB = (((total / 1024) / 1024) / 1024).toFixed(2);

  return { total, used, totalGB };
};

export const getPCInfo = () => {
  const OS = `${os.type()} ${os.release()} ${os.arch()}`;
  const uptime = (os.uptime() / 60 / 60).toFixed(2);

  return { OS, uptime };
};

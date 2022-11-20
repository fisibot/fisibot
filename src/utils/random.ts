// eslint-disable-next-line import/prefer-default-export

export function randomChoose(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomWelcomeMessage(username: string, memberCount: number) {
  const messages = [
    `**${username}** ha llegado al servidor de la FISI!!`,
    `PAREN TODO, **${username}** ha llegado al servidor`,
    `Bienvenido al servidor de la FISI, **${username}**`,
    `**${username}** ha llegado de cabeza al servidor`,
    `Todos sabíamos que **${username}** iba a llegar algún día`,
    `**${username}** ha llegado al servidor, el miembro número ${memberCount}`,
    `**${username}** ha entrado al servidor :scream_cat:`,
    `:hola: **${username}**, bienvenido a la Facultad de Ingeniería de Sistemas e Informática`,
    `Bienvenido al servidor de la facultad, **${username}** <a:navisus:1042491314538811452>`,
    `**${username}** es el miembro número ${memberCount} :pikafisi:`,
    `El miembro número ${memberCount} ha llegado, **${username}** :gatosentado: :gatosentado:`,
    `<a:navibongo:1042495901194780692> **${username}** ha llegado al servidor de la FISI`,
  ];
  return randomChoose(messages);
}

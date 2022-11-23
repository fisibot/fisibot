// eslint-disable-next-line import/prefer-default-export

export function randomChoose(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomWelcomeMessage(username: string, memberCount: number) {
  if (memberCount === 500) {
    return `**${username}** es el legendario miembro 500!!! <:alaaaaaaaa:1043599266641367043> <:alaaaaaaaa:1043599266641367043> <:alaaaaaaaa:1043599266641367043>\n`
      + 'Gracias por llegar al servidor oficial de la FISI <:pikafisi:1043398715379023903> <:pikafisi:1043398715379023903>\n\n'
      + 'https://discord.io/fisi <a:fisiparty:1043272578262913044>';
  }

  const messages = [
    `**${username}** ha llegado al servidor de la FISI!!`,
    `PAREN TODO, **${username}** ha llegado al servidor`,
    `Bienvenido al servidor de la FISI, **${username}**`,
    `**${username}** ha llegado de cabeza al servidor`,
    `Todos sabíamos que **${username}** iba a llegar algún día`,
    `**${username}** ha llegado al servidor, el miembro número ${memberCount}`,
    `**${username}** ha entrado al servidor :scream_cat:`,
    `<:hola:1043394204069548122> **${username}**, bienvenido a la Facultad de Ingeniería de Sistemas e Informática`,
    `Bienvenido al servidor de la facultad, **${username}** <a:navisus:1042491314538811452>`,
    `**${username}** es el miembro número ${memberCount} <:pikafisi:1043398715379023903>`,
    `El miembro número ${memberCount} ha llegado, **${username}** <:gatosentado:1041203218031579157> <:gatosentado:1041203218031579157>`,
    `<a:navibongo:1042495901194780692> **${username}** ha llegado al servidor de la FISI`,
    `Todos hemos estado esperando a **${username}**, verdad? <:blob:1043448593471778887>`,
    `Finalmente, **${username}** <:mirada2:1043681484868964403>`,
    `**${username}** finalmente llegó <:blob:1043448593471778887>`,
  ];
  return randomChoose(messages);
}

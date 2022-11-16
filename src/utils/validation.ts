export function quitarAcentos(cadena: string) {
  const acentos = {
    á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u',
  };
  return cadena.split('').map((letra) => acentos[letra as keyof typeof acentos] || letra).join('');
}

export function getPossibleEmails(fullname: string): string[] {
  if (!fullname) return [];
  const names = quitarAcentos(fullname.toLowerCase()).replaceAll('ñ', 'n').split(' ');
  let possibleNames: string[] = [];
  let possibleLastnames: string[] = [];

  possibleNames.push(names[0]);
  possibleLastnames.push(names.at(-2)!);

  if (names.length === 4) {
    if (!names[0].startsWith("d'")) {
      possibleNames.push(`${names[0]}${names[1]}`);
    }
    possibleLastnames.push(names.at(-3)!);
    if (!names.at(-2)!.startsWith("d'")) {
      possibleLastnames.push(`${names.at(-3)}${names.at(-2)}`);
    }
  }
  if (names.length >= 5) {
    possibleLastnames.push(names.at(-3)!);
    if (!names.at(-3)!.startsWith("d'")) {
      possibleLastnames.push(`${names.at(-4)}${names.at(-3)}`);
    }
    if (!names.at(-2)!.startsWith("d'")) {
      possibleLastnames.push(`${names.at(-3)}${names.at(-2)}`);
    }
  }

  if (names[0].includes('jean')) {
    possibleNames.push('jean');
  }
  if (names[0].includes('yan')) {
    possibleNames.push('yan');
  }

  const fix = (list: string[]) => list.map((name) => {
    if (name.startsWith("d'")) {
      return [name.replace("'", ''), name.split("'")[1]];
    }
    return name;
  }).flat();

  possibleNames = fix(possibleNames);
  possibleLastnames = fix(possibleLastnames);

  const possibleGmails: string[] = [];
  possibleNames.forEach((name) => {
    possibleLastnames.forEach((lastname) => {
      possibleGmails.push(`${name}.${lastname}`);
    });
  });
  return possibleGmails;
}

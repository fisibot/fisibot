// Latinize names and remove special characters from student names
export function latinize(text: string) {
  const toReplace = text.replaceAll('-', ' ').trim();
  const acentos = {
    á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ñ: 'n',
  };
  return toReplace.split('')
    .map((c) => acentos[c as keyof typeof acentos] || c)
    .join('');
}

// Gets all possible combinations of a student's fullname
// Warning: This algorithm will be updated as we get more data
export function getPossibleEmails(fullname: string): string[] {
  if (!fullname) return [];
  const names = latinize(fullname.toLowerCase()).trim().split(' ');
  let possibleNames: string[] = [];
  let possibleLastnames: string[] = [];

  possibleNames.push(names[0]);
  possibleLastnames.push(names.at(-2)!);

  if (names.length === 3) {
    possibleLastnames.push(names.at(-1)!);
    possibleNames.push(`${names.at(0)}${names.at(1)}`);
  }
  if (names.length === 4) {
    possibleLastnames.push(names.at(1)!);
    if (!names[0].startsWith("d'")) {
      possibleNames.push(`${names[0]}${names[1]}`);
    }
    if (!names.at(2)!.startsWith("d'")) {
      possibleLastnames.push(`${names.at(1)}${names.at(2)}`);
    }
  }
  if (names.length >= 5) {
    possibleLastnames.push(names.at(-3)!);
    possibleLastnames.push(names.at(-4)!);
    if (!names.at(-3)!.startsWith("d'")) {
      possibleLastnames.push(`${names.at(-4)}${names.at(-3)}`);
      possibleNames.push(`${names.at(0)}${names.at(1)}${names.at(2)}`);
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

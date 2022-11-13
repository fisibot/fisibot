import { APIEmbedField } from 'discord.js';

// eslint-disable-next-line import/prefer-default-export
export function embedFieldsToJSON(fields: APIEmbedField[]) {
  const obj: { [key: string]: any } = {};
  fields.forEach((field) => {
    obj[field.name] = field.value;
  });
  return obj;
}

import { ObjectId } from 'mongodb';

export default class RegisteredMember {
  constructor(
    public fullname: string,
    public studentCode: string,
    public discordId: string,
    public _id?: ObjectId,
  ) {}
}

export const COLLECTION_NAME = 'registrations';

export const SCHEMA_VALIDATOR = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['fullname', 'studentCode', 'discordId'],
    additionalProperties: false,
    properties: {
      _id: {},
      fullname: {
        bsonType: 'string',
        description: "'name' is required and is a string",
      },
      studentCode: {
        bsonType: 'string',
        description: "'price' is required and is a number",
      },
      discordId: {
        bsonType: 'string',
        description: "'category' is required and is a string",
      },
    },
  },
};

import { ObjectId } from 'mongodb';

export default class RegisteredMember {
  public fullname: string;

  public gmail: string;

  public studentCode: string;

  public base: number;

  public discordId: string;

  public _id?: ObjectId;

  constructor(member: RegisteredMember) {
    this.fullname = member.fullname;
    this.gmail = member.gmail;
    this.studentCode = member.studentCode;
    this.base = member.base;
    this.discordId = member.discordId;
  }
}

export const COLLECTION_NAME = 'registrations';

export const SCHEMA_VALIDATOR = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['fullname', 'studentCode', 'discordId', 'base', 'gmail'],
    additionalProperties: false,
    properties: {
      _id: {},
      gmail: {
        bsonType: 'string',
        description: 'must be a string and is required',
      },
      base: {
        bsonType: 'number',
        description: 'must be an integer and is required',
      },
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

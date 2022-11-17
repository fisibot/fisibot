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

  public equivalentTo(member: RegisteredMember): boolean {
    return (
      this.discordId === member.discordId
      && this.studentCode === member.studentCode
      && this.gmail === member.gmail
    );
  }
}

export const COLLECTION_NAME = 'registrations';

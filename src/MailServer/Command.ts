import Client from "./Client.ts";
import SMTP from "./SMTP.ts";

export enum ECommand {
  EHLO,
  HELO,
  MAIL,
  RCPT,
  DATA,
  RSET,
  NOOP,
  QUIT,
  AUTH,
}

export interface ICommand {
  execute(args: string[], server: SMTP, client: Client): void;
}

export default class Command {
  constructor() {}
}

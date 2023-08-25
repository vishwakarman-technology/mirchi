export default class Client {
  constructor(
    ClientId: string,
    Connection: Deno.Conn,
    TimeConnected: number,
    TimeLastActive: number
  ) {
    this.Connection = Connection;
    this.ClientId = ClientId;
    this.TimeConnected = TimeConnected;
    this.TimeLastActive = TimeLastActive;
  }

  public readonly ClientId: string;

  public readonly Connection: Deno.Conn;

  public readonly TimeConnected: number;

  public TimeLastActive: number;

  public get id(): string {
    return this.ClientId;
  }

  public get createdTime(): number {
    return this.TimeConnected;
  }

  public get connection(): Deno.Conn {
    return this.Connection;
  }

  public get timeLastActive(): number {
    return this.TimeLastActive;
  }
}

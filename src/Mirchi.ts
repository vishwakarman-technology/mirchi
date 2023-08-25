import Client from "./MailServer/Client.ts";

export default class Mirchi {
  constructor(hostname: string = "localhost", port: number = 2525) {
    this.Hostname = hostname;
    this.Port = port;
    this.Encoder = new TextEncoder();
    this.Decoder = new TextDecoder();
    this.Listener = Deno.listen({ hostname, port });
  }

  public readonly Listener: Deno.Listener;

  public readonly Hostname: string;

  public readonly Port: number;

  private readonly Encoder: TextEncoder;

  private readonly Decoder: TextDecoder;

  private clients: Map<string, Client> = new Map<string, Client>();

  public async Start(): Promise<void> {
    console.log("Mirchi:: Email server starting");
    console.log("Mirchi:: Host", this.Hostname);
    console.log("Mirchi:: Port", this.Port);
    for await (const connection of this.Listener) {
      this.ProcessConnections(connection);
    }
    this.Listener.unref();
  }

  public Stop(): void {}

  private async ProcessConnections(Connection: Deno.Conn): Promise<void> {
    let id: string;
    try {
      const RemoteHostAddress = (Connection.remoteAddr as Deno.NetAddr)
        .hostname;
      const RemoteHostName = RemoteHostAddress.replace(/\./g, "");
      const RemoteResourceId = Connection.rid;
      id = RemoteHostName + RemoteResourceId;
      console.log("Mirchi:: New connection from host -", RemoteHostAddress);
      console.log("Mirchi:: Saving session with id -", id);
      this.clients.set(id, new Client(id, Connection, Date.now(), Date.now()));
      await Connection.write(
        this.Encoder.encode("220 Welcome HomeServer MailServer\r\n")
      );
    } catch (error) {
      console.error("Mirchi:: Error processing a new connection.", error);
    }
  }

  private ProcessCommands(): void {}

  private ProcessMessages(): void {}
}

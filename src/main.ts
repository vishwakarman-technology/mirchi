import Mirchi from "./Mirchi.ts";
import banner from "./utils/banner.ts";

banner();
const PORT = 2525;
const HOST_NAME = "localhost";

const mailserver = new Mirchi(HOST_NAME, PORT);

mailserver.Start();

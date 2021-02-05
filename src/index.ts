import config from "./config";
import app from "./app";

const PORT = config.ports.server;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

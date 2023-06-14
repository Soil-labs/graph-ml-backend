import dotenv from "dotenv";
import WebSocket from "ws";

import { createClient } from "graphql-ws";

dotenv.config();

const subscriptionURL = process.env.NEXT_PUBLIC_GRAPHQL_SUBSCRIPTION;

const subscriptionClient = createClient({
  url: subscriptionURL,
  webSocketImpl: WebSocket,
  shouldRetry: () => true,
});

export default subscriptionClient;

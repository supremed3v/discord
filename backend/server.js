import httpServer from "./app.js";

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

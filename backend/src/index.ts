import "reflect-metadata";
import createServer from "./config/server";

const port: number = parseInt(process.env.PORT as string);

const start = async () => {
  const server = await createServer();

  try {
    const { url } = await server.listen({ port });
    console.log(`Server is running on ${url} !`);
  } catch (err) {
    console.error("Error while starting the Server!");
  }
};

void start();

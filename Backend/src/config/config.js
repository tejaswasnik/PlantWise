import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is not defined in the environment variables");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

if (!process.env.OLLAMA_BASE_URL) {
  console.warn(
    "Warning: OLLAMA_BASE_URL is not defined in the environment variables. Defaulting to http://localhost:11434",
  );
}

if (!process.env.OLLAMA_MODEL) {
  console.warn(
    "Warning: OLLAMA_MODEL is not defined in the environment variables. AI recommendations may fail.",
  );
}

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  OLLAMA_MODEL: process.env.OLLAMA_MODEL || "qwen2.5:3b",
};

export default config;

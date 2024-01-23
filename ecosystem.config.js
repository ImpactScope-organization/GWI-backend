module.exports = {
  apps: [
    {
      name: "server_v2",
      entry: "./server.js",
      script: "npm run start",
      watch: true,
      wait_ready: true,
      listen_timeout: 4000,
      env: {
        CYCLIC_DB: "rich-teal-octopus-kitCyclicDB",
        OPEN_AI_API_KEY: "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",
        CYCLIC_APP_ID: "rich-teal-octopus-kit",
        JWT_SECRET: "dadafafqooei019831-4911m,d",
        JWT_EXPIRESIN: "2h",
        CYCLIC_URL: "https://rich-teal-octopus-kit.cyclic.app",
        CYCLIC_BUCKET_NAME: "cyclic-rich-teal-octopus-kit-eu-west-3",
        MONGO_URL:
          "mongodb+srv://zulqurnaines7:mqTz6VjDlNQA2xQx@cluster0.yhql092.mongodb.net/?retryWrites=true&w=majority",
      },
      shutdown_with_message: true,
      restart_delay: 5000,
    },
  ],
};

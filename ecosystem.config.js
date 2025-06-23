module.exports = {
  apps: [
    {
      name: "fin",
      script: "yarn",
      args: "start",
      env: {
        PORT: 3011,
        NODE_ENV: "production",
      },
    },
  ],
};

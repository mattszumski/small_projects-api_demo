module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Quotes API",
      version: "0.1.0",
      description: "API demo for getting and adding quotes to the database.",
    },
    servers: [{ url: "http://127.0.0.1:3500" }],
  },
  apis: ["./routers/*.js"],
};

const { PrismaClient } = require("@prisma/client");

// Ici, j'ajoute des options de configuration à Prisma
const options = {
  errorFormat: "pretty",
  log: ["query"],
};

const prisma = new PrismaClient(options);

module.exports = prisma;

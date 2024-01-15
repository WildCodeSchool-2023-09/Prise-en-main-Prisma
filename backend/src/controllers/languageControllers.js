// Import access to database tables
const prisma = require("../services/prisma");
// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const languages = await prisma.language.findMany();

    // Respond with the languages in JSON format
    res.json(languages);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  } finally {
    await prisma.$disconnect();
  }
};

const add = async (req, res, next) => {
  const { name } = req.body;
  try {
    // Fetch all items from the database
    const language = await prisma.language.create({
      data: {
        name,
      },
    });

    // Respond with the language in JSON format
    res.json(language);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  } finally {
    await prisma.$disconnect();
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  add,
};

// Import access to database tables
const prisma = require("../services/prisma");
// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    // Doc: https://www.prisma.io/docs/orm/reference/prisma-client-reference#findmany
    const users = await prisma.user.findMany();
    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  } finally {
    await prisma.$disconnect();
  }
};

const add = async (req, res, next) => {
  const { name, email, password, campusId } = req.body;

  try {
    // Fetch all items from the database
    const users = await prisma.user.create({
      data: {
        name,
        email,
        password,
        campus: { connect: { id: Number(campusId) } },
      },
      include: {
        campus: true,
      },
    });

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  } finally {
    await prisma.$disconnect();
  }
};

const read = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      // Doc: https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#select-specific-relation-fields
      select: {
        name: true,
        campus: { include: { languages: true } },
      },
    });

    // Respond with the user in JSON format
    res.json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  } finally {
    await prisma.$disconnect();
  }
};

// eslint-disable-next-line consistent-return
const readByCampus = async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { campus: true },
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    return res.json(user.campus);
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};
// eslint-disable-next-line consistent-return
const readByLanguage = async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { campus: { include: { languages: true } } },
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    return res.json(user.campus.languages);
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  browse,
  read,
  readByLanguage,
  readByCampus,
  add,
};

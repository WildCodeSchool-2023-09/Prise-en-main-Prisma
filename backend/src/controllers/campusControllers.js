const prisma = require("../services/prisma");

const browse = async (req, res, next) => {
  try {
    const campuses = await prisma.campus.findMany();
    res.json(campuses);
  } catch (error) {
    next(error);
  } finally {
    // Finally permet d'exécuter du code après le try/catch
    // Ici, on se déconnecte de la base de données
    await prisma.$disconnect();
  }
};

const add = async (req, res, next) => {
  const { name } = req.body;
  try {
    const campus = await prisma.campus.create({
      data: { name },
    });
    res.json(campus);
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};

const addLangCamp = async (req, res, next) => {
  const { campusId, languageId } = req.body;

  try {
    const updatedCampus = await prisma.campus.update({
      where: { id: parseInt(campusId, 10) },
      data: {
        languages: {
          connect: {
            id: parseInt(languageId, 10),
          },
        },
      },
      include: { languages: true }, // Inclure les informations des langages associés
    });

    res.json(updatedCampus);
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  browse,
  add,
  addLangCamp,
};

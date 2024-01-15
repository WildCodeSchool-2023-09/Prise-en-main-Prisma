const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const campusControllers = require("./controllers/campusControllers");
const languageControllers = require("./controllers/languageControllers");

// Users
router.get("/users", userControllers.browse);
router.post("/users", userControllers.add);

router.get("/users/:id", userControllers.read);
router.get("/users/:id/campuses", userControllers.readByCampus);
router.get("/users/:id/languages", userControllers.readByLanguage);

// Campuses
router.get("/campuses", campusControllers.browse);
router.post("/campuses", campusControllers.add);
router.post("/campuses/languages", campusControllers.addLangCamp);

// Languages
router.get("/languages", languageControllers.browse);
router.post("/languages", languageControllers.add);

/* ************************************************************************* */

module.exports = router;

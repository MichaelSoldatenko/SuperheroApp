const { heroValidationRules, validate } = require("../middleware/validator");
const express = require("express");
const router = express.Router();
const heroController = require("../controllers/controller");
const upload = require("../middleware/upload");

router.post(
  "/",
  upload.array("images", 10),
  heroValidationRules(),
  validate,
  heroController.createSuperhero
);
router.get("/", heroController.listSuperheroes);
router.get("/:id", heroController.getSuperheroDetails);
router.patch(
  "/:id",
  upload.array("images", 10),
  heroValidationRules(),
  validate,
  heroController.updateSuperhero
);
router.delete("/:id", heroController.deleteSuperhero);
router.delete("/images/:imageId", heroController.deleteImage);

module.exports = router;

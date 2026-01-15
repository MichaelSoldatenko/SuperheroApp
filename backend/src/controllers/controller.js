const fs = require("fs");
const path = require("path");
const { Superhero, SuperheroImage } = require("../models");

exports.createSuperhero = async (req, res) => {
  try {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
    } = req.body;
    const hero = await Superhero.create({
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
    });

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        image_path: file.filename,
        SuperheroId: hero.id,
      }));
      await SuperheroImage.bulkCreate(images);
    }
    res.status(201).json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listSuperheroes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const { count, rows } = await Superhero.findAndCountAll({
      limit,
      offset,
      include: [{ model: SuperheroImage, as: "images", limit: 1 }],
      distinct: true,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      superheroes: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSuperheroDetails = async (req, res) => {
  try {
    const hero = await Superhero.findByPk(req.params.id, {
      include: [{ model: SuperheroImage, as: "images" }],
    });
    if (!hero) return res.status(404).json({ message: "Hero not found" });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSuperhero = async (req, res) => {
  try {
    const { id } = req.params;
    await Superhero.update(req.body, { where: { id } });

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        image_path: file.filename,
        SuperheroId: id,
      }));
      await SuperheroImage.bulkCreate(images);
    }
    res.json({ message: "Hero updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSuperhero = async (req, res) => {
  try {
    const { id } = req.params;
    await Superhero.destroy({ where: { id } });
    res.json({ message: "Hero deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const image = await SuperheroImage.findByPk(imageId);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const filePath = path.join(__dirname, "../../uploads", image.image_path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await image.destroy();

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const express = require("express");
const BrandsService = require("../services/brandsService");
const router = express.Router();
const brandsService = new BrandsService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único de la marca
 *         brandName:
 *           type: string
 *           description: Nombre de la marca
 *         description:
 *           type: string
 *           description: Descripción de la marca
 *         active:
 *           type: boolean
 *           description: Estado activo de la marca
 *       required:
 *         - brandName
 *         - description
 *         - active
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Obtener todas las marcas
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Lista de todas las marcas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 */
router.get("/", async (req, res) => {
  try {
    const brands = await brandsService.findAll();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Obtener una marca por ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca
 *     responses:
 *       200:
 *         description: Datos de la marca encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marca no encontrada
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await brandsService.findById(id);
    if (brand) {
      res.json(brand);
    } else {
      res.status(404).json({ message: 'Brand not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Crear una nueva marca
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Marca creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       500:
 *         description: Error del servidor
 */
router.post("/", async (req, res) => {
  try {
    const { brandName, description, active } = req.body;
    const newBrand = await brandsService.create({ brandName, description, active });
    res.status(201).json({
      message: "Brand Created",
      data: newBrand,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     summary: Actualizar una marca por ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Marca actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marca no encontrada
 *       500:
 *         description: Error del servidor
 */
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { brandName, description, active } = req.body;
    const updatedBrand = await brandsService.update(id, { brandName, description, active });
    res.json({
      message: "Brand Updated",
      data: updatedBrand,
    });
  } catch (error) {
    res.status(error.message === 'Brand not found' ? 404 : 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Eliminar una marca por ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca
 *     responses:
 *       200:
 *         description: Marca eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marca no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBrand = await brandsService.delete(id);
    res.json({
      message: "Brand Deleted",
      data: deletedBrand,
    });
  } catch (error) {
    res.status(error.message === 'Brand not found' ? 404 : 500).json({ message: error.message });
  }
});

module.exports = router;

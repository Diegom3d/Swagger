const express = require("express");
const CategoriesService = require("../services/categoriesService");

const router = express.Router();
const categoriesService = new CategoriesService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único de la categoría
 *         categoryName:
 *           type: string
 *           description: Nombre de la categoría
 *         description:
 *           type: string
 *           description: Descripción de la categoría
 *         active:
 *           type: boolean
 *           description: Estado activo de la categoría
 *       required:
 *         - categoryName
 *         - description
 *         - active
 */

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Datos de la categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoriesService.findById(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error del servidor
 */
router.post("/", async (req, res) => {
  try {
    const { categoryName, description, active } = req.body;
    const newCategory = await categoriesService.create({ categoryName, description, active });
    res.status(201).json({
      message: "Category Created",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Actualizar una categoría por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, description, active } = req.body;
    const updatedCategory = await categoriesService.update(id, { categoryName, description, active });
    res.json({
      message: "Category Updated",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(error.message === 'Category not found' ? 404 : 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoriesService.delete(id);
    res.json({
      message: "Category Deleted",
      data: deletedCategory,
    });
  } catch (error) {
    res.status(error.message === 'Category not found' ? 404 : 500).json({ message: error.message });
  }
});

module.exports = router;

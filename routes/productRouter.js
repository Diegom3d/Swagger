const express = require('express');
const productService = require('../services/productService');

const router = express.Router();
const services = new productService();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de todos los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error del servidor
 */
router.get('/', async (req, res) => {
  try {
    const products = await services.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: Nombre del producto
 *               description:
 *                 type: string
 *                 description: Descripción del producto
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Precio del producto
 *               categoryId:
 *                 type: string
 *                 description: ID de la categoría del producto
 *               brandId:
 *                 type: string
 *                 description: ID de la marca del producto
 *               active:
 *                 type: boolean
 *                 description: Estado activo del producto
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error del servidor
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newProduct = await services.create(body);
    res.status(201).json({
      message: 'Product Created',
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/categories/{id}:
 *   get:
 *     summary: Obtener productos por categoría
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Lista de productos encontrados para la categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No se encontraron productos para esta categoría
 *       500:
 *         description: Error del servidor
 */
router.get('/categories/:id', (req, res) => {
  const { id } = req.params;
  const productsByCategory = services.products.filter((p) => p.categoryId === id);
  if (productsByCategory.length > 0) {
    res.json(productsByCategory);
  } else {
    res.status(404).json({ message: 'No products found for this category' });
  }
});

/**
 * @swagger
 * /products/brands/{id}:
 *   get:
 *     summary: Obtener productos por marca
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca
 *     responses:
 *       200:
 *         description: Lista de productos encontrados para la marca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No se encontraron productos para esta marca
 *       500:
 *         description: Error del servidor
 */
router.get('/brands/:id', (req, res) => {
  const { id } = req.params;
  const productsByBrand = services.products.filter((p) => p.brandId === id);
  if (productsByBrand.length > 0) {
    res.json(productsByBrand);
  } else {
    res.status(404).json({ message: 'No products found for this brand' });
  }
});

/**
 * @swagger
 * /products/{productId}:
 *   patch:
 *     summary: Actualizar un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: Nombre del producto
 *               description:
 *                 type: string
 *                 description: Descripción del producto
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Precio del producto
 *               categoryId:
 *                 type: string
 *                 description: ID de la categoría del producto
 *               brandId:
 *                 type: string
 *                 description: ID de la marca del producto
 *               active:
 *                 type: boolean
 *                 description: Estado activo del producto
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.patch('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const changes = req.body;
    const updatedProduct = await services.update(productId, changes);
    res.json({
      message: 'Product Updated',
      data: updatedProduct,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await services.delete(productId);
    res.json({
      message: 'Product Deleted',
      data: deletedProduct,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;

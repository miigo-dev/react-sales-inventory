const productService = require('../services/productService');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getProductByID = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductByID(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addProduct = async (req, res) => {
    try {
        const { warehouse_id, 
            product_name,
            category_id,
            product_quantity,
            product_price,
            reorder_level,
            product_status,
            remarks
        } = req.body;
        const product = await productService.addProduct(warehouse_id, 
            product_name, 
            category_id, 
            product_quantity, 
            product_price, 
            reorder_level, 
            product_status, 
            remarks
        );
        res.status(200).json(product);
        } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_name, product_price } = req.body;
        const product = await productService.updateProduct(id, product_name, product_price);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.deleteProduct(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getProductByWarehouse = async (req, res) => {
    try {
        const { warehouse_id } = req.params;
        const products = await productService.getProductByWarehouse(warehouse_id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAllProductCategories = async (req, res) => {
    try {
        const categories = await productService.getAllProductCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

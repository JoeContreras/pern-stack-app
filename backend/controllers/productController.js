import { PrismaClient } from "@prisma/client";
import e from "express";

const prisma = new PrismaClient();
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createProduct = async (req, res) => {
    const {name , price}= req.body;

    try {
        const product = await prisma.product.create({
            data: {
                name,
                price,
            },
        });
        res.status(201).send(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct= await prisma.product.delete({
            where: {
                id: parseInt(id),
            },
        });
        if(!deletedProduct) return res.status(404).send("Product not found");
        res.status(200).send(deletedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    try {
        const product = await prisma.product.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                price,
            },
        });
        res.status(200).send(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import { Router } from "express";
import { ReadableStreamDefaultController } from "stream/web";

const router = Router();

/**
 * Product
 * */

// [route](<endpoint>, middleware, callback)
router.get("/product", (req, res) => {
  res.json({ message: "product" });
});

router.get("/product/:id", (req, res) => {});

router.post("/product/:id", (req, res) => {});

router.put("/product/:id", (req, res) => {});

router.delete("/product/:id", (req, res) => {});

/**
 * Update
 * */

router.get("/update", (req, res) => {});

router.get("/update/:id", (req, res) => {});

router.post("/update/:id", (req, res) => {});

router.put("/update/:id", (req, res) => {});

router.delete("/update/:id", (req, res) => {});

/**
 * Update Point
 * */

router.get("/updatePoint", (req, res) => {});

router.get("/updatePoint/:id", (req, res) => {});

router.post("/updatePoint/:id", (req, res) => {});

router.put("/updatePoint/:id", (req, res) => {});

router.delete("/updatePoint/:id", (req, res) => {});

export default router;

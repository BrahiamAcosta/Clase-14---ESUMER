import express from "express";
import peliculas from "../data/peliculas.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Bienvenido al Home de la aplicación");
});

router.get("/peliculas", (req, res) => {
  res.json(peliculas);
});

router.get("/peliculas/:id", (req, res) => {
  const id = Number(req.params.id);
  const pelicula = peliculas.find((item) => item.id === id);

  if (!pelicula) {
    res.status(404).json({ error: "Pelicula no encontrada" });
  }

  res.json(pelicula);
});

router.post("/peliculas", (req, res) => {
  const { titulo, genero } = req.body;
  const nuevaPelicula = {
    id: peliculas.length + 1,
    titulo,
    genero,
  };

  peliculas.push(nuevaPelicula);
  res.status(201).json(nuevaPelicula);
});

router.delete("/peliculas/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = peliculas.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Pelicula no encontrada" });
  }

  peliculas.splice(index, 1);
  res.status(204).send();
});

export default router;

const express = require("express");
const multer = require("multer");
const supabase = require("../config/db");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* 🔥 CRIAR */
router.post("/", upload.single("imagem"), async (req, res) => {
  try {
    const {
      nome,
      descricao,
      endereco,
      categoria,
      latitude,
      longitude,
    } = req.body;

    let imagem_url = null;

    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;

      const { error } = await supabase.storage
        .from("estabelecimentos")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (error) return res.status(500).json({ error });

      const { data } = supabase.storage
        .from("estabelecimentos")
        .getPublicUrl(fileName);

      imagem_url = data.publicUrl;
    }

    const { error } = await supabase.from("estabelecimentos").insert([
      {
        nome,
        descricao,
        endereco,
        categoria,
        latitude,
        longitude,
        imagem_url,
        avaliacao_media: 0,
      },
    ]);

    if (error) return res.status(500).json({ error });

    res.json({ message: "Salvo 🚀" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 🔥 LISTAR */
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("estabelecimentos")
    .select("*");

  if (error) return res.status(500).json({ error });

  res.json(data);
});

module.exports = router;
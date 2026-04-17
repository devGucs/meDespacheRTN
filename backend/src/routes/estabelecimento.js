const express = require("express");
const router = express.Router();

const {
  criar,
  listar,
  proximos,
} = require("../controllers/estabelecimentoController");

router.post("/", criar);
router.get("/", listar);
router.get("/proximos", proximos);

module.exports = router;
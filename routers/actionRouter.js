const express = require("express");
const actiondb = require("../data/helpers/actionModel");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  actiondb
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "did not connect to server" });
    });
}); // works

router.get("/:id", (req, res) => {
  const { id } = req.params;

  actiondb
    .get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "did not connect to server" });
    });
}); // works

router.put("/:id", (req, res) => {
  const { description, notes } = req.body;
  const changes = { description, notes };

  actiondb
    .update(req.params.id, changes)
    .then(edit => {
      res.status(200).json(edit);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "you dun goofed" });
    });
}); // its working

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  actiondb
    .remove(id)
    .then(removed => {
      console.log(removed);
      res.status(200).json({ message: "action deleted" });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "did not connect to server" });
    });
}); // works

module.exports = router;

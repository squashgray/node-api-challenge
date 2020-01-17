const express = require("express");
const projectdb = require("../data/helpers/projectModel");
const actiondb = require("../data/helpers/actionModel");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  projectdb
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "IT AINT WORKIN" });
    });
}); //works

router.get("/:id", (req, res) => {
  const { id } = req.params;

  projectdb
    .get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "WRONG" });
    });
}); //works

router.get("/:id", (req, res) => {
  const { id } = req.params;

  projectdb
    .getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/", (req, res) => {
  projectdb
    .insert(req.body)
    .then(newproject => {
      res.status(201).json(newproject);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "did not connect to server" });
    });
}); //works

router.post("/:id/actions", (req, res) => {
  const { description, notes } = req.body;
  const project_id = req.params.id;

  actiondb
    .insert({ project_id, notes, description })
    .then(newaction => {
      console.log(newaction);
      res.status(201).json(newaction);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "did not connect to server" });
    });
}); //works

router.put("/:id", (req, res) => {
  const { name, description } = req.body;
  const changes = { description, name };

  projectdb
    .update(req.params.id, changes)
    .then(edit => {
      res.status(200).json(edit);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "nah man" });
    });
}); //works

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  projectdb
    .remove(id)
    .then(removed => {
      console.log(removed);
      res.status(200).json({ message: `project deleted successfully` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "did not connect to server" });
    });
}); //works

module.exports = router;

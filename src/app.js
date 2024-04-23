const express = require("express");
const _ = require("lodash");
const data = require("../data/data.json");
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/alquilable", (req, res) => {
  res.status(200).json({ data });
});

app.get("/alquilable/:id", (req, res) => {
  const id = req.params.id;
  const alquilable = data.find((alquilable) => alquilable.id == id);
  if (alquilable) {
    res.status(200).json(alquilable);
  } else {
    res.status(404).json({ error: "Alquilable not found" });
  }
});

app.delete("/alquilable/:id", (req, res) => {
  const id = req.params.id;
  const index = data.findIndex((alquilable) => alquilable.id == id);
  const removed = data.splice(index, 1);
  if (index >= 0) {
    res.status(200).json({
      message: `Alquilable ${id} deleted`,
      data: removed,
    });
  } else {
    res.status(404).json({ error: "Alquilable not found" });
  }
});

app.post("/alquilable", (req, res) => {
  const alquilable = req.body;
  let id = 0;
  if (data.length) {
    id = _.max(data.map((e) => e.id));
  }
  const aGrabar = { id: id + 1, ...alquilable };
  data.push(aGrabar);
  res.status(201).json(aGrabar);
});

app.put("/alquilable/:id", (req, res) => {
  const id = req.params.id;
  const index = data.findIndex((e) => e.id == id);
  if (index >= 0) {
    data[index] = { id: Number(id), ...req.body };
    res.status(200).json(data[index]);
  } else {
    res.status(404).json({ error: `Id: ${id} does not exist}` });
  }
});

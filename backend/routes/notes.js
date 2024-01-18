const { log } = require("console");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
//   console.log(req);
//   res.send("hellow");
    //   req.save(req.body);
    notes = {
        name: "note1",
        isnb: "isbnaaspt090we09t9",
    }
    res.json(notes)
    console.log(req.body)
});

module.exports = router;

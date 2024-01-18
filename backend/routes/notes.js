// const { log } = require("console");
const express = require("express");
const Notes = require("../models/Notes.js");
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// ** ROUTE 1: fetch all notes using GET : /api/notes/fetch-all-notes
// ** ROUTE# 1: fetch all notes using GET: /api/notes/fetch-all-notes end point, Login required

router.get("/fetch-all-notes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.userId });
    return res.status(200).json({ notes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// ** ROUTE# 2: fetch all notes using GET: /api/notes/add-note end point, Login required

router.post(
  "/add-note",
  [
    body("title", "title can't be empty!").isLength({ min: 1 }).escape(),
    body("tag", "tag required!").exists().escape(),
    body("description", "description can't be empty!")
      .escape()
      .isLength({ min: 1 }),
  ],
  fetchUser,
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error);
      return res.status(400).json({ errors: error.array() });
    }
    console.log(req.user.userId);
    try {
      const notes = await Notes.create({
        title: req.body.title,
        tag: req.body.tag,
        description: req.body.description,
        user: req.user.userId,
      });
      res.status(200).json({ notes });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// ** ROUTE# 3: fetch all notes using GET: /api/notes/update-note/:id end point, Login required

router.put("/update-note/:id", fetchUser, async (req, res) => {
  const { title, tag, description } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (tag) {
    newNote.tag = tag;
  }
  if (description) {
    newNote.description = description;
  }
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Not found" });
    }
    // ** check the owner of the note is accessing the note and update it

    // console.log(note.user.toString(), req.user.userId)
    if (req.user.userId === note.user.toString()) {
      const note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.status(200).json({ note });
    } else {
      res.status(404).send("Not Allowed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ** ROUTE# 4: delete notes using DELETE: /api/notes/delete-note/:id end point, Login required

router.delete("/delete-note/:id", fetchUser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);

    //** find the note in the db weather it exists or not */

    if (!note) {
      return res.status(400).json("The note does not exist");
    }

      //** check weather the authenticated user is deleting the note else don't allow
      // user in the token (server) and user in the note are same or not
    if (req.user.userId !== note.user.toString()) {
      return res.status(401).json("Not allowed");
    }
    note = await Notes.findByIdAndDelete(note._id);
    res.status(200).json({ msg: "note deleted", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

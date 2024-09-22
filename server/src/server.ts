import express from "express";
import db from "./db";
import cors from "cors";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get("/book", async (req, res) => {
  await db.book.findMany().then((books) => {
    res.json(books);
  });
});

app.post("/book", async (req, res) => {
  const { title, author } = req.body;
  await db.book
    .create({
      data: {
        title,
        author,
      },
    })
    .then((book) => {
      res.json(book);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

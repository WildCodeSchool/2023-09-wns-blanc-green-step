import express, { Response, Request } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const port = 8000;

app.use(cors());

app.get("/imagesupload/", (_: Request, res: Response) => {
  res.send("Hello World!");
});

const storage = multer.diskStorage({
  destination: function (_req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/imagesupload/upload", upload.single("file"), (req: any, res: Response) => {
  fs.readFile(req.file.path, (err) => {
    if (err) {
      console.log("Error:", err);
      return res.status(500).json({ error: err });
    }

    return res.status(201).json({
      status: "success",
      filename: `http://localhost:${port}/files/${req.file.filename}`,
    });
  });
});

app.get("/imagesupload/files/:filename", (req: Request, res: Response) => {
  const filePath = path.join(__dirname + "/../uploads", req.params.filename);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text" });
      res.write("File not found");
      return res.end();
    }

    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.write(content);
    return res.end();
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

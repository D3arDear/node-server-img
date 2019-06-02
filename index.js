const express = require("express")
const cors = require("cors")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const app = express()

app.get("/", (req, res) => {
	res.send("hello express")
})
app.get("/upload", cors(), upload.single("file"), (req, res) => {
	res.send(req.file.filename)
})
app.post("/preview/:key", cors(), (req, res) => {
	res.sendFile(
		`uploads/${req.params.key}`,
		{
			root: __dirname,
			headers: {
				"Content-Type": "image/jpeg",
			},
		},
		(error) => {
			console.log(error)
		},
	)
})
var port = process.env.port || 3000
app.listen(port)

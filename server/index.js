var express = require('express');
var cors = require('cors');

const multer = require("multer");
const path = require("path");
const fs = require("fs");

var app = express();
app.use(cors());
var bodyParser = require('body-parser');
app.use(
        bodyParser.urlencoded({
            extended: true
        })
);
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.json({ message: 'REST API' });
});

app.post('/login', function (request, response) {
    if (request.body.username == 'admin' && request.body.password == '1234') {
        response.json({ status: 'ALLOW' });
    } else {
        response.json({ status: 'DENY' });
    }
});




const handleError = (err, res) => {
    res
            .status(500)
            .contentType("text/plain")
            .end("Oops! Something went wrong!");
};

const upload = multer({
    dest: "./temp"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post("/upload",
        upload.single("file" /* name attribute of <file> element in your form */),
        async (req, res) => {

            const tempPath = req.file.path;
            const targetPath = path.join(__dirname, "./uploads/image.png");

            if (path.extname(req.file.originalname).toLowerCase() === ".png" || req.file.originalname === "blob") {
                await fs.rename(tempPath, targetPath, err => {
                    if (err) return handleError(err, res);
                    // res.json({status: 'saved'});
                    // res.json({status: 'saved'});
                    res
                             .status(200)
                             .contentType("text/json")
                             .end("File uploaded!");
                });
            } else {
                await fs.unlink(tempPath, err => {
                    if (err) return handleError(err, res);

                    res
                            .status(403)
                            .contentType("text/plain")
                            .end("Only .png and blob files are allowed!");

                });
            }


        }
);


app.listen(3000, function () {
    console.log('Server running @ localhost:3000');
});

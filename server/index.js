const express = require('express');
const cors = require('cors');

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
const bodyParser = require('body-parser');
const {getCurrentDatetime, isAllowed} = require("./utils");

app.use(
        bodyParser.urlencoded({
            extended: true,
            limit: '10mb'
        })
);
app.use(bodyParser.json({limit: '10mb'}));

app.get('/', function (request, response) {
    response.json({ message: 'REST API' });
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

app.get('/images', function(request, response) {
    let files = fs.readdirSync(`${__dirname}/uploads/`);

    let data=[];
    files.forEach((file, i) => {
        data.push({id: i, filename: file, path: `http://localhost:3000/uploads/${file}`})
    })

    response.json({files: data})
})

app.delete('/images/:name', function(request, response) {
    const filePath = `${__dirname}/uploads/${request.params.name}`;

    try {
        fs.unlinkSync(filePath);
        response.json({message: 'deleted'});
    } catch(err) {
        console.error(err);
        response.json({message: 'error'});
    }
})

app.get('/uploads/:name', function(request, response) {
    // let name = 'upload-27-3-2021_19-9-33.png';
    response.sendFile( `${__dirname}/uploads/${request.params.name}`);
    //response.sendFile( __dirname + '/uploads/upload-27-3-2021_19-9-33.png');
})

app.post("/upload",
        upload.single("file" /* name attribute of <file> element in your form */),
        (req, res) => {
            const tempPath = req.file.path;
            let imageExtension = path.extname(req.file.originalname).toLowerCase().split('.').pop();
            if (imageExtension === '') imageExtension = 'png';
            const imageName = `upload-${getCurrentDatetime()}.${imageExtension}`;
            const targetPath = path.join(__dirname, `./uploads/${imageName}`);

            if (isAllowed(req.file.originalname)) {
                fs.rename(tempPath, targetPath, err => {
                    if (err) return handleError(err, res);
                    res
                             .status(200)
                             .contentType("text/json")
                             .end("File uploaded!");
                });
            } else {
                fs.unlink(tempPath, err => {
                    if (err) return handleError(err, res);

                    res
                            .status(403)
                            .contentType("text/plain")
                            .end("Only .png, .jpg and blob files are allowed!");

                });
            }
        }
);

app.listen(3000, function () {
    console.log('Server running @ localhost:3000');
});

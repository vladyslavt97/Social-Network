const multer = require('multer');
const path = require('path');
const uidSafe = require('uid-safe');
const aws = require('aws-sdk');
const fs = require('fs');

const { AWS_KEY, AWS_SECRET, AWS_BUCKET } = process.env;

const diskStorage = multer.diskStorage({
    filename: (req, file, callback) => {
        uidSafe(24).then(uid => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});     

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152, // file should not exceed 2 MB
    },
});

const s3 = new aws.S3({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
});

function deleteObject (params){
    s3.deleteObject(params, function (err, data) {
        if (err) console.log('errorr:(', err, err.stack);
        else console.log('was deleted', data); 
    });
}

function fileUpload(req, res, next) {
    // console.log('file in file-upload: ', req.file);
    if (!req.file) {
        console.log('[imageboard:s3] file not there');
        res.statusCode = 400;
        res.send();
    } else {
        const { mimetype, filename, path, size } = req.file;
        const fileContent = fs.readFileSync(path);

        s3.putObject({
            Bucket: AWS_BUCKET,
            ACL: 'public-read', // file is publically available and can be read by anyone
            Key: filename, //filename,
            Body: fileContent, // file content
            ContentType: mimetype,
            ContentLength: size,
        })
            .promise()
            .then(() => {
                // We know upload was succesful we save url into `res.locals`
                res.locals.fileUrl = `https://${AWS_BUCKET}.s3.amazonaws.com/${filename}`;
                next();
            })
            .catch(err => {
                console.log('[social network:s3] error uploading to s3', err);
                res.sendStatus(500);
            });
    }
}

module.exports = { uploader, fileUpload, deleteObject };
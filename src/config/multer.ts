import multer from 'multer';
import crypto from 'crypto';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import { resolve } from 'path';

const storageTypes = {
  local: multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req: Express.Request, file: Express.MulterS3.File, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, '');
        file.key = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'uploadtwitter',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, '');

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
};

export default {
  dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage:
    process.env.NODE_ENV === 'development'
      ? storageTypes['local']
      : storageTypes['s3'],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req: Express.Request, file: Express.MulterS3.File, cb: any) => {
    const allowedMimes = ['image/jpeg', 'image/pjeg', 'image/png', 'image/gif'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, '');
    } else {
      cb(new Error('Invalid file type'), '');
    }
  },
};

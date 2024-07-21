import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs';
import HandledError from '../utils/handledError';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

export const uploadImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { path } = req.body;
    const files = Object.values(req.files ?? {}).flat();
    const images = [];

    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTemp(file.tempFilePath);
    }
    res.status(200).json({ images });
  } catch (err) {
    HandledError.serverFail(err, next);
    return err;
  }
};

const uploadToCloudinary = async (file: UploadedFile, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTemp(file.tempFilePath);
          const error = new HandledError('upload to cloudinary failed', 400);
          return reject(error);
        }

        resolve({
          url: res!.secure_url,
        });
      }
    );
  });
};

const removeTemp = (path: string) => {
  unlink(path, err => {
    if (err) throw err;
  });
};
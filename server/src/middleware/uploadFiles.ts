import { Request, Response, NextFunction } from 'express';
import HandledError from '../utils/handledError';
import { unlink } from 'fs';

const uploadImages = (req: Request, _: Response, next: NextFunction) => {
  try {

    const files = Object.values(req.files ?? {}).flat();

    // console.log('upload images middleware', files);

    if (!req.files || files.length === 0) {
      const error = new HandledError('no file selected', 400);
      throw error;
    }

    files.forEach((file) => {

      if (file.mimetype !== 'image/jpg' &&
        file.mimetype !== 'image/png' &&
        file.mimetype !== 'image/jpeg' &&
        file.mimetype !== 'image/gif' &&
        file.mimetype !== 'image/webp'
      ) {
        removeTemp(file.tempFilePath);
        const error = new HandledError('file not supported', 400);
        throw error;
      }

      if (file.size > 1024 * 1024 * 1) {
        const error = new HandledError('file too large', 400);
        throw error;
      }
    });

    next();

  } catch (err) {
    HandledError.serverFail(err, next);
    return err;
  }
};

const removeTemp = (path: string) => {
  unlink(path, err => {
    if (err) throw err;
  });
};

export { uploadImages };
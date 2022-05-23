import { Request, Response } from "express";
import { Readable } from "stream";
import { bucket } from "./media.model";
import { GridFSFile } from "mongodb";
import { Types } from "mongoose";
import sharp from "sharp";

export const getMedia = async (req: Request, res: Response) => {
  const _id = new Types.ObjectId(req.params.id);
  const file = await bucket.find({ _id }).next();
  if (!file || !file.contentType) {
    return res
      .status(404)
      .json(`File with ID: ${req.params.id} does not exist`);
  }

  res.setHeader("Content-Type", file.contentType);

  const readableStream = bucket.openDownloadStream(_id);
  readableStream.pipe(res);
};

export const addMedia = async (req: Request, res: Response) => {
  if (!req.file) {
    return res
      .status(400)
      .json("NO FILE SENT, make sure to name your input field to 'media'");
  }

  const readableStream = Readable.from(req.file.buffer);
  const writableStream = bucket.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype,
  });

  const pipeline = sharp();

  pipeline
    .clone()
    .resize({
      width: 1500,
      height: 2260,
      fit: "cover",
      position: sharp.strategy.entropy,
    })
    .pipe(writableStream)
    .on("finish", (file: GridFSFile) => {
      res.status(200).json(file);
    });

  readableStream.pipe(pipeline).on("error", (error: unknown) => {
    res.status(404).json(error);
  });
};

export const deleteMedia = async (req: Request, res: Response) => {
  const _id = new Types.ObjectId(req.params.id);
  const file = await bucket.find({ _id }).next();
  if (!file || !file.contentType) {
    return res
      .status(404)
      .json(`File with ID: ${req.params.id} does not exist`);
  }

  await bucket.delete(_id);
  res.status(200).json(file);
};

import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { CommonResponse } from "../types/common.type";
import { statusCodes } from "./constants";
import messages from "./messages";
process.env.AWS_REGION = "ap-south-1";
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "AKIA2Y4DKESBA2YNTXFR",
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY ||
      "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",
  },
});

export const uploadImageToS3 = async (
  file: Express.Multer.File,
  name: string,
  cafe_id: string
): Promise<CommonResponse> => {
  try {
    if (!file) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.FILE_UPLOAD_FAILED,
        success: false,
      };
    }
    process.env.AWS_BUCKET_NAME = "playzoneapp";
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME || "playzoneapp",
      Key: `dishes/${cafe_id}_${name
        .trim()
        .replace(/\s+/g, "_")}_${Date.now()}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read" as ObjectCannedACL,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

    return {
      status: statusCodes.SUCCESS,
      message: messages.FILE_UPLOADED_SUCCESSFULLY,
      data: imageUrl,
      success: true,
    };
  } catch (error: any) {
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      success: false,
    };
  }
};

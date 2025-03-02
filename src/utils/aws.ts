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
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadImageToS3 = async (
  file: Express.Multer.File,
  name: string,
  cafe_id: string
): Promise<CommonResponse> => {
  try {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      return {
        status: statusCodes.INTERNAL_SERVER_ERROR,
        message: "AWS credentials not configured",
        success: false,
      };
    }

    if (!file) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.FILE_UPLOAD_FAILED,
        success: false,
      };
    }

    const bucketName = "playzoneapp";
    const params = {
      Bucket: bucketName,
      Key: `${cafe_id}_${name.trim().replace(/\s+/g, "_")}_${Date.now()}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read" as ObjectCannedACL,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

    return {
      status: statusCodes.SUCCESS,
      message: messages.FILE_UPLOADED_SUCCESSFULLY,
      data: imageUrl,
      success: true,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      success: false,
    };
  }
};

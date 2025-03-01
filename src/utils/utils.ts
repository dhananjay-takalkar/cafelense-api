import axios from "axios";
import { statusCodes } from "./constants";
import messages from "./messages";

const uploadImage = async (imageFile: any) => {
  if (!imageFile || !imageFile.buffer || !imageFile.originalname) {
    return {
      success: false,
      message: messages.INVALID_FILE_FORMAT,
      status: statusCodes.BAD_REQUEST,
    };
  }

  const formData: FormData = new FormData();
  formData.append("file", imageFile.buffer);
  console.log(process.env.IMAGE_HIPPO_API_KEY);
  formData.append("api_key", "4ca800a9443895cc54c2037153107988");

  const response = await axios.post(
    "https://api.imghippo.com/v1/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        api_key: "4ca800a9443895cc54c2037153107988",
      },
    }
  );

  if (!response.data.success) {
    return {
      success: false,
      message: messages.IMAGE_UPLOAD_FAILED,
      status: statusCodes.BAD_REQUEST,
    };
  }

  return {
    success: true,
    message: messages.IMAGE_UPLOADED_SUCCESSFULLY,
    data: response.data.data.url,
    status: statusCodes.SUCCESS,
  };
};

export { uploadImage };

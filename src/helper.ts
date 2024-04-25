import axios from "axios";

export const getSignUrl = async (file: File) => {
  try {
    const response = await axios.put(
      `https://qqqxnll40a.execute-api.eu-north-1.amazonaws.com/prod/upload?name=${file.name}&type=${file.type}`
    );
    const { url } = response.data;

    const result = await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const uploadFileUsingPresignedUrl = async (
  file: File,
  presignedUrl: string
) => {
  try {
    const { data } = await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const uploadFile = async (file) => {
  const bucket = storage.bucket(bucketName);
  const fileName = Date.now() + "-" + file.originalname;

  // Upload the file to the bucket
  const fileUpload = bucket.file(fileName);

  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
    public: true,
  });

  return new Promise((resolve, reject) => {
    stream.on("error", reject);
    stream.on("finish", (some) => {
      console.timeEnd("file upload");
      resolve({
        identifier: `gs://${bucketName}/${fileName}`,
        url: `https://storage.googleapis.com/${bucketName}/${fileName}`,
        gcsName: fileName,
      });
    });
    stream.end(file.buffer);
  });
};

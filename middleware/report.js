const fileSave = async (req, res, next) => {
  try {
    console.time("uploading start");
    const file = req.file; // Array of files
    const uploadPromises = [];
    for (const file of files) {
      uploadPromises.push(uploadFile(file));
    }

    const uploadResults = await Promise.all(uploadPromises);

    const savedResources = uploadResults.map((result, index) => {
      const { identifier, url, gcsName } = result;

      const resource = new Resource({
        name: files[index].originalname,
        gcsName,
        url,
        public: true,
        identifier,
      });

      return resource.save();
    });

    const savedResourcesData = await Promise.all(savedResources);

    res.json(savedResourcesData);
  } catch (error) {
    next(error);
  }
};

module.exports = fileSave;

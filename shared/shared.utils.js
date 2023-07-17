import AWS from 'aws-sdk';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  console.log(objectName);
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: 'instaclone-uploads-2023',
      Key: objectName,
      ACL: 'public-read', // ACL: object의 프라이버시
      Body: readStream, //file (stream)
    })
    .promise();
  return Location;
};

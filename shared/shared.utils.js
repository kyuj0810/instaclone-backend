import AWS from 'aws-sdk';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadPhoto = async (file, userId) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${userId}-${Date.now()}-${filename}`;
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

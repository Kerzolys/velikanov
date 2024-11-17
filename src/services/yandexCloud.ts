import { S3Client } from "@aws-sdk/client-s3"

export const s3Config = {
  region: 'ru-central',
  endpoint: 'https://storage.yandexcloud.net',
  credentials: {
    accessKeyId: process.env.REACT_APP_YANDEX_ACCESS_KEY || '',
    secretAccessKey: process.env.REACT_APP_YANDEX_SECRET_KEY || '',
  }
}

export const s3 = new S3Client(s3Config);
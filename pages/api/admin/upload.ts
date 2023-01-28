import type { NextApiRequest, NextApiResponse } from "next"
import { IncomingForm, File } from "formidable"
import fs from "fs"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config(process.env.CLOUDINARY_URL || "")

type Data = {
  message: string
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      return uploadFile(req, res)
    default:
      return res.status(405).json({ message: "Method not allowed" })
  }
}

async function saveFile(file: File) {
  const { secure_url } = await cloudinary.uploader.upload(file.filepath)
  return secure_url
}

async function parseFiles(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err)
        return
      }
      const filepath = await saveFile(files.file as File)
      resolve(filepath)
    })
  })
}

async function uploadFile(req: NextApiRequest, res: NextApiResponse<Data>) {
  const imageUrl = await parseFiles(req)
  return res.status(200).json({ message: imageUrl })
}

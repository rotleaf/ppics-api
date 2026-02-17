import { NextResponse } from "next/server";
import { config } from "dotenv";
import axios from "axios";
const cheerio = require("cheerio");

config();

async function getGallery(path) {
  const a = `${process.env.BASE_URL}${path}`;
  const images = [];
  try {
    const resp = await axios.get(a);
    const $ = cheerio.load(resp.data);

    $("li.thumbwook").each((_, elem) => {
      const aTag = $(elem).find("a");
      const image = aTag.find("img").prop("data-src");
      images.push(image);
    });
    return images;
  } catch (error) {
    return NextResponse.error("an error occurred");
  }
}

// api/gallery/<gallery-url> returns a list of all the images on the gallery
export const POST = async (req, _) => {
  const { path } = await req.json();
  var images = await getGallery(path);

  return NextResponse.json({ images: images });
};

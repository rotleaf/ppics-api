import { NextResponse } from "next/server";
import { config } from "dotenv";
import axios from "axios";
const cheerio = require("cheerio");

config();

async function getTagGalleries(path) {
  const url = `${process.env.BASE_URL}${path}`;
  const galleries = [];

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $("li.thumbwook").each((_, element) => {
      const aTag = $(element).find("a");
      const href = aTag.prop("href");
      const img = aTag.find("img");
      const cover_image = img.prop("data-src");
      const title = img.prop("alt");

      galleries.push({ title: title, href: href, cover_image: cover_image });
    });

    return galleries;
  } catch (error) {
    return NextResponse.error();
  }
}

export const POST = async (req) => {
  const { path } = await req.json();

  try {
    var galleries = await getTagGalleries(path);
    return NextResponse.json({
      galleries: galleries,
    });
  } catch (error) {
    return NextResponse.error({ error: error.message });
  }
};

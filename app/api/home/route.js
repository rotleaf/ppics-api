import { NextResponse } from "next/server";
const axios = require("axios");
const cheerio = require("cheerio");
import { config } from "dotenv";

config();

let BASE_URL = process.env.BASE_URL;

async function getHome() {
  try {
    const resp = await axios.get(BASE_URL);
    const $ = cheerio.load(resp.data);
    const categories = [];

    // get galleries
    $("li.thumbwook").each((index, item) => {
      const src = $(item).html().split('data-src="')[1].split('"')[0];
      const href = $(item).html().split('href="')[1].split('" ')[0];
      const title = $(item).text();
      categories.push({ title: title, href: href, cover_image: src });
    });

    return categories;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function GET() {
  try {
    var g = await getHome();
    return NextResponse.json({ categories: g });
  } catch (error) {
    return NextResponse.error("Failed to fetch categories");
  }
}

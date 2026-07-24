import * as cheerio from "cheerio";

export const extractData=(html:string)=>{
    const $=cheerio.load(html);
    const title=$("title").text().trim();
    const metaDescription=$("meta[name='description']").attr("content") || "";
    const h1Count=$("h1").length;
    const imagesWithoutAlt=$("img:not([alt])").length;


    $("script, style, noscript").remove();
    const text = $("body").text();
    const words = text.match(/\b[\w']+\b/g);
    const wordCount = words ? words.length : 0;
    
    return {
        title,
        metaDescription,
        h1Count,
        imagesWithoutAlt,
        wordCount
    }
}
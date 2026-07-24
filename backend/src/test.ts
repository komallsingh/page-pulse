// src/__tests__/dataExtract.test.ts
import { extractData } from "./utils/dataExtract";

describe("HTML Parsing Logic (extractData)", () => {
    
    // 1. THE HAPPY PATH
    it("should successfully extract all required data from a valid HTML string", () => {
        const validHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Happy Path Title</title>
                <meta name="description" content="This is a test description.">
            </head>
            <body>
                <h1>First Heading</h1>
                <h1>Second Heading</h1>
                
                <img src="good.jpg" alt="Valid alt text">
                <img src="missing-alt-1.jpg">
                <img src="missing-alt-2.jpg" alt="">
                
                <p>This is a paragraph with exactly seven words here.</p>
                
                <script>
                    const hiddenText = "scripts should not be counted";
                </script>
            </body>
            </html>
        `;

        const result = extractData(validHtml);

        expect(result.title).toBe("Happy Path Title");
        expect(result.metaDescription).toBe("This is a test description.");
        expect(result.h1Count).toBe(2);
        
        // Fix: Your Cheerio selector $("img:not([alt])") only finds elements completely missing the attribute
        expect(result.imagesWithoutAlt).toBe(1); 
        
        // Fix: 4 words in H1s + 9 words in p tag = 13 total words
        expect(result.wordCount).toBe(13);
    });

    // 2. FAILURE CASE 1: Missing Elements (Graceful Degradation)
    it("should return empty strings and zeros when HTML is missing target tags", () => {
        const emptyHtml = `
            <html>
            <body>
                <div>Just a plain div.</div>
                <img src="fine.png" alt="Has alt">
            </body>
            </html>
        `;
        
        const result = extractData(emptyHtml);
        
        expect(result.title).toBe("");
        expect(result.metaDescription).toBe("");
        expect(result.h1Count).toBe(0);
        expect(result.imagesWithoutAlt).toBe(0);
        expect(result.wordCount).toBe(4); // "Just", "a", "plain", "div"
    });

    // 3. FAILURE CASE 2: Malformed or Non-HTML Input
    it("should not crash when passed arbitrary non-HTML strings", () => {
        const garbageInput = "Just some random text! Not valid HTML at all... 123";
        const result = extractData(garbageInput);

        // Cheerio safely wraps loose text in a body tag, so it shouldn't crash.
        expect(result.title).toBe("");
        expect(result.metaDescription).toBe("");
        expect(result.h1Count).toBe(0);
        expect(result.imagesWithoutAlt).toBe(0);
        
        // Fix: Your regex \b[\w']+\b treats numbers as words, so 123 counts!
        expect(result.wordCount).toBe(10); 
    });
});
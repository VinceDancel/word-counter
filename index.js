import { readFile } from "fs/promises";
import path from "path";

// Get the filename from the command line
const filename = process.argv[2];

// Check if a filename was provided
if (!filename) {
  console.log("Please provide a filename.");
  console.log("Example: npm start sample.txt");
  process.exit(1);
}

try {
  // Resolve the full file path
  const filePath = path.resolve(filename);

  // Read the file
  const text = await readFile(filePath, "utf8");

  // Count lines
  const lines = text.split(/\r?\n/).length;

  // Count words
  const words = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  // Count characters
  const characters = text.length;

  // Print results
  console.log("\n--- Word & Line Counter ---");
  console.log(`File: ${filename}`);
  console.log(`Lines: ${lines}`);
  console.log(`Words: ${words}`);
  console.log(`Characters: ${characters}`);

} catch (error) {
  console.error(`Error: Could not read "${filename}".`);
  console.error("Make sure the file exists and the filename is correct.");
}
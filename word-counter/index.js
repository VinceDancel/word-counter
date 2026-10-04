import fs from 'fs/promises';
import path from 'path';

async function countFileStats() {
  // 1. Get the filename from process.argv
  const filename = process.argv[2];

  // 2. Validate input
  if (!filename) {
    console.log('Error: Please provide a filename.');
    console.log('Usage: npm start ');
    process.exit(1);
  }

  try {
    // Resolve absolute path
    const filePath = path.resolve(filename);

    // 3. Read file contents using fs/promises
    const content = await fs.readFile(filePath, 'utf-8');

    // 4. Calculate stats
    // Split by line breaks to get line count
    const lines = content.split(/\r?\n/).length;

    // Trim content and split by whitespace to count words (handles empty files gracefully)
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;

    // Total character count
    const characters = content.length;

    // 5. Output summary
    console.log(`File: ${filename}`);
    console.log(`Lines: ${lines}`);
    console.log(`Words: ${words}`);
    console.log(`Characters: ${characters}`);

  } catch (error) {
    // Handle missing files or permission issues
    if (error.code === 'ENOENT') {
      console.error(`Error: File '${filename}' does not exist.`);
    } else {
      console.error(`An error occurred: ${error.message}`);
    }
  }
}

countFileStats();
/**
 * Output module - handles writing generated TypeScript
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'pathe';

import { logger } from './logger';

/**
 * Write output to stdout or file
 */
export async function writeOutput(
  content: string,
  outputPath: string,
): Promise<void> {
  if (outputPath === '-') {
    // Write to stdout
    process.stdout.write(content);
    if (!content.endsWith('\n')) {
      process.stdout.write('\n');
    }
  } else {
    // Ensure directory exists
    const directory = dirname(outputPath);
    await mkdir(directory, { recursive: true });

    // Write to file
    await writeFile(outputPath, content, 'utf8');
    logger.debug(`Written ${content.length} bytes to ${outputPath}`);
  }
}

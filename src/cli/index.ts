#!/usr/bin/env node
import { defineCommand, runMain } from 'citty';

import packageJson from '../../package.json' with { type: 'json' };
import { analyzeVuePlugin } from './analyzer';
import { generateTypescript } from './generator';
import { logger } from './logger';
import { writeOutput } from './output';

const main = defineCommand({
  meta: {
    name: 'vue-types-gen',
    version: packageJson.version,
    description: 'Generate TypeScript types for eslint-plugin-vue rules',
  },
  args: {
    input: {
      type: 'positional',
      required: true,
      description: 'Path to eslint-plugin-vue directory',
    },
    output: {
      type: 'string',
      alias: 'o',
      default: '-',
      description:
        'Output path for generated TypeScript file (use "-" for stdout)',
    },
    verbose: {
      type: 'boolean',
      alias: 'v',
      default: false,
      description: 'Enable verbose logging',
    },
  },
  async run({ args }) {
    // Configure logging level
    if (!args.verbose) {
      logger.level = 3; // info and above
    }

    logger.start('Vue Types Generator');
    logger.info(`Input: ${args.input}`);

    if (args.output !== '-') {
      logger.info(`Output: ${args.output}`);
    }

    try {
      // Analyze the Vue plugin
      logger.start('Analyzing eslint-plugin-vue rules...');
      const analysis = await analyzeVuePlugin(args.input);
      logger.success(`Found ${analysis.rules.length} rules`);

      // Generate TypeScript
      logger.start('Generating TypeScript types...');
      const typescript = await generateTypescript(analysis);
      logger.success('TypeScript generation complete');

      // Write output
      await writeOutput(typescript, args.output);

      if (args.output === '-') {
        logger.success('Types written to stdout');
      } else {
        logger.success(`Types written to ${args.output}`);
      }
    } catch (error) {
      logger.error('Failed to generate types:', error);
      process.exit(1);
    }
  },
});

runMain(main);

/**
 * Analyzer module - analyzes eslint-plugin-vue rules
 */

import { access, readdir, readFile } from 'node:fs/promises';
import { join } from 'pathe';

import type { PluginAnalysis, RuleInfo } from './types';

import { logger } from './logger';

/**
 * Convert rule name to TypeScript type name
 */
function toTypeName(ruleName: string): string {
  return 'Vue' + ruleName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Analyze a single rule file
 */
async function analyzeRule(
  filePath: string,
  fileName: string,
): Promise<RuleInfo | undefined> {
  try {
    const content = await readFile(filePath, 'utf8');
    const name = fileName.replace('.js', '');

    // Basic parsing to extract module.exports
    // This is a simplified approach for the foundation
    const hasSchema = content.includes('schema:');

    logger.debug(`Analyzing rule: ${name}`);

    return {
      name,
      ruleName: `vue/${name}`,
      typeName: toTypeName(name),
      schema: undefined, // Will be populated in actual implementation
      hasOptions: hasSchema,
      isEmptyOptions: !hasSchema,
    };
  } catch (error) {
    logger.warn(`Failed to analyze rule ${fileName}:`, error);
    return undefined;
  }
}

/**
 * Analyze all rules in the eslint-plugin-vue directory
 */
export async function analyzeVuePlugin(
  pluginPath: string,
): Promise<PluginAnalysis> {
  const rulesDirectory = join(pluginPath, 'lib', 'rules');

  try {
    await access(rulesDirectory);
  } catch {
    throw new Error(`Rules directory not found: ${rulesDirectory}`);
  }

  // Try to get plugin version
  let pluginVersion: string | undefined;
  try {
    const packageJsonPath = join(pluginPath, 'package.json');
    const packageJson = await readFile(packageJsonPath, 'utf8');
    const package_ = JSON.parse(packageJson) as { version?: string };
    pluginVersion = package_.version;
  } catch {
    logger.debug('Could not read plugin version');
  }

  // Read all rule files
  const files = await readdir(rulesDirectory);
  const ruleFiles = files.filter((file: string) =>
    file.endsWith('.js') &&
    !file.startsWith('_'),
  );

  logger.debug(`Found ${ruleFiles.length} rule files`);

  // Analyze each rule
  const rules: RuleInfo[] = [];
  for (const file of ruleFiles) {
    const ruleInfo = await analyzeRule(join(rulesDirectory, file), file);
    if (ruleInfo) {
      rules.push(ruleInfo);
    }
  }

  // Sort rules alphabetically
  rules.sort((a, b) => a.name.localeCompare(b.name));

  // Calculate statistics
  const rulesWithOptions = rules.filter(r => r.hasOptions).length;
  const rulesWithoutOptions = rules.filter(r => !r.hasOptions).length;

  return {
    rules,
    totalRules: rules.length,
    rulesWithOptions,
    rulesWithoutOptions,
    pluginVersion,
  };
}

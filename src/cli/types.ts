/**
 * Type definitions for the CLI modules
 */

export interface RuleSchema {
  type?: string
  enum?: string[]
  properties?: Record<string, unknown>
  items?: RuleSchema | RuleSchema[]
  additionalProperties?: boolean
  additionalItems?: boolean
  uniqueItems?: boolean
  required?: string[]
  oneOf?: RuleSchema[]
  anyOf?: RuleSchema[]
  allOf?: RuleSchema[]
  [key: string]: unknown
}

export interface RuleMeta {
  type?: string
  docs?: {
    description: string
    categories?: string[]
    url?: string
  }
  fixable?: 'code' | 'whitespace' | false
  hasSuggestions?: boolean
  schema?: RuleSchema | RuleSchema[]
  messages?: Record<string, string>
}

export interface RuleDefinition {
  meta?: RuleMeta
  create?: unknown
}

export interface RuleInfo {
  name: string
  ruleName: string // Full rule name with 'vue/' prefix
  typeName: string // TypeScript type name (e.g., VueArrayBracketNewline)
  schema?: RuleSchema | RuleSchema[]
  hasOptions: boolean
  isEmptyOptions: boolean
}

export interface PluginAnalysis {
  rules: RuleInfo[]
  totalRules: number
  rulesWithOptions: number
  rulesWithoutOptions: number
  pluginVersion?: string
}

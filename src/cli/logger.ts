/**
 * Logger module - creates a logger context for the CLI
 */

import { createConsola } from 'consola';

export const logger = createConsola({
  // Logger configuration
  defaults: {
    tag: 'vue-types-gen',
  },
});

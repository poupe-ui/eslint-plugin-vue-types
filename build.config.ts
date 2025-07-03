import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/vue',
    { input: 'src/cli/index.ts', name: 'cli' },
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    dts: {
      respectExternal: true,
    },
  },
});

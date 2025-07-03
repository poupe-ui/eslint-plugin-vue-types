import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/vue',
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

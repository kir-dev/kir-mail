const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(
  withNx({
    target: 'node',
    runtimeDependencies: ['pg', '@prisma/client', 'prisma'],
  }),
  (config) => {
    return config;
  }
);

const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr');

const decoratorEnv = process.env.NAIS_CLUSTER_NAME === "prod-gcp" ? "prod" : "dev";

const getHtmlWithDecorator = (filePath) =>
  injectDecoratorServerSide({
    env: decoratorEnv,
    filePath: filePath,
    enforceLogin: false,
    level: 'Level4',
    redirectToApp: true,
  });

module.exports = getHtmlWithDecorator;

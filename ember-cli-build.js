'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const Concat = require('broccoli-concat');
const MergeTrees = require('broccoli-merge-trees');
let Funnel = require('broccoli-funnel');

// not officially supported doing it this way...
class CustomApp extends GlimmerApp {
  publicTree() {
    let originalTree = super.publicTree();

    let vendorScripts = new Concat('node_modules', {
      inputFiles: [
        'jquery/dist/jquery.min.js',
        'semantic-ui-css/semantic.min.js',
        'netlify-identity-widget/build/netlify-identity-widget.js'
      ],
      outputFile: 'vendor.js',
    });

    return new MergeTrees([originalTree, vendorScripts], { overwrite: true });
  }
}

module.exports = function(defaults) {
  let app = new CustomApp(defaults, {
    storeConfigInMeta: true,
    sassOptions: {
      includePaths: [
        'node_modules'
      ]
    }
  });

  // Copy only the relevant files:
  let semanticIcons = new Funnel('node_modules/semantic-ui-css', {
    srcDir: 'themes/default/assets/fonts',
    include: ['*'],
    destDir: '/themes/default/assets/fonts'
   });

   return MergeTrees([app.toTree(), semanticIcons], {overwrite: true});
};

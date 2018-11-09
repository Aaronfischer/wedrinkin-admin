'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const Concat = require('broccoli-concat');
const MergeTrees = require('broccoli-merge-trees');

// not officially supported doing it this way...
class CustomApp extends GlimmerApp {
  publicTree() {
    let originalTree = super.publicTree();

    let vendorScripts = new Concat('node_modules', {
      inputFiles: [
        'semantic-ui/dist/semantic.min.js'
      ],
      outputFile: 'vendor.js',
    });

    return new MergeTrees([originalTree, vendorScripts], { overwrite: true });
  }
}

module.exports = function(defaults) {
  let app = new CustomApp(defaults, {
    sassOptions: {
      includePaths: [
        'node_modules'
      ]
    }
  });

  return app.toTree();
};

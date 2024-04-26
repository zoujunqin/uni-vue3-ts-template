import { injectCssPostPlugin, removeExt } from '@dcloudio/uni-cli-shared';
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite';

import { updateFilename } from '../../uni-cli-shared/utils';
import { viteCssPostPluginName } from '../../uni-cli-shared/const';

export function rewriteViteCssPostPlugin(options: UniMiniProgramPluginOptions) {
  const {
    style: { extname }
  } = options;

  return {
    enforce: 'post',
    configResolved(resolvedConfig) {
      const { plugins } = resolvedConfig;
      const cssPostPlugin = plugins.find(
        plugin => plugin.name === viteCssPostPluginName
      );
      const originGenerateBundle = cssPostPlugin.generateBundle;

      async function generateBundle() {
        const cssFiles = [];
        const contextEmitFile = this.emitFile;

        this.emitFile = function (opts) {
          const { fileName } = opts;

          if (fileName.endsWith(extname)) {
            cssFiles.push(opts);
          } else {
            contextEmitFile.call(this, opts);
          }
        };

        await originGenerateBundle.call(this);

        cssFiles.forEach(opts => {
          const filename = removeExt(opts.fileName);
          const newFilename = updateFilename(filename);

          contextEmitFile({
            ...opts,
            fileName: newFilename + extname
          });
        });

        this.emitFile = contextEmitFile;
      }

      injectCssPostPlugin(resolvedConfig, {
        name: viteCssPostPluginName,
        generateBundle
      });

      return resolvedConfig;
    }
  };
}

import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import esbuild from "lume/plugins/esbuild.ts";

const site = lume();

site.loadAssets(['.css']);

site.use(base_path());
site.use(esbuild({
  options: {
    bundle: true,
    format: "iife",
    // minify: true,
    incremental: true,
    treeShaking: true,
  },
}));
export default site;

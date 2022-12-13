import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import postcss from "lume/plugins/postcss.ts";
import esbuild from "lume/plugins/esbuild.ts";

const site = lume();

site.loadAssets([".css", ".svg"]);

site.use(base_path());
site.use(esbuild({
  options: {
    bundle: true,
    format: "iife",
    minify: false,
    incremental: true,
    treeShaking: true,
  },
}));
site.use(postcss());

export default site;

import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";

const site = lume();

site.use(base_path());

export default site;

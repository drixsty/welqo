import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import path from "path";

const projectDir = process.cwd().endsWith("web-storefront")
  ? process.cwd()
  : path.join(process.cwd(), "apps/web-storefront");

export const reader = createReader(projectDir, keystaticConfig);

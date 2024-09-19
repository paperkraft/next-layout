import pug, { Options } from 'pug';
import path from 'path';

type RenderOptions = {
  templatePath: string;
  options?: Options;
};

export function renderPug({ templatePath, options = {} }: RenderOptions) {
  const filePath = path.resolve(process.cwd(), 'src/templates', templatePath);
  return pug.renderFile(filePath, options);
}
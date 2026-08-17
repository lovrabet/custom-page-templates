import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// 基于当前脚本位置计算项目根目录，避免依赖执行命令时所在的工作目录
const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDirectory = join(projectRoot, 'dist');

// 定义 BLANK 模板源码与 CLI page-content 文件路径的对应关系
const templateFiles = {
  'src/app/index.jsx': 'src/templates/blank/app/index.jsx',
  'src/app/index.css': 'src/templates/blank/app/index.css',
  'src/locales/index.js': 'src/templates/blank/locales/index.js',
};

// 并行读取模板源码，组装为 CLI 可直接提交的文件映射
const files = Object.fromEntries(
  await Promise.all(
    Object.entries(templateFiles).map(async ([targetPath, sourcePath]) => [
      targetPath,
      await readFile(join(projectRoot, sourcePath), 'utf8'),
    ]),
  ),
);

// 清理旧产物后写入最新的 BLANK 模板源码
await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await writeFile(join(outputDirectory, 'blank.json'), `${JSON.stringify(files, null, 2)}\n`);

console.log('Built BLANK page-content artifact.');

import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// 基于当前脚本位置计算项目根目录，避免依赖执行命令时所在的工作目录
const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDirectory = join(projectRoot, 'dist');
const templatesDirectory = join(projectRoot, 'templates');

// 发现每个模板目录，新增模板后无需修改构建脚本
const templateDirectories = (await readdir(templatesDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (templateDirectories.length === 0) {
  throw new Error('No templates were found.');
}

// 递归读取目录中的源文件
async function readSourceFiles(sourceDirectory) {
  const entries = (await readdir(sourceDirectory, { withFileTypes: true })).sort((left, right) =>
    left.name.localeCompare(right.name),
  );
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(sourceDirectory, entry.name);

      if (entry.isDirectory()) {
        const nestedFiles = await readSourceFiles(entryPath);
        return nestedFiles.map(([filePath, content]) => [join(entry.name, filePath), content]);
      }

      if (!entry.isFile()) {
        return [];
      }

      return [[entry.name, await readFile(entryPath, 'utf8')]];
    }),
  );

  return files.flat();
}

// 读取每个模板 src 目录中的全部源码，组装为 CLI 可直接提交的文件映射
const artifacts = await Promise.all(
  templateDirectories.map(async (directory) => {
    const templateDirectory = join(templatesDirectory, directory);
    const sourceDirectory = join(templateDirectory, 'src');
    const files = Object.fromEntries(
      (await readSourceFiles(sourceDirectory)).map(([filePath, content]) => [
        `src/${filePath.split(sep).join('/')}`,
        content,
      ]),
    );

    return { id: directory, files };
  }),
);

// 清理旧产物后写入每个模板的最新源码
await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await Promise.all(
  artifacts.map(({ id, files }) =>
    writeFile(join(outputDirectory, `${id}.json`), `${JSON.stringify(files, null, 2)}\n`),
  ),
);

console.log(`Built ${artifacts.length} template artifact(s).`);

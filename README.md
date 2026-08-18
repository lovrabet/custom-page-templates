# 自定义页面模板

此仓库将本地预览工程与页面模板源码分离维护。

```text
workspace/                   本地 Vite 预览工程
workspace/src/index.tsx      本地预览挂载入口
workspace/src/preview.tsx    页面收集和预览渲染
workspace/src/app-context.tsx 平台上下文模拟
workspace/src/pages/         初始化后存放各页面的实际源码
templates/blank/             BLANK 模板原始页面文件
scripts/build-templates.mjs  生成模板文件映射
```

## 本地预览

克隆仓库后，在根目录直接执行：

```bash
bun install
bun run dev
```

启动后打开终端输出的地址即可预览 `workspace/src/pages/` 中的实际页面。目录为空时会显示初始化提示。`workspace/` 仅用于本地运行，不会成为模板产物的一部分。

`workspace/src/pages/` 下的每个一级目录代表一个页面，目录名即页面 ID。每个页面目录的 `index` 文件是唯一入口：

```text
workspace/src/pages/dashboard/
├── index.tsx
└── components/
```

预览环境会自动加载全部 `index` 入口，使用 `?page=<页面 ID>` 切换，未指定时默认预览按页面 ID 排序后的第一个页面。页面导入 `@/context/app-context` 时，Vite 会自动解析为 `workspace/src/app-context.tsx` 提供的全局模拟上下文，无需修改页面或入口代码。Vite 会自动热更新预览。

## 模板结构

[`templates/blank`](./templates/blank) 是基础自定义页面模板：

```text
src/app/index.jsx
src/app/index.css
src/locales/index.js
```

模板目录名即模板 ID，`src/` 下的全部文件都会作为原始页面源码写入构建产物。预览工程通过别名模拟模板所需的上下文，不修改模板代码。

## 构建产物

```bash
bun run build
```

构建后会为每个模板生成 `dist/<模板 id>.json`，其内容是模板全部源码的文件映射。当前产物为 `dist/blank.json`。

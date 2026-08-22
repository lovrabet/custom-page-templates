# 自定义页面模板

此仓库将本地预览工程与页面模板源码分离维护。

```text
project/                    本地 Vite 预览工程
project/preview.tsx         本地预览挂载、页面收集和渲染
project/app-context.tsx     平台上下文模拟
project/pages/         初始化后存放各页面的实际源码
templates/blank/             BLANK 模板原始页面文件
templates/onepage/           单页框架模板原始页面文件
scripts/build-templates.mjs  生成模板文件映射
```

## 本地预览

克隆仓库后，在根目录直接执行：

```bash
bun install
bun run dev
```

启动后打开终端输出的地址即可预览 `project/pages/` 中的实际页面。目录为空时会显示初始化提示。`project/` 仅用于本地运行，不会成为模板产物的一部分。

`project/pages/` 下的每个一级目录代表一个页面，目录名即页面 ID。每个页面目录的 `index` 文件是唯一入口：

```text
project/pages/dashboard/
├── index.tsx
└── components/
```

预览环境会自动加载全部 `index` 入口，使用 `?page=<页面 ID>` 切换，未指定时默认预览按页面 ID 排序后的第一个页面。页面导入 `@/context/app-context` 时，Vite 会自动解析为 `project/app-context.tsx` 提供的全局模拟上下文，无需修改页面或入口代码。Vite 会自动热更新预览。

## 模板结构

[`templates/blank`](./templates/blank) 是基础自定义页面模板，[`templates/onepage`](./templates/onepage) 提供了包含页面头部、概览区和主内容区的单页框架：

```text
app/index.jsx
app/index.css
locales/index.js
```

模板目录名即模板 ID，全部文件都会作为原始页面源码写入构建产物。预览工程通过别名模拟模板所需的上下文，不修改模板代码。

## 构建产物

```bash
bun run build
```

构建后会为每个模板生成 `dist/<模板 id>.json`，其内容是模板全部源码的文件映射。当前产物包括 `dist/blank.json` 与 `dist/onepage.json`。

# 自定义页面模板

此仓库用于维护可供 `rabetbase-cli` 使用的 Custom Page 模板源码。

## BLANK

[`src/templates/blank`](./src/templates/blank) 是基础自定义页面模板，保留完整、可直接提交的三文件结构：

- `app/index.jsx`
- `app/index.css`
- `locales/index.js`

词包默认包含简体中文和英文。将模板作为 `page-content` 提交或更新页面时，必须包含这三个文件及页面后续新增的所有文件。

## 本地预览

项目内置了一个只用于本地查看的宿主环境：它将平台运行时的 `@/context/app-context` 映射到根目录的 `src/app-context.tsx`，并提供 Ant Design 和路径别名，不修改模板本身。

项目通过 `bunfig.toml` 固定使用 npm 官方 registry，避免受本机全局 registry 配置影响。

```bash
bun install
bun run dev
```

启动后打开终端输出的本地地址即可查看 `BLANK` 模板，并可在页面 Header 中切换词包语言。

## 模板产物与 CLI 调用

构建只打包 BLANK 的原始页面文件，不会输出或发布预览宿主：

```bash
bun run build
```

构建产物固定为：

```text
dist/blank.json
```

`blank.json` 是 CLI `--page-content` 所需的文件映射，包含 `src/app/index.jsx`、`src/app/index.css` 和 `src/locales/index.js` 的原始源码。

例如，可以将构建产物直接传给 CLI：

```bash
rabetbase page react-create --name "基础页面" --page-content "$(cat dist/blank.json)"
```

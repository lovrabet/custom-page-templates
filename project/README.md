# 本地预览工程

## 启动方式

在仓库根目录安装依赖后，进入 `project` 目录启动预览：

```bash
cd project
bun run dev
```

默认在终端输出的地址打开即可访问（通常为 `http://localhost:5173/`）

## 构建与类型检查

```bash
cd project
bun run build
bun run typecheck
```

## 说明

`project` 仅用于本地预览，不参与模板文件发布产物构建

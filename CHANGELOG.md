# Changelog

本文件记录此项目中面向使用者的变更。

## Unreleased

### Added

- 新增 `BLANK` 自定义页面模板，包含 JSX、样式和中英文词包源码。
- 新增本地 React/Vite 预览宿主，可直接查看 `BLANK` 模板效果并切换词包语言。

### Changed

- 优化 `BLANK` 模板的内容区域，使其适配不同屏幕宽度。
- 精简 `BLANK` 模板为一组两列响应式指标卡片。
- 构建产物精简为 BLANK 的原始页面文件映射，供 CLI 通过 `--page-content` 使用。
- 精简本地预览宿主、模板样式和 TypeScript 配置，仅保留 BLANK 所需能力。

import type { ComponentType } from 'react';
import { BrowserRouter, useLocation } from 'react-router';
import { AppContextProvider } from './app-context';

const pages = Object.entries(
  import.meta.glob<ComponentType>('./pages/*/index.{js,jsx,ts,tsx}', {
    eager: true,
    import: 'default',
  }),
)
  .map(([path, Page]) => ({ id: path.split('/')[2], Page }))
  .sort((left, right) => left.id.localeCompare(right.id));

/**
 * 根据地址中的 page 参数选择需要预览的页面
 * 未指定页面时默认渲染按页面 ID 排序后的第一个页面
 *
 * @returns 当前页面组件或初始化提示
 */
const PreviewPage = () => {
  const pageId = new URLSearchParams(useLocation().search).get('page');
  const Page = (pages.find((page) => page.id === pageId) ?? pages[0])?.Page;

  return Page ? <Page /> : <div>请先将页面源码初始化到 workspace/src/pages 目录</div>;
};

/**
 * 创建本地页面预览环境
 * 自动为 pages 下的页面注入路由和平台模拟上下文
 *
 * @returns 可直接挂载的预览组件
 */
const Preview = () => (
  <BrowserRouter>
    <AppContextProvider>
      <PreviewPage />
    </AppContextProvider>
  </BrowserRouter>
);

export default Preview;

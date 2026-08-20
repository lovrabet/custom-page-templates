import type { ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router";
import { AppContextProvider } from "./app-context";

type IndexedPage = {
  id: string;
  page: ComponentType;
  score: number;
};

type IndexModule = {
  default?: unknown;
};

type PageEntry = {
  id: string;
  page: ComponentType;
  filePath: string;
};

/**
 * 获取入口文件的扩展名优先级
 * 优先选择 TypeScript React 入口，其次是 TypeScript、JavaScript React 与 JavaScript
 *
 * @param filePath 入口文件相对于页面目录的路径
 * @returns 文件扩展名对应的优先级，数值越小优先级越高
 */
const extensionPriority = (filePath: string): number => {
  if (filePath.endsWith("index.tsx")) return 1;
  if (filePath.endsWith("index.ts")) return 2;
  if (filePath.endsWith("index.jsx")) return 3;
  return 4;
};

/**
 * 计算页面入口的选择优先级
 * 目录层级越浅、扩展名优先级越高的入口会被优先选中
 *
 * @param filePath 入口文件相对于页面目录的路径
 * @returns 用于比较页面入口的优先级分数
 */
const toScore = (filePath: string): number => {
  const depth = filePath.split("/").length;
  return depth * 10 + extensionPriority(filePath);
};

/**
 * 收集所有页面目录中的 index 入口
 * 每个一级目录只保留优先级最高的有效默认导出组件
 */
const pageEntries = Object.entries(
  import.meta.glob<IndexModule>("./pages/*/**/index.{js,jsx,ts,tsx}", {
    eager: true,
  }),
)
  .map<PageEntry | null>(([path, module]) => {
    const match = path.match(/^\.\/pages\/([^/]+)\/(.*)$/);
    const id = match?.[1];
    const filePath = match?.[2];
    const page = module.default;

    if (!id || !filePath) {
      return null;
    }

    if (!page || (typeof page !== "function" && typeof page !== "object")) {
      return null;
    }

    return { id, page: page as ComponentType, filePath };
  })
  .filter((entry): entry is PageEntry => !!entry)
  .reduce<Map<string, IndexedPage>>((acc, page) => {
    const score = toScore(page.filePath);
    const current = acc.get(page.id);

    if (!current || score < current.score) {
      acc.set(page.id, { id: page.id, page: page.page, score });
    }

    return acc;
  }, new Map())
  .values() as Iterable<IndexedPage>;

/**
 * 按页面 ID 排序的可预览页面
 * 未指定 page 参数时会选择列表中的第一个页面
 */
const sortedPages = [...pageEntries].sort((left, right) =>
  left.id.localeCompare(right.id),
);

/**
 * 根据地址中的 page 参数选择需要预览的页面
 * 未指定页面时默认渲染按页面 ID 排序后的第一个页面
 *
 * @returns 当前页面组件或初始化提示
 */
const PreviewPage = () => {
  const pageId = new URLSearchParams(useLocation().search).get("page");
  const SelectedPage = (
    sortedPages.find((page) => page.id === pageId) ?? sortedPages[0]
  )?.page;

  return SelectedPage ? (
    <SelectedPage />
  ) : (
    <div>
      请先将页面源码初始化到 project/pages 目录，按页面目录创建 index 入口
    </div>
  );
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

/**
 * 获取 HTML 中用于挂载 React 预览应用的根节点
 */
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Preview root element was not found.");
}

createRoot(rootElement).render(<Preview />);

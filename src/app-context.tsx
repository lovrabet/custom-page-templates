import { createContext, useCallback, useContext, useMemo, useRef } from 'react';
import type { PropsWithChildren } from 'react';

/**
 * 单个语言的文案集合
 *
 * 键使用页面代码传入的完整 key，例如 metrics.projectCount
 * 值为当前语言对应的展示文本
 */
type LocaleMessages = Record<string, string>;

/**
 * 按语言代码归类的页面词包
 *
 * 语言代码与预览页选择器使用的值保持一致，例如 zh-CN 和 en-US
 */
type LocaleBundles = Record<string, LocaleMessages>;

/**
 * 自定义页面可使用的国际化能力
 *
 * 页面先注册词包，再通过 t 获取与当前语言匹配的文案
 */
interface I18n {
  /** 注册一个或多个语言词包 */
  addLocale: (locales: LocaleBundles) => void;

  /**
   * 根据 key 获取当前语言的文案
   *
   * 找不到文案时依次返回 fallback 和 key，确保页面始终有可见文本
   */
  t: (key: string, fallback?: string) => string;
}

/**
 * 预览宿主向自定义页面提供的运行时能力
 *
 * 该结构模拟平台的上下文接口，使模板可在本地独立预览
 */
interface AppContextValue {
  /** 当前语言对应的国际化能力 */
  i18n: I18n;
}

/**
 * 自定义页面预览的共享上下文
 *
 * 未被 Provider 包裹时保持为 null，以便 Hook 给出明确错误
 */
const AppContext = createContext<AppContextValue | null>(null);

/**
 * 为模板提供本地预览所需的运行时能力
 *
 * 词包会在模板渲染时注册，切换 language 后 t 会自动读取对应语言的文案
 *
 * @param props Provider 属性
 * @param props.children 需要使用预览上下文的模板内容
 * @param props.language 当前选中的语言代码
 * @returns 已注入预览上下文的 React 节点
 */
export function AppContextProvider({
  children,
  language,
}: PropsWithChildren<{ language: string }>) {
  const localeBundles = useRef<LocaleBundles>({});

  /** 将模板传入的词包合并到已注册词包中 */
  const addLocale = useCallback((locales: LocaleBundles) => {
    Object.assign(localeBundles.current, locales);
  }, []);

  /** 按当前语言读取词包，并在缺失时提供稳定的回退值 */
  const t = useCallback(
    (key: string, fallback?: string) => localeBundles.current[language]?.[key] ?? fallback ?? key,
    [language],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      i18n: { addLocale, t },
    }),
    [addLocale, t],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * 获取预览上下文的内部入口
 *
 * 模板必须位于 AppContextProvider 内，否则抛出错误以提示预览宿主配置问题
 *
 * @returns 当前预览上下文
 */
function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Custom Page previews must be rendered inside AppContextProvider.');
  }
  return context;
}

/**
 * 获取当前页面的国际化能力
 *
 * 使用 addLocale 注册词包，使用 t 获取多语言文案
 *
 * @returns 国际化操作对象
 */
export function useI18n() {
  return useAppContext().i18n;
}

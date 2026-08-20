import { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import { createClient } from '@lovrabet/sdk';
import type { LovrabetClient } from '@lovrabet/sdk';
import { useLocation, useNavigate } from 'react-router';
import appCode from './const';

type LocaleMap = Record<string, Record<string, string>>;

/**
 * 创建轻量级 i18n 实例
 * 用于在预览环境中模拟平台提供的国际化能力
 *
 * @returns 包含 t 与 addLocale 的 mock i18n 对象
 */
const createI18n = () => {
  let locales: LocaleMap = {};

  return {
    /**
     * 按 key 读取文案
     * 无 key 命中时回退到 fallback 或 key 本身
     *
     * @param key 文案标识
     * @param fallback 备用文案
     * @returns 文案结果
     */
    t: (key: string, fallback = '') => locales['zh-CN']?.[key] || fallback || key,
    /**
     * 合并新增语言包
     * 支持运行时动态挂载国际化配置
     *
     * @param nextLocales 即将注入的语言资源
     * @returns 合并后的语言资源
     */
    addLocale: (nextLocales: LocaleMap) => {
      locales = { ...locales, ...nextLocales };
      return locales;
    },
  };
};

/**
 * 创建 SDK 客户端
 * 使用初始化时写入的应用编码，使页面请求与平台运行时保持一致
 *
 * @returns 已初始化的 Lovrabet SDK 客户端
 */
const createSdkClient = (): LovrabetClient =>
  createClient({
    appCode,
    models: {},
  });

type AppContextValue = {
  i18n: ReturnType<typeof createI18n>;
  sdkClient: LovrabetClient;
};

const AppContext = createContext<AppContextValue | null>(null);

/**
 * 模拟平台上下文的 Provider
 * 为模板页面注入统一的 i18n 和 sdkClient
 *
 * @param children 页面子树
 */
export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const value = useMemo(
    () => ({
      i18n: createI18n(),
      sdkClient: createSdkClient(),
    }),
    [],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * 获取预览上下文
 * 缺少 Provider 时抛出错误，防止静默失败
 *
 * @returns 已就绪的预览上下文
 */
const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('Preview context was not found.');
  }

  return context;
};

/**
 * 暴露 mock i18n 供页面代码使用
 * 与原模板中 useI18n 的消费方式对齐
 */
export const useI18n = () => useAppContext().i18n;

/**
 * 暴露 mock sdkClient 供页面代码使用
 * 与原模板中 useSdkClient 的消费方式对齐
 */
export const useSdkClient = () => useAppContext().sdkClient;

export { useLocation, useNavigate };

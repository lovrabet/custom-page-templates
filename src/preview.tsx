import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, Select } from 'antd';
import BlankTemplate from './templates/blank/app/index.jsx';
import { locales } from './templates/blank/locales';
import { AppContextProvider } from './app-context';
import './preview.css';

const supportedLanguages = Object.keys(locales).map((language) => ({
  value: language,
  label: language === 'zh-CN' ? '中文' : language,
}));
const previewTheme = { cssVar: true };

function Preview() {
  const [language, setLanguage] = useState('zh-CN');

  return (
    <ConfigProvider theme={previewTheme}>
      <AppContextProvider language={language}>
        <header className="preview-header">
          <Select
            aria-label="切换预览语言"
            value={language}
            options={supportedLanguages}
            onChange={setLanguage}
          />
        </header>
        <main className="preview-template">
          <BlankTemplate />
        </main>
      </AppContextProvider>
    </ConfigProvider>
  );
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Preview root element was not found.');
}

createRoot(rootElement).render(<Preview />);

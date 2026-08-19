import React from 'react';
import { Card } from 'antd';
import { useSdkClient, useI18n, useNavigate, useLocation } from '@/context/app-context';
import { locales } from '../locales';
import './index.css';

const App = () => {
  const client = useSdkClient(); // client 可以用于获取其他数据集的数据
  const $i18n = useI18n(); // 国际化多语言 i18n 实例
  const navigate = useNavigate(); // react-router navigate 导航实例
  const location = useLocation(); // 浏览器 location 实例

  $i18n.addLocale(locales); // 添加多语言词包

  return (
    <div className="page-container">
      <Card>{$i18n.t('pageDescription')}</Card>
    </div>
  );
};

export default App;

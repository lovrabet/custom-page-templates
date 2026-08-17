import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { useI18n } from '@/context/app-context';
import { locales } from '../locales';
import './index.css';

const metrics = [
  { key: 'projectCount', value: 24 },
  { key: 'completionRate', value: 86, suffix: '%' },
];

const App = () => {
  const $i18n = useI18n(); // 国际化多语言 i18n 实例

  $i18n.addLocale(locales); // 添加多语言词包

  return (
    <div className="page-container">
      <div className="page-content">
        <Row gutter={[16, 16]}>
          {metrics.map((metric) => (
            <Col key={metric.key} xs={24} sm={12}>
              <Card className="page-metric-card" size="small">
                <Statistic
                  title={$i18n.t(`metrics.${metric.key}`)}
                  value={metric.value}
                  suffix={metric.suffix}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

App.displayName = 'BlankTemplateApp';

export default App;

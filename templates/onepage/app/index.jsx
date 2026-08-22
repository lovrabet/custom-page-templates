import { useState } from "react";
import { Button, Card, ConfigProvider, Select, Tag, Typography } from "antd";
import {
  useI18n,
  useLocation,
  useNavigate,
  useSdkClient,
} from "@/context/app-context";
import { locales } from "../locales";
import "./index.css";

const { Text } = Typography;
const metrics = [
  { key: "historyAmount", value: "4,500", unit: "万元" },
  { key: "orderAmount", value: "502", unit: "万元" },
  { key: "opportunityCount", value: "12", unit: "条" },
  { key: "quotationCount", value: "5", unit: "条" },
];
const customerFields = [
  ["customer.name", "科技有限公司"],
  ["customer.id", "000001"],
  ["customer.level", "A级"],
  ["customer.type", "互联网"],
  ["customer.address", "浙江省/杭州市/余杭区/五常街道/***软件园 A6"],
];
const opportunities = [
  {
    id: "12321",
    name: "员工绩效系统改造项目",
    owner: "张明明",
    amount: "30,000",
    stage: "初步接触",
    color: "blue",
    fields: [
      ["opportunity.stage", "初步接触"],
      ["opportunity.customer", "科技有限公司"],
      ["opportunity.contact", "张明明"],
      ["opportunity.phone", "1808888****"],
      ["opportunity.amount", "30,000"],
      ["opportunity.currency", "CNY"],
      ["opportunity.rate", "50%"],
      ["opportunity.closeDate", "2026-05-30"],
      ["opportunity.source", "线索转化"],
      ["opportunity.createdAt", "2026-01-03 14:31:22"],
      ["opportunity.clue", "4523671"],
      ["opportunity.owner", "张明明"],
      ["opportunity.competitor", "云科技"],
      ["opportunity.updatedAt", "2026-01-05 14:31:22"],
    ],
    description:
      "客户计划由传统 KPI 考核切换为 OKR 管理模式，需要采购并实施一套新的绩效管理系统",
    notes: [
      {
        date: "2026-03-20 10:22:55",
        type: "电话",
        content: "了解客户需求，客户正在调研绩效管理系统市场并制定新的管理制度",
        followup: {
          summaryFields: [
            ["followup.id", "691"],
            ["followup.document", "OP-12321"],
            ["followup.customer", "科技有限公司"],
            ["followup.owner", "张明明"],
          ],
          infoFields: [
            ["followup.method", "电话"],
            ["followup.date", "2026-03-20 10:22:55"],
            [
              "followup.content",
              "了解客户需求，客户正在调研绩效管理系统市场并制定新的管理制度",
            ],
          ],
          planFields: [
            ["followup.nextDate", "2026-03-24"],
            ["followup.nextMethod", "线下会议"],
            ["followup.remark", "安排技术人员参与，确认系统迁移方案"],
          ],
        },
      },
      {
        date: "2026-03-16 14:02:30",
        type: "线下会议",
        content: "介绍系统能力与成功案例，客户表示还需要进一步研究管理制度",
        followup: {
          summaryFields: [
            ["followup.id", "690"],
            ["followup.document", "OP-12321"],
            ["followup.customer", "科技有限公司"],
            ["followup.owner", "张明明"],
          ],
          infoFields: [
            ["followup.method", "线下会议"],
            ["followup.date", "2026-03-16 14:02:30"],
            [
              "followup.content",
              "介绍系统能力与成功案例，客户表示还需要进一步研究管理制度",
            ],
          ],
          planFields: [
            ["followup.nextDate", "2026-03-20"],
            ["followup.nextMethod", "电话"],
            ["followup.remark", "收集客户对 OKR 管理模式的反馈"],
          ],
        },
      },
      {
        date: "2026-03-12 16:11:37",
        type: "电话",
        content: "管理层希望通过新的制度化管理提升员工积极性和目标管理效率",
        followup: {
          summaryFields: [
            ["followup.id", "689"],
            ["followup.document", "OP-12321"],
            ["followup.customer", "科技有限公司"],
            ["followup.owner", "张明明"],
          ],
          infoFields: [
            ["followup.method", "电话"],
            ["followup.date", "2026-03-12 16:11:37"],
            [
              "followup.content",
              "管理层希望通过新的制度化管理提升员工积极性和目标管理效率",
            ],
          ],
          planFields: [
            ["followup.nextDate", "2026-03-16"],
            ["followup.nextMethod", "线下会议"],
            ["followup.remark", "准备绩效管理案例与实施建议"],
          ],
        },
      },
    ],
  },
  {
    id: "12323",
    name: "积分兑换系统采购",
    owner: "张明明",
    amount: "52,000",
    stage: "方案制定",
    color: "purple",
    fields: [
      ["opportunity.stage", "方案制定"],
      ["opportunity.customer", "积分科技有限公司"],
      ["opportunity.contact", "张明明"],
      ["opportunity.phone", "1862688****"],
      ["opportunity.amount", "52,000"],
      ["opportunity.currency", "CNY"],
      ["opportunity.rate", "60%"],
      ["opportunity.closeDate", "2026-06-18"],
      ["opportunity.source", "线上咨询"],
      ["opportunity.createdAt", "2026-01-09 10:20:18"],
      ["opportunity.clue", "4523672"],
      ["opportunity.owner", "张明明"],
      ["opportunity.competitor", "叮咚科技"],
      ["opportunity.updatedAt", "2026-01-12 16:45:03"],
    ],
    description:
      "客户拟升级会员积分体系，需要建设积分兑换商城，并与现有会员系统打通",
    notes: [
      {
        date: "2026-03-21 14:30:18",
        type: "视频会议",
        content: "确认积分兑换商品范围，并沟通与现有会员系统的接口方案",
        followup: {
          summaryFields: [
            ["followup.id", "692"],
            ["followup.document", "OP-12323"],
            ["followup.customer", "积分科技有限公司"],
            ["followup.owner", "张明明"],
          ],
          infoFields: [
            ["followup.method", "视频会议"],
            ["followup.date", "2026-03-21 14:30:18"],
            [
              "followup.content",
              "确认积分兑换商品范围，并沟通与现有会员系统的接口方案",
            ],
          ],
          planFields: [
            ["followup.nextDate", "2026-03-26"],
            ["followup.nextMethod", "电话"],
            ["followup.remark", "整理方案与报价，确认接口对接范围"],
          ],
        },
      },
    ],
  },
];
const quotations = [
  {
    id: "12321",
    code: "BJ-20240901-095",
    date: "2026-03-18",
    amount: "30,000",
    status: "已发送",
    color: "blue",
  },
  {
    id: "12323",
    code: "BJ-20240833-012",
    date: "2026-03-20",
    amount: "52,000",
    status: "已接受",
    color: "green",
  },
];

const FollowupInfoList = ({ fields }) => {
  const $i18n = useI18n();

  return (
    <dl className="crm-info-list">
      {fields.map(([label, value]) => (
        <div key={label}>
          <dt>{$i18n.t(label)}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
};

const CustomerColumn = () => {
  const $i18n = useI18n();

  return (
    <aside className="crm-column">
      <Card className="crm-panel crm-customer-card" variant="borderless">
        <Select
          className="crm-customer-card__select"
          defaultValue="default"
          options={[{ label: $i18n.t("customer.nameValue"), value: "default" }]}
        />
        <div className="crm-tag-row">
          <Tag color="cyan" variant="solid">
            {$i18n.t("customer.active")}
          </Tag>
          <Tag color="blue" variant="solid">
            {$i18n.t("customer.levelValue")}
          </Tag>
        </div>
        <div className="crm-customer-card__contact">
          <Text type="secondary">{$i18n.t("customer.primaryContact")}</Text>
          <span>张明明</span>
        </div>
      </Card>
      <Card className="crm-metric-panel crm-panel" variant="borderless">
        {metrics.map((metric) => (
          <div className="crm-metric-card" key={metric.key}>
            <Text>{$i18n.t(`metrics.${metric.key}`)}</Text>
            <div className="crm-metric-card__value">
              {metric.value}
              <span className="crm-metric-card__unit">{metric.unit}</span>
            </div>
          </div>
        ))}
      </Card>
      <Card
        className="crm-panel"
        title={$i18n.t("customer.title")}
        variant="borderless"
      >
        <FollowupInfoList fields={customerFields} />
      </Card>
    </aside>
  );
};

const RecordCard = ({ item, onClick, selected, quotation }) => {
  const $i18n = useI18n();

  return (
    <article
      className={`crm-record-card ${selected ? "is-selected" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="crm-record-card__top">
        <Text type="secondary">ID：{item.id}</Text>
        <Tag color={item.color}>{quotation ? item.status : item.stage}</Tag>
      </div>
      <div className="crm-record-card__title">
        {quotation ? item.code : item.name}
      </div>
      <div className="crm-record-card__bottom">
        <span>
          {quotation ? item.date : `${$i18n.t("related.owner")}：${item.owner}`}
        </span>
        <span className="crm-record-card__amount">￥{item.amount}</span>
      </div>
    </article>
  );
};

const RelatedColumn = ({ onSelectOpportunity, selectedOpportunityId }) => {
  const $i18n = useI18n();
  const [selectedQuotationId, setSelectedQuotationId] = useState(
    quotations[0]?.id,
  );

  return (
    <section className="crm-column">
      <Card
        className="crm-panel crm-record-panel"
        extra={
          <Button ghost size="small" type="primary">
            {$i18n.t("actions.add")}
          </Button>
        }
        title={$i18n.t("related.opportunities")}
        variant="borderless"
      >
        {opportunities.map((item) => (
          <RecordCard
            item={item}
            key={item.id}
            onClick={() => onSelectOpportunity(item)}
            selected={item.id === selectedOpportunityId}
          />
        ))}
      </Card>
      <Card
        className="crm-panel crm-record-panel"
        title={$i18n.t("related.quotations")}
        variant="borderless"
      >
        {quotations.map((item) => (
          <RecordCard
            item={item}
            key={item.id}
            onClick={() => setSelectedQuotationId(item.id)}
            quotation
            selected={item.id === selectedQuotationId}
          />
        ))}
      </Card>
    </section>
  );
};

const OpportunityColumn = ({ onSelectNote, opportunity, selectedNoteDate }) => {
  const $i18n = useI18n();
  return (
    <section className="crm-column crm-column--main">
      <Card
        className="crm-panel"
        extra={
          <div className="crm-panel-actions">
            <Button size="small">{$i18n.t("actions.refresh")}</Button>
            <Button ghost size="small" type="primary">
              {$i18n.t("actions.confirm")}
            </Button>
          </div>
        }
        title={$i18n.t("opportunity.basicInfo")}
        variant="borderless"
      >
        <div className="crm-opportunity-title">
          <Text type="secondary">{$i18n.t("opportunity.name")}</Text>
          <span className="crm-opportunity-title__name">
            {opportunity.name}
          </span>
          <Text type="secondary">{$i18n.t("opportunity.id")}</Text>
          <span className="crm-opportunity-title__id">{opportunity.id}</span>
        </div>
        <div
          className="crm-stage-bar"
          aria-label={$i18n.t("opportunity.stage")}
        >
          {["初步接触", "需求确认", "方案制定", "合同签约"].map((stage) => (
            <span
              className={stage === opportunity.stage ? "is-current" : ""}
              key={stage}
            >
              {stage}
            </span>
          ))}
        </div>
        <dl className="crm-info-list crm-info-list--two-column">
          {opportunity.fields.map(([label, value]) => (
            <div key={label}>
              <dt>{$i18n.t(label)}</dt>
              <dd>
                {label === "opportunity.clue" ? (
                  <a className="crm-info-link" href="#clue-4523671">
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <div className="crm-description">
          <Text type="secondary">{$i18n.t("opportunity.description")}</Text>
          <p>{opportunity.description}</p>
        </div>
      </Card>
      <Card
        className="crm-note-panel crm-panel"
        extra={
          <Button ghost size="small" type="primary">
            {$i18n.t("actions.addNote")}
          </Button>
        }
        title={`${$i18n.t("notes.title")}（${opportunity.notes.length}）`}
        variant="borderless"
      >
        {opportunity.notes.map((note) => (
          <article
            className={`crm-note-card ${note.date === selectedNoteDate ? "is-active" : ""}`}
            key={note.date}
            onClick={() => onSelectNote(note)}
            role="button"
            tabIndex={0}
          >
            <div className="crm-note-card__top">
              <Text type="secondary">{note.date}</Text>
              <Tag color="blue">{note.type}</Tag>
            </div>
            <p>{note.content}</p>
            <Text type="secondary">{$i18n.t("notes.owner")}：</Text>
            <span className="crm-note-card__owner">张明明</span>
          </article>
        ))}
      </Card>
    </section>
  );
};

const FollowupColumn = ({ note }) => {
  const $i18n = useI18n();
  const { followup } = note;

  return (
    <aside className="crm-column">
      <Card
        className="crm-panel"
        title={$i18n.t("followup.title")}
        variant="borderless"
      >
        <FollowupInfoList fields={followup.summaryFields} />
        <span className="crm-followup-panel__subtitle">
          {$i18n.t("followup.info")}
        </span>
        <FollowupInfoList fields={followup.infoFields} />
        <span className="crm-followup-panel__subtitle">
          {$i18n.t("followup.plan")}
        </span>
        <FollowupInfoList fields={followup.planFields} />
        <Button block className="crm-calendar-button" type="primary">
          {$i18n.t("actions.addCalendar")}
        </Button>
      </Card>
    </aside>
  );
};

const CrmPage = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState(
    opportunities[0],
  );
  const [selectedNote, setSelectedNote] = useState(
    () => opportunities[0].notes[0],
  );

  const selectOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setSelectedNote();
  };

  return (
    <main className="crm-page onepage-theme">
      <CustomerColumn />
      <RelatedColumn
        onSelectOpportunity={selectOpportunity}
        selectedOpportunityId={selectedOpportunity.id}
      />
      <OpportunityColumn
        onSelectNote={setSelectedNote}
        opportunity={selectedOpportunity}
        selectedNoteDate={selectedNote?.date}
      />
      {selectedNote && <FollowupColumn note={selectedNote} />}
    </main>
  );
};

const OnePage = () => {
  const client = useSdkClient();
  const $i18n = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  $i18n.addLocale(locales);

  return (
    <ConfigProvider
      theme={{
        cssVar: { key: "onepage-theme" },
        token: { colorPrimary: "#384cc0" },
      }}
    >
      <CrmPage />
    </ConfigProvider>
  );
};

export default OnePage;

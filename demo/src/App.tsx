import React, { useState } from 'react';
import { ConfigProvider, Button, theme } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { PREATabs } from '@prea';
import type { PREATabItem } from '@prea';

let tabCounter = 7;

/** Tab panel content — uses live theme tokens so text color follows light/dark mode */
function TabContent({ title, body }: { title: string; body: string }) {
  const { token } = theme.useToken();
  return (
    <div style={{ padding: 16 }}>
      <h4 style={{ margin: '0 0 8px 0', color: token.colorText, fontSize: token.fontSizeLG, fontWeight: 600 }}>
        {title}
      </h4>
      <p style={{ margin: 0, color: token.colorTextSecondary, fontSize: token.fontSize }}>
        {body}
      </p>
    </div>
  );
}

const initialItems: PREATabItem[] = [
  { key: '1', label: 'Dashboard Overview',       children: <TabContent title="Dashboard"     body="This is the Dashboard tab content." /> },
  { key: '2', label: 'Analytics & Reports',      children: <TabContent title="Analytics"     body="This is the Analytics tab content." /> },
  { key: '3', label: 'Settings — Configuration', children: <TabContent title="Settings"      body="This is the Settings tab content." /> },
  { key: '4', label: 'User Management',          children: <TabContent title="Users"         body="This is the User Management tab content." /> },
  { key: '5', label: 'Notifications',            children: <TabContent title="Notifications" body="This is the Notifications tab content." /> },
  { key: '6', label: 'Billing & Invoices',       children: <TabContent title="Billing"       body="This is the Billing tab content." /> },
];

function DemoApp({ isDark, setIsDark }: { isDark: boolean; setIsDark: (v: boolean) => void }) {
  const { token } = theme.useToken();
  const [items, setItems] = useState<PREATabItem[]>(initialItems);
  const [activeKey, setActiveKey] = useState('1');

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      const newKey = String(tabCounter++);
      setItems((prev) => [
        ...prev,
        {
          key: newKey,
          label: `New Tab ${newKey}`,
          children: <TabContent title={`New Tab ${newKey}`} body={`Content for tab ${newKey}.`} />,
        },
      ]);
      setActiveKey(newKey);
    } else {
      setItems((prev) => {
        const next = prev.filter((item) => item.key !== targetKey);
        if (activeKey === targetKey && next.length > 0) {
          setActiveKey(next[next.length - 1].key);
        }
        return next;
      });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: token.colorBgLayout, transition: 'background 0.3s ease' }}>
      {/* Tabs sit flush at the top */}
      <PREATabs
        items={items}
        activeKey={activeKey}
        onChange={setActiveKey}
        onEdit={onEdit}
      />

      {/* Light / Dark toggle — fixed bottom-left */}
      <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 1000 }}>
        <Button
          icon={isDark ? <SunOutlined /> : <MoonOutlined />}
          onClick={() => setIsDark(!isDark)}
          style={{
            background: token.colorBgContainer,
            borderColor: token.colorBorder,
            color: token.colorText,
            boxShadow: token.boxShadow,
          }}
        >
          {isDark ? 'Light mode' : 'Dark mode'}
        </Button>
      </div>
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: isDark
          ? {
              // Exact dark palette specified by user:
              // #303030 — active tab bg + content panel (colorBgContainer)
              // #1B1B1B — tab bar bg + outer container (colorFillQuaternary / colorFillTertiary)
              colorBgContainer:    '#303030',
              colorFillQuaternary: '#1b1b1b',
              colorFillTertiary:   '#1b1b1b',
              colorFillSecondary:  '#383838',  // tab hover bg (darker)
              colorFill:           '#555555',
              colorBgLayout:       '#141414',
              colorBgElevated:     '#3a3a3a',
              colorBorder:         '#3d3d3d',
              colorBorderSecondary:'#2a2a2a',
            }
          : {},
      }}
    >
      <DemoApp isDark={isDark} setIsDark={setIsDark} />
    </ConfigProvider>
  );
}

import React from 'react';
import { Select, Space } from 'antd';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  onChange: (value: string) => void;
};

const SelectTag: React.FC<Props> = ({ options, onChange }) => (
  <Space wrap>
    <Select
      defaultValue="태그 선택"
      style={{ width: 120 }}
      onChange={onChange}
      options={options}
    />
  </Space>
);

export default SelectTag;
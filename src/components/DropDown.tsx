import { Dropdown, Space } from "antd";
import { getRelativeLocaleUrl } from "astro:i18n";
import Styles from "./DropDown.module.css";
import { DownOutlined } from "@ant-design/icons";

interface Props {
  data: {
    label: string;
    url: string;
    items?: { label: string; url: string }[];
  };
}

const DD = ({ data }: Props) => {
  const items = data.items?.map(({ label, url }, i) => ({
    key: i,
    label: <a href={getRelativeLocaleUrl("en", url)}>{label}</a>,
  }));

  return (
    <Dropdown menu={{ items }}>
      <a className={Styles.link} href={getRelativeLocaleUrl("en", data.url)}>
        <Space>
          {data.label}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DD;

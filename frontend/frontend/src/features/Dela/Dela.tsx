import { SearchOutlined } from "@ant-design/icons";
import { Button, Collapse, Space } from "antd";
import { FC } from "react";
import { VerstkaTest } from "../VerstkaTests/VerstkaTests";

const { Panel } = Collapse;

export const Dela: FC = () => {

  return (<>
    <Space style={{width: "500px"}} direction="vertical">
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel showArrow={false} header={<Button shape="circle" icon={<SearchOutlined />} />} key="1">
          {/* <VerstkaTest /> */}
          qweqwe
        </Panel>
        <Panel showArrow={false} header={<Button shape="circle" icon={<SearchOutlined />} />} key="2">
          {"dfg"}
        </Panel>
        <Panel showArrow={false} header={<Button shape="circle" icon={<SearchOutlined />} />} key="3">
          {"asd"}
        </Panel>
      </Collapse>

      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel showArrow={false} header={<Button shape="circle" icon={<SearchOutlined />} />} key="1">
          {/* <VerstkaTest /> */}
          sas
        </Panel>
        <Panel showArrow={false} header={<Button shape="circle" icon={<SearchOutlined />} />} key="2">
          {"dfg"}
        </Panel>
        <Panel showArrow={false} header={<Button shape="circle" icon={<SearchOutlined />} />} key="3">
          {"asd"}
        </Panel>
      </Collapse>
    </Space>
  </>)
}
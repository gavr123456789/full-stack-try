import { Button, Card, Col, Divider, Row } from "antd"
import { FC } from "react"

export const VerstkaTest: FC = () => {

  return (<>
    <Divider orientation="left">2 - 1 - 2</Divider>
    <Row>
      <Col span={12} style={{ backgroundColor: "cyan" }} >2</Col>
      <Col span={12} style={{ backgroundColor: "blue" }} >2</Col>
    </Row>
    <Row>
      <Col span={24} style={{ backgroundColor: "red" }} >1</Col>
    </Row>
    <Row>
      <Col span={12} style={{ backgroundColor: "cyan" }} >2</Col>
      <Col span={12} style={{ backgroundColor: "blue" }} >2</Col>
    </Row>

    <Divider orientation="left">Flex rest</Divider>
    <Row gutter={10}>
      <Col flex="none" style={{ backgroundColor: "cyan" }}> <Button> sas </Button> </Col>
      <Col flex="auto" style={{ backgroundColor: "red" }}> <Button style={{ width: "100%" }}> Fill Rest </Button> </Col>
      <Col flex="none" style={{ backgroundColor: "cyan" }}> <Button> sas </Button> </Col>
    </Row>

    <Divider orientation="left">With cards</Divider>
    <Row gutter={10}>
      <Col span={12} style={{ backgroundColor: "cyan" }} >
        <Card> sas </Card>
      </Col>
      <Col span={12} style={{ backgroundColor: "blue" }} >
        <Card> sas </Card>

      </Col>
    </Row>
    <Row gutter={10}>
      <Col span={24} style={{ backgroundColor: "red" }} >
        <Card> sas </Card>
      </Col>
    </Row>
    <Row gutter={10}>
      <Col span={12} style={{ backgroundColor: "cyan" }} >
        <Card> sas </Card>
      </Col>
      <Col span={12} style={{ backgroundColor: "blue" }} >
        <Card> sas </Card>
      </Col>
    </Row>
  </>)
}
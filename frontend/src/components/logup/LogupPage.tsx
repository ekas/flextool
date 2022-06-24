import { Button, Col, Form, Input, Row, Typography } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.svg";
import { FC } from "react";
import "./index.less";
import { Link } from "react-router-dom";

type LogupProps = {};

export const LogupPage: FC<LogupProps> = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Row className="logupContainer">
        <Col span={24} className="logupWrapper">
          <div className="logupFormContainer">
            <img src={logo} alt="Logo" />
            <Typography.Text className="loginHeading">
              Welcome, Let’s get you set up
            </Typography.Text>
            <Typography.Text className="logupSubHeading">
              If you are already using FlexTool, you can{" "}
              <Link className="anchorLinkStyle" to="/login">
                Sign in
              </Link>
              .
            </Typography.Text>
            <Form
              name="normal_login"
              className="logupForm"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                className="logupFormItem"
                name="first_name"
                rules={[
                  { required: true, message: "Please input your First Name!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  type="text"
                  placeholder="First Name"
                />
              </Form.Item>
              <Form.Item
                className="logupFormItem"
                name="last_name"
                rules={[
                  { required: true, message: "Please input your Last Name!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  type="text"
                  placeholder="Last Name"
                />
              </Form.Item>
              <Form.Item
                className="loginFormItem"
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  type="email"
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                className="logupFormItem"
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="logupFormBtn"
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

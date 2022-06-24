import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { LockOutlined, MailOutlined, GoogleOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.svg";
import { FC } from "react";
import "./index.css";

type LoginProps = {};

export const LoginPage: FC<LoginProps> = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Row className="loginContainer">
        <Col span={24} className="loginWrapper">
          <div className="loginFormContainer">
            <img src={logo} alt="Logo" />
            <h1 className="loginHeading">Welcome</h1>
            <h4 className="loginSubHeading">
              Need to create a new acount?{" "}
              <a className="anchorLinkStyle" href="/logup">
                Sign up
              </a>{" "}
              here.
            </h4>
            <Button
              type="primary"
              htmlType="submit"
              className="loginFormBtn loginFormBtnGoogle"
            >
              <GoogleOutlined style={{ fontSize: "20px", marginTop: "2px" }} />{" "}
              <span> Sign in with Google</span>
            </Button>

            <Form
              name="normal_login"
              className="loginForm"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
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
                className="loginFormItem"
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
              <div className="loginFormItemForget">
                <Checkbox>Remember me</Checkbox>
                <a className="anchorLinkStyle" href="/">
                  Forgot password
                </a>
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="loginFormBtn"
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

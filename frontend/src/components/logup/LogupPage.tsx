import { Button, Col, Form, Input, Row, Typography } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.svg";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_SIGNUP } from "queries/auth.query";
import { toast } from "react-toastify";

import "./index.less";

type LogupProps = {};

export const LogupPage: FC<LogupProps> = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [userSignUp] = useMutation(USER_SIGNUP, {
    onCompleted: (QueryData) => {
      toast.success("Signed Up successfully! Please login to continue");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
              onFinish={() => userSignUp({ variables: { ...data } })}
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
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
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
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
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
                  onChange={(e) => setData({ ...data, email: e.target.value })}
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
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
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

import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import { LockOutlined, MailOutlined, GoogleOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.svg";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.less";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "queries/auth.query";
import useLocalStorage from "hooks/useLocalStorage";
import { toast } from "react-toastify";

type LoginProps = {};

export const LoginPage: FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setAccessToken] = useLocalStorage<string | null>("auth", null);

  const [userLogin] = useMutation(USER_LOGIN, {
    onCompleted: (QueryData) => {
      setAccessToken(QueryData.login.accessToken);
      toast.success("Login successful");
      navigate("/pages");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <Row className="loginContainer">
        <Col span={24} className="loginWrapper">
          <div className="loginFormContainer">
            <img src={logo} alt="Logo" />
            <Typography.Text className="loginHeading">Welcome</Typography.Text>
            <Typography.Text className="loginSubHeading">
              Need to create a new acount?{" "}
              <Link className="anchorLinkStyle" to="/logup">
                Sign up
              </Link>{" "}
              here.
            </Typography.Text>
            <Button
              type="primary"
              htmlType="submit"
              className="loginFormBtn loginFormBtnGoogle"
            >
              <GoogleOutlined style={{ fontSize: "20px", marginTop: "2px" }} />{" "}
              <span> Sign in with Google</span>
            </Button>
            <Divider plain className="loginDivider">
              or
            </Divider>
            <Form
              name="flextool_login"
              className="loginForm"
              initialValues={{ remember: true }}
              onFinish={() =>
                userLogin({ variables: { email: email, password: password } })
              }
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <div className="loginFormItemForget">
                <Checkbox>Remember me</Checkbox>
                <Link className="anchorLinkStyle" to="/">
                  Forgot password
                </Link>
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="loginFormBtn"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

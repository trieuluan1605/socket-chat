import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input, Button, Card } from "@nextui-org/react";

interface LoginFormProps {
  onLogin: (form: { username: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [form, setForm] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, username: event.target.value });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: event.target.value });
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.username.trim() && form.password.trim()) {
      onLogin(form);
    }
  };

  return (
    <Card style={{ maxWidth: "400px", padding: "20px", margin: "20px auto" }}>
      <h4 style={{ marginBottom: "10px" }}>Login</h4>
      <form onSubmit={handleLogin}>
        <Input
          fullWidth
          isClearable
          color="primary"
          placeholder="Enter your username..."
          size="lg"
          style={{ marginBottom: "10px" }}
          value={form.username}
          onChange={handleUsernameChange}
        />
        <Input
          fullWidth
          isClearable
          color="primary"
          placeholder="Enter your password..."
          size="lg"
          style={{ marginBottom: "10px" }}
          type="password"
          value={form.password}
          onChange={handlePasswordChange}
        />
        <Button color="primary" type="submit">
          Login
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;

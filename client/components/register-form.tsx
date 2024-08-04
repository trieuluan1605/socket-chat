import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input, Button, Card } from "@nextui-org/react";

interface RegisterFormProps {
  onRegister: (form: { username: string; password: string }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
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

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.username.trim() && form.password.trim()) {
      onRegister(form);
    }
  };

  return (
    <Card style={{ maxWidth: "400px", padding: "20px", margin: "20px auto" }}>
      <h4 style={{ marginBottom: "10px" }}>Register</h4>
      <form onSubmit={handleRegister}>
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
          Register
        </Button>
      </form>
    </Card>
  );
};

export default RegisterForm;

import { isUserExist, signupUser } from "@/api/auth/signup/queries";
import { SignupRequest, SignupResponse } from "@/api/auth/signup/types";

async function handler(req: SignupRequest, res: SignupResponse) {
  if (req.method !== "POST") {
    res.status(400).json({ error_message: "Bad Request" });
    return;
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(500).json({ error_message: "Invalid input" });
    return;
  }

  const is_exist = await isUserExist(email);
  if (is_exist) {
    res.status(400).json({ error_message: "User already exists" });
    return;
  }

  const { is_success } = await signupUser(name, email, password);
  if (is_success) {
    res.status(201).json({ is_success: true });
    return;
  }

  res.status(500).json({ error_message: "Failed to signup" });
}

export { handler as signupHandler };

import { z } from 'zod';
import { Box, Button } from '@mui/material';
import { Form, Input, useForm } from '@repo/forms';
import { useAuth } from '~/providers/AuthProvider';
import { login } from '~/queries/authentication/login';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
      "Email must be a valid format and end in '.com'",
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character',
    ),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const { auth } = useAuth();

  const form = useForm<FormValues>({
    mode: 'onChange',
    schema: formSchema,
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: (data) => login({ ...data, auth }),
  });

  return (
    <Form form={form}>
      <Box sx={{ display: 'flex', gap: 2, my: 1 }}>
        <Input<FormValues>
          name="email"
          type="text"
          label="Email address"
          fullWidth
        />
        <Input<FormValues>
          name="password"
          type="text"
          label="Password"
          fullWidth
        />
        <Button type="submit">Login</Button>
      </Box>
    </Form>
  );
}

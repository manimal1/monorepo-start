import { z } from 'zod';
import { Box, Button } from '@mui/material';
import { Form, Input, Select, useForm } from '@repo/forms';
import { signup } from '~/queries/authentication/signup';
import { useAuth } from '~/providers/AuthProvider';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['business', 'customer'], {
    errorMap: () => ({
      message: "Type must be either 'business' or 'customer'",
    }),
  }),
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

const typeOptions: {
  label: string;
  value: string;
}[] = [
  {
    value: 'business',
    label: 'business',
  },
  {
    value: 'customer',
    label: 'customer',
  },
];

export function SignupForm() {
  const { auth } = useAuth();

  const form = useForm<FormValues>({
    mode: 'onChange',
    schema: formSchema,
    defaultValues: {
      firstName: '',
      lastName: '',
      name: '',
      type: 'business',
      email: '',
      password: '',
    },
    onSubmit: (data) => signup({ ...data, auth }),
  });

  return (
    <Form form={form}>
      <Box className="flex flex-col items-start justify-start gap-6">
        <Select<FormValues>
          name="type"
          options={typeOptions}
          label="Are you a business or customer?"
        />
        <Input<FormValues>
          name="name"
          type="text"
          label="Name of your business"
          fullWidth
        />
        <Input<FormValues>
          name="firstName"
          type="text"
          label="User first name"
          fullWidth
        />
        <Input<FormValues>
          name="lastName"
          type="text"
          label="User last name"
          fullWidth
        />
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
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </Box>
    </Form>
  );
}

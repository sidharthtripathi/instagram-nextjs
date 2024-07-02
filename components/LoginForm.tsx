'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export function LoginForm() {
  const { toast } = useToast();
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Welcome back! Sign in to connect</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Email or Username</Label>
          <Input
            required
            id="email"
            type="email"
            placeholder="peduarte@gmail.com"
            value={loginForm.identifier}
            onChange={(e) => {
              setLoginForm((p) => {
                return {
                  ...p,
                  identifier: e.target.value
                };
              });
            }}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            required
            id="password"
            type="password"
            placeholder="********"
            value={loginForm.password}
            onChange={(e) => {
              setLoginForm((p) => {
                return {
                  ...p,
                  password: e.target.value
                };
              });
            }}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            setLoading(true);
            fetch('/api/login', {
              method: 'POST',
              body: JSON.stringify(loginForm)
            })
              .then((res) => {
                if (res.status === 200) {
                  res.json().then((payload) => {
                    localStorage.setItem('username', payload.username);
                    localStorage.setItem('email', payload.email);
                    router.push('/');
                  });
                  router.push('/');
                } else if (res.status !== 200) {
                  toast({
                    title: res.statusText,
                    description: 'Invalid Credentials',
                    variant: 'destructive'
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          disabled={
            loading || loginForm.identifier === '' || loginForm.password === ''
          }
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}

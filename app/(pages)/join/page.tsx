import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LoginForm } from '@/components/LoginForm';
import { SignupForm } from '@/components/SignupForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
export default function Component() {
  return (
    <div className='m-auto w-[400px]'>
      <Tabs defaultValue="login" >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <SignupForm />
        </TabsContent>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
      </Tabs>
      <Alert >
        <Terminal className="h-4 w-4" />
        <AlertTitle>Demo Acccount Credentials</AlertTitle>
        <AlertDescription>
          <p>username: {process.env.DEMO_USER}</p>
          <p>password: {process.env.DEMO_PASSWORD}</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export function AccountForm() {
  // const []
  return (
    <Tabs defaultValue="login" className="w-[400px] m-auto">
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
  );
}

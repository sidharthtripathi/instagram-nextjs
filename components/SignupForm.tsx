'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useToast } from './ui/use-toast';
import {signupSchema} from '@/schema/account'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { server } from '@/lib/axios';
import { AxiosError } from 'axios';
type TSignupSchema = z.infer<typeof signupSchema>
export function SignupForm() {
  const { toast } = useToast();
  const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<TSignupSchema>({resolver : zodResolver(signupSchema)})
  async function onSubmit(data : TSignupSchema){
    try {
      await server.post('/api/signup',data)
      toast({title : "Account Created",description: "You can now login into  your account"})
    } catch (error) {
      if(error instanceof AxiosError) toast({title : error.response?.data.msg,variant : 'destructive'})
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Capture & share your story. Get started now.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            {...register("name")}
            id="name"
            placeholder="Pedro Duarte"
          />
          {errors.name && <p className='text-xs text-destructive'>{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            {...register("username")}
            placeholder="pedro"
          />
          {errors.username && <p className='text-xs text-destructive'>{errors.username.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            type="email"
            placeholder="peduarte@gmail.com"
          />
          {errors.email && <p className='text-xs text-destructive'>{errors.email.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="********"
          />
          {errors.password && <p className='text-xs text-destructive'>{errors.password.message}</p>}
        </div>
        <Button type='submit' className='mt-4' disabled = {isSubmitting}>submit</Button>
        </form>
      </CardContent>

    </Card>
  );
}

'use client';
import type { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cross1Icon, ImageIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useState } from 'react';
import { toast, useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { postSchema } from '@/schema/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { server } from '@/lib/axios';
type TPostFormSchema = z.infer<typeof postSchema>;
export default function PostUploader() {
  const [imgUrl, setImgUrl] = useState<undefined | string>(undefined);
  const [file, setFile] = useState<File | null>(null);
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setImgUrl(URL.createObjectURL(file));
      setFile(file);
    }
  }
  async function onSubmit(data: TPostFormSchema) {
    try {
      const { data: resData } = await server.post('/api/posts', data);
      const { signedUrl } = resData;
      await server.put(signedUrl, file);
      reset();
      setImgUrl(undefined);
      setFile(null);
      toast({ title: 'Post created' });
    } catch (error) {
      toast({ title: 'something went wrong', variant: 'destructive' });
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TPostFormSchema>({ resolver: zodResolver(postSchema) });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
        disabled={isSubmitting}
      />
      {imgUrl && <img src={imgUrl} />}
      <Input
        type="text"
        placeholder="Enter your caption"
        {...register('caption')}
        disabled={isSubmitting}
      />
      {errors.caption && (
        <p className="text-xs text-destructive">{errors.caption.message}</p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}

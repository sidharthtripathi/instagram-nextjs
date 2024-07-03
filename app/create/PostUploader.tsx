'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cross1Icon, ImageIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export default function PostUploader() {
  const { toast } = useToast();
  const [img, setImg] = useState<undefined | string>(undefined);
  const [file, setFile] = useState<null | File>(null);
  const [caption, setCaption] = useState('');
  const [formDisable, setFormDisability] = useState(false);
  return (
    <form>
      <fieldset
        disabled={formDisable}
        className="container flex flex-col items-center justify-center gap-y-4"
      >
        {img ? (
          <div className="relative">
            <Image
              src={img}
              alt=""
              className="relative size-64 object-contain"
              width={64}
              height={64}
            />
            <button
              className="absolute right-2 top-2"
              onClick={() => {
                setImg(undefined);
              }}
            >
              <Cross1Icon />
            </button>
          </div>
        ) : (
          <div className="relative size-64">
            <ImageIcon className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2" />
            <input
              type="file"
              className="absolute h-full w-full opacity-0"
              onChange={(e) => {
                // @ts-ignore
                setImg(URL.createObjectURL(e.target.files[0]));
                // @ts-ignore
                setFile(e.target.files[0]);
              }}
            />
          </div>
        )}
        <div className="flex gap-4">
          <Input
            placeholder="Caption your post..."
            type="text"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
          <Button
            disabled={!caption || !img}
            onClick={() => {
              setFormDisability(true);
              fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify({ caption })
              })
                .then((res) => res.json())
                .then((res) => {
                  const { signedUrl } = res;

                  fetch(signedUrl, {
                    method: 'PUT',
                    body: file
                  })
                    .then((res) => console.log(res.status))
                    .catch((err) => console.log(err))
                    .finally(() => {
                      setCaption('');
                      setImg(undefined);
                      setFormDisability(false);
                      toast({
                        title: 'The Post was created'
                      });
                    });
                })
                .catch((err) => console.log(err));
            }}
          >
            Submit
          </Button>
        </div>
      </fieldset>
    </form>
  );
}

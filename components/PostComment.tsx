'use client';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from './ui/use-toast';
import Comment from './Comment';
export default function PostComment() {
  const pathname = useParams();
  const path = pathname.postId;
  const { toast } = useToast();
  const [commentsArr, addComments] = useState<
    {
      comment: string;
      id: string;
      author: {
        name: string;
        username: string;
        avatar: string;
      };
    }[]
  >([]);
  const [comment, updateComment] = useState('');
  const [disabled, setDisabled] = useState(false);

  return (
    <section className="space-y-4">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <form className="grow">
          <fieldset className="flex-1 space-y-2" disabled={disabled}>
            <Textarea
              value={comment}
              onChange={(e) => {
                updateComment(e.target.value);
              }}
              placeholder="Add a comment..."
              className="rounded-md border border-neutral-300 p-2 text-sm focus:border-primary focus:ring-primary"
            />
            <Button
              className="ml-auto"
              size={'sm'}
              disabled={!comment}
              onClick={(e) => {
                e.preventDefault();
                setDisabled(true);
                fetch('/api/comments', {
                  method: 'POST',
                  body: JSON.stringify({
                    postId: path,
                    comment
                  })
                })
                  .then((res) => {
                    if (res.status != 201) {
                      toast({
                        title: 'Oops',
                        description: 'Something went wrong'
                      });
                    } else {
                      toast({
                        title: 'Created'
                      });
                    }
                    return res.json() as unknown as {
                      comment: string;
                      id: string;
                      author: {
                        name: string;
                        username: string;
                        avatar: string;
                      };
                    };
                  })
                  .then((res) => {
                    addComments((comments) => {
                      return [
                        {
                          comment: res.comment,
                          id: res.id,
                          author: {
                            name: res.author.name,
                            username: res.author.username,
                            avatar: res.author.avatar
                          }
                        },
                        ...comments
                      ];
                    });
                  })
                  .finally(() => {
                    updateComment('');
                    setDisabled(false);
                  });
              }}
            >
              Post
            </Button>
          </fieldset>
        </form>
      </div>
      <div className="space-y-4">
        {commentsArr.map((comment) => (
          <Comment
            id={comment.id}
            repliesCount={0}
            content={comment.comment}
            avatar={comment.author.avatar}
            name={comment.author.name}
            key={comment.id}
            username={comment.author.username}
          />
        ))}
      </div>
    </section>
  );
}

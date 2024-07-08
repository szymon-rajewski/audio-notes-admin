import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardHeader } from '../ui/Card/CardHeader';
import { CardTitle } from '../ui/Card/CardTitle';
import { CardDescription } from '../ui/Card/CardDescription';
import { CardContent } from '../ui/Card/CardContent';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InputWithLabel } from '../ReusableElements/InputWithLabel';
import { useNavigate } from 'react-router-dom';
import ResizableTextareaField from '../Form/ResizableTextareaField';
import { useAuth } from '../AuthenticationContextProvider';
import { format } from 'date-fns';
import { useToast } from '../ui/Toast/UseToast';
import { Button } from '../ui/Button';
import { CardFooter } from '../ui/Card/CardFooter';

type SupportFormField = {
  title: string;
  description: string;
};

const schema = z.object({
  title: z
    .string()
    .min(1, { message: 'You need to pass title of the message' }),
  description: z
    .string()
    .min(1, { message: 'You need to describe your problem for us' }),
});

const SupportForm = ({ header, team }: { header: string; team: string }) => {
  const { userId } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    control,
    setError,
    formState: { errors },
  } = useForm<SupportFormField>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SupportFormField> = async (data) => {
    if (Object.keys(errors).length) {
      try {
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy-MM-dd');
        const formattedTime = format(currentDate, 'HH:mm');

        await schema.parseAsync(data);

        const message = {
          ...data,
          sentTime: formattedDate + ' ' + formattedTime,
        };
        // await new MessageApi().send(userId, {
        //   title: message.title,
        //   description: message.description,
        //   sentTime: message.sentTime,
        // });
        toast({
          title: 'Success',
          description: 'Message sent',
        });
      } catch (errors) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Please try again in few moments or contact support',
        });
        console.error(errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{header}</CardTitle>
        <CardDescription>
          {t('support.supportMsg1')} <span>{team} </span>
          {t('support.supportMsg2')}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="grid w-full items-center ">
          <InputWithLabel
            placeholder={t('support.title')}
            register={register}
            name="title"
            errors={errors}
            id="title"
            label={t('support.title')}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: 'You need to describe your problem for us' }}
            render={({ field: { value, onChange } }) => (
              <ResizableTextareaField
                value={value}
                placeholder={t('support.descriptionMsg')}
                label={t('support.description')}
                onChange={(text) => {
                  onChange(text);
                }}
                error={errors?.description?.message || ''}
              />
            )}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full" type="submit">
          {t('support.send')}
        </Button>
      </CardFooter>
    </form>
  );
};

export default SupportForm;

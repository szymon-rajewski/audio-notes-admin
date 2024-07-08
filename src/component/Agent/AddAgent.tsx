import React from 'react';
import Page from '../Page/Page';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { CardTitle } from '../ui/Card/CardTitle';
import { CardDescription } from '../ui/Card/CardDescription';
import { Separator } from '../ui/Separator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card } from '../ui/Card/Card';
import { CardHeader } from '../ui/Card/CardHeader';
import { CardContent } from '../ui/Card/CardContent';
import { InputWithLabel } from '../ReusableElements/InputWithLabel';
import { useNavigate } from 'react-router-dom';
import RoutingPath from '../../routing/RoutingPath';
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/AlertDialog/AlertDialogParts';
import { AlertDialogContent } from '../ui/AlertDialog/AlertDialogContent';
import { AlertDialogAction } from '../ui/AlertDialog/AlertDialogAction';
import { useAuth } from '../AuthenticationContextProvider';
import { useToast } from '../ui/Toast/UseToast';

type AddAgentFields = {
  name: string;
  year: string;
  month: string;
  day: string;
  dob: string;
  lastUpdated: string;
};

const schema = z.object({
  name: z.string().min(1, {
    message: 'Podaj nazwe',
  }),
});

interface AddAgentProps {
  onClick?: () => void;
}
export default function AddAgent({ onClick }: AddAgentProps) {
  const { userId } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddAgentFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<AddAgentFields> = async (data) => {
    try {
      // await new AgentApi().create(userId, {
      //   name: data.name,
      //   lastUpdated: data.lastUpdated,
      // });
      toast({
        title: 'Sukces',
        description: 'Dodano agenta',
      });
      onClick && onClick();
    } catch (errors) {
      toast({
        variant: 'destructive',
        title: 'Błąd',
        description: 'Opis błędu',
      });
      console.error(errors);
    }
  };

  return (
    <Page>
      <Card className="mx-auto max-w-[800px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Dodaj</CardTitle>
            <CardDescription className="mt-1 text-sm">Opis</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator className="mb-5" />
            <InputWithLabel
              register={register}
              errors={errors}
              name="name"
              placeholder={t('agent.name')}
              id="name"
              label={t('agent.name')}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="my-5 w-full" type="submit">
                  Ddoaj agenta
                </Button>
              </AlertDialogTrigger>
              {Object.keys(errors).length === 0 && (
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {t('notification.added')}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('notification.confimr')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      onClick={() => {
                        navigate(RoutingPath.CREATE);
                      }}
                    >
                      Powierdź
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              )}
            </AlertDialog>
            <Button
              className="w-full"
              type="button"
              variant="outline"
              onClick={() => {
                navigate(RoutingPath.CREATE);
              }}
            >
              Powrót
            </Button>
          </CardContent>
        </form>
      </Card>
    </Page>
  );
}

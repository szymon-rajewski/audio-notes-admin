import React, { useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { Card } from '../ui/Card/Card';
import { useTranslation } from 'react-i18next';
import { CardHeader } from '../ui/Card/CardHeader';
import { CardTitle } from '../ui/Card/CardTitle';
import { CardDescription } from '../ui/Card/CardDescription';
import { CardContent } from '../ui/Card/CardContent';
import LoginWithEmail from './LoginWithEmail';
import axios from 'axios';
import { HOST } from '../../api/config';
import { useNavigate } from 'react-router-dom';
import RoutingPath from '../../routing/RoutingPath';
import { useAuth, UserLoginResponse } from '../AuthenticationContextProvider';
import { useToast } from '../ui/Toast/UseToast';
import { FaGoogle } from 'react-icons/fa';
import { Button } from '../ui/Button';

type LoginFormEmail = {
  login: string;
  password: string;
};

export default function LoginForm() {
  const { setIsAuthenticated, setUserId, setUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [login, setLogin] = useState('');

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginFormEmail>();

  const onSubmit: SubmitHandler<LoginFormEmail> = async (data) => {
    try {
      const response = await axios.post<UserLoginResponse>(
        `${HOST}/zirraiadminapi/login`,
        {
          username: data.login,
          password: data.password,
        }
      );
      const { userId, user } = response.data;
      if (!userId || !user) {
        throw new Error('No valid login response');
      }
      localStorage.setItem('userId', userId);
      setUser(user);
      setUserId(userId);
      setIsAuthenticated(true);
      navigate(RoutingPath.MAIN);
    } catch (err) {
      console.log(err);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please try again in few moments or contact support',
      });
    }
  };

  const onError: SubmitErrorHandler<LoginFormEmail> = (errors) => {
    console.error(errors);
  };
  const handleLoginTypeChange = (loginType: string) => {
    setLogin(loginType);
    reset();
  };

  return (
    <Card className="w-[500px]">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardHeader>
          <CardTitle className="text-lg">{t('account.login')}</CardTitle>
          <CardDescription className="text-sm">
            {t('account.loginDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <LoginWithEmail register={register} errors={errors} />
          </div>
        </CardContent>
      </form>
    </Card>
  );
}

import React, { useState } from 'react';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import UserApi from '../../api/UserApi';

const emailSchema = z.string().min(1);
const passwordSchema = z.string().min(8);

type LoginFormInputs = {
  login: string;
  password: string;
};

type Props = {
  register: UseFormRegister<LoginFormInputs>;
  errors: any;
};

const LoginWithEmail: React.FC<Props> = ({ register, errors }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="username">{t('account.username')}</Label>
        <Input
          {...register('login', {
            required: 'Nazwa użytkownika jest wymagana',
            validate: (value) => {
              try {
                emailSchema.parse(value);
                return true;
              } catch (error) {
                return 'Nazwa użytkownika jest wymagana';
              }
            },
          })}
          id="username"
          placeholder={t('account.username')}
        />
        {errors.login && (
          <p className="text-red-500 text-sm">{errors.login.message}</p>
        )}
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="password">{t('account.password')}</Label>
        <div className="relative">
          <Input
            {...register('password', {
              required: 'Hasło jest wymagane',
              validate: (value) => {
                try {
                  passwordSchema.parse(value);
                  return true;
                } catch (error) {
                  return 'Hasło wymaga przynajmniej 8 znaków';
                }
              },
            })}
            id="password"
            type={showPassword ? 'text' : 'password'}
          />
          <div
            className="absolute text-2xl bottom-2 right-2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <Button className="w-full" type="submit">
        {t('account.login')}
      </Button>
    </>
  );
};
export default LoginWithEmail;

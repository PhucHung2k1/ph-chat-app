'use client';

import axios from 'axios';

import React, { useCallback } from 'react';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';

import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import Input from '@/app/components/inputs/input';
import Button from '@/app/components/Button';

type Variant = 'LOGIN' | 'REGISTER';
const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    if (variant == 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    setIsLoading(true);
    if (variant == 'REGISTER') {
      axios
        .post('/api/register', data)
        // .then(() => signIn('credentials', data))
        .catch(() => alert('Something went wrong!'))
        .finally(() => {
          setIsLoading(false);
        })
        .then((res: any) => {
          if (res && res?.status == 200) {
            reset();

            toast.success('Register Successfully');
            setVariant('LOGIN');
          }
        });

      //Axios Register
    }
    if (variant == 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl: '/',
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials!');
          }
          if (callback?.ok && !callback?.error) {
            toast.success('Logged In!');
            // router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
      //AXios Login
    }
  };
  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          alert('Invalid credentials!');
        }

        if (callback?.ok) {
          //   router.push('/conversations')
          router.push('/users');
          toast.success('Logged In!');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [router, session?.status]);

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* <Input></Input> */}
          {variant == 'REGISTER' && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email address"
            register={register}
            errors={errors}
            type="email"
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            register={register}
            errors={errors}
            type="password"
            disabled={isLoading}
          />
          <Button disabled={isLoading} fullWidth type="submit">
            {variant == 'LOGIN' ? 'Sign in' : 'Resgister'}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or coutinue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant == 'LOGIN' ? 'New to messenger?' : 'Already have account?'}
          </div>
          <div className="underline cursor-pointer " onClick={toggleVariant}>
            {variant == 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

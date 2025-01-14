"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";

interface FormInputs {
  email: string;
  password: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    await signIn("credentials", {
      ...data,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="mb-1 text-2xl font-semibold">Login</h1>
      <Input
        {...register("email", {
          required: {
            value: true,
            message: "Can't be empty!",
          },
        })}
        placeholder="Email"
        errorMessage={errors.email?.message}
      />
      <Input
        {...register("password", {
          required: {
            value: true,
            message: "Can't be empty!",
          },
        })}
        errorMessage={errors.password?.message}
        placeholder="Password"
        type="password"
      />
      <div>
        <Link
          href="#"
          className="float-end text-xs duration-300 hover:text-primary-100 hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      <Button isLoading={isSubmitting} onClick={handleSubmit(onSubmit)}>
        Login
      </Button>
      <div className="my-2 flex items-center gap-x-4 text-sm">
        <span className="h-[1px] flex-1 bg-gray-200"></span>
        <span className="text-gray-400">OR</span>
        <span className="h-[1px] flex-1 bg-gray-200"></span>
      </div>
    </div>
  );
}

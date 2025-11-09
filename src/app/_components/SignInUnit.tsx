"use client";
import { ControlerFormInput } from "@/components/molecules/ControlerFormInput";
import { assuranceAPI } from "@/libs/api";
import { SignInForm } from "@/utils/helpers/interface/validation";
import { getAccessiblePaths } from "@/utils/helpers/user.role";
import { signInValidation } from "@/utils/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const SignInUnit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInForm>({ resolver: yupResolver(signInValidation) });

  const submitHandler = async (value: SignInForm) => {
    setLoading(true);
    try {
      const { data, message, success } = await assuranceAPI.signInUser(value);
      if (success) {
        setError("");
        const accessiblePaths = getAccessiblePaths(data?.userType);
        const callbackUrl = accessiblePaths && accessiblePaths[0];
        const res = await signIn("credentials", {
          ...data,
          callbackUrl,
        });
      } else {
        setError(message && message[0]);
      }
    } catch (error) {
      console.error("Error during sign in:", error); // Log error for debugging
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center bg-default ">
      <div className="bg-white rounded-2xl w-96 p-8 mx-auto">
        <div className="flex flex-col items-center mb-5">
          <Link href="#">
            <Image src="/images/logo.webp" width={140} height={37} alt="Logo" />
          </Link>
        </div>

        <p className="text-[16px] font-medium">Sign In</p>

        <form onSubmit={handleSubmit(submitHandler)}>
          <ControlerFormInput
            control={control}
            error={errors?.phone?.message}
            label="Unique ID"
            name="phone"
          />
          <div className="mb-4">
            <ControlerFormInput
              control={control}
              error={errors?.password?.message}
              label="Password"
              name="password"
              type="password"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
          {/* Display error message */}
          <Button
            type="submit"
            fullWidth
            className="bg-primary mt-4"
            disabled={loading}
          >
            {loading ? "SIGN IN..." : "SIGN IN"}
          </Button>
        </form>
      </div>
    </div>
  );
};

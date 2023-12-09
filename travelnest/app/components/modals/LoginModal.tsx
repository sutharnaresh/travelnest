// Import necessary dependencies and components
'use client';
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Input } from "../inputs/Input";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import { Button } from "../Button";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

// LoginModal component
export const LoginModal = () => {
  // Access the Next.js router
  const router = useRouter();

  // Initialize custom hooks for handling modals
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  // State to manage loading state during login
  const [isLoading, setIsLoading] = useState(false);

  // Form handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  // Function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // Sign in with credentials using next-auth
    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(false);

        // Handle successful login
        if (callback?.ok) {
          toast.success('Logged In');
          router.refresh();
          loginModal.onClose();
        }
        // Handle login error
        if (callback?.error) {
          toast.error(callback.error);
        }
      });
  };

  // Function to toggle between login and registration modals
  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  // Content for the modal body
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  // Content for the modal footer
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      {/* Button to continue login with Google */}
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />

      {/* Message for users who don't have an account */}
      <div
        className="
          text-neutral-500
          text-center
          mt-4
          font-light
        "
      >
        <div className="justify-center flex flex-row items-center gap-2">
          <div>First time using TravelNest?</div>
          <div
            onClick={toggle}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  // Render the Modal component
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

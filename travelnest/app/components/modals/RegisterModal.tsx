'use client';
import axios from "axios";
import { signIn } from "next-auth/react";
import Modal from "./Modal";
import { useCallback, useState } from "react";
import Heading from "../Heading";
import { FcGoogle } from "react-icons/fc";
import { Input } from "../inputs/Input";
import { toast } from "react-hot-toast";
import { Button } from "../Button";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";
  
import useRegisterModal from "@/app/hooks/useRegisterModal";  
import useLoginModal from "@/app/hooks/useLoginModal";

// Define the RegisterModal component
export const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form configuration
  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  // Function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // Send registration request to the server
    axios.post('/api/register', data)
      .then(() => {
        // Display success message and close the register modal
        toast.success('Registered!');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        // Display error message if registration fails
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Function to toggle between register and login modals
  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal])

  // JSX content for the register modal
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to TravelNest"
        subtitle="Create an account!"
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
        id="name"
        label="Name"
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
  )

  // JSX content for the register modal footer
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')} 
      />
      <div 
        className="
          text-neutral-500 
          text-center  
          mt-4 
          font-light
        "
      >
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div 
            onClick={toggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  // Render the RegisterModal component
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

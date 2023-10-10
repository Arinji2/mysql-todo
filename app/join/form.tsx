"use client";
import { useEffect } from "react";
import PasswordFields from "./password";
import SubmitButton from "./submit";

import { RegisterAction } from "@/lib/actions/register";
import { useRouter } from "next/navigation";
import { experimental_useFormState as useFormState } from "react-dom";
import toast from "react-hot-toast";
const initialState = {
  type: "success" as "success" | "loading" | "error",
  message: "",
};
export function Form() {
  const [state, formAction] = useFormState(RegisterAction, initialState);
  const router = useRouter();
  useEffect(() => {
    if (state.message === "") return;
    if (state.type === "success") toast.success(state.message);
    if (state.type === "error") toast.error(state.message);

    if (state.message === "Successfully Registered") router.push("/verify");

    return () => {
      toast.dismiss();
    };
  }, [state.message, state.type]);
  return (
    <form
      action={formAction}
      className="w-full xl:w-[50%] scale-90 md:scale-100 h-full flex flex-col items-center justify-center gap-4 bg-slate-300 rounded-md border-4 shadow-[4px_4px_0_#000] p-4 border-black"
    >
      <div className="w-full h-full flex flex-col items-start justify-center gap-2">
        <label htmlFor="name" className="text-2xl text-black font-bold">
          Name
        </label>
        <input
          className="w-full h-10 px-2 rounded-md outline-1 bg-gray-200 outline-gray-200 font-medium"
          type="text"
          name="name"
          id="name"
          placeholder={"example"}
          required
        />
      </div>
      <div className="w-full h-full flex flex-col items-start justify-center gap-2">
        <label htmlFor="email" className="text-2xl text-black font-bold">
          Email
        </label>
        <input
          className="w-full h-10 px-2 rounded-md outline-1 bg-gray-200 outline-gray-200 font-medium"
          type="email"
          name="email"
          id="email"
          placeholder={"example@gmail.com"}
          required
        />
      </div>
      <PasswordFields />
      <div className="w-full h-fit flex flex-col items-start justify-center">
        <SubmitButton />
      </div>
    </form>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { type z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { profileSchema } from "@/schemas/profile";
import toast, { Toaster } from "react-hot-toast";
import blocks from "@/../public/hostels.json";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  vit_email: string;
  block: string;
  room: string;
  college: string;
  city: string;
  state: string;
  reg_no: string;
}

interface SubmitProjectResponse {
  message: string;
  status: string;
  data: unknown;
}

interface GetIdea {
  data: FormValues;
  message: string;
  status: string;
}

import send from "@/assets/images/Send.svg";
import Image from "next/image";
import { useEffect } from "react";
const tracks = ["Track 1", "Track 2", "Track 3"];

export default function Profile() {
  // useEffect(() => {
  //   async function getIdeaSubmission() {
  //     try {
  //       const res = await axios.get<GetIdea>(
  //         `${process.env.NEXT_PUBLIC_API_URL}/idea`,
  //         {
  //           withCredentials: true,
  //         },
  //       );
  //       console.log(res.data.data);
  //       form.reset(res.data.data);
  //     } catch (error) {
  //       console.log("Error getting idea submission:", error);
  //     }
  //   }
  //   void getIdeaSubmission();
  // }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      vit_email: "",
      block: "",
      room: "",
      reg_no: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    // try {
      console.log(data);
      //   const toastId = toast.loading("Idea Submitted", { autoClose: false });
      // const res = await axios.patch<SubmitProjectResponse>(
      //   `${process.env.NEXT_PUBLIC_API_URL}/idea/update`,
      //   data,
      //   {
      //     withCredentials: true,
      //   },
      // );

      // if (res.data.status === "success") {
        // toast.update(toastId, {
        //   render: (
        //     <div className="">
        //       <h2 className="font-semibold">Idea Submitted</h2>
        //     </div>
        //   ),
        //   type: "success",
        //   isLoading: false,
        //   autoClose: 2000,
        // });
      // } else {
        // toast.update(toastId, {
        //   render: (
        //     <div className="">
        //       <h2 className="font-semibold">Failed to submit idea</h2>
        //       <p>Please try again.</p>
        //     </div>
        //   ),
        //   type: "error",
        //   isLoading: false,
        //   autoClose: 2000,
        // });
    //   }
    // } catch (error) {
    //   console.error("Error submitting idea:", error);
    //   toast.error("Failed to submit idea");
    // }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg bg-white p-4"
        >
          <div className="flex justify-start gap-16 max-[931px]:flex-col max-[931px]:gap-6">
            <div className="flex w-96 flex-col gap-6 max-[445px]:w-[87vw]">
              <div>
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-4">
                          <Label
                            htmlFor="first-name"
                            className="text-[#0019FF]"
                          >
                            First Name
                            <span className="text-[#FF0000]">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="first-name"
                            {...field}
                            placeholder="John"
                            className={`h-10 bg-white pl-5 ${
                              form.getFieldState("first_name").invalid
                                ? "border-red-500 focus:border-input focus:!ring-red-500"
                                : ""
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-4">
                          <Label htmlFor="last-name" className="text-[#0019FF]">
                            Last Name
                            <span className="text-[#FF0000]">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="last-name"
                            {...field}
                            placeholder="Doe"
                            className={`h-10 bg-white pl-5 ${
                              form.getFieldState("last_name").invalid
                                ? "border-red-500 focus:border-input focus:!ring-red-500"
                                : ""
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="vit_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-4">
                          <Label htmlFor="vit_email" className="text-[#0019FF]">
                            Email
                            <span className="text-[#FF0000]">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="vit_email"
                            {...field}
                            placeholder="vitstudent.ac.in"
                            className={`h-10 bg-white pl-5 ${
                              form.getFieldState("vit_email").invalid
                                ? "border-red-500 focus:border-input focus:!ring-red-500"
                                : ""
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-4">
                          <Label htmlFor="phone" className="text-[#0019FF]">
                            Phone Number
                            <span className="text-[#FF0000]">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="phone"
                            {...field}
                            placeholder="9098909876"
                            className={`h-10 bg-white pl-5 ${
                              form.getFieldState("phone").invalid
                                ? "border-red-500 focus:border-input focus:!ring-red-500"
                                : ""
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
            </div>
            <div className="flex w-96 flex-col gap-6 max-[445px]:w-[87vw]">
            <div>
                <FormField
                  control={form.control}
                  name="reg_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-4">
                          <Label htmlFor="reg_no" className="text-[#0019FF]">
                            Registration Number
                            <span className="text-[#FF0000]">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="reg_no"
                            {...field}
                            placeholder="22BBB0000"
                            className={`h-10 bg-white pl-5 ${
                              form.getFieldState("reg_no").invalid
                                ? "border-red-500 focus:border-input focus:!ring-red-500"
                                : ""
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="block"
                  render={({}) => (
                    <Controller
                      name="block"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid w-full max-w-sm items-center gap-4">
                              <Label
                                htmlFor="project-track"
                                className="text-[#0019FF] "
                              >
                                Block
                                <span className="text-[#FF0000]">*</span>
                              </Label>
                              <select
                                value={form.watch("block")}
                                onChange={(e) =>
                                  form.setValue("block", e.target.value)
                                }
                                className="rounded-md border border-gray-200 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                              >
                                <option value="">Select Block</option>
                                {blocks.map((block) => (
                                  <option key={block} value={block}>
                                    {block}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                ></FormField>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="room"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-4">
                          <Label htmlFor="room" className="text-[#0019FF]">
                            Room Number
                          </Label>
                          <Input
                            type="text"
                            id="room"
                            placeholder="1000"
                            {...field}
                            className={`h-10 bg-white pl-5 ${
                              form.getFieldState("room").invalid
                                ? "border-red-500 focus:border-input focus:!ring-red-500"
                                : ""
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
            </div>
          </div>

          <Button
            className="my-5 bg-[#0019FF]"
            type="submit"
            //   disabled={isSubmitting}
          >
            <Image src={send as HTMLImageElement} alt="b" />
            <span className="pl-2">Save</span>
          </Button>
        </form>
      </Form>
    </>
  );
}
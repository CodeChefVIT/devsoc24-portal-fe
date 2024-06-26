import countries from "@/../public/countries.json";
import { personalDetailsSchema, vitianDetails } from "@/schemas/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;

export default function PersonalDetails({
  setForm,
}: {
  setForm: React.Dispatch<React.SetStateAction<number>>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  if (!email) {
    router.push("/signup");
  }
  const form = useForm<PersonalDetailsFormValues>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: email ?? "",
      phone_number: "",
      country: "+91",
      gender: undefined,
    },
    mode: "onChange",
    shouldUnregister: false,
  });



  useEffect(() => {
    form.setValue("firstName", localStorage.getItem("first_name") ?? "");
    form.setValue("lastName", localStorage.getItem("last_name") ?? "");
    form.setValue("email", email ?? "");
    form.setValue("phone_number", localStorage.getItem("phone_number") ?? "");
    form.setValue("country", localStorage.getItem("country") ?? "+91");
    form.setValue(
      "gender",
      (localStorage.getItem("gender") as
        | "Male"
        | "Female"
        | "Others"
        | "Prefer Not to Say") ?? "",
    );
  }, []);

  async function onSubmit(data: PersonalDetailsFormValues) {
    localStorage.setItem("first_name", data.firstName);
    localStorage.setItem("last_name", data.lastName);
    localStorage.setItem("phone_number", data.phone_number);
    localStorage.setItem("country", data.country);
    localStorage.setItem("gender", data.gender);
    setForm(1);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 flex w-9/12 flex-col gap-4 py-4 text-primary md:w-1/3"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="First Name"
                    autoComplete="First Name"
                    required
                    {...field}
                    className={` ${
                      form.getFieldState("firstName").invalid
                        ? "border-red-500 focus:border-input focus:!ring-red-500"
                        : ""
                    }`}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Last Name"
                    autoComplete="Last Name"
                    {...field}
                    className={` ${
                      form.getFieldState("lastName").invalid
                        ? "border-red-500 focus:border-input focus:!ring-red-500"
                        : ""
                    }`}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    autoComplete="email"
                    required
                    disabled
                    {...field}
                    className={` ${
                      form.getFieldState("email").invalid
                        ? "border-red-500 focus:border-input focus:!ring-red-500"
                        : ""
                    }`}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="">
                  <Input
                    type="text"
                    placeholder="Phone Number"
                    autoComplete="phone"
                    required
                    {...field}
                    className={` ${
                      form.getFieldState("phone_number").invalid
                        ? "border-red-500 focus:border-input focus:!ring-red-500"
                        : ""
                    }`}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={
                  typeof localStorage !== "undefined"
                    ? localStorage.getItem("gender") ?? undefined
                    : undefined
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                  <SelectItem value="Prefer Not to Say">
                    Prefer Not to Say
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mx-auto mt-4 w-fit px-14"
        >
          Next
        </Button>
      </form>
    </Form>
  );
}

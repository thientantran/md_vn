'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';


const formSchema = z.object({
  email: z.string().email({message: 'Email không đúng định dạng'}).min(1, {
    message: "email is required!"
  }),
  password: z.string().min(6, {
    message: "password too short"
  }),
  confirm_password: z.string().min(6)
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

const formSchema_login = z.object({
  email: z.string().min(1, {
    message: "email is required!"
  }),
  password: z.string().min(6, {
    message: "password too short"
  }),
})
export default function AuthPage() {
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const form = useForm({
    resolver: zodResolver(variant === 'login' ? formSchema_login : formSchema),
    // defaultValues: variant === "login" ? {
    //   email: "",
    //   password:"",
    // } : {
    //   email: "",
    //   password:"",
    //   confirm_password:""
    // }
  })

  const {isSubmitting, isValid} = form.formState
  const onSubmit = (values) => {
    try {
      console.log(values)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="bg-white rounded-lg py-5">
  <div className="flex flex-col bg-white rounded-lg pt-12 my-5">
    <div className="flex justify-center w-full h-full my-auto">
      <div className="flex items-center justify-center w-full lg:p-12">
        <div className="flex items-center p-6 xl:p-10 shadow-lg rounded-md">
          <Form {...form}>
            <form className="flex flex-col w-full h-full pb-6 bg-white rounded-3xl" onSubmit={form.handleSubmit(onSubmit)}>
              <h3 className="mb-3 text-center text-4xl font-extrabold text-dark-grey-900"> {variant === 'login' ? 'Sign In' : 'Register'}</h3>
              <p className="mb-4 text-grey-700 text-center">Enter your email and password</p>
              {/* GOOGLE
                <a class="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
                <img class="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="">
                Sign in with Google
              </a>
              */}
              <div className="flex items-center mb-3">
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                <p className="mx-4 text-grey-600">or</p>
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
              </div>
              <FormField
                control={form.control}
                name='email'
                render = {({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Email' disabled={isSubmitting} {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className='my-1'></div>
              <FormField
                control={form.control}
                name='password'
                render = {({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Password' disabled={isSubmitting} {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className='my-1'></div>
              {variant !== "login" && (
                <FormField
                control={form.control}
                name='confirm_password'
                render = {({field}) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Confirm Password' disabled={isSubmitting} {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              )}
              <Button type='submit' className='px-6 py-5 mt-4 font-bold mb-5 w-80 md:w-96' variant='primary'>
                Sign In
              </Button>
              {/* <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none bg-sky-700 text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">Sign In</button> */}
              <p className="text-sm leading-relaxed text-grey-900">{variant === 'login' ? 'First time you here?' : 'Already have an account?'} <span onClick={toggleVariant} className="font-bold text-grey-700 cursor-pointer">{variant === 'login' ? 'Create an account?' : 'Login'}</span></p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

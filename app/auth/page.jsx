'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from 'react-icons/fc';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Email không đúng định dạng' }).min(1, {
    message: "email is required!"
  }),
  name: z.string().min(1, { message: "Tên người dùng là bắt buộc" }),
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

  const { isSubmitting, isValid } = form.formState
  const router = useRouter()
  const login = async (values) => {
    const { email, password } = values
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      })
      router.push("/")
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  const register = async (values) => {
    const { email, name, password } = values
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-white rounded-lg h-full">
      <div className="flex flex-col bg-white rounded-lg h-full">
        <div className="flex justify-center w-full h-full my-auto">
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center p-6 xl:p-10 shadow-lg rounded-md">
              <div className="flex flex-col w-full h-full pb-3 bg-white rounded-3xl" onSubmit={form.handleSubmit(variant === 'login' ? login : register)}>
                <h3 className="mb-3 text-center text-4xl font-extrabold text-dark-grey-900"> {variant === 'login' ? 'Sign In' : 'Register'}</h3>
                <div className="flex flex-row items-center gap-4 py-2 mb-3 md:mb-6 justify-center">
                  {/* Google Here */}
                  <Button variant='ghost' className='bg-gray-200' onClick={() => signIn('google', { callbackUrl: '/' })}>
                    <FcGoogle size={32} className="mr-2" />
                    Sign in with Google
                  </Button>
                </div>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <p className="mx-4 text-grey-600">or</p>
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <p className="mb-4 text-grey-700 text-center">Enter your email and password</p>
                <Form {...form}>
                  <form>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder='Email' disabled={isSubmitting} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='my-1'></div>
                    {variant !== "login" && (
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>User Name</FormLabel>
                            <FormControl>
                              <Input type='text' placeholder='User Name' disabled={isSubmitting} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <div className='my-1'></div>
                    <FormField
                      control={form.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type='password' placeholder='Password' disabled={isSubmitting} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='my-1'></div>
                    {variant !== "login" && (
                      <FormField
                        control={form.control}
                        name='confirm_password'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type='password' placeholder='Confirm Password' disabled={isSubmitting} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <Button disabled={isSubmitting} type='submit' className='px-6 py-5 mt-4 font-bold mb-5 w-80 md:w-96' variant='primary'>
                      {variant === 'login' ? 'Sign In' : 'Register'}
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
    </div>
  )
}

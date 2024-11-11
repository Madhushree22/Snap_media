import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useSignInAccount } from "@/lib/react-query/queryAndMutations"
import { useUserContext } from "@/context/AuthContext"
import logo from '../../../public/assets/images/logo.png';


const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount } = useSignInAccount()


  // 1. Define your form.

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {

      email: "",
      password: "",
    },
  });



  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })
    if (!session) {
      return toast({ title: " Sign up failed, Please try again", })

    }
    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      toast({ title: "Login failed. Please try again.", });

      return;
    }

  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">

        <img src={logo} alt="logo" height={17770} width={240} />
        <h2 className="h3-bold md:h2:bold pt-5 sm:pt-12 text-light-2" >Log_in To Your Account </h2>
        <p className="text-teal-600 small-medium md:base-regular mt-1"> Hello!! Please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          // shad-button_primary
          />
          <Button type="submit" className="bg-teal-500/50 hover:bg-teal-500/70  ">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader />Loading...</div>) :
              "Sign in"}</Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-teal-600/100 text-small-semibold ml-1 ">Sign up</Link>
          </p>
        </form>
      </div>
    </Form>

  )
}

export default SigninForm
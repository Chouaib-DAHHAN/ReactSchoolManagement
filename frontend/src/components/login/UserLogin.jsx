import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Await, useNavigate } from "react-router-dom"
import { ADMIN_DASHBOARD_ROUTE, STUDENT_DASHBOARD_ROUTE } from "../../router"
import { useContext } from "react"
import { UserStateContext } from "../../context/UserContext"

// ✅ Schéma de validation
const formSchema = z.object({
  email: z
    .string()
    .email("Email invalide.")
    .min(5, "L'email doit contenir au moins 5 caractères.")
    .max(32, "L'email doit contenir au maximum 32 caractères."),
  password: z
    .string()
    .min(10, "Le mot de passe doit contenir au moins 10 caractères.")
    .max(30, "Le mot de passe doit contenir au maximum 30 caractères."),
})



export default function UserLogin() {
  
 
  const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    email: "",
    password: "",
  },
})


 const context = useContext(UserStateContext)
 const navigate = useNavigate()
 
 
async function onSubmit(values) {
  await context.login(values.email , values.password).then(
            ({status,data}) => {
                if(status === 200){
                  context.setAuthenticated(true)
                  const {role} = data.user
                  switch(role){
                    case 'student':
                    navigate(STUDENT_DASHBOARD_ROUTE)
                    break;
                    case 'admin':
                    navigate(ADMIN_DASHBOARD_ROUTE)
                    break;
                  }
                  console.log(data)
                    
                }
            }
         )
}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-sm mx-auto mt-10"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="exemple@email.com" {...field} />
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
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type={'password'} placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Se connecter
        </Button>
      </form>
    </Form>
  )
}

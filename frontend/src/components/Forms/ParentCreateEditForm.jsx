import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner"
import {toast} from "sonner";
import { Input } from "@/components/ui/input";
import { ADMIN_DASHBOARD_ROUTE, STUDENT_DASHBOARD_ROUTE } from "../../router";
import { UserStateContext } from "../../context/UserContext";
import ParentApi from "@/services/api/ParentApi.jsx";



// ✅ Schéma de validation
const formSchema = z.object({
    firstname: z.string().max(50),
    lastname: z.string().max(50),
    date_of_birth: z.string(),
    gender: z.string().max(1),
    blood_type: z.string(),
    address: z.string().max(255),
    phone: z.string().max(10),
    email: z.string().email().min(2).max(30),
   
});

export default function ParentCreateEditForm({handleSubmit , values}) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues : values || {}
    })

     const {setError, formState: {isSubmitting} , reset} = form
   
   const onSubmit = async values =>{
        await handleSubmit(values)
            .then(({ status, data }) => {
                if (status === 200) {
                    toast.success(data.message);
          reset()
                }
            })
            .catch((error) => {
                const response = error.response; 
                if (response && response.data && response.data.errors) {
                    Object.entries(response.data.errors).forEach(([fieldName , errorMessages]) => {
                        setError(fieldName , { message : errorMessages.join()})
                    })
                } else {
                   
                    console.error("API error:", error);
                    toast.error("An unexpected error occurred. Please try again.");
                }
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Firstname</FormLabel>
                            <FormControl>
                                <Input placeholder="Firstname" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lastname</FormLabel>
                            <FormControl>
                                <Input placeholder="Lastname" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of birth</FormLabel>
                            <FormControl>
                                <Input
                                    type={"date"}
                                    placeholder="Date of birth"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="m" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Male
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="f" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Female
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="blood_type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blood Type</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Blood Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {[
                                        "O-",
                                        "O+",
                                        "A+",
                                        "A-",
                                        "B+",
                                        "B-",
                                        "AB+",
                                        "AB-",
                                    ].map((bloodType, key) => (
                                        <SelectItem key={key} value={bloodType}>
                                            {bloodType}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Address"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    type={"tel"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="Phone" {...field} />
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
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className={"mt-2"} type="submit">
                    {isSubmitting} 
                  {values? 'update' : 'create'}
                </Button>
            </form>
        </Form>
    );
}

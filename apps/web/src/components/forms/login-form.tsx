'use client';

import { GalleryVerticalEnd } from "lucide-react";

import {
  zodResolver
} from "@hookform/resolvers/zod";
import { Button } from "@web/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@web/components/ui/form";
import { Input } from "@web/components/ui/input";
import { cn } from "@web/lib/utils";
import { LoaderCircle } from "lucide-react";
import {
  useForm
} from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { signIn } from "@web/lib/auth";
import { useTransition } from "react";
import { signInAction } from "@web/actions/auth/auth.actions";

const formSchema = z.object({
  email: z.string({
    message: "Veuillez saisir une adresse e-mail.",
    required_error: "Veuillez saisir une adresse e-mail."
  }).email({
    message: "Veuillez saisir une adresse e-mail valide."
  }).max(256, {
    message: "L'adresse e-mail ne doit pas dépasser 256 caractères."
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit comporter au moins 8 caractères."
  }).max(256, {
    message: "Le mot de passe ne doit pas dépasser 256 caractères."
  }),
});



export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [transition, setTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setTransition(async () => {
      try {
        const formData = formSchema.parse(values);
        await signInAction("credentials", {
          ...formData,
          redirect: true,
          redirectTo: "/app"
        });
      } catch (error) {
        console.error("Error signing in", error);
        toast.error("Une erreur s'est produite lors de la soumission du formulaire.");
      }
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">Acme Inc.</span>
              </a>
              <h1 className="text-xl font-bold">Vous revoilà !</h1>
            </div>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse e-mail <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        {...field}
                      />
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
                    <FormLabel>Mot de passe <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={transition}>
                {transition ? (
                  <LoaderCircle
                    className="-ms-1 me-2 animate-spin"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                ) : null}
                Login
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        Mot de passe oublié ? <a href="https://antoinejosset.fr" target="_blank" rel="noopener noreferrer">ici</a>
      </div>
    </div>
  )
}

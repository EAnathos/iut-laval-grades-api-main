import { LoginForm } from "@web/components/forms/login-form";
import { getUser } from "@web/lib/auth";


export default async function Home() {
  const user = await getUser();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

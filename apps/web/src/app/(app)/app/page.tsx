import { Button } from "@web/components/ui/button";
import { getUser, signOut } from "@web/lib/auth";

export default async function AppHome() {
  const user = await getUser();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <form
          action={async () => {
            "use server"
            await signOut({
              redirect: true,
              redirectTo: "/",
            })
          }}
        >
          <Button type="submit">Sign Out</Button>
        </form>
      </div>
    </div>
  )
}

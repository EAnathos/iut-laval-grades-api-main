import { Button } from "@web/components/ui/button";
import api from "@web/lib/api";
import { getUser, signOut } from "@web/lib/auth";
import { Student } from '@web/types';

export default async function AppHome() {
  const user = await getUser();
  if (!user) return null;
  const students = await api.students.getAll(user);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <p>home</p>
        <form
          action={async () => {
            "use server"
            await signOut({
              redirect: true,
              redirectTo: "/",
            })
          }}
        >
          {/*<Button type="submit">Sign Out</Button>*/}
        </form>
      </div>
      <pre>{JSON.stringify(students, null, 2)}</pre>
    </div>
  )
}

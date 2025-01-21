'use client';

import { usePathname } from 'next/navigation';
import {
  SchoolIcon,
  Users,
  BookOpen,
  ChartNoAxesColumn,
  LogOut,
} from 'lucide-react';
import { Button } from '@web/components/ui/button';
import Link from 'next/link';
import { cn } from '@web/lib/utils';
import { signOutAction } from '@web/actions/auth/auth.actions';

type HeaderProps = {
  firstName: string;
  lastName: string;
  department: string;
};

const NavLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
  const pathname = usePathname();
  return (
    <Button
      variant="ghost"
      className={cn(
        'hover:bg-[#A80059] hover:text-muted',
        pathname === href ? 'bg-[#A80059]' : '',
      )}
      asChild
    >
      <Link href={href}>
        <Icon size={24} className="text-muted" />
        {label}
      </Link>
    </Button>
  );
};

export const Header = ({ firstName, lastName, department }: HeaderProps) => {
  return (
    <header className="flex w-full bg-primary px-8 py-3.5 justify-between align-middle">
      <div className="flex items-center gap-2">
        <SchoolIcon size={24} className="text-muted" />
        <h1 className="text-white text-2xl font-bold">IUT de Laval</h1>
        <p className="text-muted ml-4 text-xs">{firstName} {lastName} - {department}</p>
      </div>

      <div className="flex items-center justify-end gap-4 text-muted align-middle">
        <NavLink href="/students" icon={Users} label="Étudiants" />
        <NavLink href="/courses" icon={BookOpen} label="Cours" />
        <NavLink href="/statistics" icon={ChartNoAxesColumn} label="Statistiques" />
        <Button
          variant="ghost"
          className="hover:bg-[#A80059] hover:text-muted"
          onClick={async () => {
            await signOutAction({
              redirect: true,
              redirectTo: '/',
            });
          }}
        >
          <LogOut size={24} className="text-muted" />
          Déconnexion
        </Button>
      </div>
    </header>
  );
};

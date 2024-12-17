import { ArrowLeft, Download } from 'lucide-react'
import { Button } from "@web/components/ui/button"
import Link from "next/link"

interface StudentDetailsProps {
  student: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    studentId: string;
  }
}

export function StudentDetails({ student }: StudentDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-gray-600">
        <ArrowLeft className="h-4 w-4" />
        <Link href="/students" className="text-sm hover:underline">
          Retour à la liste
        </Link>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{student.firstName} {student.lastName}</h1>
            <p className="text-sm text-gray-600">Numéro étudiant: {student.studentId}</p>
          </div>
          <Button className="bg-[#E6007E] hover:bg-[#E6007E]/90">
            <Download className="mr-2 h-4 w-4" />
            Relevé de notes
          </Button>
        </div>

        <div className="grid gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="mt-1">{student.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Date de naissance
            </label>
            <p className="mt-1">{student.dateOfBirth}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


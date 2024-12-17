'use client'

import { useState, useEffect } from 'react'
import { Input } from "@web/components/ui/input"
import { Button } from "@web/components/ui/button"
import { Pencil, Trash2 } from 'lucide-react'

interface Course {
  id: number
  code: string
  nom: string
  credits: number
  description: string
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/courses')
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des cours')
        }
        const data: Course[] = await response.json()
        setCourses(data)
      } catch (error) {
        console.error('Erreur:', error)
        //setError('Impossible de charger les cours')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses().then(r => r)
  }, [])

  const deleteCourse = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/api/courses/${id}`, {
        method: 'DELETE',
      })

      if (response.status === 204) {
        setCourses(courses.filter(course => course.id !== id))
      } else if (response.status === 404) {
        console.error('Cours non trouvé')
      } else {
        throw new Error('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const filteredCourses = courses.filter(course =>
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.nom.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return <div className="p-6">Chargement des cours...</div>
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Liste des cours</h1>
        <Button className="bg-pink-600 hover:bg-pink-700">
          Ajouter un cours
        </Button>
      </div>

      <div className="mb-6">
        <Input
          type="search"
          placeholder="Rechercher un cours..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xl"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-gray-500">CODE</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">NOM</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">CREDITS</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">ACTIONS</th>
          </tr>
          </thead>
          <tbody>
          {filteredCourses.map((course) => (
            <tr key={course.id} className="border-b">
              <td className="py-3 px-4 text-blue-600">{course.code}</td>
              <td className="py-3 px-4">{course.nom}</td>
              <td className="py-3 px-4">{course.credits}</td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

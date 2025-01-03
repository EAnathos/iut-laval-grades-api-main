import api from '@web/lib/api';
import { User } from 'next-auth';
import { Box } from './box';

type GlobalStatsProps = {
  user: User;
  academicYear: string;
};

export const GlobalStats = async ({ user, academicYear }: GlobalStatsProps) => {
  const globalStats = await api.stats.get(user, academicYear);
  if (!globalStats)
    return <div>Erreur lors du chargement des statistiques globales</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Statistiques Globales
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Box
          title="Moyenne Générale"
          content={
            Number(globalStats.globalAverage).toFixed(2).toString() +
            '/20'
          }
          subtitle="Moyenne de toutes les notes"
        />
        <Box
          title="Nombre d'Étudiants"
          content={globalStats.totalStudents.toString()}
          subtitle="Total des étudiants inscrits"
        />
        <Box
          title="Nombre de Cours"
          content={globalStats.totalCourses.toString()}
          subtitle="Total des cours disponibles"
        />
        <Box
          title="Taux de Réussite"
          content={
            Number(globalStats.averageSuccessRate).toFixed(2).toString() +
            '%'
          }
          subtitle="Taux de réussite moyen"
        />
      </div>
    </div>
  )
}

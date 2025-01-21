
import api from '@web/lib/api';
import { getUser } from '@web/lib/auth';
import { NextRequest } from 'next/server';
import stream from 'stream';
import { promisify } from 'util';

const pipeline = promisify(stream.pipeline);

export async function GET(req: NextRequest) {
  const user = await getUser();
  const studentId = req.nextUrl.searchParams.get('id');
  if (!user || !studentId) return null;
  
  const response = await api.grades.releve(user, Number(studentId));
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  const fileBlob = await response.blob();

  const headers = new Headers();
  const fileName = `releve-notes-${studentId}.pdf`;
  headers.append("Content-Disposition", `attachment; filename="${fileName}"`);
  headers.append("Content-Type", "application/pdf");

  return new Response(fileBlob, {
    headers,
  });
};
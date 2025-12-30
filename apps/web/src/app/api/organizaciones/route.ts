
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const orgSchema = z.object({
  nombre: z.string().min(2),
  rfc: z.string().min(12).max(13),
  tipo: z.enum(['PERSONA_MORAL', 'PERSONA_FISICA']),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
    }

    const body = await req.json();
    const { nombre, rfc, tipo } = orgSchema.parse(body);

    // Check if user already has an org
    const user = await prisma.usuario.findUnique({
      where: { id: session.user.id },
      include: { organizacion: true }
    });

    if (user?.organizacion) {
      // User already has an org. For this flow, we might update it or just return it.
      // If RFC matches, good. If not, conflict?
      if (user.organizacion.rfc !== rfc) {
         return NextResponse.json({ message: 'El usuario ya pertenece a otra organización con diferente RFC' }, { status: 400 });
      }
      return NextResponse.json(user.organizacion);
    }

    // Check if org with RFC exists
    let org = await prisma.organizacion.findUnique({
      where: { rfc }
    });

    if (org) {
      // Link user to existing org
      await prisma.usuario.update({
        where: { id: session.user.id },
        data: { organizacionId: org.id }
      });
    } else {
      // Create new org and link user
      org = await prisma.organizacion.create({
        data: {
          nombre,
          rfc,
          tipo,
          usuarios: {
            connect: { id: session.user.id }
          }
        }
      });
    }

    return NextResponse.json(org);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }
    console.error('Org creation error:', error);
    return NextResponse.json({ message: 'Error interno' }, { status: 500 });
  }
}

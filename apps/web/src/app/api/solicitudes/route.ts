
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const solicitudSchema = z.object({
  producto: z.string().min(2),
  montoCentavos: z.number().int().positive(),
  plazoMeses: z.number().int().positive(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
    }

    const body = await req.json();
    const { producto, montoCentavos, plazoMeses } = solicitudSchema.parse(body);

    // Get user to find organizacionId
    const user = await prisma.usuario.findUnique({
      where: { id: session.user.id },
      select: { organizacionId: true }
    });

    if (!user?.organizacionId) {
      return NextResponse.json({ message: 'El usuario no tiene una organización asociada' }, { status: 400 });
    }

    const solicitud = await prisma.solicitud.create({
      data: {
        producto,
        montoCentavos,
        plazoMeses,
        clienteId: session.user.id,
        organizacionId: user.organizacionId
      }
    });

    // Create event
    await prisma.evento.create({
      data: {
        tipo: 'SOLICITUD_CREADA',
        solicitudId: solicitud.id,
        actorId: session.user.id,
        detalles: { producto, montoCentavos, plazoMeses }
      }
    });

    return NextResponse.json(solicitud, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }
    console.error('Solicitud creation error:', error);
    return NextResponse.json({ message: 'Error interno' }, { status: 500 });
  }
}

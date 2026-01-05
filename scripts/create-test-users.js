#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔄 Conectando a la base de datos...');
    
    // Crear organización
    const org = await prisma.organizacion.upsert({
      where: { rfc: 'CONST123456789' },
      update: { nombre: 'Constructora Test', tipo: 'PERSONA_MORAL' },
      create: {
        nombre: 'Constructora Test',
        rfc: 'CONST123456789',
        tipo: 'PERSONA_MORAL',
      },
    });
    console.log(`✅ Organización creada: ${org.nombre}`);

    // Hash para la contraseña 'test123'
    const passwordHash = await bcrypt.hash('test123', 10);

    // Crear usuarios
    const usuarios = [
      { email: 'cliente@test.com', nombre: 'Cliente Test', rol: 'CLIENTE' },
      { email: 'analista@test.com', nombre: 'Analista Test', rol: 'ANALISTA' },
      { email: 'admin@test.com', nombre: 'Admin Test', rol: 'ADMIN' },
    ];

    for (const usuario of usuarios) {
      const creado = await prisma.usuario.upsert({
        where: { email: usuario.email },
        update: { nombre: usuario.nombre, rol: usuario.rol },
        create: {
          email: usuario.email,
          nombre: usuario.nombre,
          passwordHash,
          rol: usuario.rol,
          organizacionId: org.id,
        },
      });
      console.log(`✅ Usuario creado: ${creado.email} (${creado.rol})`);
    }

    // Verificar
    const usuarios_db = await prisma.usuario.findMany({
      where: { email: { contains: 'test' } },
      select: { email: true, nombre: true, rol: true },
    });

    console.log('\n📋 Usuarios en la base de datos:');
    usuarios_db.forEach((u) => {
      console.log(`   ${u.email} - ${u.rol} (${u.nombre})`);
    });

    console.log('\n✨ Completado exitosamente');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

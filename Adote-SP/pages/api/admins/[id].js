// pages/api/admins/[id].js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query; // Pega o ID do administrador que será excluído da URL

    try {
      // Tenta excluir o administrador do banco de dados usando o Prisma
      const deletedAdmin = await prisma.admin.delete({
        where: {
          id: parseInt(id), // Converte o ID para inteiro para garantir que seja válido
        },
      });

      // Retorna uma resposta de sucesso
      res.status(200).json({ message: 'Administrador excluído com sucesso' });
    } catch (error) {
      // Em caso de erro, retorna um erro
      res.status(500).json({ error: 'Erro ao excluir administrador' });
    }
  } else {
    // Se o método não for DELETE, retorna um erro
    res.status(405).end(); // Método não permitido
  }
}

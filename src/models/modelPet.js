
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAllPets = async () => {
    return await prisma.petShop.findMany({
        orderBy: { name: 'asc' }
    });
}

export const findPetById = async (id) => {
    return await prisma.petShop.findUnique({
        where: { id: Number(id) }
    });
}


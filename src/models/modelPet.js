
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAllPets = async () => {
    return await prisma.petShop.findMany({
        orderBy: { nome: 'asc' }
    });
}

export const findPetById = async (id) => {
    return await prisma.petShop.findUnique({
        where: { id: Number(id) }
    });
}

export const create = async (data) => {
    return await prisma.petShop.create({
        data: {
            nome: data.nome,
            especie: data.especie,
            raca: data.raca,
            idade: data.idade,
            dono: data.dono,
        }
    })
}

export const deletaPet = async (id) => {
    return await prisma.petShop.delete({
        where: { id: Number(id) }
    })
}

export const updatePet = async (id, data) => {
    return await prisma.petShop.update({
        where: { id: Number(id) },
        data: {
            ...(data.nome && { nome: data.nome }),
            ...(data.especie && { especie: data.especie }),
            ...(data.raca && { raca: data.raca }),
            ...(data.idade && { idade: data.idade }),
            ...(data.dono && { dono: data.dono }),
        }
    })
}

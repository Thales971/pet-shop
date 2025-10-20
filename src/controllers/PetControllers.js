import * as modelPet from './../models/modelPet.js';

export const getAllPets = async (req, res) => {
    try {
        const pets =  await modelPet.findAllPets();

    if (!pets || pets.length === 0) {
        return res.status(404).json({
            message: 'Nenhum pet encontrado',
            status: 404,
            pets
        });
    }
    res.status(200).json({
    total: pets.length,
    mensagem: 'lista de PETS carregada com sucesso',
    pets
    });
    
} catch (error) {
    res.status(500).json({
        erro: 'erro interno no servidor',
        detalhes: error.message,
        status: 500
    });
}
}

export const getPetById = async (req, res) => {
try {
    const { id } = req.params;
    const pet = await modelPet.findPetById(id);

    if (!pet) {
        return res.status(404).json({
            erro: `nenhum pet encontrado com o id ${id}`,
            message: `Verifique o id e tente novamente`,
            id:id
        });
    }
    res.status(200).json({
        mensagem: `pet com o id ${id} encontrado com sucesso`,
        pet
    });
    
} catch (error) {
    res.status(500).json({
        erro: 'erro ao buscar o pet com o id',
        detalhes: error.message
    });
}
}
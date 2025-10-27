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

export const criarPet = async (req, res) => {
    try {
        // De onde vem os dados para cá? Para eu usar para criar
        const { nome, especie, raca, dono, idade } = req.body

        const dado = req.body

        // Validacao campos obrigatorios
        const camposObrigatorios = ['nome', 'especie', 'raca', 'dono', 'idade'];

        const faltando = camposObrigatorios.filter(campo => !dado[campo]);

        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}.`
            });
        }

        const novoPet = await modelPet.create(dado);

        res.status(201).json({
            mensagem: 'Pet criado com sucesso!',
            pet: novoPet
        })


    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao criar Pet',
            detalhes: error.message
        })
    }
}

export const deletaPet = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const petExiste = await modelPet.findPetById(id);

        if (!petExiste) {
            return res.status(404).json({
                erro: 'Pet não encontrado com esse id',
                id: id
            })
        }

        await modelPet.deletaPet(id)

        res.status(200).json({
            mensagem: 'Pet removido com sucesso',
            petRemovido: petExiste
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao apagar pet!',
            detalhes: error.message
        })
    }
}

export const atualizaPet = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const dados = req.body;

        const petExiste = await modelPet.findPetById(id);

        if (!petExiste) {
            return res.status(404).json({
                erro: 'Pet não encontrado com esse id',
                id: id
            })
        }

        //Verificar se o pet que esta sendo editado, existe!


        const petAtualizado = await modelPet.updatePet(id, dados);

        res.status(200).json({
            mensagem: 'Pet atualizado com sucesso',
            pet: petAtualizado
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao atualizar pets',
            detalhes: error.message
        })
    }
}

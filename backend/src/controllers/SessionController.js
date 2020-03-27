const connection = require('../database/connection');

module.exports = {

    // async index (request,response){
    //     const ong_id = request.headers.authorization; 
    //     const incidents = await connection('incidents').where('ong_id', ong_id).select('*');
    
    //     return response.json(incidents);
    // },

    async create (request,response) {
        const {id} = request.body;

        const ong = await connection('ongs')
            .where('id',id)
            .select('name')
            .first();

        if (!ong){
            return response.status(400).json({ error: 'No ONG found with this ID'})
        }
        return response.json(ong);
    },

    // async delete (request,response){
    //      const { id } = request.params;
    //      const ong_id = request.headers.authorization; 

    //     // const incident = await connection('incidents')
    //     //     .select('ong_id')
    //     //     .where('id',id)
    //     //     .first();
    //     const incident = await connection('incidents')
    //     .where('id',id)
    //     .select('ong_id')
    //     .first();

    //     if(incident.ong_id != ong_id){
    //         return response.status(401).json({ error: 'Operation not permitted'});
    //     }

    //     await connection('incidents').where('id', id).delete();
    
    //     return response.status(204).send();
    // }
};
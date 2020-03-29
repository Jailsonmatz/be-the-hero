const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/*
 * QUERY = Vem pela URL com variavel setada ex: /?name=matz
 * BODY = corpo da requisicao 
 * PARAMS = É o que vem da url sem variavel setada ex: /:id    
 * HEADER = É a parte de configuracao ou autorizacao
*/

routes.post('/sessions',celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })   
}), SessionController.create);

routes.get('/ongs', OngController.index );

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })    
}), OngController.create );


routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()   
    }).unknown()
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index);


routes.post('/incidents', celebrate({

    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().max(20),
        description: Joi.string().required().max(100),
        value: Joi.number().required()
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()   
    }).unknown()

}), IncidentController.create);


routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);

// serve para exportar uma variavel e usar em outro lugar
module.exports = routes;
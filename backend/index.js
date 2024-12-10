const express = require('express')
const sequelize= require('./config/database')
const Producto = require('./modelos/producto')

const cors = require('cors')


const app= express();
app.use(express.json())

app.use(cors())
var port = 5000;




//select ategoryCode, avg(value) from producto group by CategoryCode;

app.get('/promedio-categoria', async(req,resp) =>{

    try {
        
        const result = await Producto.findAll({
            attributes:[
                'categoryCode',
                [sequelize.fn('AVG',sequelize.col('value')),'Promedio_tipo_Categoria']
            ],
            group: ["categoryCode"]
        });

        resp.json(result)

    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }

});

//SELECT COUNT(*) FROM products;

app.get('/cantidad-producto-marca', async(req,resp) =>{

        try {
            const result = await Producto.findAll({
                attributes: [
                    'brandCode',
                    [sequelize.fn('COUNT', sequelize.col('*')), 'total_count'],
                ],
                group: ['brandCode']
            });
            resp.json(result);
        } catch (error) {
            resp.status(500).json({ error: error.message });
        }


});



app.get('/suma-categoria', async(req,resp) =>{

    try {
        
        const result = await Producto.findAll({
            attributes:[
                'categoryCode',
                [sequelize.fn('SUM', sequelize.col('value')), 'Salario_Total']
            ],
            group: ["categoryCode"]
        });

        resp.json(result)

    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }

});


app.listen(port, ()=>{
    console.log('aplicacion ejecutando en puerto:' , port)
})
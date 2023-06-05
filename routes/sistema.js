const express = require('express')
const sistema = express.Router()
const db = require('../config/database')

sistema.post('/', async (req, res, next) =>{
    const { nombre, apellidos, telefono, correo, direccion} = req.body
    
    if(nombre && apellidos && telefono && correo &&  direccion){
    let query="INSERT INTO empleados (nombre, apellidos, telefono, correo, direccion)" 
    query += `VALUES('${nombre}', ${apellidos}, ${telefono}, ${correo}, ${direccion})` 
    
    const rows = await db.query(query)
    
    if(rows.affectedRows ==1){
        return res.status(200).json({code: 201, message: "empleado insertado correctamente"})
    }

    return res.status(500).json({code: 500, message: "Ocurrio un error"})
}
    return res.status(500).json({code: 500, message: "Campos incompletos"})
})

sistema.delete("/:ud([0-9]{1,3})", async (req, res, next) => {
const query = `DELETE FROM empleados WHERE id =${req.params.id}`
const rows = await db.query(query)

if (rows.affectedRows == 1){
    return res.status(200).json({code: 200, message: "Empleado eliminado "})
}

return res.status(404).json({code: 404, message: "Empleado no encontrado "})

})

sistema.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { nombre, apellidos, telefono, correo, direccion} = req.body
     

    if(nombre && apellidos && telefono && correo && direccion){
        let query = `UPDATE empleados SET nombre=${nombre}, apellidos=${apellidos}, telefono=${telefono}, correo=${correo}, direccion=${direccion}, WHERE id =${req.params.id}`
        
        const rows = await db.query(query)
        
        if(rows.affectedRows ==1){
            return res.status(200).json({code: 200, message: "Empleado insertado correctamente"})
        }
    
        return res.status(500).json({code: 500, message: "Ocurrio un error"})
    }
        return res.status(500).json({code: 500, message: "Campos incompletos"})
    

})

sistema.patch("/:id([0-9]{1,3})", async (req, res, next) => {
    if(req.body.nombre){ 
        let query = `UPDATE sistema SET nombre=${req.body.nombre} WHERE id =${req.params.id}`
        const rows = await db.query(query)
        
        if(rows.affectedRows ==1){
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"})
        }
        
        return res.status(500).json({code: 500, message: "Ocurrio un error"})
    }

    return res.status(500).json({code: 500, message: "Campos incompletos"})

})

sistema.get("/", async(req, res, next) => {
    const pkmn = await db.query("SELECT * FROM empleados")
    res.status(200).json({code: 200, message: pkmn})
})

sistema.get('/:id([0-9]{1,3})', async(req, res, next) => {
    const id = req.params.id -1
    if(id >=1 && id <722){
    const empl = await db.query("SELECT * FROM empleados WHERE id=", id, ";")
    return res.status(200).json({code: 200, message: empl})}

    return res.status(404).send({code: 404, message: "empleado no encontrado"})
}) 

sistema.get('/:name([A-Za-z]+)', async(req, res, next) => {
    const name = req.params.name
    const empl = em.filter((p) =>{
        return(p.name.toUpperCase() == name.toUpperCase()) && p
    })
   
   if(empl.length > 0){
    const empl = await db.query("SELECT * FROM empleados WHERE nombre=", name, ";")
    return res.status(200).json({code: 200, message: pkmn})}
   
    
    return res.status(404).send({code: 404, message: "Empleado no encontrado"})
})

module.exports = sistema
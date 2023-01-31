import _ from "lodash";
import jwt from "jsonwebtoken";

import { Users, Roles, Projects, Clients, ProjectUserRoles } from "../../db/sequelize/models/index";

export const login = async ( req, res ) => {
  let body = req.body

  if( _.isEmpty( body.email ) || _.isEmpty( body.password ) ){
    res.status(404).json(
      { message: "Correo ó Contraseña no puede estar vacios." }
    )
  } else {
    try {
      await Users.findOne({ 
        where: { email: body.email },
        include: [
          {
            model: ProjectUserRoles,
            include:[ 
              Roles, 
              { 
                model: Projects,
                include: [Clients]
              }
            ]
          }
        ]
      })
      .then(async user => {
        if( _.isEmpty(user) ) {
          res.status(404).json({ message: "Usuario no existe." })
        } else {
          let isValidPassword = await user.validPassword( body.password )
  
          if (isValidPassword){
            const newToken = jwt.sign(
              { 
                id: user.id, 
                email: user.email
              }
              ,
              'secretKey', 
              { expiresIn: 86400 }
            )

            let clients = await user.ProjectUserRoles.map( project => {
              let client = project.Project.Client
              return client.dataValues
            })

            clients = _.uniqBy(clients, 'id')

            await Promise.all( clients.map( async client => {
              let projects = await user.ProjectUserRoles.filter( project => {
                if(project.Project.client_id === client.id){
                  return project.Project
                }
              })

              projects = await projects.map( projects => {
                delete projects.dataValues.Project.dataValues.Client
                projects.dataValues.Project.dataValues.role = projects.dataValues.Role.dataValues
                return projects.dataValues.Project.dataValues
              })

              if(!_.isEmpty(projects)){
                return client.projects = projects
              }
            }))

            clients = clients.sort( (a,b) => a.id - b.id )

            res.status(200).json({
              user: {
                name: user.name
              },
              clients,
              token: newToken
            })
          } else {
            res.status(401).json({
              message: "Contraseña no valida. Vuelva a intentarlo."
            })
          }
        }
      })
    } catch (error) {
      console.log(error)
      res.status(500).json( { error } )
    }
  }
}

const verify_token = token => {
  try {
    let decoded = jwt.verify( token, 'secretKey' )
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
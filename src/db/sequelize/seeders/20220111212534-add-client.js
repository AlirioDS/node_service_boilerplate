'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async queryInterface => {

    await queryInterface.bulkInsert('Clients', [
      {
        name: "exampleName",
        business_name: "exampleBusinessName",
        rut: "1111111-2",
        direction: "",
        phone: "",
        description: "",
        legal_representative: "Name"
      },
      {
        name: "exampleName2",
        business_name: "exampleBusinessName2",
        rut: "222222-3",
        direction: "",
        phone: "",
        description: "",
        legal_representative: ""
      },
      {
        name: "exampleName3",
        business_name: "exampleBusinessName3",
        rut: "333333-4",
        direction: "",
        phone: "",
        description: "",
        legal_representative: ""
      }
    ], {});

    console.log(`Created Clients`)


    const clientIdExample = await queryInterface.rawSelect('Clients', {
      where: { rut: "1111111-2" }
    }, ['id'])

    const clientIdExample1 = await queryInterface.rawSelect('Clients', {
      where: { rut: "222222-3" }
    }, ['id'])

    const clientIdExample2 = await queryInterface.rawSelect('Clients', {
      where: { rut: "333333-4" }
    }, ['id'])


    await queryInterface.bulkInsert('Projects', [
      {
        name: "product 1",
        description: "",
        client_id: clientIdExample
      },
      {
        name: "product 2",
        description: "",
        client_id: clientIdExample1
      },
      {
        name: "product 3",
        description: "",
        client_id: clientIdExample1
      },
      {
        name: "product 4",
        description: "",
        client_id: clientIdExample2
      },
      {
        name: "product 5",
        description: "",
        client_id: clientIdExample2
      }
    ], {});
  
    console.log(`Created Projects`)


    const salt = await bcrypt.genSaltSync(10, 'a');
    const pwdHash = await bcrypt.hash('123123123', salt)

    await queryInterface.bulkInsert('Users', [
      {
        name: "Alirio",
        last_name: "",
        rut: "111111-2",
        email: "alirio@admin.com",
        password: pwdHash
      },
      {
        name: "Mamelo",
        last_name: "",
        rut: "222222-3",
        email: "Mamelo@admin.com",
        password: pwdHash
      },
      {
        name: "Javier",
        last_name: "",
        rut: "3333333-4",
        email: "javier@admin.com",
        password: pwdHash
      },
      {
        name: "Luis",
        last_name: "",
        rut: "444444-5",
        email: "luis@clientemail.com",
        password: pwdHash
      },
      {
        name: "Carlos",
        last_name: "",
        rut: "555555-6",
        email: "carlos@clientemail.com",
        password: pwdHash
      }
    ], {});

    console.log(`Created Users`)


    await queryInterface.bulkInsert('Roles', [
      { name: 'admin', description: "Administrador del Sistema" },
      { name: 'user_admin', description: "Administrador del proyecto" },
      { name: 'executive', description: "Ejecutivo del proyecto" }
    ], {});

    console.log(`Created Roles`)

    ///PROJECTS
    const projectIdExample1 = await queryInterface.rawSelect('Projects', {
      where: { name: "product 1" }
    }, ['id'])

    const projecIdExample2 = await queryInterface.rawSelect('Projects', {
      where: { name: "product 2" }
    }, ['id'])

    const projecIdExample3 = await queryInterface.rawSelect('Projects', {
      where: { name: "product 3" }
    }, ['id'])

    const projectIdExample4 = await queryInterface.rawSelect('Projects', {
      where: { name: "product 4" }
    }, ['id'])

    const projectIdExample5 = await queryInterface.rawSelect('Projects', {
      where: { name: "product 5" }
    }, ['id'])
    ///PROJECTS

    ///USERS
    const userOne = await queryInterface.rawSelect('Users', {
      where: { rut: "111111-2" }
    }, ['id'])

    const userTwo = await queryInterface.rawSelect('Users', {
      where: { rut: "222222-3" }
    }, ['id'])

    const userThree = await queryInterface.rawSelect('Users', {
      where: { rut: "3333333-4" }
    }, ['id'])

    const userFour = await queryInterface.rawSelect('Users', {
      where: { rut: "444444-5" }
    }, ['id'])

    const userFive = await queryInterface.rawSelect('Users', {
      where: { rut: "555555-6" }
    }, ['id'])
    ///USERS

    ///ROLES
    const admin = await queryInterface.rawSelect('Roles', {
      where: { name: "admin" }
    }, ['id'])

    const user_admin = await queryInterface.rawSelect('Roles', {
      where: { name: "user_admin" }
    }, ['id'])

    const executive = await queryInterface.rawSelect('Roles', {
      where: { name: "executive" }
    }, ['id'])
    ///ROLES

    await queryInterface.bulkInsert('ProjectUserRoles', [
      {
        project_id: projectIdExample1,
        user_id: userOne,
        role_id: admin
      },
      {
        project_id: projecIdExample2,
        user_id: userOne,
        role_id: user_admin
      },
      {
        project_id: projecIdExample3,
        user_id: userOne,
        role_id: user_admin
      },
      {
        project_id: projectIdExample4,
        user_id: userOne,
        role_id: admin
      },
      {
        project_id: projectIdExample5,
        user_id: userOne,
        role_id: executive
      },
      {
        project_id: projectIdExample1,
        user_id: userTwo,
        role_id: admin
      },
      {
        project_id: projectIdExample5,
        user_id: userTwo,
        role_id: admin
      },
      {
        project_id: projectIdExample5,
        user_id: userThree,
        role_id: admin
      },
      {
        project_id: projectIdExample5,
        user_id: userFour,
        role_id: executive
      },
      {
        project_id: projectIdExample5,
        user_id: userFive,
        role_id: user_admin
      }
    ], {});


    console.log("ProjectUserRoles Created")

    console.log("======= OK =======")
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('ProjectUserRoles', null, {});
    await queryInterface.bulkDelete('Clients', null, {});
    await queryInterface.bulkDelete('Projects', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  }
};

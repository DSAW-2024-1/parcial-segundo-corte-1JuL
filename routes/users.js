const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Working from Users");
});

router.post("/",(req, res) => {
  const { name, lastName, email, city, country } = req.query;
  const defaultCity = city || 'Bogotá';
  const defaultCountry = country || 'Colombia';

  // Validate required fields
  if (!name || !lastName || !email) {
    return res.status(400).json({ 
      error: 'Missing required fields', 
      ejemplo_uso: '/users?name=(Nombre)&lastname=(Apellido)&email=(Email)' ,
      ejemplo2_uso_2: '/users?name=(Nombre)&lastName=(Apellido)&email=(Email)&city=(opcional)&country=(opcional)'
    });
  }

  const user = {
    name,
    lastName,
    email,
    city: defaultCity,
    country: defaultCountry
  };

  res.status(201).json(user);
});

router.get("/:count", (req, res) => {
  const people = [
    {
        "Apellido": "ACERO GARCIA",
        "Nombre": "SAMUEL"
    },
    {
        "Apellido": "ALJURI MARTINEZ",
        "Nombre": "DAREK"
    },
    {
        "Apellido": "CEPEDA URIBE",
        "Nombre": "JUAN FELIPE"
    },
    {
        "Apellido": "CHAVES PEREZ",
        "Nombre": "ANA MARIA"
    },
    {
        "Apellido": "CRUZ PAVAS",
        "Nombre": "CARLOS DAVID"
    },
    {
        "Apellido": "DIAZ ALGARIN",
        "Nombre": "DIEGO NORBERTO"
    },
    {
        "Apellido": "DIAZ BERNAL",
        "Nombre": "JORGE ESTEBAN"
    },
    {
        "Apellido": "DIAZ VARGAS",
        "Nombre": "DAVID ESTEBAN"
    },
    {
        "Apellido": "FORERO PEÑA",
        "Nombre": "JUAN JOSE"
    },
    {
        "Apellido": "GUTIERREZ DE PIÑERES BARBOSA",
        "Nombre": "SANTIAGO"
    },
    {
        "Apellido": "LOPEZ HUERTAS",
        "Nombre": "SAMUEL ESTEBAN"
    },
    {
        "Apellido": "MEDINA FERNANDEZ",
        "Nombre": "MICHAEL STEVEN"
    },
    {
        "Apellido": "MORENO CARVAJAL",
        "Nombre": "KATHERIN JULIANA"
    },
    {
        "Apellido": "MORENO PATARROYO",
        "Nombre": "JUAN PABLO"
    },
    {
        "Apellido": "MUÑOZ SENDOYA",
        "Nombre": "NICOLAS ESTEBAN"
    },
    {
        "Apellido": "NAVARRO CUY",
        "Nombre": "SANTIAGO"
    },
    {
        "Apellido": "PARRADO MORALES",
        "Nombre": "JUAN PABLO"
    },
    {
        "Apellido": "RAMIREZ CHINCHILLA",
        "Nombre": "DANIEL SANTIAGO"
    },
    {
        "Apellido": "RESTREPO COCA",
        "Nombre": "JUAN PABLO"
    },
    {
        "Apellido": "REYES GONZALEZ",
        "Nombre": "GABRIELA"
    },
    {
        "Apellido": "RODRIGUEZ FALLA",
        "Nombre": "JUAN JOSE"
    },
    {
        "Apellido": "RUIZ TORRES",
        "Nombre": "VALENTINA"
    },
    {
        "Apellido": "SALAS GUTIERREZ",
        "Nombre": "MARIANA"
    },
    {
        "Apellido": "SANCHEZ SANDOVAL",
        "Nombre": "SEBASTIAN"
    },
    {
        "Apellido": "SARMIENTO GUARNIZO",
        "Nombre": "JOSUE DAVID"
    },
    {
        "Apellido": "SOLER PRADO",
        "Nombre": "SANTIAGO"
    },
    {
        "Apellido": "TAMAYO LOPEZ",
        "Nombre": "MARIA FERNANDA"
    },
    {
        "Apellido": "URREA LARA",
        "Nombre": "DEIVID NICOLAS"
    },
    {
        "Apellido": "AZCONA",
        "Nombre": "ANDRÉS"
    }
  ]
  const order = req.query.order;
  const defaultOrder = order || 'ASC';
  let sortedPeople;
  try {
    const count = parseInt(req.params.count);
    if (isNaN(count)) {
        throw new Error("El valor proporcionado no es un número");
    }else{
      if (defaultOrder === 'ASC') {
        sortedPeople = people.sort((a, b) => {
            const lastNameA = a.Apellido;
            const lastNameB = b.Apellido;
            return lastNameA.localeCompare(lastNameB);
        });
      } else if (defaultOrder === 'DESC') {
          sortedPeople = people.sort((a, b) => {
              const lastNameA = a.Apellido;
              const lastNameB = b.Apellido;
              return lastNameB.localeCompare(lastNameA);
          });
      } else {
          return res.status(400).json({ error: "El parámetro de consulta 'order' debe ser 'ASC' o 'DESC'" });
      }
    
      const limitedPeople = sortedPeople.slice(0, count);
      res.json(limitedPeople);

    }
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      ejemplo_uso: '/users/(num)',
      ejemplo_uso_2: '/users/(num)?order=ASC'
    });
  }

});

module.exports = router;
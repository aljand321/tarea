var express = require('express');
var router = express.Router();

var Food = require("../../../database/collections/food");
var Ingredientes = require("../../../database/collections/ingredientes");


//crud
//creacionde food

router.post("/food", (req, res) => {

  var food = {
    name : req.body.name,
    descripcion : req.body.descripcion,
    ingredients : req.body.ingredients
  };
  var foodData = new Food(food);

  foodData.save().then( () => {
      res.status(200).json({
        "msn" : "Registrado con exito"
      });
  });

});

//read food

router.get("/food", (req, res, next) =>{
  Food.find({}).exec( (error, docs) => {
      res.status(200).json(docs);
  })
});


 //only read food
 router.get(/food\/[a-z0-9]{1,}$/, (req, res) => {
   var url = req.url;
   var id = url.split("/")[2];
   Food.findOne({_id : id}).exec( (error, docs) => {
     if (docs != null) {
         res.status(200).json(docs);
         return;
     }

     res.status(200).json({
       "msn" : "No existe la receta "
     });
   })
 });

//eliminar food (comidas)

router.delete(/food\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Food.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});

//actualizar food

router.put(/food\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['name', 'descripcion', 'ingredients'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hacer uso del metodo patch si desea editar solo un fragmentode la informacion"
    });
    return;
  }

  var food = {
    name : req.body.name,
    descripcion : req.body.descripcion,
    ingredients : req.body.ingredients
  };
  Food.findOneAndUpdate({_id: id}, food, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});

//creamos ingredientes

router.post("/ingredientes", (req, res) => {
  if (req.body.name == "" && req.body.kcal == "" && req.body.peso == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var ingredientes = {
    name : req.body.name,
    kcal : req.body.kcal,
    peso : req.body.peso
  };

  var ingredientesData = new Ingredientes(ingredientes);

  ingredientesData.save().then( () => {
    res.status(200).json({
      "msn" : "Ingrediente Registrado con exito "
    });
  });
});

//leer ingredientes

router.get("/ingredientes", (req, res, next) => {
  Ingredientes.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});

//solo leer un ingrediente con id

router.get(/ingredientes\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Ingredientes.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el ingrediente"
    });
  })
});

//eliminar ingrediente

router.delete(/ingredientes\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Ingredientes.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});

//actualizar ingredientes 
router.patch(/ingredientes\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var ingredientes = {};
  for (var i = 0; i < keys.length; i++) {
    ingredientes[keys[i]] = req.body[keys[i]];
  }
  Ingredientes.findOneAndUpdate({_id: id}, ingredientes, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});




/* GET home page. */

//prueba del ing con postman
/*router.post('/imc', function(req, res, next) {
  var imc = Number(req.body.masa) / Math.pow(Number(req.body.altura), 2)
	if (imc < 16) {
		res.send(
		{
			"msn" : "Delgadez severa"
		});
	}else if (imc > 16 && imc < 16.99) {
		res.send(
		{
			"msn" : "Delgadez moderada"
		});
	}else if (imc > 17 && imc < 18.49) {
		res.send(
		{
			"msn" : "Delgadez leve"
		});
	}else if (imc >= 18.5 && imc <= 24.99) {
		res.send(
		{
			"msn" : "Normal"
		});
	}else if (imc >= 25 && imc <= 29.99) {
		res.send(
		{
			"msn" : "Sobre Peso"
		});
	}else if (imc >= 30 && imc <= 39.99) {
		res.send(
		{
			"msn" : "Obesidad "
		});
	}else  if(imc >= 40){
		res.send(
		{
			"msn" : "Obesidad morbida"
		});
	}else {
		res.send(
		{
			"msn" : "Error en los datos "
		});
	}*/
  //res.render('index', { title: 'Express' });
//});

module.exports = router;

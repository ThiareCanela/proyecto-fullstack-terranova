package com.terranova.terranova.controller;

import com.terranova.terranova.entity.CategoriaTours;
import com.terranova.terranova.exception.ResourceNotFoundException;
import com.terranova.terranova.service.CategoriaToursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("catgeriaTours")
public class CategoriaToursController {
    @Autowired
    private CategoriaToursService categoriaToursService;

    @PostMapping
    public ResponseEntity<CategoriaTours> guardarCategoriaTours(@RequestBody CategoriaTours categoriaTours){
        return new ResponseEntity<>(categoriaToursService.guardarCategoriaTours(categoriaTours), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<String> actualizarCategoriaTours(@RequestBody CategoriaTours categoriaTours)throws ResourceNotFoundException {
        Optional<CategoriaTours> categoriaToursActualizar = categoriaToursService.buscarCategoriaToursPorId(categoriaTours.getId());
        if (categoriaToursActualizar.isPresent()) {
            categoriaToursService.actualizarCategoriaTours(categoriaTours);
            return new ResponseEntity<>("Actualizado con exito", HttpStatus.OK);
        }
        throw new ResourceNotFoundException("No se encontro la categoria de tours");
    }

    @GetMapping
    public ResponseEntity<List<CategoriaTours>> listarCategoriasTours(){
       List<CategoriaTours>todasLasCategoriasTours = categoriaToursService.buscarTodasLasCategoriasTours();
       if(todasLasCategoriasTours.isEmpty()){
           return new ResponseEntity<>(HttpStatus.NO_CONTENT);
       }
         return new ResponseEntity<>(todasLasCategoriasTours,HttpStatus.OK);
    }

    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<Optional<CategoriaTours>> buscarCategoriaToursPorNombre(@PathVariable String nombre) throws ResourceNotFoundException {
        Optional<CategoriaTours> categoriaTours = categoriaToursService.buscarCategoriaToursPorNombre(nombre);
        if(categoriaTours.isPresent()){
            return new ResponseEntity<>(categoriaTours,HttpStatus.OK);
        }
        throw new ResourceNotFoundException("No se encontro la categoria de tours por ese nombre");
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Optional<CategoriaTours>> buscarCategoriaToursPorId(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<CategoriaTours> categoriaTours = categoriaToursService.buscarCategoriaToursPorId(id);
        if (categoriaTours.isPresent()) {
            return new ResponseEntity<>(categoriaTours, HttpStatus.OK);
        }
        throw new ResourceNotFoundException("No se encontro la categoria de tours por ese id");
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCategoriaTours(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<CategoriaTours> categoriaTours = categoriaToursService.buscarCategoriaToursPorId(id);
        if (categoriaTours.isPresent()) {
            categoriaToursService.eliminarCategoriaTours(id);
            return new ResponseEntity<>("Odontologo Eliminado con Exito", HttpStatus.OK);
        } else {
            throw new ResourceNotFoundException("No se encontro la categoria de tours por ese id");
        }
    }


}

package com.terranova.terranova.service;

import com.terranova.terranova.entity.CategoriaTours;
import com.terranova.terranova.repository.ICategoriaToursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaToursService {
    @Autowired
    private ICategoriaToursRepository categoriaToursRepository;

   public CategoriaTours guardarCategoriaTours(CategoriaTours categoriaTours){
       return categoriaToursRepository.save(categoriaTours);
   }

  public void actualizarCategoriaTours(CategoriaTours categoriaTours){
      categoriaToursRepository.save(categoriaTours);
  }

  public void eliminarCategoriaTours(Long id){
      categoriaToursRepository.deleteById(id);
  }
  public Optional<CategoriaTours> buscarCategoriaToursPorId(Long id){
      return categoriaToursRepository.findById(id);
  }

    public Optional<CategoriaTours> buscarCategoriaToursPorNombre(String nombre){
        return categoriaToursRepository.findByNombre(nombre);
    }

    public List<CategoriaTours> buscarTodasLasCategoriasTours(){
        return categoriaToursRepository.findAll();
    }

}

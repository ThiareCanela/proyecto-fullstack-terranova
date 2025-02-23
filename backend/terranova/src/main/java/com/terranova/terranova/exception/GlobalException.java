package com.terranova.terranova.exception;

import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException {
    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<String> tratamientoResourceNotFoundException(ResourceNotFoundException rnfe){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("mensaje: "+rnfe.getMessage());
    }

    @ExceptionHandler({org.apache.coyote.BadRequestException.class})
    public ResponseEntity<String> manejoBadRequestException(BadRequestException err){
        return new ResponseEntity<>("mensaje: " + err.getMessage(), HttpStatus.BAD_REQUEST);
    }
}

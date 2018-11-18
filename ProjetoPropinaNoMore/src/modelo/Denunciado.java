package modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Denunciado {
    
    @Id
    @GeneratedValue
    private long id;
    private String nome;
    private String cargo;
    private String infoAdicional;
   
    
}

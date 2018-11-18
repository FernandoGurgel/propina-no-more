package modelo;

import java.util.Collection;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Denuncia {
    
    @Id
    @GeneratedValue
    private long id;
    private int ano;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "orgao_id")
    private Orgao orgao;
    
    private boolean sigilo;
    private String cpf;
    private String nome;
    private String email;
    private String telefone;
    
    @OneToMany
    private Collection<Denunciado> denunciado;
    
    private String oque;
    private String quando;
    private String onde; 
    
    @OneToMany
    private Collection<Prova> prova;
    
    
    
}

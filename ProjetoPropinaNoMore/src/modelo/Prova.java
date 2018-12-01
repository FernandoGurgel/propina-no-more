/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Prova {
    
    @Id
    @GeneratedValue
    private long id;
    @Enumerated(EnumType.STRING)
    private TipoProva tipoProva;
    private String caminhoArquivoServidor;
    
}

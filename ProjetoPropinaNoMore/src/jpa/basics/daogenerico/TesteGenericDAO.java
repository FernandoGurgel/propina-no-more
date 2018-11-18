package jpa.basics.daogenerico;

import jpa.basics.connectionfactory.ConnectionFactory;
import modelo.Denunciado;
import modelo.Orgao;

public class TesteGenericDAO {
    public static void main(String[] args) {
        
        GenericDAO<Orgao> dao = new GenericDAO<>
                                         (ConnectionFactory.getEntityManagerUpdate());
        
        dao.save(new Orgao("UEA", "UNIVERSIDADE DO ESTADO DO AMAZONAS"));
        
        ConnectionFactory.closeEntityFactory();
        
        
    }
}

package jpa.basics.daogenerico;

import jpa.basics.connectionfactory.ConnectionFactory;

public class TesteGenericDAO {
    public static void main(String[] args) {
        
        ConnectionFactory.getEntityManagerCreate();
        
        ConnectionFactory.closeEntityFactory();
        
        
    }
}

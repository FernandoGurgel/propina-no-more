package jpa.basics.connectionfactory;

public class GeraTabelas {
    public static void main(String[] args) {
        
        ConnectionFactory.getEntityManagerCreate();        
        ConnectionFactory.closeEntityFactory();
        
    }
}

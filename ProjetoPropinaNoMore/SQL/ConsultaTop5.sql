show tables;

INSERT INTO `propinanomore`.`denuncia` (`id`, `ano`, `cpf`, `email`, `nome`, `onde`, `oque`, `quando`, `sigilo`, `telefone`, `edital_id`, `orgao_id`) VALUES ('1', '2222', '22', '222r', 'ssssss', 'ddddddd', 'fffff', 'dddddd', 0, '55555555', '1', '1');
INSERT INTO `propinanomore`.`denuncia` (`id`, `ano`, `cpf`, `email`, `nome`, `onde`, `oque`, `quando`, `sigilo`, `telefone`, `edital_id`, `orgao_id`) VALUES ('2', '3333', '232323', '23r23r', 'ssssssss', 'dddddd', 'hhhh', 'ddddddddd', 1, '5555555', '1', '1');

select * from orgao;
select * from edital;
describe denuncia;

drop procedure listar_top5;
DELIMITER $$
CREATE  PROCEDURE listar_top5 (ano INT)
BEGIN
	select count(*), o.nome, o.sigla from denuncia d
	inner join orgao o on o.id = d.orgao_id
    where d.ano = ano
    order by count(*);
END $$
DELIMITER ;

call listar_top5(2222);
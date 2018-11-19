#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
ano = 2016
for i in range(3):
    print("Iniciando extração do ano "+str(ano));
    data = 'bases/export_transparencia_'+str(ano)+'.csv'
    dataset = pd.read_csv(data, sep=";")
    dataset['Preco_Maximo'] = dataset['Preco_Maximo'].apply(lambda x: 0.0 if(x=='-') else float(x))

    print("Somando os valores e organizando-os")
    compras = dataset.groupby(['UG_Sigla', 'Edital/Registro', 'Objeto', 'Empresa', 'Situacao_Objeto','Preco_Maximo'])['Preco_Maximo']
    compras = compras.agg('sum')
    grupos = compras.sort_values()
    
    print("Organizando os dados no formato JSON")
    t = dict(grupos)
    dados = []
    for i in t.keys():
        dados.append({'ano': str(ano),'sigla':i[0], 'edital':i[1], 'objeto':i[2], 'empresa': i[3], 'situacao':i[4], 'valor':i[5]})
  
    import json 
    print("Gravando os dados em um arquivo JSON")
    with open('json_edital/valor_edital_'+str(ano)+'.json', 'w', encoding='utf-8') as file:
        json.dump(dados, file,  ensure_ascii=False)

    print("valor_edital_"+str(ano)+".json gerado")
    ano = ano + 1
print("Terminado")  
    


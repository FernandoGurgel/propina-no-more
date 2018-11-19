#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
import numpy as np
import os
import json 

path = os.getcwd()
ano = 2016
for i in range(3):
    print("Iniciando extração do ano "+str(ano));
    data = path+'/bases/export_transparencia_'+str(ano)+'.csv'
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
           
    print("Gravando os dados em um arquivo JSON")
    jsonFile = path+'/json_edital/valor_edital_'+str(ano)+'.json'
    with open(jsonFile, 'w', encoding='utf-8') as file:
        json.dump(dados, file,  ensure_ascii=False)

    print("valor_edital_"+str(ano)+".json gerado")
    ano = ano + 1
print("OrgaosDenunciados.py terminado")  
    


#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
import json 
## Importação dos dados
ano = 2016
for i in range(3):
    print("Importando dados de "+str(ano))
    arquivo = 'bases/export_transparencia_'+str(ano)+'.csv'
    print("Link de extração: "+arquivo)
    data = arquivo
    dataset = pd.read_csv(data, sep=";")

    ## Convertendo os valores em float
    print("Convertendo dados de "+str(ano)+" em float")
    dataset['Preco_Maximo'] = dataset['Preco_Maximo'].apply(lambda x: 0.0 if(x=='-') else float(x))
    dataset['Preco_Maximo'].values.astype(np.float32).sum()

    # Ordenando por ordem de gastadores 
    print("Ordenando os órgãos pelo total de gastos de "+str(ano))
    total = dataset.groupby(['UG_Sigla'])['Preco_Maximo'].sum().reset_index()
    total = total.sort_values(by='Preco_Maximo', ascending=False)
    
    #Organizando os dados em formato json
    dados = total.to_dict('records')
    listaDados = list(dados)
    top4 = []
    for i in range(5):
        top4.append(listaDados[i])
    top4

    jsonFile = 'json_gastometro/gastometro'+str(ano)+'.json'
    with open(jsonFile, 'w', encoding='utf-8') as file:
        json.dump(top4, file,  ensure_ascii=False)

    print("Dados de "+str(ano)+" extraídos com sucesso! Json criado: "+jsonFile+"\n")
    ano = ano + 1
print("Script finalizado")


# In[ ]:





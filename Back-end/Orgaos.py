#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
import numpy as np
import json
import os

path = os.getcwd()
print("1 - Iniciando extração")
data = path+'/bases/export_transparencia_2018.csv'
print(data)
dataset = pd.read_csv(data, sep=";")

unidades = dataset['UG_Sigla']
teste = dataset.groupby(['UG_Sigla','UG_Nome'])['UG_Sigla','UG_Nome']

print("2 - Organizando os ddos em JSON")
t = dict(teste.count()['UG_Sigla'])
dados = []
for i in t.keys():
    dados.append({'sigla': i[0], 'nome': i[1]}) 
#     print(i[1])

print("3 - Gravando arquivo JSON")
arquivo = path+'/json/orgaos.json'
with open(arquivo, 'w', encoding='utf-8') as file:
    json.dump(dados, file,  ensure_ascii=False)  
    
print("Arquivo "+arquivo+" gerado com sucesso!")


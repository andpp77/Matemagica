
const perguntas = [
  {
    "id": 1,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "2 + 3 = ?",
    "alternativas": { "a": "4", "b": "5", "c": "6", "d": "7" },
    "correta": "b",
    "dica": "Junte dois brilhos com três e conte tudo.",
    "pontos": 10.0
  },
  {
    "id": 2,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "4 + 1 = ?",
    "alternativas": { "a": "5", "b": "6", "c": "4", "d": "3" },
    "correta": "a",
    "dica": "Pense no número que vem logo depois do 4.",
    "pontos": 10.0
  },
  {
    "id": 3,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "7 - 2 = ?",
    "alternativas": { "a": "4", "b": "6", "c": "5", "d": "3" },
    "correta": "c",
    "dica": "Comece em 7 e conte dois passos pra trás.",
    "pontos": 10.0
  },
  {
    "id": 4,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "5 + 4 = ?",
    "alternativas": { "a": "8", "b": "9", "c": "10", "d": "7" },
    "correta": "b",
    "dica": "Junte cinco e quatro e conte todas as unidades.",
    "pontos": 10.0
  },
  {
    "id": 5,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "8 - 3 = ?",
    "alternativas": { "a": "6", "b": "4", "c": "5", "d": "3" },
    "correta": "c",
    "dica": "Tire três do oito, contando para trás.",
    "pontos": 10.0
  },
  {
    "id": 6,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "6 + 2 = ?",
    "alternativas": { "a": "7", "b": "8", "c": "9", "d": "10" },
    "correta": "b",
    "dica": "Adicione duas unidades ao número seis e conte.",
    "pontos": 10.0
  },
  {
    "id": 7,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "9 - 4 = ?",
    "alternativas": { "a": "4", "b": "5", "c": "6", "d": "3" },
    "correta": "b",
    "dica": "Se o mago tirou quatro, conte o que ficou do nove.",
    "pontos": 10.0
  },
  {
    "id": 8,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "3 + 3 = ?",
    "alternativas": { "a": "5", "b": "6", "c": "4", "d": "7" },
    "correta": "b",
    "dica": "Dois grupos de três se juntam — conte todo o grupo.",
    "pontos": 10.0
  },
  {
    "id": 9,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "7 + 2 = ?",
    "alternativas": { "a": "9", "b": "8", "c": "10", "d": "7" },
    "correta": "a",
    "dica": "Some duas unidades ao sete e conte o total.",
    "pontos": 10.0
  },
  {
    "id": 10,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "10 - 6 = ?",
    "alternativas": { "a": "5", "b": "4", "c": "3", "d": "6" },
    "correta": "b",
    "dica": "Tire seis do dez e conte o que resta.",
    "pontos": 10.0
  },
  {
    "id": 11,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "2 + 7 = ?",
    "alternativas": { "a": "8", "b": "9", "c": "10", "d": "7" },
    "correta": "b",
    "dica": "Junte dois com sete e conte todos.",
    "pontos": 10.0
  },
  {
    "id": 12,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "8 - 5 = ?",
    "alternativas": { "a": "2", "b": "3", "c": "4", "d": "1" },
    "correta": "b",
    "dica": "Subtraia cinco de oito, contando para trás.",
    "pontos": 10.0
  },
  {
    "id": 13,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "6 + 3 = ?",
    "alternativas": { "a": "8", "b": "9", "c": "7", "d": "10" },
    "correta": "b",
    "dica": "Some três ao seis e veja o total.",
    "pontos": 10.0
  },
  {
    "id": 14,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "5 - 2 = ?",
    "alternativas": { "a": "2", "b": "3", "c": "4", "d": "1" },
    "correta": "b",
    "dica": "Retire duas unidades do cinco e conte o que ficou.",
    "pontos": 10.0
  },
  {
    "id": 15,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "4 + 5 = ?",
    "alternativas": { "a": "8", "b": "9", "c": "7", "d": "10" },
    "correta": "b",
    "dica": "Junte quatro e cinco e conte todas as unidades.",
    "pontos": 10.0
  },
  {
    "id": 16,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "10 - 7 = ?",
    "alternativas": { "a": "2", "b": "3", "c": "4", "d": "1" },
    "correta": "b",
    "dica": "Subtraia sete do dez passo a passo.",
    "pontos": 10.0
  },
  {
    "id": 17,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "3 + 6 = ?",
    "alternativas": { "a": "8", "b": "9", "c": "7", "d": "10" },
    "correta": "b",
    "dica": "Some seis ao três e conte o resultado.",
    "pontos": 10.0
  },
  {
    "id": 18,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "7 - 5 = ?",
    "alternativas": { "a": "1", "b": "2", "c": "3", "d": "4" },
    "correta": "b",
    "dica": "Tire cinco do sete e conte o que resta.",
    "pontos": 10.0
  },
  {
    "id": 19,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "1 + 8 = ?",
    "alternativas": { "a": "8", "b": "9", "c": "10", "d": "7" },
    "correta": "b",
    "dica": "Adicione uma unidade ao oito e conte.",
    "pontos": 10.0
  },
  {
    "id": 20,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "9 - 1 = ?",
    "alternativas": { "a": "7", "b": "8", "c": "9", "d": "6" },
    "correta": "b",
    "dica": "Um a menos que nove é oito; conte para trás.",
    "pontos": 10.0
  },
  {
    "id": 21,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "4 + 4 = ?",
    "alternativas": { "a": "7", "b": "8", "c": "6", "d": "9" },
    "correta": "b",
    "dica": "Duas partes iguais de quatro formam o dobro.",
    "pontos": 10.0
  },
  {
    "id": 22,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "10 - 9 = ?",
    "alternativas": { "a": "1", "b": "0", "c": "2", "d": "3" },
    "correta": "a",
    "dica": "Se nove somem do dez, sobra uma unidade.",
    "pontos": 10.0
  },
  {
    "id": 23,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "8 + 1 = ?",
    "alternativas": { "a": "9", "b": "8", "c": "10", "d": "7" },
    "correta": "a",
    "dica": "Adicione um ao oito; qual número vem depois?",
    "pontos": 10.0
  },
  {
    "id": 24,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "6 - 3 = ?",
    "alternativas": { "a": "2", "b": "3", "c": "4", "d": "1" },
    "correta": "b",
    "dica": "Retire três do seis e conte o que sobrou.",
    "pontos": 10.0
  },
  {
    "id": 25,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "7 + 1 = ?",
    "alternativas": { "a": "7", "b": "8", "c": "9", "d": "6" },
    "correta": "b",
    "dica": "Um a mais que sete é oito; conte com calma.",
    "pontos": 10.0
  },
  {
    "id": 26,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "5 + 2 = ?",
    "alternativas": { "a": "6", "b": "7", "c": "8", "d": "5" },
    "correta": "b",
    "dica": "Junte dois ao cinco e conte o total.",
    "pontos": 10.0
  },
  {
    "id": 27,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "8 - 6 = ?",
    "alternativas": { "a": "3", "b": "2", "c": "4", "d": "1" },
    "correta": "b",
    "dica": "Tire seis do oito e conte o que resta.",
    "pontos": 10.0
  },
  {
    "id": 28,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "3 + 5 = ?",
    "alternativas": { "a": "7", "b": "8", "c": "9", "d": "6" },
    "correta": "b",
    "dica": "Some três com cinco e conte todos os itens.",
    "pontos": 10.0
  },
  {
    "id": 29,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "9 - 8 = ?",
    "alternativas": { "a": "1", "b": "2", "c": "0", "d": "3" },
    "correta": "a",
    "dica": "Nove menos oito deixa uma única luz.",
    "pontos": 10.0
  },
  {
    "id": 30,
    "nivel": "facil",
    "tipo": "equacao",
    "pergunta": "4 + 2 = ?",
    "alternativas": { "a": "5", "b": "6", "c": "7", "d": "8" },
    "correta": "b",
    "dica": "Adicione duas unidades ao quatro e conte o total.",
    "pontos": 10.0
  },
  {
    "id": 31,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Luna tinha 3 maçãs e ganhou mais 2. Quantas maçãs ela tem agora?",
    "alternativas": { "a": "4", "b": "5", "c": "6", "d": "7" },
    "correta": "b",
    "dica": "Junte o que ela tinha com o que ganhou e conte tudo.",
    "pontos": 10.0
  },
  {
    "id": 32,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Pedro tinha 5 balas e comeu 2. Quantas sobraram?",
    "alternativas": { "a": "2", "b": "3", "c": "4", "d": "5" },
    "correta": "b",
    "dica": "Tire duas do total e conte o que ficou.",
    "pontos": 10.0
  },
  {
    "id": 33,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Uma bruxinha fez 4 poções e depois mais 3. Quantas poções ela tem?",
    "alternativas": { "a": "6", "b": "7", "c": "8", "d": "9" },
    "correta": "b",
    "dica": "Some os dois grupos de poções e conte o total.",
    "pontos": 10.0
  },
  {
    "id": 34,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Havia 6 sapinhos no lago. 1 pulou fora. Quantos ficaram?",
    "alternativas": { "a": "4", "b": "5", "c": "6", "d": "7" },
    "correta": "b",
    "dica": "Tire um sapinho do total e veja quantos restaram.",
    "pontos": 10.0
  },
  {
    "id": 35,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Um mago tinha 2 varinhas e comprou mais 4. Quantas varinhas tem agora?",
    "alternativas": { "a": "5", "b": "6", "c": "7", "d": "8" },
    "correta": "b",
    "dica": "Adicione o que ele já tinha ao que comprou e conte.",
    "pontos": 10.0
  },
  {
    "id": 36,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Ana tinha 10 moedas e perdeu 3. Com quantas ficou?",
    "alternativas": { "a": "7", "b": "6", "c": "8", "d": "9" },
    "correta": "a",
    "dica": "Retire três do total inicial e conte as que restaram.",
    "pontos": 10.0
  },
  {
    "id": 37,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "João viu 2 dragõezinhos e depois mais 5 apareceram. Quantos são no total?",
    "alternativas": { "a": "6", "b": "7", "c": "8", "d": "9" },
    "correta": "b",
    "dica": "Some os que já estavam com os que chegaram e conte tudo.",
    "pontos": 10.0
  },
  {
    "id": 38,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Tinha 8 estrelas no céu. 3 caíram. Quantas ficaram?",
    "alternativas": { "a": "4", "b": "5", "c": "6", "d": "7" },
    "correta": "b",
    "dica": "Tire três das oito estrelas e veja as que permanecem.",
    "pontos": 10.0
  },
  {
    "id": 39,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Um elfo tinha 9 flores e deu 4 pra fada. Quantas flores ficaram com ele?",
    "alternativas": { "a": "4", "b": "5", "c": "6", "d": "7" },
    "correta": "b",
    "dica": "Retire as dadas e conte as que ficaram com o elfo.",
    "pontos": 10.0
  },
  {
    "id": 40,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "No jardim, há 3 borboletas azuis e 4 amarelas. Quantas borboletas há no total?",
    "alternativas": { "a": "6", "b": "7", "c": "8", "d": "9" },
    "correta": "b",
    "dica": "Junte as borboletas das duas cores e conte o total.",
    "pontos": 10.0
  },
  {
    "id": 41,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Um coelho tinha 7 cenouras e comeu 2. Quantas ainda tem?",
    "alternativas": { "a": "4", "b": "5", "c": "6", "d": "7" },
    "correta": "b",
    "dica": "Subtraia as comidas do total inicial e conte o que restou.",
    "pontos": 10.0
  },
  {
    "id": 42,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Uma fada colheu 3 flores de manhã e 3 à tarde. Quantas flores ela colheu no dia?",
    "alternativas": { "a": "5", "b": "6", "c": "7", "d": "8" },
    "correta": "b",
    "dica": "Some as flores dos dois momentos do dia e conte o total.",
    "pontos": 10.0
  },
  {
    "id": 43,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Havia 5 passarinhos e mais 5 chegaram. Quantos há agora?",
    "alternativas": { "a": "8", "b": "9", "c": "10", "d": "11" },
    "correta": "c",
    "dica": "Junte os dois grupos de passarinhos e conte todos.",
    "pontos": 10.0
  },
  {
    "id": 44,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Um maguinho tinha 4 pedras mágicas e perdeu 2. Quantas sobraram?",
    "alternativas": { "a": "1", "b": "2", "c": "3", "d": "4" },
    "correta": "b",
    "dica": "Retire as perdidas do total inicial e conte as que restaram.",
    "pontos": 10.0
  },
  {
    "id": 45,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Clara tinha 1 pirulito e ganhou mais 6. Quantos tem agora?",
    "alternativas": { "a": "6", "b": "7", "c": "8", "d": "9" },
    "correta": "b",
    "dica": "Some o que ela já tinha com o que ganhou e conte tudo.",
    "pontos": 10.0
  },
  {
    "id": 46,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "O dragão dormia em 9 pedras e destruiu 3. Quantas sobraram?",
    "alternativas": { "a": "5", "b": "6", "c": "7", "d": "8" },
    "correta": "b",
    "dica": "Tire as quebradas do total e conte as que ficaram.",
    "pontos": 10.0
  },
  {
    "id": 47,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Tinha 2 gatos na sala e entraram mais 4. Quantos gatos há agora?",
    "alternativas": { "a": "5", "b": "6", "c": "7", "d": "8" },
    "correta": "b",
    "dica": "Some os que já estavam com os que chegaram para contar o total.",
    "pontos": 10.0
  },
  {
    "id": 48,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Um menino encontrou 8 moedas e deu 5 ao amigo. Com quantas ficou?",
    "alternativas": { "a": "2", "b": "3", "c": "4", "d": "5" },
    "correta": "b",
    "dica": "Subtraia as entregues do total inicial e conte o resto.",
    "pontos": 10.0
  },
  {
    "id": 49,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Havia 10 balões e 4 estouraram. Quantos sobraram?",
    "alternativas": { "a": "5", "b": "6", "c": "7", "d": "8" },
    "correta": "b",
    "dica": "Tire os que estouraram do total e veja quantos ainda existem.",
    "pontos": 10.0
  },
  {
    "id": 50,
    "nivel": "facil",
    "tipo": "texto",
    "pergunta": "Uma fada tinha 7 cristais e ganhou mais 2. Quantos tem agora?",
    "alternativas": { "a": "8", "b": "9", "c": "10", "d": "11" },
    "correta": "b",
    "dica": "Some o que ela já tinha com os novos cristais e conte.",
    "pontos": 10.0
  },
  {
    "id": 51,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "5 × 2 = ?",
    "alternativas": { "a": "8", "b": "10", "c": "12", "d": "9" },
    "correta": "b",
    "dica": "Repita o cinco duas vezes e some os grupos.",
    "pontos": 20.0
  },
  {
    "id": 52,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "9 ÷ 3 = ?",
    "alternativas": { "a": "2", "b": "3", "c": "4", "d": "5" },
    "correta": "b",
    "dica": "Veja quantos grupos de três cabem dentro do nove.",
    "pontos": 20.0
  },
  {
    "id": 53,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "6 × 3 = ?",
    "alternativas": { "a": "12", "b": "15", "c": "18", "d": "21" },
    "correta": "c",
    "dica": "Some seis três vezes para ver o total.",
    "pontos": 20.0
  },
  {
    "id": 54,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "12 ÷ 4 = ?",
    "alternativas": { "a": "2", "b": "3", "c": "4", "d": "6" },
    "correta": "b",
    "dica": "Divida doze em quatro partes iguais e conte uma delas.",
    "pontos": 20.0
  },
  {
    "id": 55,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "8 + 7 = ?",
    "alternativas": { "a": "14", "b": "15", "c": "16", "d": "17" },
    "correta": "b",
    "dica": "Some oito com sete, conte a soma com calma.",
    "pontos": 20.0
  },
  {
    "id": 56,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "15 - 8 = ?",
    "alternativas": { "a": "6", "b": "7", "c": "8", "d": "9" },
    "correta": "b",
    "dica": "Conte de oito até quinze para ver a diferença.",
    "pontos": 20.0
  },
  {
    "id": 57,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "7 × 2 = ?",
    "alternativas": { "a": "12", "b": "13", "c": "14", "d": "15" },
    "correta": "c",
    "dica": "Dobre o sete somando sete mais sete.",
    "pontos": 20.0
  },
  {
    "id": 58,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "10 ÷ 2 = ?",
    "alternativas": { "a": "4", "b": "5", "c": "6", "d": "8" },
    "correta": "b",
    "dica": "Divida dez em duas partes iguais e veja quanto cada uma tem.",
    "pontos": 20.0
  },
  {
    "id": 59,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "6 × 4 = ?",
    "alternativas": { "a": "20", "b": "22", "c": "23", "d": "24" },
    "correta": "d",
    "dica": "Some seis quatro vezes; conte cada grupo de seis.",
    "pontos": 20.0
  },
  {
    "id": 60,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "16 - 9 = ?",
    "alternativas": { "a": "6", "b": "7", "c": "8", "d": "9" },
    "correta": "b",
    "dica": "Conte de nove até dezesseis para achar a diferença.",
    "pontos": 20.0
  },
  {
    "id": 61,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "3 × 5 = ?",
    "alternativas": { "a": "12", "b": "13", "c": "14", "d": "15" },
    "correta": "d",
    "dica": "Repita o cinco três vezes e some os resultados.",
    "pontos": 20.0
  },
  {
    "id": 62,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "18 ÷ 6 = ?",
    "alternativas": { "a": "2", "b": "3", "c": "4", "d": "6" },
    "correta": "b",
    "dica": "Quantos grupos de seis formam dezoito? Conte-os.",
    "pontos": 20.0
  },
  {
    "id": 63,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "7 × 3 = ?",
    "alternativas": { "a": "18", "b": "19", "c": "20", "d": "21" },
    "correta": "d",
    "dica": "Some sete três vezes para achar o total.",
    "pontos": 20.0
  },
  {
    "id": 64,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "14 ÷ 2 = ?",
    "alternativas": { "a": "5", "b": "6", "c": "7", "d": "8" },
    "correta": "c",
    "dica": "Metade de quatorze é quantas unidades? Pense na metade.",
    "pontos": 20.0
  },
  {
    "id": 65,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "9 + 8 = ?",
    "alternativas": { "a": "16", "b": "17", "c": "18", "d": "19" },
    "correta": "b",
    "dica": "Some nove com oito contando um por um.",
    "pontos": 20.0
  },
  {
    "id": 66,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "5 × 5 = ?",
    "alternativas": { "a": "20", "b": "24", "c": "25", "d": "30" },
    "correta": "c",
    "dica": "Cinco repetido cinco vezes forma o resultado.",
    "pontos": 20.0
  },
  {
    "id": 67,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "20 ÷ 4 = ?",
    "alternativas": { "a": "3", "b": "4", "c": "5", "d": "6" },
    "correta": "c",
    "dica": "Quantas vezes quatro cabe em vinte? Pense em grupos iguais.",
    "pontos": 20.0
  },
  {
    "id": 68,
    "nivel": "medio",
    "tipo": "equacao",
    "pergunta": "11 - 7 = ?",
    "alternativas": { "a": "3", "b": "4", "c": "5", "d": "6" },
    "correta": "b",
    "dica": "Conte de sete até onze para achar a diferença.",
    "pontos": 20.0
  },
  {
    "id": 69,
    "nivel": "medio",
    "tipo": "texto",
    "pergunta": "Lucas comprou 3 pacotes com 6 figurinhas em cada. Quantas figurinhas ele comprou no total?",
    "alternativas": { "a": "16", "b": "18", "c": "20", "d": "15" },
    "correta": "b",
    "dica": "Multiplique o número de pacotes pela quantidade em cada um.",
    "pontos": 20.0
  },
  {
    "id": 70,
    "nivel": "medio",
    "tipo": "texto",
    "pergunta": "Carla tinha 20 balas e dividiu igualmente entre 4 amigos. Quantas balas cada um recebeu?",
    "alternativas": { "a": "4", "b": "5", "c": "6", "d": "8" },
    "correta": "b",
    "dica": "Divida o total em quatro partes iguais e conte cada parte.",
    "pontos": 20.0
  },
  {
    "id": 71,
    "nivel": "medio",
    "tipo": "texto",
    "pergunta": "Um coelho dá 4 pulos por minuto. Quantos pulos ele dará em 5 minutos?",
    "alternativas": { "a": "18", "b": "20", "c": "22", "d": "24" },
    "correta": "b",
    "dica": "Multiplique os pulos por minuto pelo número de minutos.",
    "pontos": 20.0
  },
  {
    "id": 72,
    "nivel": "medio",
    "tipo": "texto",
    "pergunta": "Uma padaria vende 8 pães por saco. Se um cliente compra 7 sacos, quantos pães ele leva?",
    "alternativas": { "a": "48", "b": "54", "c": "56", "d": "60" },
    "correta": "c",
    "dica": "Multiplique pães por saco pelo número de sacos.",
    "pontos": 20.0
  },
  {
    "id": 73,
    "nivel": "medio",
    "tipo": "texto",
    "pergunta": "Júlia tinha 25 reais e comprou um brinquedo de 9 reais. Quanto sobrou?",
    "alternativas": { "a": "15", "b": "16", "c": "17", "d": "18" },
    "correta": "b",
    "dica": "Subtraia o custo do brinquedo do total que ela tinha.",
    "pontos": 20.0
  },
  {
    "id": 74,
    "nivel": "medio",
    "tipo": "texto",
    "pergunta": "Uma caixa tem 36 doces e serão divididos igualmente entre 6 crianças. Quantos doces cada uma receberá?",
    "alternativas": { "a": "5", "b": "6", "c": "7", "d": "8" },
    "correta": "b",
    "dica": "Divida o total pelo número de crianças para achar cada parte.",
    "pontos": 20.0
  },
  {
    "id": 75,
    "nivel": "medio",
    "tipo": "texto",
    "pergunta": "Um dragão come 9 ovelhas por dia. Quantas ovelhas ele comerá em 3 dias?",
    "alternativas": { "a": "18", "b": "24", "c": "27", "d": "30" },
    "correta": "c",
    "dica": "Multiplique a quantidade por dia pelo número de dias.",
    "pontos": 20.0
  },
  {
    "id": 76,
    "nivel": "medio",
    "tipo": "texto",
    "pergunta": "Havia 42 maçãs em um cesto. 15 foram usadas em tortas. Quantas sobraram?",
    "alternativas": { "a": "25", "b": "26", "c": "27", "d": "28" },
    "correta": "c",
    "dica": "Subtraia as usadas do total inicial para ver o que resta.",
    "pontos": 20.0
  },
  {
    "id": 77,
    "nivel": "medio",
    "tipo": "texto",
    "pergunta": "Um mago tem 5 frascos, e em cada frasco há 9 gotas de poção. Quantas gotas ele tem no total?",
    "alternativas": { "a": "40", "b": "42", "c": "45", "d": "48" },
    "correta": "c",
    "dica": "Multiplique o número de frascos pela quantidade em cada um.",
    "pontos": 20.0
  },
  {
    "id": 78,
    "nivel": "medio",
    "tipo": "texto",
    "pergunta": "Um castelo tem 28 janelas. Se 9 estão abertas, quantas estão fechadas?",
    "alternativas": { "a": "18", "b": "19", "c": "20", "d": "21" },
    "correta": "b",
    "dica": "Subtraia as janelas abertas do total para achar as fechadas.",
    "pontos": 20.0
  },
  {
    "id": 79,
    "nivel": "medio",
    "tipo": "texto",
    "pergunta": "Três bruxinhas fizeram 4 feitiços cada uma. Quantos feitiços foram feitos no total?",
    "alternativas": { "a": "10", "b": "11", "c": "12", "d": "13" },
    "correta": "c",
    "dica": "Multiplique o número de bruxinhas pela quantidade de feitiços por cada uma.",
    "pontos": 20.0
  },
  {
    "id": 80,
    "nivel": "medio",
    "tipo": "texto",
    "pergunta": "Um unicórnio corre 7 quilômetros por dia. Quantos ele corre em 6 dias?",
    "alternativas": { "a": "36", "b": "40", "c": "42", "d": "44" },
    "correta": "c",
    "dica": "Multiplique os quilômetros diários pelo número de dias.",
    "pontos": 20.0
  },
  {
    "id": 81,
    "nivel": "dificil",
    "tipo": "equacao",
    "pergunta": "9 × 8 = ?",
    "alternativas": { "a": "64", "b": "72", "c": "70", "d": "81" },
    "correta": "b",
    "dica": "Repita o nove oito vezes ou pense em 9×10 e subtraia um pouquinho.",
    "pontos": 30.0
  },
  {
    "id": 82,
    "nivel": "dificil",
    "tipo": "equacao",
    "pergunta": "56 ÷ 8 = ?",
    "alternativas": { "a": "6", "b": "7", "c": "8", "d": "9" },
    "correta": "b",
    "dica": "Quantos grupos de oito formam cinquenta e seis? Conte os grupos.",
    "pontos": 30.0
  },
  {
    "id": 83,
    "nivel": "dificil",
    "tipo": "equacao",
    "pergunta": "45 + 38 = ?",
    "alternativas": { "a": "82", "b": "83", "c": "84", "d": "85" },
    "correta": "b",
    "dica": "Some as dezenas e depois some as unidades.",
    "pontos": 30.0
  },
  {
    "id": 84,
    "nivel": "dificil",
    "tipo": "equacao",
    "pergunta": "90 - 47 = ?",
    "alternativas": { "a": "43", "b": "44", "c": "42", "d": "45" },
    "correta": "a",
    "dica": "Tire primero quarenta, depois sete, e junte o resultado.",
    "pontos": 30.0
  },
  {
    "id": 85,
    "nivel": "dificil",
    "tipo": "equacao",
    "pergunta": "12 × 7 = ?",
    "alternativas": { "a": "72", "b": "82", "c": "84", "d": "90" },
    "correta": "c",
    "dica": "Some doze sete vezes ou pense em 10×7 mais 2×7.",
    "pontos": 30.0
  },
  {
    "id": 86,
    "nivel": "dificil",
    "tipo": "equacao",
    "pergunta": "72 ÷ 9 = ?",
    "alternativas": { "a": "6", "b": "7", "c": "8", "d": "9" },
    "correta": "c",
    "dica": "Quantos grupos de nove formam setenta e dois? Conte-os.",
    "pontos": 30.0
  },
  {
    "id": 87,
    "nivel": "dificil",
    "tipo": "equacao",
    "pergunta": "33 + 29 = ?",
    "alternativas": { "a": "61", "b": "62", "c": "63", "d": "60" },
    "correta": "b",
    "dica": "Some as dezenas e depois some as unidades.",
    "pontos": 30.0
  },
  {
    "id": 88,
    "nivel": "dificil",
    "tipo": "equacao",
    "pergunta": "81 - 36 = ?",
    "alternativas": { "a": "45", "b": "44", "c": "46", "d": "47" },
    "correta": "a",
    "dica": "Tire trinta e depois tire seis; junte os passos.",
    "pontos": 30.0
  },
  {
    "id": 89,
    "nivel": "dificil",
    "tipo": "equacao",
    "pergunta": "9 × 9 = ?",
    "alternativas": { "a": "72", "b": "81", "c": "90", "d": "99" },
    "correta": "b",
    "dica": "Nove vezes nove é um produto repetido; conte nove vezes.",
    "pontos": 30.0
  },
  {
    "id": 90,
    "nivel": "dificil",
    "tipo": "equacao",
    "pergunta": "64 ÷ 8 = ?",
    "alternativas": { "a": "6", "b": "7", "c": "8", "d": "9" },
    "correta": "c",
    "dica": "Divida sessenta e quatro em oito partes iguais e conte cada uma.",
    "pontos": 30.0
  },
  {
    "id": 91,
    "nivel": "dificil",
    "tipo": "equacao",
    "pergunta": "50 + 75 = ?",
    "alternativas": { "a": "120", "b": "125", "c": "130", "d": "115" },
    "correta": "b",
    "dica": "Some as dezenas primeiro e junte as unidades se houver.",
    "pontos": 30.0
  },
  {
    "id": 92,
    "nivel": "dificil",
    "tipo": "equacao",
    "pergunta": "96 - 58 = ?",
    "alternativas": { "a": "38", "b": "37", "c": "36", "d": "39" },
    "correta": "a",
    "dica": "Subtraia cinquenta primeiro, depois subtraia oito.",
    "pontos": 30.0
  },
  {
    "id": 93,
    "nivel": "dificil",
    "tipo": "texto",
    "pergunta": "Um mago tinha 8 sacos com 6 poções cada. Quantas poções ele tinha no total?",
    "alternativas": { "a": "42", "b": "46", "c": "48", "d": "50" },
    "correta": "c",
    "dica": "Multiplique o número de sacos pela quantidade por saco.",
    "pontos": 30.0
  },
  {
    "id": 94,
    "nivel": "dificil",
    "tipo": "texto",
    "pergunta": "Uma fada tinha 56 flores e quis dividir igualmente em 8 vasos. Quantas flores em cada vaso?",
    "alternativas": { "a": "6", "b": "7", "c": "8", "d": "9" },
    "correta": "b",
    "dica": "Divida cinquenta e seis em oito partes iguais; cada parte é a resposta.",
    "pontos": 30.0
  },
  {
    "id": 95,
    "nivel": "dificil",
    "tipo": "texto",
    "pergunta": "Um dragão come 4 ovelhas por dia. Quantas ovelhas ele come em 7 dias?",
    "alternativas": { "a": "26", "b": "27", "c": "28", "d": "30" },
    "correta": "c",
    "dica": "Multiplique o número por dia pelo número de dias.",
    "pontos": 30.0
  },
  {
    "id": 96,
    "nivel": "dificil",
    "tipo": "texto",
    "pergunta": "Um maguinho tinha 45 moedas e quis dividir entre 5 amigos. Quantas moedas para cada?",
    "alternativas": { "a": "8", "b": "9", "c": "10", "d": "11" },
    "correta": "b",
    "dica": "Divida o total igualmente entre os cinco amigos.",
    "pontos": 30.0
  },
  {
    "id": 97,
    "nivel": "dificil",
    "tipo": "texto",
    "pergunta": "Uma poção precisa de 3 gotas por frasco. Se ele fizer 9 frascos, quantas gotas precisa?",
    "alternativas": { "a": "25", "b": "26", "c": "27", "d": "28" },
    "correta": "c",
    "dica": "Multiplique três gotas pelo número de frascos.",
    "pontos": 30.0
  },
  {
    "id": 98,
    "nivel": "dificil",
    "tipo": "texto",
    "pergunta": "Havia 72 estrelas no céu e 9 caíram. Quantas ainda brilham?",
    "alternativas": { "a": "60", "b": "61", "c": "62", "d": "63" },
    "correta": "d",
    "dica": "Subtraia as que caíram do total inicial.",
    "pontos": 30.0
  },
  {
    "id": 99,
    "nivel": "dificil",
    "tipo": "texto",
    "pergunta": "Um elfo corre 5 metros por segundo. Quantos metros corre em 8 segundos?",
    "alternativas": { "a": "30", "b": "35", "c": "40", "d": "45" },
    "correta": "c",
    "dica": "Multiplique a velocidade pelo tempo para achar a distância.",
    "pontos": 30.0
  },
  {
    "id": 100,
    "nivel": "dificil",
    "tipo": "texto",
    "pergunta": "Um mago tem 81 moedas e quer colocá-las em 9 cofres. Quantas moedas vão em cada cofre?",
    "alternativas": { "a": "8", "b": "9", "c": "10", "d": "11" },
    "correta": "b",
    "dica": "Divida oitenta e um igualmente entre nove cofres.",
    "pontos": 30.0
  },
  {
    "id": 101,
    "nivel": "bonus",
    "tipo": "equacao",
    "pergunta": "125 ÷ 5 = ?",
    "alternativas": { "a": "20", "b": "25", "c": "15", "d": "30" },
    "correta": "b",
    "dica": "Divida cento e vinte e cinco em cinco partes iguais e conte cada parte.",
    "pontos": 60.0
  },
  {
    "id": 102,
    "nivel": "bonus",
    "tipo": "equacao",
    "pergunta": "48 ÷ 4 = ?",
    "alternativas": { "a": "10", "b": "11", "c": "12", "d": "13" },
    "correta": "c",
    "dica": "Quantos grupos de quatro cabem no quarenta e oito? Conte-os.",
    "pontos": 60.0
  },
  {
    "id": 103,
    "nivel": "bonus",
    "tipo": "equacao",
    "pergunta": "14 × 9 = ?",
    "alternativas": { "a": "116", "b": "126", "c": "136", "d": "146" },
    "correta": "b",
    "dica": "Repita quatorze nove vezes ou use 10×14 e subtraia 1×14.",
    "pontos": 60.0
  },
  {
    "id": 104,
    "nivel": "bonus",
    "tipo": "equacao",
    "pergunta": "75 + 38 = ?",
    "alternativas": { "a": "112", "b": "113", "c": "114", "d": "115" },
    "correta": "b",
    "dica": "Some as dezenas e depois some as unidades para achar a soma.",
    "pontos": 60.0
  },
  {
    "id": 105,
    "nivel": "bonus",
    "tipo": "equacao",
    "pergunta": "96 - 27 = ?",
    "alternativas": { "a": "69", "b": "70", "c": "68", "d": "67" },
    "correta": "a",
    "dica": "Subtraia vinte primeiro e depois sete para ver o que sobra.",
    "pontos": 60.0
  },
  {
    "id": 106,
    "nivel": "bonus",
    "tipo": "texto",
    "pergunta": "Um castelo tem 64 armaduras. Se 16 foram para conserto, quantas restam?",
    "alternativas": { "a": "46", "b": "48", "c": "50", "d": "52" },
    "correta": "b",
    "dica": "Tire as armaduras que saíram do total inicial e conte as que ficaram.",
    "pontos": 60.0
  },
  {
    "id": 107,
    "nivel": "bonus",
    "tipo": "texto",
    "pergunta": "Três dragões guardam 18 joias cada. Quantas joias há no total?",
    "alternativas": { "a": "50", "b": "52", "c": "54", "d": "56" },
    "correta": "c",
    "dica": "Multiplique o número de dragões pela quantidade de joias de cada um.",
    "pontos": 60.0
  },
  {
    "id": 108,
    "nivel": "bonus",
    "tipo": "texto",
    "pergunta": "Um mago tem 120 moedas e divide igualmente entre 8 aprendizes. Quantas cada um ganha?",
    "alternativas": { "a": "14", "b": "15", "c": "16", "d": "18" },
    "correta": "b",
    "dica": "Divida o total pelo número de aprendizes para achar cada parte.",
    "pontos": 60.0
  },
  {
    "id": 109,
    "nivel": "bonus",
    "tipo": "texto",
    "pergunta": "Uma carruagem percorre 9 km por hora. Quantos km faz em 7 horas?",
    "alternativas": { "a": "54", "b": "56", "c": "63", "d": "66" },
    "correta": "c",
    "dica": "Multiplique os quilômetros por hora pelo número de horas.",
    "pontos": 60.0
  },
  {
    "id": 110,
    "nivel": "bonus",
    "tipo": "texto",
    "pergunta": "Um reino tem 45 casas e cada casa tem 4 janelas. Quantas janelas há no reino?",
    "alternativas": { "a": "160", "b": "170", "c": "180", "d": "190" },
    "correta": "c",
    "dica": "Multiplique o número de casas pelo número de janelas por casa.",
    "pontos": 60.0
  }
];
> # API Documentation

# Tabela USUÁRIOS
| Coluna        | Tipo   | Obrigatório | Descrição                       |
|---------------|--------|-------------|---------------------------------|
| ID_USUARIO    | number | Sim         | Id do usuário                   |
| NM_USUARIO    | string | Sim         | Nome do usuário                 |
| EMAIL_USUARIO | string | Sim         | Email do usuário                |
| IMG_USUARIO   | string | Não         | Imagem de perfil do usuário     |
| DT_CADASTRO   | string | Sim         | Data de cadastro do perfil      |

## BUSCAR TODOS OS USUÁRIOS `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/usuario`
#### Descrição
`Essa rota serve para retornar todos os usuários cadastrados no sistema, trazendo as informações mais úteis e importantes`
#### Corpo da Requisição
```json
[
    {
        "ID_USUARIO": 1,
        "NM_USUARIO": "Usuario Teste",
        "EMAIL_USUARIO": "teste@gmail.com",
        "IMG_USUARIO": "1717545715438-87052358-abd2-4674-97d6-c12078633455.jpeg",
        "DT_CADASTRO": "2024-06-04T20:40:20.000Z"
    }
]
```

---
---
## BUSCAR USUÁRIOS PELO ID  `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/usuario/<ID>`
#### Descrição
`Essa rota serve para retornar o usuário em específico, através do ID dele, obtendo informações para exibir no perfil do usuário no momento de login no sistema e vem junto às informações de animais associados à ele`
#### Corpo da Requisição
```json
{
    "ID_USUARIO": 1,
    "NM_USUARIO": "Usuário Teste",
    "EMAIL_USUARIO": "teste@gmail.com",
    "IMG_USUARIO": "1717545715438-87052358-abd2-4674-97d6-c12078633455.jpeg",
    "DT_CADASTRO": "2024-06-04T20:40:20.000Z",
    "ANIMAIS": [
        {
            "ID_ANIMAL": 1,
            "NM_ANIMAL": "Golfinho",
            "NM_CIENTIFICO_ANIMAL": "Delphinus delphis",
            "DESC_ANIMAL": "Os golfinhos são mamíferos marinhos inteligentes e sociáveis, conhecidos por suas habilidades de comunicação e acrobacias. Vivem em grupos, usam ecolocalização para navegar e caçar, e têm um comportamento amigável.",
            "STATUS_ANIMAL": "PRESERVADO",
            "IMG_ANIMAL": "https://midias.agazeta.com.br/2021/05/31/1920x1080/golfinho-nariz-de-garrafa-tursiops-truncatus-pode-ser-visto-ao-longo-de-todo-o-ano-no-litoral-do-espirito-santo-524837.jpg",
            "DT_CAD_ANIMAL": "2024-06-03T20:33:48.000Z",
            "ESPECIE": {
                "ID_ESPECIE": 1,
                "NM_ESPECIE": "Baiji"
            },
            "DIETA": {
                "ID_DIETA": 1,
                "NM_DIETA": "Carnívoro"
            },
            "HABITATS": [
                {
                    "ID_HABITAT": 1,
                    "NM_HABITAT": "Oceano Atlântico"
                },
            ]
        }
    ]
}
```

---
---
## CRIAR USUÁRIOS `post`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/usuario`
#### Descrição
`
Essa rota serve para cadastrar um novo usuário, sendo utilizado na parte de registro do sistema, onde o usuário informará NOME, EMAIL, SENHA e uma foto para o perfil. 
Essas informações são enviadas em FORMDATA por causa da imagem. 
Essa rota possui sistema de criptografia de senha, utilizando a biblioteca BCRYPT para criptografar utilizando SALT e HASH
`
#### Corpo da Requisição
```json
# LEMBRANDO QUE ESSES DADOS SÃO ENVIADOS EM FORMATO [FORM DATA] PARA A BIBLIOTECA NO BACKEND SALVAR A IMAGEM
{
    "nome": "Usuario Teste",
    "email": "teste@gmail.com",
    "senha": "senhaForte",
    "image": "19238918239192318281.jpeg"
}
```

---
---
## ATUALIZAR USUÁRIOS `put`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/usuario/<ID>`
#### Descrição
`Essa rota serve para atualizar o usuário, sendo utilizado na página de perfil do usuário, caso ele queira alterar alguma informação de seu perfil`
#### Corpo da Requisição
```json
# LEMBRANDO QUE ESSES DADOS SÃO ENVIADOS EM FORMATO [FORM DATA] PARA A BIBLIOTECA NO BACKEND SALVAR A IMAGEM
{
    "nome": "Alterando Usuário Teste",
    "email": "usuariotestealterado@outlook.com",
    "senha": "SenhaForte",
    "imagem": "1717455656269-f471e9a2-ea25-4314-a73f-53513a2f480b.jpeg"
}
```

---
---
## EXCLUIR USUÁRIOS `del`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/usuario/<ID>`
#### Descrição
`Essa rota serve para deletar um perfil cadastrado, passando somente o ID do perfil do usuário`

---
---
## LOGIN USUÁRIOS `post`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/login`

#### Descrição
`Essa rota serve para realizar o login no sistema, informando o EMAIL e SENHA cadastrados`

#### Corpo da Requisição
```json
{
    "email": "usuarioteste@gmail.com",
    "senha": "senhaForte"
}
```

---
---
## ASSOCIAR ANIMAIS AOS USUÁRIOS `post`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/vincular-usuario-animais`
#### Descrição
`Essa rota serve para associar os animais ao usuário. Será utilizada quando o backend de inteligência artificial identificar qual o animal é o que foi enviado, com isso será associado ao usuário para ficar como um registro conténdo informações sobre o animal`
#### Corpo da Requisição
```json
{
    "ID_USUARIO": 1,
    "ID_ANIMAIS" : [2, 4, 8, 10, 35, 1]
}
```

---
---
## ASSOCIAR ANIMAIS AOS USUÁRIOS `del`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/desvincular-usuario-animais`
#### Descrição
`Essa rota serve para desassociar os animais ao usuário passando os IDs dos animais e o ID do usuário`
#### Corpo da Requisição
```json
{
    "ID_USUARIO": 3,
    "ID_ANIMAIS" : [1, 32, 87]
}
```

---
---
> # Tabela ANIMAL
| Coluna               | Tipo   | Obrigatório | Descrição                                  |
|----------------------|--------|-------------|--------------------------------------------|
| ID_ANIMAL            | number | Sim         | Id do animal                               |
| NM_ANIMAL            | string | Sim         | Nome do animal                             |
| NM_CIENTIFICO_ANIMAL | string | Sim         | Nome científico do animal                  |
| DESC_ANIMAL          | string | Sim         | Descrição do animal                        |
| STATUS_ANIMAL        | string | Sim         | Status do animal (PRESERVADO, EXTINÇÃO...) |
| IMG_ANIMAL           | string | Sim         | Imagem do usuário                          |
| DT_CAD_ANIMAL        | string | Sim         | Data de cadastro do animal                 | 

## BUSCAR TODOS OS ANIMAIS `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/animal`
#### Descrição
`Essa rota serve para retornar todos os animais cadastrados no sistema, trazendo informações que são úteis na exibição`
#### Corpo da Requisição
```json
[
    {
        "ID_ANIMAL": 1,
        "NM_ANIMAL": "Golfinho",
        "NM_CIENTIFICO_ANIMAL": "Delphinus delphis",
        "DESC_ANIMAL": "Os golfinhos são mamíferos marinhos inteligentes e sociáveis, conhecidos por suas habilidades de comunicação e acrobacias. Vivem em grupos, usam ecolocalização para navegar e caçar, e têm um comportamento amigável.",
        "STATUS_ANIMAL": "PRESERVADO",
        "IMG_ANIMAL": "https://midias.agazeta.com.br/2021/05/31/1920x1080/golfinho-nariz-de-garrafa-tursiops-truncatus-pode-ser-visto-ao-longo-de-todo-o-ano-no-litoral-do-espirito-santo-524837.jpg",
        "DT_CAD_ANIMAL": "2024-06-03T20:33:48.000Z",
        "DIETA": {
            "ID_DIETA": 1,
            "NM_DIETA": "Carnívoro",
            "DESC_DIETA": "Essa dieta são para animais que comem carne"
        },
        "ESPECIE": {
            "ID_ESPECIE": 1,
            "NM_ESPECIE": "Baiji"
            "DESC_ESPECIE": "Especie de golfinhos que possuem tamanho médio, coloração cinza-azulada no dorso e tonalidade mais clara na região ventral. Possui forma corporal alongada.",
            "DT_CADASTRO": "2024-06-02T03:32:09.000Z"
        },
        "HABITATS": [
            {
                "ID_HABITAT": 1,
                "NM_HABITAT": "Oceano Atlântico",
                "DESC_HABITAT": "É o segundo maior do mundo, ele está localizado entre os continentes americano, africano e europeu. Seu tamanho é de, aproximadamente, 107 milhões de km², e sua profundidade máxima é de, aproximadamente, 8000 mil metros.",
                "CLIMA_HABITAT": "Temperado",
                "VEG_HABITAT": "Fitoplâncton",
                "REGIAO_HABITAT": "Norte, Central e Sul do continente americano",
                "DT_CADASTRO": "2024-06-02T03:38:02.000Z"
            },
        ]
    },
    {
        "ID_ANIMAL": 2,
        "NM_ANIMAL": "Arraia",
        "NM_CIENTIFICO_ANIMAL": "Batoidea",
        "DESC_ANIMAL": "As arraias são peixes cartilaginosos com corpos achatados e largas barbatanas peitorais. Vivem em águas tropicais e temperadas, muitas vezes no fundo do mar. Alimentam-se de moluscos e pequenos peixes.",
        "STATUS_ANIMAL": "PRESERVADO",
        "IMG_ANIMAL": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Spotted_Eagle_Ray_%28Aetobatus_narinari%292.jpg",
        "DT_CAD_ANIMAL": "2024-06-03T20:54:13.000Z",
        "DIETA": {
            "ID_DIETA": 2,
            "NM_DIETA": "Carnívoro",
            "DESC_DIETA": "Essa dieta são para animais que comem carne"
        },
        "ESPECIE": {
            "ID_ESPECIE": 3,
            "NM_ESPECIE": "Dasyatis acutirostra",
            "DESC_ESPECIE": "É uma espécie de peixe da família das arraias. É encontrada na China e no Japão",
            "DT_CADASTRO": "2024-06-03T20:53:13.000Z"
        },
        "HABITATS": [
            {
                "ID_HABITAT": 4,
                "NM_HABITAT": "Oceano Pacífico",
                "DESC_HABITAT": "O Oceano Pacífico é o maior e mais profundo oceano do mundo, cobrindo um terço da superfície terrestre. Caracteriza-se por diversas zonas climáticas, rica biodiversidade marinha e frequente atividade sísmica.",
                "CLIMA_HABITAT": "TROPICAL",
                "VEG_HABITAT": "Fitoplâncton",
                "REGIAO_HABITAT": "Ásia e Oceania",
                "DT_CADASTRO": "2024-06-02T03:46:21.000Z"
            }
        ]
    },
]
```

---
---
## BUSCAR O ANIMAL PELO ID `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/animal/<ID>`
#### Descrição
`Essa rota serve para retornar o animal em específico, trazendo informações mais detalhadas`
#### Corpo da Requisição
```json
{
  "ID_ANIMAL": 2,
  "NM_ANIMAL": "Arraia",
  "NM_CIENTIFICO_ANIMAL": "Batoidea",
  "DESC_ANIMAL": "As arraias são peixes cartilaginosos com corpos achatados e largas barbatanas peitorais. Vivem em águas tropicais e temperadas, muitas vezes no fundo do mar. Alimentam-se de moluscos e pequenos peixes.",
  "STATUS_ANIMAL": "PRESERVADO",
  "IMG_ANIMAL": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Spotted_Eagle_Ray_%28Aetobatus_narinari%292.jpg",
  "DT_CAD_ANIMAL": "2024-06-03T20:54:13.000Z",
  "DIETA": {
      "ID_DIETA": 2,
      "NM_DIETA": "Carnívoro",
      "DESC_DIETA": "Essa dieta são para animais que comem carne"
  },
  "ESPECIE": {
      "ID_ESPECIE": 3,
      "NM_ESPECIE": "Dasyatis acutirostra",
      "DESC_ESPECIE": "É uma espécie de peixe da família das arraias. É encontrada na China e no Japão",
      "DT_CADASTRO": "2024-06-03T20:53:13.000Z"
  },
  "HABITATS": [
      {
          "ID_HABITAT": 4,
          "NM_HABITAT": "Oceano Pacífico",
          "DESC_HABITAT": "O Oceano Pacífico é o maior e mais profundo oceano do mundo, cobrindo um terço da superfície terrestre. Caracteriza-se por diversas zonas climáticas, rica biodiversidade marinha e frequente atividade sísmica.",
          "CLIMA_HABITAT": "TROPICAL",
          "VEG_HABITAT": "Fitoplâncton",
          "REGIAO_HABITAT": "Ásia e Oceania",
          "DT_CADASTRO": "2024-06-02T03:46:21.000Z"
      }
  ]
}
```

---
---
## CADASTRAR UM ANIMAL `post`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/animal`
#### Descrição
`Essa rota serve para cadastrar um animal no sistema, informando dieta, espécie, nome, nome científico, descrição, status, imagem e os habitats que ele se encontra`
#### Corpo da Requisição
```json
{
    "ID_DIETA": 2,
    "ID_ESPECIE": 3,
    "NM_ANIMAL": "Arraia",
    "NM_CIENTIFICO_ANIMAL": "Batoidea",
    "DESC_ANIMAL": "As arraias são peixes cartilaginosos com corpos achatados e largas barbatanas peitorais. Vivem em águas tropicais e temperadas, muitas vezes no fundo do mar. Alimentam-se de moluscos e pequenos peixes.",
    "STATUS_ANIMAL": "PRESERVADO",
    "IMG_ANIMAL": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Spotted_Eagle_Ray_%28Aetobatus_narinari%292.jpg",
    "HABITATS": [4]
}
```

---
---
## ATUALIZAR DADOS DE UM ANIMAL `put`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/animal/<ID>`
#### Descrição
`Essa rota serve para atualizar informações de um animal no sistema, informando novas informações de dieta, espécie, nome, nome científico, descrição, status, imagem e os habitats que ele se encontra`
#### Corpo da Requisição
```json
{
    "ID_DIETA": 1,
    "ID_ESPECIE": 4,
    "NM_ANIMAL": "Arraia Alterada",
    "NM_CIENTIFICO_ANIMAL": "Batoidea Alterada",
    "DESC_ANIMAL": "As arraias alteradas são peixes cartilaginosos com corpos achatados e largas barbatanas peitorais. Vivem em águas tropicais e temperadas, muitas vezes no fundo do mar. Alimentam-se de moluscos e pequenos peixes.",
    "STATUS_ANIMAL": "EXTINÇÃO",
    "IMG_ANIMAL": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Spotted_Eagle_Ray_%28Aetobatus_narinari%292.jpg",
    "HABITATS": [9, 1, 4]
}
```

---
---
## DELETAR UM ANIMAL `del`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/animal/<ID>`
#### Descrição
`Essa rota serve para deletar o animal cadastrado no sistema, passando apenas o ID dele na rota`

> # Tabela DIETA
| Coluna      | Tipo   | Obrigatório | Descrição           |
|-------------|--------|-------------|---------------------|
| ID_ANIMAL   | number | Sim         | Id da dieta         |
| NM_DIETA    | string | Sim         | Nome da dieta       |
| DESC_DIETA  | string | Sim         | Descrição da dieta  |

## BUSCAR TODAS AS DIETAS `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/dieta`
#### Descrição
`Essa rota serve para buscar todas as dietas cadastradas no sistema, exibindo id, nome e descrição`
#### Corpo da Requisição
```json
[
    {
        "ID_DIETA": 2,
        "NM_DIETA": "Carnívoro",
        "DESC_DIETA": "Essa dieta são para animais que comem carne"
    },
    {
        "ID_DIETA": 3,
        "NM_DIETA": "Herbívoros",
        "DESC_DIETA": "Essa dieta são para animais que se alimentam de plantas e algas marinhas."
    }
    {
        "ID_DIETA": 4,
        "NM_DIETA": "Onívoros",
        "DESC_DIETA": "Essa dieta são para animais que consomem tanto plantas quanto animais."
    }
]
```

---
---
## BUSCAR UMA DIETA  `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/dieta/<ID>`
#### Descrição
`Essa rota serve para buscar uma dieta em específico, exibindo id, nome e descrição`
#### Corpo da Requisição
```json
{
    "ID_DIETA": 2,
    "NM_DIETA": "Carnívoro",
    "DESC_DIETA": "Essa dieta são para animais que comem carne"
}
```

---
---
## CRIAR UMA NOVA DIETA  `post`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/dieta`
#### Descrição
`Essa rota serve para criar uma nova dieta, informando nome e descrição`
#### Corpo da Requisição
```json
{
    "NM_DIETA": "Onívoros",
    "DESC_DIETA": "Essa dieta são para animais que consomem tanto plantas quanto animais."
}
```

---
---
## EDITAR UMA DIETA  `put`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/dieta`
#### Descrição
`Essa rota serve para editar uma dieta, informando um novo nome e descrição`
#### Corpo da Requisição
```json
{
    "NM_DIETA": "Onívoros Alterado",
    "DESC_DIETA": "Essa dieta alterada são para animais que consomem tanto plantas quanto animais."
}
```

---
---
## EXCLUIR UMA DIETA  `del`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/dieta`
#### Descrição
`Essa rota serve para excluir uma dieta, informando apenas o ID na rota`
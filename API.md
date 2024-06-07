> # API Documentation
>
## Sumário
- [Usuários](#tabela-usuários)
- [Animais](#tabela-animal)
- [Dieta](#tabela-dieta)
- [Espécie](#tabela-espécie)
- [Habitat](#tabela-habitat)
---

> [!NOTE]
> # Tabela USUÁRIOS
> | Coluna        | Tipo   | Obrigatório | Descrição                       |
> |---------------|--------|-------------|---------------------------------|
> | ID_USUARIO    | number | Sim         | Id do usuário                   |
> | NM_USUARIO    | string | Sim         | Nome do usuário                 |
> | EMAIL_USUARIO | string | Sim         | Email do usuário                |
> | IMG_USUARIO   | string | Não         | Imagem de perfil do usuário     |
> | DT_CADASTRO   | date   | Sim         | Data de cadastro do perfil      |

## BUSCAR TODOS OS USUÁRIOS `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/usuario`
> #### Descrição
> ###### Essa rota serve para retornar todos os usuários cadastrados no sistema, trazendo as informações mais úteis e importantes
```json
RETORNO DA API
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

## BUSCAR USUÁRIOS PELO ID  `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/usuario/<ID>`
> #### Descrição
> ###### Essa rota serve para retornar o usuário em específico, através do ID dele, obtendo informações para exibir no perfil do usuário no momento de login no sistema e vem junto às informações de animais associados à ele
```json
RETORNO DA API
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

## BUSCAR IMAGEM DO USUARIO `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/userImage/<nome da imagem>`
> #### Descrição
> ###### Essa rota serve para retornar a imagem do usuario no formato base64 para renderizar no frontend
```json
RETORNO DA API
{
    retorna a imagem pronta, apenas para colocar no componente de imagem do react native
}
```

## CRIAR USUÁRIOS `post`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/usuario`
> #### Descrição
> ###### Essa rota serve para cadastrar um novo usuário, sendo utilizado na parte de registro do sistema, onde o usuário informará NOME, EMAIL, SENHA e uma foto para o perfil. Essas informações são enviadas em FORMDATA por causa da imagem. Essa rota possui sistema de criptografia de senha, utilizando a biblioteca BCRYPT para criptografar utilizando SALT e HASH
```json
ENVIO PARA A API
OS DADOS SÃO ENVIADOS EM FORMATO [FORM DATA] PARA A BIBLIOTECA NO BACKEND SALVAR A IMAGEM
{
    "nome": "Usuario Teste",
    "email": "teste@gmail.com",
    "senha": "senhaForte",
    "image": "19238918239192318281.jpeg"
}
```
```json
RETORNO DA API
{
    "message": "Usuário cadastrado com sucesso"
}
```

## ATUALIZAR USUÁRIOS `put`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/usuario/<ID>`
> #### Descrição
> ###### Essa rota serve para atualizar o usuário, sendo utilizado na página de perfil do usuário, caso ele queira alterar alguma informação de seu perfil
```json
ENVIO PARA A API
OS DADOS SÃO ENVIADOS EM FORMATO [FORM DATA] PARA A BIBLIOTECA NO BACKEND SALVAR A IMAGEM
{
    "nome": "Alterando Usuário Teste",
    "email": "usuariotestealterado@outlook.com",
    "senha": "SenhaForte",
    "imagem": "1717455656269-f471e9a2-ea25-4314-a73f-53513a2f480b.jpeg"
}
```
```json
RETORNO DA API

Informações do usuário atualizadas com sucesso
```

## EXCLUIR USUÁRIOS `del`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/usuario/<ID>`
> #### Descrição
> ###### Essa rota serve para deletar um perfil cadastrado, passando somente o ID do perfil do usuário
```json
RETORNO DA API
{
    "message": "Usuário <ID> excluído com sucesso"
}
```

## LOGIN USUÁRIOS `post`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/login`
> #### Descrição
> ###### Essa rota serve para realizar o login no sistema, informando o EMAIL e SENHA cadastrados
```json
ENVIO PARA A API
{
    "email": "usuarioteste@gmail.com",
    "senha": "senhaForte"
}
```
```json
RETORNO DA API
{
    "message": "Login efetuado com sucesso",
    "usuario": {
        "ID_USUARIO": 1,
        "NM_USUARIO": "Usuário Teste",
        "EMAIL_USUARIO": "usuarioteste@gmail.com",
        "IMG_USUARIO": "1717545715438-87052358-abd2-4674-97d6-c12078633455.jpeg",
        "DT_CADASTRO": "2024-06-04T20:40:20.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjI4LCJpYXQiOjE3MTc2Mjg3NzF9.E2tnTwFkSr0w1fw2ftheHO8PtQuKTyH8YGoZxjkDeEg"
}
```

## ASSOCIAR ANIMAIS AOS USUÁRIOS `post`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/vincular-usuario-animais`
> #### Descrição
> ###### Essa rota serve para associar os animais ao usuário. Será utilizada quando o backend de inteligência artificial identificar qual o animal é o que foi enviado, com isso será associado ao usuário para ficar como um registro conténdo informações sobre o animal
```json
ENVIAR PARA A API
{
    "ID_USUARIO": 1,
    "ID_ANIMAIS" : [2, 4, 8]
}
```
```json
RETORNO DA API
{
    "message": "Usuário vinculado aos animais com sucesso",
    "vinculados": [
        {
            "ID_ANIMAL": 2
        },
        {
            "ID_ANIMAL": 4
        },
        {
            "ID_ANIMAL": 8
        },
    ]
}
```


## DESASSOCIAR ANIMAIS AOS USUÁRIOS `del`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/desvincular-usuario-animais`
> #### Descrição
> ###### Essa rota serve para desassociar os animais ao usuário passando os IDs dos animais e o ID do usuário
```json
ENVIO PARA A API
{
    "ID_USUARIO": 3,
    "ID_ANIMAIS" : [1, 32, 87]
}
```
```json
RETORNO DA API
{
    "message": "Animais desvinculados do usuário com sucesso",
    "desvinculados": [
        {
            "ID_ANIMAL": 1
        },
        {
            "ID_ANIMAL": 32
        },
        {
            "ID_ANIMAL": 87
        }
    ]
}
```
---

> [!NOTE]
> # Tabela ANIMAL
> | Coluna               | Tipo   | Obrigatório | Descrição                                  |
> |----------------------|--------|-------------|--------------------------------------------|
> | ID_ANIMAL            | number | Sim         | Id do animal                               |
> | NM_ANIMAL            | string | Sim         | Nome do animal                             |
> | NM_CIENTIFICO_ANIMAL | string | Sim         | Nome científico do animal                  |
> | DESC_ANIMAL          | string | Sim         | Descrição do animal                        |
> | STATUS_ANIMAL        | string | Sim         | Status do animal (PRESERVADO, EXTINÇÃO...) |
> | IMG_ANIMAL           | string | Sim         | Imagem do usuário                          |
> | DT_CAD_ANIMAL        | date   | Sim         | Data de cadastro do animal                 | 

## BUSCAR TODOS OS ANIMAIS `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/animal`
> #### Descrição
> ###### Essa rota serve para retornar todos os animais cadastrados no sistema, trazendo informações que são úteis na exibição
```json
RETORNO DA API
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

## BUSCAR O ANIMAL PELO ID `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/animal/<ID>`
> #### Descrição
> ###### Essa rota serve para retornar o animal em específico, trazendo informações mais detalhadas
```json
RETORNO DA API
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

## BUSCAR O ANIMAL PELO NOME `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/animal/nome/<nome do animal>`
> #### Descrição
> ###### Essa rota serve para retornar o animal em específico, trazendo informações básicas apenas para informar ao usuário
```json
RETORNO DA API
{
  "ID_ANIMAL": 2,
  "NM_ANIMAL": "Arraia",
  "NM_CIENTIFICO_ANIMAL": "Batoidea",
  "DESC_ANIMAL": "As arraias são peixes cartilaginosos com corpos achatados e largas barbatanas peitorais. Vivem em águas tropicais e temperadas, muitas vezes no fundo do mar. Alimentam-se de moluscos e pequenos peixes.",
  "STATUS_ANIMAL": "PRESERVADO",
  "IMG_ANIMAL": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Spotted_Eagle_Ray_%28Aetobatus_narinari%292.jpg",
  "DT_CAD_ANIMAL": "2024-06-03T20:54:13.000Z",
}
```

## CADASTRAR UM ANIMAL `post`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/animal`
> #### Descrição
> ###### Essa rota serve para cadastrar um animal no sistema, informando dieta, espécie, nome, nome científico, descrição, status, imagem e os habitats que ele se encontra
```json
ENVIO PARA A API
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
```json
RETORNO DA API
{
    "message": "Animal cadastrado com sucesso"
}
```

## ATUALIZAR DADOS DE UM ANIMAL `put`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/animal/<ID>`
> #### Descrição
> ###### Essa rota serve para atualizar informações de um animal no sistema, informando novas informações de dieta, espécie, nome, nome científico, descrição, status, imagem e os habitats que ele se encontra
```json
ENVIO PARA A API
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
```json
RETORNO DA API

Informações do animal foram atualizadas com sucesso
```

## DELETAR UM ANIMAL `del`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/animal/<ID>`
> #### Descrição
> ###### Essa rota serve para deletar o animal cadastrado no sistema, passando apenas o ID dele na rota
```json
{
    "message": "Animal <ID> excluído com sucesso"
}
```

---
> [!NOTE]

> # Tabela DIETA
> | Coluna      | Tipo   | Obrigatório | Descrição           |
> |-------------|--------|-------------|---------------------|
> | ID_ANIMAL   | number | Sim         | Id da dieta         |
> | NM_DIETA    | string | Sim         | Nome da dieta       |
> | DESC_DIETA  | string | Sim         | Descrição da dieta  |

## BUSCAR TODAS AS DIETAS `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/dieta`
> #### Descrição
> ###### Essa rota serve para buscar todas as dietas cadastradas no sistema, exibindo id, nome e descrição
```json
RETORNO DA API
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

## BUSCAR UMA DIETA  `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/dieta/<ID>`
> #### Descrição
> ###### Essa rota serve para buscar uma dieta em específico, exibindo id, nome e descrição
```json
RETORNO DA API
{
    "ID_DIETA": 2,
    "NM_DIETA": "Carnívoro",
    "DESC_DIETA": "Essa dieta são para animais que comem carne"
}
```

## CRIAR UMA NOVA DIETA  `post`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/dieta`
> #### Descrição
> ###### Essa rota serve para criar uma nova dieta, informando nome e descrição
```json
ENVIO PARA A API
{
    "NM_DIETA": "Onívoros",
    "DESC_DIETA": "Essa dieta são para animais que consomem tanto plantas quanto animais."
}
```
```json
RETORNO DA API
{
    "message": "Dieta cadastrada com sucesso"
}
```

## EDITAR UMA DIETA  `put`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/dieta/<ID>`
> #### Descrição
> ###### Essa rota serve para editar uma dieta, informando um novo nome e descrição`
```json
ENVIO PARA A API
{
    "NM_DIETA": "Onívoros Alterado",
    "DESC_DIETA": "Essa dieta alterada são para animais que consomem tanto plantas quanto animais."
}
```
```json
RETORNO DA API

Informações da dieta atualizadas com sucesso
```

## EXCLUIR UMA DIETA  `del`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/dieta/<ID>`
> #### Descrição
> ###### Essa rota serve para excluir uma dieta, informando apenas o ID na rota
```json
{
    "message": "Dieta <ID> excluída com sucesso"
}
```

---
> [!NOTE]

> # Tabela ESPÉCIE
> | Coluna        | Tipo   | Obrigatório | Descrição                    |
> |---------------|--------|-------------|------------------------------|
> | ID_ESPECIE    | number | Sim         | Id da espécie                |
> | NM_ESPECIE    | string | Sim         | Nome da espécie              |
> | DESC_ESPECIE  | string | Sim         | Descrição da espécie         |
> | DT_CADASTRO   | date   | Sim         | Data de cadastro da espécie  |

---
## BUSCAR TODAS AS ESPÉCIES `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/especie`
> #### Descrição
> ###### Essa rota serve para buscar todas as espécies, trazendo id, nome, descrição e data de cadastro
```json
RETORNO DA API
[
    {
        "ID_ESPECIE": 3,
        "NM_ESPECIE": "Dasyatis acutirostra",
        "DESC_ESPECIE": "É uma espécie de peixe da família das arraias. É encontrada na China e no Japão",
        "DT_CADASTRO": "2024-06-03T20:53:13.000Z"
    },
    {
        "ID_ESPECIE": 4,
        "NM_ESPECIE": "Dasyatis americana",
        "DESC_ESPECIE": "A espécie tem cantos externos afiados e fileira irregular de espinhos curtos na superfície superior",
        "DT_CADASTRO": "2024-06-03T20:53:13.000Z"
    }
]
```

## BUSCAR UMA ESPÉCIE  `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/especie/<ID>`
> #### Descrição
> ###### Essa rota serve para buscar uma espécie em específico, exibindo id, nome, descrição e data de cadastro
```json
RETORNO DA API
{
    "ID_ESPECIE": 3,
    "NM_ESPECIE": "Dasyatis acutirostra",
    "DESC_ESPECIE": "É uma espécie de peixe da família das arraias. É encontrada na China e no Japão",
    "DT_CADASTRO": "2024-06-03T20:53:13.000Z"
}
```

## CRIAR UMA NOVA ESPÉCIE  `post`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/especie`
> #### Descrição
> ###### Essa rota serve para criar uma nova espécie, informando nome e descrição
```json
ENVIO PARA A API
{
    "NM_ESPECIE": "Nova Espécie",
    "DESC_ESPECIE": "Essa espécie é para animais novos"
}
```
```json
RETORNO DA API
{
    "message": "Espécie cadastrada com sucesso"
}
```

## EDITAR UMA ESPÉCIE  `put`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/especie/<ID>`
> #### Descrição
> ###### Essa rota serve para editar uma espécie, informando um novo nome e descrição`
```json
ENVIO PARA A API
{
    "NM_ESPECIE": "Nova espécie alterada",
    "DESC_ESPECIE": "Especie para animais novos alterada"
}
```
```json
RETORNO DA API

Informações da espécie atualizadas com sucesso
```

## EXCLUIR UMA ESPÉCIE  `del`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/especie/<ID>`
> #### Descrição
> ###### Essa rota serve para excluir uma espécie, informando apenas o ID na rota
```json
{
    "message": "Espécie <ID> excluída com sucesso"
}
```

---
> [!NOTE]

> # Tabela HABITAT
> | Coluna          | Tipo   | Obrigatório | Descrição                       |
> |-----------------|--------|-------------|---------------------------------|
> | ID_HABITAT      | number | Sim         | Id do habitat                   |
> | NM_HABITAT      | string | Sim         | Nome do habitat                 |
> | DESC_HABITAT    | string | Sim         | Descrição do habitat            |
> | CLIMA_HABITAT   | string | Sim         | Clima do habitat                |
> | VEG_HABITAT     | string | Sim         | Vegetação do habitat            |
> | REGIAO_HABITAT  | string | Sim         | Região do habitat               |
> | DT_CADASTRO     | date   | Sim         | Data de cadastro do habitat     |

---
## BUSCAR TODAS OS HABITATS `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/habitat`
> #### Descrição
> ###### Essa rota serve para buscar todas os habitats, trazendo id, nome, descrição, clima, vegetação, região e data de cadastro
```json
RETORNO DA API
[
    {
        "ID_HABITAT": 2,
        "NM_HABITAT": "Habitat Teste",
        "DESC_HABITAT": "descrição do habitat teste",
        "CLIMA_HABITAT": "Tropical",
        "VEG_HABITAT": "Fitoplâncton",
        "REGIAO_HABITAT": "Oceano Índico",
        "DT_CADASTRO": "2024-06-02T03:38:02.000Z"
    },
    {
        "ID_HABITAT": 3,
        "NM_HABITAT": "Habitat Criado",
        "DESC_HABITAT": "descrição do habitat criado",
        "CLIMA_HABITAT": "Temperado",
        "VEG_HABITAT": "Fitoplâncton",
        "REGIAO_HABITAT": "Oceâno Atlântico",
        "DT_CADASTRO": "2024-06-02T03:46:21.000Z"
    }
]
```

## BUSCAR UM HABITAT  `get`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/habitat/<ID>`
> #### Descrição
> ###### Essa rota serve para buscar um habitat em específico, exibindo id, nome, descrição, clima, vegetação, região e data de cadastro
```json
RETORNO DA API
{
    "ID_HABITAT": 2,
    "NM_HABITAT": "Habitat Teste",
    "DESC_HABITAT": "descrição do habitat teste",
    "CLIMA_HABITAT": "Tropical",
    "VEG_HABITAT": "Fitoplâncton",
    "REGIAO_HABITAT": "Oceano Índico",
    "DT_CADASTRO": "2024-06-02T03:38:02.000Z"
}
```

## CRIAR UM NOVO HABITAT  `post`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/habitat`
> #### Descrição
> ###### Essa rota serve para criar um novo habitat, informando nome, descrição, clima, vegetação e região
```json
ENVIO PARA A API
{
    "NM_HABITAT": "Habitat Teste",
    "DESC_HABITAT": "descrição do habitat teste",
    "CLIMA_HABITAT": "Tropical",
    "VEG_HABITAT": "Fitoplâncton",
    "REGIAO_HABITAT": "Oceano Índico",
},
```
```json
RETORNO DA API
{
    "message": "Habitat cadastrada com sucesso"
}
```

## EDITAR UM HABITAT  `put`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/habitat/<ID>`
> #### Descrição
> ###### Essa rota serve para editar uma espécie, informando nome, descrição, clima, vegetação e região`
```json
ENVIO PARA A API
{
    "NM_HABITAT": "Habitat Teste Alterado",
    "DESC_HABITAT": "descrição do habitat teste alterado",
    "CLIMA_HABITAT": "Polo Norte",
    "VEG_HABITAT": "Fitoplâncton",
    "REGIAO_HABITAT": "Oceano Glacial Ártico",
},
```
```json
RETORNO DA API

Informações do habitat foram atualizadas com sucesso
```

## EXCLUIR UM HABITAT  `del`
`https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev/habitat/<ID>`
> #### Descrição
> ###### Essa rota serve para excluir um habitat, informando apenas o ID na rota
```json
{
    "message": "Habitat <ID> excluído com sucesso"
}
```

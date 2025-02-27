let participantes = [
  {
    nome: "Isabela Santos",
    email: "isabela@gmail.com",
    dataInscricao: new Date(2024, 3, 30, 16, 15),
    dataCheckIn: new Date(2024, 3, 30, 10, 20),
  },

  {
    nome: "Gustavo Bhals",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null,
  },

  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: new Date(2024, 2, 23, 18, 45),
  },
  {
    nome: "Maria Santos",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 11, 45),
    dataCheckIn: new Date(2024, 2, 27, 10, 15),
  },
  {
    nome: "Pedro Oliveira",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 15, 10),
    dataCheckIn: null,
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 4, 24, 9, 0),
    dataCheckIn: new Date(2024, 4, 29, 16, 20),
  },
  {
    nome: "Lucas Alves",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 14, 30),
    dataCheckIn: new Date(2024, 2, 24, 11, 0),
  },
  {
    nome: "Juliana Pereira",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 5, 25, 8, 15),
    dataCheckIn: new Date(2024, 5, 25, 14, 45),
  },
  {
    nome: "Rafaela Costa",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 3, 25, 12, 0),
    dataCheckIn: new Date(2024, 3, 25, 9, 30),
  },
  {
    nome: "Thiago Carvalho",
    email: "thiago@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 16, 20),
    dataCheckIn: null,
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `;
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `;
};

const atualizarLista = (participantes) => {
  let output = "";
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante);
  }

  // substituir informação do HTML
  document.querySelector("tbody").innerHTML = output;
};

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };

  // verificar se o particpante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  );

  if (participanteExiste) {
    alert("Email já cadastrado!");
    return;
  }

  participantes = [participante, ...participantes];
  atualizarLista(participantes);

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?";

  if (confirm(mensagemConfirmacao) == false) {
    return;
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  );

  // atualizar o check-in do participante
  participante.dataCheckIn = new Date();

  // atualizar a lista de participantes
  atualizarLista(participantes);
};

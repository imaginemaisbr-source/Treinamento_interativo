export interface Walkthrough {
  id: string;
  title: string;
  description: string;
  steps: string[];
}

export interface Mission {
  id: string;
  title: string;
  objective: string;
  successCriteria: string;
  failureCriteria: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface Module {
  id: string;
  name: string;
  icon: string;
  color: string;
  objective: string;
  topics: string[];
  walkthroughs: Walkthrough[];
  missions: Mission[];
  description: string;
}

export const trainingModules: Module[] = [
  {
    id: "ng-billing",
    name: "NG Billing (NGWEB)",
    icon: "DollarSign",
    color: "from-blue-500 to-blue-600",
    objective: "Capacitar o atendente a realizar consultas financeiras, gerenciar faturas e executar procedimentos de cobrança e negociação.",
    topics: [
      "Visão Geral do Sistema",
      "Cadastro e Consulta de Clientes",
      "Gestão de Faturas",
      "Ajustes Financeiros",
      "Negociação e Acordos",
      "Relatórios Básicos"
    ],
    description: "Sistema de faturamento para gestão completa do ciclo financeiro dos clientes, incluindo emissão de faturas, consulta de débitos, negociação de acordos e ajustes financeiros.",
    walkthroughs: [
      {
        id: "ng-1",
        title: "Consulta de Fatura e Histórico de Pagamento",
        description: "Guia o usuário para localizar e interpretar as faturas de um cliente, bem como seu histórico de pagamentos.",
        steps: [
          "Acessar o menu 'Financeiro'",
          "Clicar em 'Faturas'",
          "Inserir o CPF/CNPJ do cliente",
          "Selecionar a fatura desejada",
          "Visualizar detalhes e histórico de pagamentos"
        ]
      },
      {
        id: "ng-2",
        title: "Aplicação de Desconto e Geração de 2ª Via",
        description: "Demonstra como aplicar um desconto em uma fatura e gerar uma segunda via para o cliente.",
        steps: [
          "Localizar a fatura do cliente",
          "Clicar em 'Ações' > 'Aplicar Desconto'",
          "Inserir o valor/percentual e justificativa",
          "Confirmar",
          "Clicar em 'Gerar 2ª Via'"
        ]
      },
      {
        id: "ng-3",
        title: "Registro de Acordo de Parcelamento",
        description: "Orienta o atendente a registrar um acordo de parcelamento para um cliente inadimplente.",
        steps: [
          "Acessar a seção de 'Débitos' do cliente",
          "Selecionar as faturas a parcelar",
          "Clicar em 'Negociação' > 'Novo Acordo'",
          "Definir número de parcelas e condições",
          "Confirmar o acordo"
        ]
      }
    ],
    missions: [
      {
        id: "ng-m1",
        title: "Cliente com Dúvida na Fatura",
        objective: "O atendente deve localizar a fatura do cliente 'Maria Silva', explicar um item de cobrança e gerar uma 2ª via.",
        successCriteria: "Fatura localizada, item explicado (simulado), 2ª via gerada.",
        failureCriteria: "Não localizou a fatura, gerou 2ª via incorreta.",
        difficulty: "easy"
      },
      {
        id: "ng-m2",
        title: "Negociação de Débito",
        objective: "O atendente deve negociar um débito de 3 faturas para o cliente 'João Santos', oferecendo parcelamento em 3x sem juros e registrando o acordo.",
        successCriteria: "Acordo de parcelamento registrado corretamente com as condições especificadas.",
        failureCriteria: "Acordo não registrado, condições incorretas.",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "vtal",
    name: "Portal Operacional VTAL",
    icon: "Network",
    color: "from-green-500 to-green-600",
    objective: "Habilitar o atendente a verificar a viabilidade técnica, abrir e acompanhar ordens de serviço (OS) relacionadas à infraestrutura de rede.",
    topics: [
      "Visão Geral do Portal",
      "Consulta de Viabilidade Técnica",
      "Abertura de Ordens de Serviço (OS)",
      "Acompanhamento de OS",
      "Gestão de Incidentes",
      "Diagnóstico Básico de Rede"
    ],
    description: "Portal de integração com a V.tal para abertura, acompanhamento e gestão de ordens de serviço, verificação de viabilidade técnica e diagnóstico de incidentes na rede.",
    walkthroughs: [
      {
        id: "vtal-1",
        title: "Verificação de Viabilidade Técnica",
        description: "Guia o usuário para consultar a cobertura de rede V.tal para um novo endereço.",
        steps: [
          "Acessar o menu 'Viabilidade'",
          "Inserir CEP, rua e número",
          "Clicar em 'Consultar'",
          "Interpretar o resultado (disponível/indisponível)"
        ]
      },
      {
        id: "vtal-2",
        title: "Abertura de Ordem de Serviço (OS) de Instalação",
        description: "Demonstra o processo de abertura de uma OS para instalação de um novo serviço.",
        steps: [
          "Acessar o menu 'OS'",
          "Clicar em 'Nova OS'",
          "Selecionar 'Instalação'",
          "Preencher dados do cliente e endereço",
          "Selecionar tipo de serviço e plano",
          "Confirmar abertura"
        ]
      },
      {
        id: "vtal-3",
        title: "Acompanhamento e Reagendamento de OS",
        description: "Orienta o atendente a consultar o status de uma OS e, se necessário, solicitar um reagendamento.",
        steps: [
          "Acessar o menu 'OS'",
          "Clicar em 'Consultar OS'",
          "Inserir número da OS ou dados do cliente",
          "Visualizar status",
          "Clicar em 'Reagendar' (se disponível) e selecionar nova data/hora"
        ]
      }
    ],
    missions: [
      {
        id: "vtal-m1",
        title: "Novo Cliente",
        objective: "O atendente deve verificar a viabilidade para o endereço 'Rua das Flores, 123' e, se viável, abrir uma OS de instalação para o cliente 'Ana Paula'.",
        successCriteria: "Viabilidade confirmada, OS de instalação aberta corretamente.",
        failureCriteria: "Endereço não viável, OS não aberta ou com dados incorretos.",
        difficulty: "medium"
      },
      {
        id: "vtal-m2",
        title: "Cliente sem Internet",
        objective: "O atendente deve localizar a OS de reparo para o cliente 'Carlos Eduardo' (OS nº 12345) e informar o status atual e a previsão de restabelecimento.",
        successCriteria: "OS localizada, status e previsão informados (simulado).",
        failureCriteria: "Não localizou a OS, informações incorretas.",
        difficulty: "easy"
      }
    ]
  },
  {
    id: "psw",
    name: "PSW (Atendimento)",
    icon: "Headphones",
    color: "from-purple-500 to-purple-600",
    objective: "Treinar o atendente no registro completo de interações com clientes, provisionamento de serviços e diagnóstico de problemas técnicos.",
    topics: [
      "Visão Geral do Sistema",
      "Registro de Atendimentos",
      "Provisionamento de Serviços",
      "Diagnóstico Técnico Remoto",
      "Gestão de Workflow",
      "Base de Conhecimento"
    ],
    description: "Sistema de atendimento para registro de chamados, provisionamento de serviços, diagnóstico técnico remoto e gestão completa do workflow de resolução.",
    walkthroughs: [
      {
        id: "psw-1",
        title: "Registro de Atendimento de Suporte Técnico",
        description: "Guia o usuário para registrar um chamado de suporte técnico para um cliente com problema de conexão.",
        steps: [
          "Acessar o menu 'Atendimento'",
          "Clicar em 'Novo Chamado'",
          "Inserir dados do cliente",
          "Selecionar categoria 'Suporte Técnico' e tipo 'Problema de Conexão'",
          "Descrever o problema e registrar ações iniciais",
          "Salvar"
        ]
      },
      {
        id: "psw-2",
        title: "Diagnóstico Remoto de Conexão",
        description: "Demonstra como utilizar as ferramentas de diagnóstico do PSW para verificar o status da conexão do cliente.",
        steps: [
          "Localizar o chamado do cliente",
          "Clicar em 'Ferramentas' > 'Diagnóstico Remoto'",
          "Executar testes de ping/velocidade (simulado)",
          "Analisar resultados e registrar no chamado"
        ]
      },
      {
        id: "psw-3",
        title: "Provisionamento de Serviço (Upgrade de Plano)",
        description: "Orienta o atendente a realizar o provisionamento de um upgrade de plano de internet para um cliente.",
        steps: [
          "Acessar o cadastro do cliente",
          "Clicar em 'Serviços' > 'Alterar Plano'",
          "Selecionar o novo plano",
          "Confirmar o provisionamento",
          "Verificar status de ativação"
        ]
      }
    ],
    missions: [
      {
        id: "psw-m1",
        title: "Cliente com Lentidão",
        objective: "O atendente deve registrar um chamado para o cliente 'Fernanda Lima' que reclama de lentidão na internet, realizar um diagnóstico remoto (simulado) e propor uma solução.",
        successCriteria: "Chamado registrado corretamente, diagnóstico simulado, solução proposta.",
        failureCriteria: "Chamado não registrado, diagnóstico incorreto, solução inadequada.",
        difficulty: "medium"
      },
      {
        id: "psw-m2",
        title: "Cancelamento de Serviço",
        objective: "O atendente deve registrar a solicitação de cancelamento do serviço de internet para o cliente 'Gustavo Pereira', seguindo o fluxo de retenção (simulado) e finalizando o processo.",
        successCriteria: "Solicitação de cancelamento registrada, fluxo de retenção simulado, processo finalizado.",
        failureCriteria: "Processo não finalizado, fluxo de retenção ignorado.",
        difficulty: "hard"
      }
    ]
  }
];

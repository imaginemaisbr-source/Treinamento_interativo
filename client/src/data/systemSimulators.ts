/**
 * Sistema de Simuladores Interativos
 * Estrutura para criar simulações de navegação nos sistemas reais
 * com hotspots clicáveis e validação de passos
 */

export interface Hotspot {
  id: string;
  x: number; // percentual da largura
  y: number; // percentual da altura
  width: number; // percentual da largura
  height: number; // percentual da altura
  label: string;
  description?: string;
  action?: "navigate" | "input" | "click" | "search";
  nextScreen?: string;
  inputField?: string;
  expectedValue?: string;
}

export interface SimulatorScreen {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  hotspots: Hotspot[];
  instructions?: string;
  successMessage?: string;
}

export interface SimulatorFlow {
  id: string;
  name: string;
  description: string;
  system: "ngbilling" | "vtal" | "psw";
  difficulty: "easy" | "medium" | "hard";
  screens: SimulatorScreen[];
  steps: string[];
  objective: string;
}

// Simulador NG Billing - Consultar Cliente
export const ngBillingConsultarCliente: SimulatorFlow = {
  id: "ngbilling-consultar-cliente",
  name: "Consultar Dados do Cliente",
  description: "Aprenda a localizar e visualizar informações de um cliente no NG Billing",
  system: "ngbilling",
  difficulty: "easy",
  objective: "Localizar o cliente 'TARSIS DE OLIVEIRA LOPES' e visualizar seus dados de contrato e cobrança",
  steps: [
    "Acessar o menu principal do NG Billing",
    "Clicar em 'Atendimento'",
    "Buscar o cliente por nome, CPF ou contrato",
    "Visualizar detalhes do cliente, contas e contratos",
    "Consultar dados de cobrança e histórico"
  ],
  screens: [
    {
      id: "ngbilling-menu",
      name: "Menu Principal NG Billing",
      description: "Tela inicial com opções de navegação",
      imageUrl: "/system_screenshots/01_ngbilling_menu_principal.png",
      instructions: "Clique em 'Atendimento' para começar",
      hotspots: [
        {
          id: "atendimento-btn",
          x: 10,
          y: 25,
          width: 20,
          height: 15,
          label: "Atendimento",
          description: "Seção para consulta de clientes",
          action: "click",
          nextScreen: "ngbilling-atendimento"
        },
        {
          id: "financeiro-btn",
          x: 35,
          y: 25,
          width: 20,
          height: 15,
          label: "Financeiro",
          description: "Seção de cobrança e faturas",
          action: "click"
        },
        {
          id: "gestao-campo-btn",
          x: 60,
          y: 25,
          width: 20,
          height: 15,
          label: "Gestão de Campo",
          description: "Seção de OS externa",
          action: "click"
        }
      ]
    },
    {
      id: "ngbilling-atendimento",
      name: "Seção Atendimento",
      description: "Tela de busca de clientes",
      imageUrl: "/system_screenshots/02_ngbilling_atendimento.png",
      instructions: "Digite o nome do cliente na barra de busca e clique em 'Busca avançada'",
      hotspots: [
        {
          id: "search-input",
          x: 5,
          y: 8,
          width: 60,
          height: 8,
          label: "Campo de Busca",
          description: "Digite: TARSIS DE OLIVEIRA LOPES",
          action: "input",
          inputField: "customerName",
          expectedValue: "TARSIS"
        },
        {
          id: "advanced-search-btn",
          x: 65,
          y: 8,
          width: 20,
          height: 8,
          label: "Busca Avançada",
          description: "Clique para buscar",
          action: "click",
          nextScreen: "ngbilling-cliente-detalhes"
        }
      ]
    },
    {
      id: "ngbilling-cliente-detalhes",
      name: "Detalhes do Cliente",
      description: "Informações completas do cliente",
      imageUrl: "/system_screenshots/03_ngbilling_cliente_detalhes.png",
      instructions: "Analise os dados do cliente: contratos, cobrança e histórico",
      successMessage: "Parabéns! Você consultou com sucesso os dados do cliente.",
      hotspots: [
        {
          id: "cliente-info",
          x: 0,
          y: 8,
          width: 100,
          height: 15,
          label: "Informações do Cliente",
          description: "TARSIS DE OLIVEIRA LOPES - CPF: 049.842.669-61",
          action: "click"
        },
        {
          id: "contas-contratos",
          x: 0,
          y: 15,
          width: 30,
          height: 50,
          label: "Contas e Contratos",
          description: "Visualize os contratos associados",
          action: "click"
        },
        {
          id: "dados-cobranca",
          x: 30,
          y: 25,
          width: 40,
          height: 40,
          label: "Dados de Cobrança",
          description: "Valores periódicos, descontos e totais",
          action: "click"
        },
        {
          id: "historico",
          x: 70,
          y: 15,
          width: 30,
          height: 50,
          label: "Histórico",
          description: "Protocolos, OS e promoções",
          action: "click"
        }
      ]
    }
  ]
};

// Simulador PSW - Identificar Cliente
export const pswIdentificarCliente: SimulatorFlow = {
  id: "psw-identificar-cliente",
  name: "Identificar Cliente no PSW",
  description: "Aprenda a localizar um cliente no sistema PSW",
  system: "psw",
  difficulty: "easy",
  objective: "Localizar um cliente usando ID Comercial ou CPF/CNPJ",
  steps: [
    "Acessar a tela de Atendimento",
    "Escolher método de busca (ID Comercial ou CPF/CNPJ)",
    "Inserir dados do cliente",
    "Executar a busca",
    "Visualizar informações do cliente"
  ],
  screens: [
    {
      id: "psw-identificacao",
      name: "Identificação do Cliente",
      description: "Tela de busca do PSW",
      imageUrl: "/system_screenshots/04_psw_atendimento_identificacao.png",
      instructions: "Escolha um método de busca e insira os dados do cliente",
      successMessage: "Cliente identificado com sucesso no sistema PSW!",
      hotspots: [
        {
          id: "id-comercial-input",
          x: 8,
          y: 16,
          width: 25,
          height: 8,
          label: "Campo ID Comercial",
          description: "Digite o ID Comercial do cliente",
          action: "input",
          inputField: "idComercial"
        },
        {
          id: "pesquisar-circuito-btn",
          x: 35,
          y: 16,
          width: 20,
          height: 8,
          label: "Pesquisar Circuito",
          description: "Clique para buscar por ID Comercial",
          action: "click"
        },
        {
          id: "cpf-cnpj-input",
          x: 65,
          y: 16,
          width: 25,
          height: 8,
          label: "Campo CPF/CNPJ",
          description: "Digite o CPF ou CNPJ do cliente",
          action: "input",
          inputField: "cpfCnpj",
          expectedValue: "000"
        },
        {
          id: "pesquisar-cpf-btn",
          x: 92,
          y: 16,
          width: 20,
          height: 8,
          label: "Pesquisar por CPF/CNPJ",
          description: "Clique para buscar por CPF/CNPJ",
          action: "click"
        }
      ]
    }
  ]
};

// Simulador Portal VTAL - Viabilidade
export const vtalConsultarViabilidade: SimulatorFlow = {
  id: "vtal-consultar-viabilidade",
  name: "Consultar Viabilidade Técnica",
  description: "Aprenda a verificar se um endereço possui cobertura V.tal",
  system: "vtal",
  difficulty: "medium",
  objective: "Consultar a viabilidade técnica para um novo endereço no Portal VTAL",
  steps: [
    "Acessar o menu 'Casas Conectadas'",
    "Utilizar a barra de pesquisa para filtrar endereços",
    "Verificar o status de viabilidade e produtos disponíveis",
    "Analisar detalhes técnicos da localidade"
  ],
  screens: [
    {
      id: "vtal-casas-conectadas",
      name: "Casas Conectadas",
      description: "Lista de endereços e viabilidade",
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23f8f9fa' width='800' height='600'/%3E%3Crect fill='%23f1ff00' width='800' height='50'/%3E%3Ctext x='20' y='30' font-family='Arial' font-size='18' font-weight='bold'%3EPORTAL VTAL%3C/text%3E%3Crect x='57' y='50' width='743' height='40' fill='%23616161'/%3E%3Ctext x='70' y='75' fill='white' font-family='Arial' font-size='14'%3ECasas Conectadas%3C/text%3E%3Crect x='200' y='100' width='400' height='35' rx='17' fill='white' stroke='%23d1d1c4'/%3E%3Ctext x='220' y='123' fill='%239e9e9e' font-family='Arial' font-size='14'%3EPesquisar endereço...%3C/text%3E%3Crect x='57' y='150' width='743' height='400' fill='white'/%3E%3Ctext x='80' y='180' font-family='Arial' font-size='16' font-weight='bold'%3EID da Casa Conectada%3C/text%3E%3Ctext x='300' y='180' font-family='Arial' font-size='16' font-weight='bold'%3EStatus%3C/text%3E%3Ctext x='450' y='180' font-family='Arial' font-size='16' font-weight='bold'%3EProdutos%3C/text%3E%3C/svg%3E",
      instructions: "Digite o endereço no campo de pesquisa para filtrar a viabilidade",
      successMessage: "Consulta de viabilidade realizada com sucesso!",
      hotspots: [
        {
          id: "vtal-search",
          x: 25,
          y: 16,
          width: 50,
          height: 6,
          label: "Barra de Pesquisa",
          description: "Digite o endereço ou CEP",
          action: "input",
          inputField: "address",
          expectedValue: "RUA"
        },
        {
          id: "vtal-home-link",
          x: 0,
          y: 8,
          width: 7,
          height: 7,
          label: "Home",
          action: "click"
        }
      ]
    }
  ]
};

// Estrutura extensível para adicionar mais simuladores
export const simulatorFlows: SimulatorFlow[] = [
  ngBillingConsultarCliente,
  pswIdentificarCliente,
  vtalConsultarViabilidade
];

export function getSimulatorFlow(id: string): SimulatorFlow | undefined {
  return simulatorFlows.find(flow => flow.id === id);
}

export function getSimulatorsBySystem(system: "ngbilling" | "vtal" | "psw"): SimulatorFlow[] {
  return simulatorFlows.filter(flow => flow.system === system);
}

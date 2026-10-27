# Análise de ofertas — Ponte Norte Comércio

Versão: ANALISE-R1.
Executor: papel ANALYST, sessão real /root/analyst, delegada pelo coordenador /root.
Modo: sessão de subagente efetiva em ambiente compartilhado; não comprova isolamento técnico ou auditoria independente.
Autorização de origem: resposta humana “autorizo” à solicitação de delegar ANALYST e, após aceite documental da análise, WRITER.
Destinatário: coordenador /root, para aceite documental antes da redação.
Situação: SUBMETIDA AO ACEITE DO COORDENADOR; não aprovada pelo próprio ANALYST.

## Entradas e fontes
- Regras consultadas: AGENTS.md, roles/ANALYST.md, handoff/CONTRACT.md, contracts/MISSION.md e contracts/AUTHORITY.md.
- Estado consultado: state/STATE.md registra fontes VALIDADAS e pendência de correção pela ausência dos insumos. A autorização humana mais recente permite produzir esta análise; não implica aprovação da proposta ou ação externa.
- Fontes comerciais exclusivas: data/CATALOG.md, data/POLICIES.md e data/CASE.md, lidas diretamente nesta sessão.
- Não foram usados dados privados, internet, integrações ou propostas anteriores como fonte comercial.

## Fatos do cliente
Ponte Norte Comércio é cliente fictício, com equipe de 6 pessoas, 80 contatos por semana recebidos por e-mail e WhatsApp e queixa de demora na primeira resposta. Teto de orçamento: R$ 5.000. Primeira entrega desejada: até 14 dias úteis. Não quer integração com CRM agora. Solicita comparação entre BASE, PRO e MAX e recomendação fundamentada. Fonte: data/CASE.md.

O briefing não declara dois fluxos como requisito obrigatório. A conveniência de uma oferta que os inclua é avaliação de escopo, não novo fato do caso.

## Comparação factual do catálogo
| Oferta | Preço fixo | Prazo | Escopo exato |
| --- | --- | --- | --- |
| BASE — Diagnóstico Express | R$ 1.800 | 5 dias úteis | mapa de jornada atual e plano de 30 dias; sem implementação |
| PRO — Plano Comercial Assistido | R$ 4.600 | 12 dias úteis | diagnóstico, dois fluxos de atendimento e treinamento de 90 minutos |
| MAX — Programa de Operação | R$ 8.200 | 25 dias úteis | itens do PRO, implantação supervisionada de um fluxo piloto e duas sessões de acompanhamento |

Fonte: data/CATALOG.md. Os prazos contam da confirmação do briefing E do pagamento, conforme data/POLICIES.md.

## Cálculos e invariantes
Os cálculos abaixo são derivados de data/CATALOG.md e data/CASE.md; não são novas condições comerciais.

| Verificação | Cálculo | Resultado |
| --- | --- | --- |
| BASE versus teto | R$ 5.000 − R$ 1.800 = R$ 3.200 | Preço abaixo do teto |
| BASE versus horizonte | 14 − 5 = 9 dias úteis | Duração total abaixo do horizonte |
| PRO versus teto | R$ 5.000 − R$ 4.600 = R$ 400 | R$ 4.600 < R$ 5.000 |
| PRO versus horizonte | 14 − 12 = 2 dias úteis | 12 ≤ 14 dias úteis |
| MAX versus teto | R$ 8.200 − R$ 5.000 = R$ 3.200 | R$ 8.200 > R$ 5.000 |
| MAX versus horizonte | 25 − 14 = 11 dias úteis | 25 > 14 dias úteis |

O prazo total do serviço não é um marco intermediário específico. O cliente deseja uma primeira entrega em até 14 dias úteis, mas o catálogo não informa cronograma intermediário nem a referência inicial desse horizonte desejado. Não é possível garantir uma data específica de primeira entrega. As comparações acima são de duração, condicionadas ao marco de início das políticas.

## Avaliação das alternativas
- BASE cabe no teto e apresenta prazo total inferior a 14 dias úteis. É alternativa de diagnóstico e planejamento, sem implementação. Não entrega dois fluxos de atendimento; logo, é insuficiente para uma escolha que inclua expressamente esses dois fluxos. Não há evidência para afirmar que BASE seja incapaz de oferecer qualquer utilidade à queixa.
- PRO cabe no teto e tem duração total inferior ao horizonte desejado. Seu diagnóstico, dois fluxos de atendimento e treinamento de 90 minutos oferecem um escopo mais amplo que BASE para apoiar a organização do atendimento. Essa aderência é avaliação fundamentada, sem garantia de redução de demora ou aumento de vendas.
- MAX inclui os itens do PRO, implantação supervisionada de um fluxo piloto e duas sessões de acompanhamento. Porém, excede o orçamento em R$ 3.200 e a duração de referência em 11 dias úteis. Não cabe presumir desconto, verba adicional, redução de prazo ou primeira entrega intermediária dentro de 14 dias úteis.

## Recomendação derivada
Recomendar PRO para redação de uma minuta sujeita à aprovação humana, porque reúne diagnóstico, dois fluxos de atendimento e treinamento dentro do teto informado, com prazo total de catálogo numericamente inferior ao horizonte desejado.

A recomendação não promete retorno financeiro, aumento de vendas ou resultado quantitativo de atendimento. Não acrescenta implantação supervisionada ao PRO, não inclui licença e não pressupõe integração com CRM. A diferença de R$ 400 para o teto não comprova cobertura de despesas adicionais desconhecidas.

## Condições e limites obrigatórios para a redação
- Preços fixos; desconto não autorizado. Fonte: data/POLICIES.md.
- Licenças e assinaturas de software não incluídas. Fonte: data/POLICIES.md.
- Início do prazo depende da confirmação do briefing E do pagamento, não de apenas uma dessas condições. Fonte: data/POLICIES.md.
- Não prometer retorno financeiro. Fonte: data/POLICIES.md.
- Nenhuma mensagem externa ou gravação em CRM sem aprovação humana explícita. Esta rodada não autoriza essas ações. Fonte: data/POLICIES.md e escopo humano da delegação.
- Respeitar a opção do cliente de não integrar CRM agora. Fonte: data/CASE.md.

## Pendências preservadas
| Questão | Situação |
| --- | --- |
| Confirmação do briefing e do pagamento | PENDENTE — não informado nas fontes |
| Marco inicial dos 14 dias úteis desejados pelo cliente | PENDENTE — não informado nas fontes |
| Marco e conteúdo específico de primeira entrega intermediária | PENDENTE — não informado nas fontes |
| Datas de calendário de início e entrega | PENDENTE — não informado nas fontes |
| Detalhamento dos dois fluxos de atendimento | PENDENTE — não informado nas fontes |
| Necessidade de software e seu eventual custo | PENDENTE — não informado nas fontes; licenças e assinaturas não incluídas |
| Forma ou parcelamento do pagamento | PENDENTE — não informado nas fontes |

Essas lacunas não impedem a comparação preliminar e recomendação documental, mas impedem confirmar data específica, cronograma intermediário ou custo total com software.

## Rastreabilidade para o coordenador
| Grupo de afirmações | Suporte |
| --- | --- |
| Identidade fictícia, equipe, volume, canais, queixa, teto, horizonte e restrição de CRM | data/CASE.md |
| Nomes, preços, prazos e escopos das três ofertas | data/CATALOG.md |
| Preços fixos, exclusão de software, início dos prazos, limite de promessas e ações externas | data/POLICIES.md |
| Diferenças de orçamento e duração | Cálculos apresentados a partir de data/CATALOG.md e data/CASE.md |
| Preferência por PRO e suficiência relativa do escopo | Avaliação explicitamente identificada nesta análise, baseada nas fontes acima |

## Passagem e pedido de aceite
Solicito ao coordenador a conferência de ANALISE-R1 contra os critérios de roles/ANALYST.md e o registro de ACEITA_PARA_REDACAO ou REQUER_CORRECAO em logs/WORKLOG.md. O WRITER só poderá consumir esta análise após esse aceite. Nenhum aceite comercial ou aprovação humana da proposta é declarado aqui.

Único arquivo escrito por esta sessão: outputs/ANALISE.md. Fontes, V1, estado, memória, contratos e logs não alterados. Nenhum envio, CRM, desconto ou promessa de vendas foi executado.

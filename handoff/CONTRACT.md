# Contrato de coordenação e passagem

## Pré-condições
Consultar estado central e fontes validadas. Exigir autorização humana para a rodada e, se houver subagentes efetivos com permissões adequadas, solicitar autorização específica antes de delegar ANALYST e WRITER. Não reutilizar autorizações de rodadas anteriores. Contratos dos papéis devem estar disponíveis antes da solicitação.

## Propriedade exclusiva dos arquivos
| Responsável | Único caminho de saída nesta rodada |
| --- | --- |
| ANALYST | outputs/ANALISE.md |
| WRITER | outputs/PROPOSTA_V2.md |
| REVIEWER | outputs/REVISAO_V2.md |
| Coordenador | logs/WORKLOG.md e state/STATE.md, quando autorizado; contratos conforme pedido humano |

Nenhum papel edita arquivo de outro. Fontes data/ e V1 permanecem imutáveis. Não executar etapas produtoras/consumidoras simultaneamente. Os limites por caminho são instruções operacionais, não isolamento técnico imposto pelo filesystem.

## Sequência e aceite
1. Após autorização de delegação, ANALYST produz e encerra outputs/ANALISE.md.
2. Coordenador lê a análise e confere todos os critérios de roles/ANALYST.md contra data/. Registra no log ACEITA_PARA_REDACAO ou REQUER_CORRECAO, evidências e identificação da versão. Somente o primeiro resultado libera WRITER. Aceite é documental, não aprovação comercial humana.
3. WRITER lê a análise aceita e fontes de conferência; produz V2 exclusivamente com base nessa análise. Não acrescenta preço, política ou recomendação por iniciativa própria.
4. REVIEWER, quando efetivamente executado, lê os arquivos concluídos e produz parecer com testes realizados. Até então, revisão desta rodada permanece NÃO REALIZADA, sem presumir o resultado.
5. Coordenador apresenta diferenças objetivas V1/V2 e evidências; aguarda validação humana. Não envia documentos.

Alteração da análise após aceite invalida a passagem: novo aceite e reconferência da V2 são necessários. Correções de uma saída são feitas apenas pelo seu dono, sequencialmente; não sobrescrever a versão já aceita durante consumo.

## Registro obrigatório de cada passagem
Data, remetente, destinatário, autorização de origem, nome e ID real da sessão quando houver, modo de execução, objetivo, entradas e identificação da versão, arquivo produzido, evidências, resultado observado, pendências, bloqueios, aceite e próxima ação. Usar caminho, executor e marcador de versão declarado; conferir releitura antes de consumir. Dados ausentes: PENDENTE — não informado nas fontes. Não inventar IDs, sessões ou resultados.

## Modos de execução e limitações
- Com autorização e suporte efetivo: sessões reais de ANALYST e WRITER, iniciadas separadamente e em sequência; registrar identificadores retornados pelo harness e resultados efetivamente observados. REVIEWER pode ser executado pelo coordenador, com essa limitação explícita.
- Se não houver capacidade/permissão adequada: execução sequencial pelo mesmo assistente, rotulada exatamente “simulação de papéis; não execução multiagente independente”. Antes de cada etapa, reler contrato, fontes e somente os insumos aceitos necessários; registrar o conjunto de contexto. Essa releitura não apaga tecnicamente o histórico do modelo.
- Recusa ou ausência de autorização não equivale a indisponibilidade técnica; aguardar orientação humana, sem substituir automaticamente o modo solicitado.
- Sessões distintas compartilham ambiente e não comprovam isolamento técnico, independência de modelos ou ganho de qualidade/tempo.

## Ferramentas e escalonamento
Somente leitura local e edição Markdown no workspace autorizado. Terminal apenas para listagem/leitura já autorizada, nunca escrita ou execução de código. Sem rede, instalações, integrações, descontos, promessas financeiras, mensagens ou CRM. Falta de autorização, conflito de fonte, mudança de insumo, falha de teste ou lacuna impeditiva bloqueia a passagem e exige escalonamento ao coordenador/humano. Pendências não impeditivas permanecem explícitas.

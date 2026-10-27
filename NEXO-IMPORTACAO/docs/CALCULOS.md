# Memória de cálculo do motor v1.1

## Unidade vendável
B = embalagens compradas; f = peças por embalagem; k = peças por kit. Q = B×f; N = piso(Q/k); sobra = Q−N×k. Quantidades devem ser inteiras positivas e gerar ao menos um kit. O custo do lote é integralmente atribuído aos kits vendáveis; sobras não geram receita na simulação.

## Importação
Modo detalhado, todos os campos em BRL: C = mercadoria + frete internacional + seguro + II + ICMS + outras despesas efetivas. Campos desconhecidos bloqueiam cálculo; zero precisa ser informado expressamente. IOF, spread, courier, despacho e outras despesas incidentes devem entrar na linha de despesas com memória.

Modo checkout: C = total reconciliado informado, incluindo despesas fora do checkout quando incidentes. As parcelas detalhadas não são somadas novamente. A opção exige reconciliação humana, não prova de quitação por rótulo DDP.

VA = M+F+S, sem duplicação; II=60%×VA apenas quando enquadramento vigente confirmado. ICMS=B0×a/(1−a) depende de alíquota/base legal. **O motor não presume alíquota atual nem calcula tributos legais automaticamente**. O exemplo fictício usa II60%/ICMS17% somente como teste didático recuperado.

## Receita e custos por cenário
P = preço do kit; U = frete do comprador por kit; N = kits; R=N(P+U).

Modelo linear explícito desta versão: base dos percentuais configurada por canal. No modo bruto, base=N(P+U); no modo produto, base=NP. t = soma de comissão, publicidade, perdas/devoluções, outros tributos de venda e DAS quando incluído, dividida por100. b = tarifa fixa + logística bruta suportada + embalagem/preparação + outros custos por kit + abastecimento quando incluído; H = armazenagem total + mensalidade rateada no lote. A base escolhida vale para todos os percentuais do cenário; diferenças de cobrança exigem memória/custos adequadamente documentados.

V=base×t+N×b+H; L=R−C−V; ROI=100×L/C. Não usar frete líquido do vendedor e adicionar receita de frete uma segunda vez. Não duplicar devoluções com perdas, DAS com outros tributos ou logística com abastecimento já embutido. Não usar percentuais genéricos sem evidência. Se a cobrança efetiva exigir bases distintas ou outras faixas, parametrizar custos documentados e reavaliar; o modelo não certifica adequação automática à conta.

Se g é a meta de ROI configurada em percentual: no modo bruto, Pmín=((1+g/100)C/N+b+H/N)/(1−t)−U; no modo produto, Pmín=((1+g/100)C/N+b+H/N−U)/(1−t). O padrão g=100 reproduz a fórmula inicial de2C. t deve ser inferior a100%. Exibir preço mínimo como válido somente dentro da faixa de preço declarada; fora dela, recalcular tarifas/limites. Não garante competitividade ou demanda. A meta é comparada antes do arredondamento.

## Armazenagem
Modelo auxiliar uniforme: armazenagem=N×tarifa diária×T/2. Requer hipótese explícita de venda uniforme sem reposição, com lote disponível no início. Para 250 kits,60dias,0,007 por kit/dia, total52,50. Valores são teste/registro histórico, não tarifa atual. Cronograma real exige estoque diário; tarifa FBA volumétrica precisa de memória própria.

## Decisão
ROI inferior à meta configurada reprova financeiramente; no padrão100%, inclusive99,999% reprova antes de arredondamento. Configurações inválidas ou custos DAS/abastecimento não informados quando incluídos bloqueiam cálculo. Completude financeira não é evidência validada. Dados essenciais/fonte/consulta/vigência/conferência humana ausentes mantêm aprovação pendente. Origem demo/histórico sempre bloqueia aprovação definitiva.

Conjunto aprovado somente com pelo menos uma modalidade aprovada de ML, uma de Amazon e Shopee. Não usa média. Se todas as modalidades de um marketplace calculável falham financeiramente, o critério conjunto reprova; ausência de alternativa ainda não calculada mantém pendência quando puder mudar a conclusão.

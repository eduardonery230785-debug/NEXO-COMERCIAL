# NEXO Importação — painel web v1.1

**[ABRIR O PAINEL WEB](https://nexo-importacao-marketplaces.cheery-ox-5099.chatgpt.site)** · Site privado por padrão; autentique com a conta proprietária.

Código e documentação em pasta independente. A fundação anterior foi preservada.

Nova plataforma independente para análise de produtos importados e venda em Mercado Livre, Amazon e Shopee. Criada em pasta nova, sem substituir arquivos da fundação NEXO-COMERCIAL ou de uma plataforma anterior.

## Usar
Abra o endereço publicado informado na entrega. Na aplicação, cadastre um produto ou escolha explicitamente o exemplo fictício. Preencha kits, importação e os custos de cada modalidade; registre as fontes na seção de evidências. Gere um dossiê interno em Markdown para decisão humana.

O site é HTML/CSS/JavaScript estático, sem dependências de aplicação. Para executar localmente: `python3 -m http.server 4173 --directory dist`, e abra `http://localhost:4173`. Testes: `npm test`; sintaxe: `npm run check`. Requer Node para testar; não há instalação obrigatória.

## Funcionalidades
- Cadastro de produtos, variantes/notas, quantidade de embalagens, peças e kits, com sobras explícitas.
- Importação por parcelas em BRL ou total reconciliado de checkout; não duplica impostos já incluídos.
- Cenários separados: ML Full; ML envio próprio; Amazon FBA; Amazon FBM; Shopee.
- Comissão, tarifa fixa, logística, embalagem, publicidade, perdas/devoluções, tributos de venda sem DAS, armazenagem, mensalidade e outros custos.
- ROI sobre o custo total importado e preço mínimo apenas na faixa de tarifa válida.
- Armazenagem por estoque médio quando a venda uniforme for hipótese expressa.
- Fontes, consulta, vigência, categoria, modalidade/conta e conferência humana declarada.
- Dossiê Markdown, backup JSON e importação de cópias sem substituir produtos existentes.
- Histórico local e layout responsivo; não há integração com lojas, fornecedores, CRM ou IA em execução.

## Armazenamento e privacidade
Os produtos ficam em localStorage neste navegador/origem. Não há banco compartilhado, login de equipe, sincronização entre dispositivos ou monitoramento em segundo plano. Limpeza do navegador pode apagar dados: exporte backups. O código no GitHub não inclui os produtos cadastrados no navegador. Não coloque tokens, credenciais, dados pessoais ou documentos fiscais no repositório público.

Site publicado com acesso privado por padrão no Sites; o espelho de código no GitHub é público no repositório existente. Compartilhamento do Site não é alterado automaticamente por publicar código. Os registros acessíveis do histórico são de processo e simulações, sem endereço completo, faturamento ou credenciais.

## Fontes e limites
Regras recuperadas da skill `analista-produtos-importacao:avaliar-produtos-importacao` e referência `conhecimento-importacao.md`, versão 08/10/2026. A base é parcial, não todo o histórico do GPT. Não se consultou histórico de outra plataforma inacessível, tarifas atuais, conta de marketplace ou fornecedor. Nenhum produto histórico é aprovado automaticamente.

Consulte [regras](docs/REGRAS.md), [cálculos](docs/CALCULOS.md), [validação](docs/VALIDACAO.md) e [governança](AGENTS.md).

## Aprovação
Meta inicial: ROI mínimo de 100% em cada marketplace, não na média; agora editável em Configurações. Um cenário validado de ML, um de Amazon e Shopee são necessários para aprovação conjunta. Custos desconhecidos não são zero. Evidências não conferidas ou tarifas desatualizadas bloqueiam aprovação definitiva mesmo com ROI alto. “Validado por declaração humana” não é verificação automática do site.

Configuração inicial **sem DAS e sem abastecimento**, por instruções recuperadas; ambas as inclusões podem ser alteradas em Configurações. Exclusões não representam isenção tributária nem rentabilidade após todos os tributos. Armazenagem permanece incluída. Não existe garantia de giro/ROI nem execução de compra, pagamento, anúncio, mensagem ou CRM.

## Edição de todos os dados de entrada — v1.1
Use **Configurações** para editar identificação/empresa, destino, regime informado, meta de ROI, faixa de preço alvo, lote referencial, inclusão de DAS/abastecimento e notas de decisão. Use **Produtos & kits → Editar / analisar** para editar cadastro, SKU, descrição, variante, material, finalidade, NCM, fornecedor, link, MOQ, incoterm, courier, validade, prazo, câmbios, composição e custos. Fontes, dimensões, datas e confirmações continuam editáveis em **Fontes & evidências**.

Os percentuais podem incidir sobre produto+frete do comprador ou apenas produto, por cenário. DAS e abastecimento incluídos exigem valores explícitos em cada modalidade; não viram zero silenciosamente. **Salvar alterações** confirma o salvamento do produto; mudanças também são salvas ao sair do campo. **Duplicar produto** permite testar alterações sem substituir o original.

Receita, lucro, ROI, preço mínimo e decisão são resultados calculados, não valores que se editam diretamente. A origem fictícia/histórica e o registro de ações preservam rastreabilidade. Alterar dados não realiza verificação de evidência.

Cadastros locais v1 são migrados sem trocar a chave de armazenamento nem apagar produtos/histórico. Backups v1 continuam aceitos; backup v2 inclui configurações e novos campos. Importar configurações de um backup exige confirmação específica, e os produtos sempre entram como cópias, preservando os existentes. Valores de referência não sobrescrevem preços/quantidades dos produtos.

## Histórico comercial protegido
O espelho público inclui aplicação, regras gerais e testes fictícios. Registros históricos de produtos, cotações, resultados e dados empresariais não foram incluídos; sua eventual divulgação pública exige autorização específica. A base histórica não é necessária para executar o painel.

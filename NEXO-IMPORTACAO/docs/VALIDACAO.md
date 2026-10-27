# Validação da plataforma

## Motor financeiro
14 testes automatizados em tests/engine.test.mjs, executados via npm test, passaram: peças/kits/sobras; ausência≠zero; checkout sem duplicar tributo; fixture financeira recuperada; demo não aprova;99,999% não aprova; tarifa vencida/consulta antiga; preço mínimo sem extrapolar faixa; armazenagem por estoque médio; aprovação individual nos3marketplaces; ausência não vira reprovação arbitrária; importação com whitelist; histórico sem auditoria; frete comprador sem duplicação.

Fixture fictícia: mercadoria400,frete100,II300,ICMS163,8554216867 (17% hipotético),C963,8554216867;100embalagens×10peças÷5=200kits;preço19,90;custos fictícios ML próprio2.000,Shopee2.400,Amazon FBM1.700. ROIs105,425%,63,925%,136,55%; conjunto reprovado apesar de média favorável. Não são tarifas/cotações atuais.

## Interface e limites
Navegador Chromium local existente, via Playwright: passaram abertura do dashboard;5cenários;rejeição conjunta;edição de custos;persistência após reload;navegação de evidências/histórico;novo cadastro;escape de HTML;layout mobile390px sem overflow geral;ausência de erro JS;download do dossiê e backup;importação em cópia sem substituir registros;modal de armazenagem;nenhuma chamada externa da aplicação. Capturas locais analisadas em desktop1440px e mobile390px. Corrigido overflow mobile de grid/tabela observado na primeira rodada; segunda rodada passou.

Checagem de sintaxe Node passou para app.mjs e engine.mjs. Testes numéricos passaram14/14. O executor de teste com isolamento por subprocesso não exibiu resultados internos neste ambiente; a execução direta do módulo node:test confirmou todos os casos e código0. Não há dependência de teste instalada no aplicativo.

O teste do próprio construtor não é auditoria independente. Não houve pesquisa de tarifa atual, integração de conta, compra ou anúncio. Conferências de evidência são declarações humanas. Dados preenchidos durante QA são fictícios e não entram no código publicado ou em banco remoto.

Os helpers locais da skill Sites não estavam instalados no executor e não puderam ser lidos como recursos de script. A sincronização usa Git e arquivo de implantação gerado do commit, com credencial efêmera recebida por stdin e nunca gravada no repositório, nos argumentos de shell ou no log. O manifesto e os ativos estáticos compõem o pacote; publicação é confirmada pelo serviço Sites, não pelo URL esperado.

## Escopo
Nova pasta local e prefixo novo no GitHub. Verificar após publicação que os blobs anteriores permanecem idênticos e que somente NEXO-IMPORTACAO/ foi adicionado. Dados cadastrados por usuários não pertencem ao source control e não são enviados ao GitHub pelo painel.

## Atualização v1.1 — edição dos dados
Pedido humano: permitir alteração dos dados. Meta de ROI, faixa alvo, lote referencial, identificação, destino, regime e inclusão de DAS/abastecimento agora são configuráveis. Cadastro ampliado, bases percentuais, custos e evidências editáveis; resultados continuam derivados. A origem e os registros de ação mantêm rastreabilidade.

Motor atualizado:20/20 testes passaram, incluindo os14 anteriores e6 adicionais para meta/preço mínimo variável, DAS condicional, abastecimento condicional, base percentual, configurações inválidas e normalização dos novos campos. Alterações de dados relevantes retiram a confirmação correspondente, exigindo nova conferência humana; não transformam valores editados em evidência automaticamente.

Navegador: edição de configurações e persistência após reload, campos DAS/abastecimento, cadastro ampliado, base de incidência, duplicação preservando original, backup v2 com configurações, restauração com confirmação, layout mobile390px, migração de cadastro legado v1 e ausência de erros JS passaram. Mesma chave local preserva dados da versão anterior; importação de produtos não substitui existentes. Testes feitos com valores fictícios; cadastros privados não entram na publicação.

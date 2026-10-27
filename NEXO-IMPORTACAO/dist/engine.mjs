export const CHANNELS = [
  {id:'mlFull',label:'Mercado Livre · Full',market:'Mercado Livre',short:'ML Full'},
  {id:'mlOwn',label:'Mercado Livre · envio próprio',market:'Mercado Livre',short:'ML próprio'},
  {id:'amazonFba',label:'Amazon · FBA',market:'Amazon',short:'Amazon FBA'},
  {id:'amazonOwn',label:'Amazon · envio próprio (FBM)',market:'Amazon',short:'Amazon FBM'},
  {id:'shopee',label:'Shopee',market:'Shopee',short:'Shopee'}
];
export const COST_FIELDS=['price','buyerShipping','commission','fixed','logistics','packaging','ads','losses','saleTax','storage','monthly','other'];
export const DEFAULT_SETTINGS={workspaceName:'NEXO Importação',companyName:'',country:'Brasil',city:'',region:'',postalCode:'',taxRegime:'A confirmar',targetRoi:100,targetPriceMin:19.9,targetPriceMax:39.9,referenceLot:200,includeDAS:false,includeInbound:false,policyNotes:''};
export function normaliseSettings(raw={}){const s={...DEFAULT_SETTINGS};for(const key of Object.keys(s)){const v=raw?.[key];if(typeof s[key]==='boolean'){if(typeof v==='boolean')s[key]=v;}else if(typeof s[key]==='number'){if(v!==undefined)s[key]=num(v);}else if(typeof v==='string')s[key]=v.slice(0,12000);}return s;}
export function settingsIssues(s){const x=[];if(!valid(s.targetRoi))x.push('Meta de ROI inválida ou ausente.');if(!valid(s.targetPriceMin)||!valid(s.targetPriceMax)||num(s.targetPriceMax)<num(s.targetPriceMin))x.push('Faixa de preço alvo inválida.');if(!Number.isSafeInteger(num(s.referenceLot))||num(s.referenceLot)<=0)x.push('Lote referencial precisa ser inteiro positivo.');return x;}
export const num=v=>v===null||v===undefined||String(v).trim()===''?null:Number(v);
const valid=v=>Number.isFinite(num(v))&&num(v)>=0;
export function quantity(p){
  const v=[p.bundles,p.piecesPerBundle,p.piecesPerKit].map(num);
  if(v.some(x=>!Number.isSafeInteger(x)||x<=0))return {ok:false,issues:['Informe quantidades inteiras e positivas de embalagens, peças e kit.']};
  const [b,f,k]=v,q=b*f,n=Math.floor(q/k);
  if(!Number.isSafeInteger(q)||!n)return {ok:false,issues:['A composição não gera kits vendáveis ou excede o limite numérico.']};
  return {ok:true,pieces:q,kits:n,leftover:q-n*k};
}
export function importedCost(p){
  if(p.costMode==='checkout'){
    if(!valid(p.checkoutTotal)||num(p.checkoutTotal)<=0)return {ok:false,issues:['Total de importação reconciliado ausente.']};
    return {ok:true,total:num(p.checkoutTotal),mode:'Total informado; não soma tributos novamente'};
  }
  const keys=['merchandise','internationalFreight','insurance','ii','icms','expenses'];
  const missing=keys.filter(k=>!valid(p[k]));
  if(missing.length)return {ok:false,issues:['Custo detalhado incompleto: '+missing.join(', ')+'. Não informado não é zero.']};
  const total=keys.reduce((s,k)=>s+num(p[k]),0);
  if(total<=0)return {ok:false,issues:['O custo importado precisa ser maior que zero.']};
  return {ok:true,total,mode:'Parcelas informadas em BRL; cada despesa contada uma vez'};
}
export function evidenceIssues(p,c,referenceDate){
  const issues=[];
  if(p.origin==='demo')issues.push('Demonstração fictícia: nunca aprova produto real.');
  if(p.origin==='historical')issues.push('Histórico recuperado não auditado; exige nova análise.');
  for(const [key,label] of [['supplierSource','Cotação/fornecedor'],['importSource','Memória da importação'],['regulatorySource','Conformidade/NCM'],['marketSource','Concorrência e demanda']])if(!String(p[key]||'').trim())issues.push(label+': fonte não informada.');
  for(const [key,label] of [['importVerified','Importação reconciliada e despesas completas'],['regulatoryVerified','Conformidade/regime atual'],['marketVerified','Competitividade/demanda atual']])if(p[key]!==true)issues.push(label+': conferência humana pendente.');
  if(!valid(p.weightGrams)||num(p.weightGrams)<=0)issues.push('Peso bruto do kit embalado ausente.');
  if(['length','width','height'].some(k=>!valid(p[k])||num(p[k])<=0))issues.push('Dimensões reais do kit embalado ausentes.');
  if(!p.logisticsSource)issues.push('Caixas/cubagem e logística internacional sem referência.');
  if(!p.currency||!p.exchangeSource)issues.push('Moeda/câmbios financeiro e aduaneiro sem registro.');
  if(!c.source)issues.push('Tabela oficial ou documento da conta não informado.');
  if(!c.category||!c.plan)issues.push('Categoria/modalidade/condições da conta não informadas.');
  if(!c.checkedOn||!c.validFrom)issues.push('Consulta e início de vigência não informados.');
  if(!referenceDate)issues.push('Data de referência ausente.');
  const isDate=x=>/^\d{4}-\d{2}-\d{2}$/.test(x||'')&&!Number.isNaN(Date.parse(x));
  if(c.checkedOn&&!isDate(c.checkedOn)||c.validFrom&&!isDate(c.validFrom)||c.validUntil&&!isDate(c.validUntil))issues.push('Data da evidência inválida.');
  if(c.checkedOn&&referenceDate&&c.checkedOn!==referenceDate)issues.push('Tarifa deve ser reconferida na data desta análise.');
  if(c.validFrom&&referenceDate&&c.validFrom>referenceDate)issues.push('Tarifa ainda não vigente na data de referência.');
  if(c.validUntil&&referenceDate&&c.validUntil<referenceDate)issues.push('Tarifa vencida.');
  if(c.verified!==true)issues.push('Conferência humana das tarifas/conta/encargos pendente.');
  if(c.costsComplete!==true)issues.push('Completude dos custos de venda não confirmada.');
  return issues;
}
export function calculate(p,id,referenceDate,settings=DEFAULT_SETTINGS){
  const config=normaliseSettings(settings),goal=num(config.targetRoi);
  const c=p.channels?.[id]||{},q=quantity(p),imp=importedCost(p);
  const missing=COST_FIELDS.filter(k=>!valid(c[k]));
  const issues=[...(q.issues||[]),...(imp.issues||[]),...settingsIssues(config)];
  if(config.includeDAS&&!valid(c.das))issues.push('DAS incluído: informe a alíquota do cenário.');
  if(config.includeInbound&&!valid(c.inbound))issues.push('Abastecimento incluído: informe o custo por kit.');
  if(missing.length)issues.push('Custos/parâmetros do canal ausentes ou inválidos: '+missing.join(', '));
  if(num(c.price)===0)issues.push('Preço deve ser positivo.');
  const t=(['commission','ads','losses','saleTax'].reduce((s,k)=>s+(num(c[k])||0),0)+(config.includeDAS?(num(c.das)||0):0))/100;
  if(t>=1)issues.push('Soma de percentuais precisa ser inferior a 100%.');
  if(issues.length)return {complete:false,issues,financial:'PENDENTE',evidence:'NÃO CONFIRMADO',status:'PENDENTE'};
  const price=num(c.price),buyer=num(c.buyerShipping),b=['fixed','logistics','packaging','other'].reduce((s,k)=>s+num(c[k]),0)+(config.includeInbound?num(c.inbound):0),h=num(c.storage)+num(c.monthly);
  const revenue=q.kits*(price+buyer),rateRevenue=q.kits*(price+(c.rateBase==='product'?0:buyer)),percentageCosts=rateRevenue*t,selling=percentageCosts+q.kits*b+h,profit=revenue-imp.total-selling,roi=100*profit/imp.total;
  const minimum=((1+goal/100)*imp.total/q.kits+b+h/q.kits-(c.rateBase==='product'?buyer:0))/(1-t)-(c.rateBase==='product'?0:buyer);
  const lower=num(c.bandMin),upper=num(c.bandMax);
  const bandKnown=lower!==null&&upper!==null&&lower>=0&&upper>=lower;
  const priceInBand=bandKnown&&price>=lower&&price<=upper;
  const minimumInBand=bandKnown&&minimum>=lower&&minimum<=upper;
  const evidence=evidenceIssues(p,c,referenceDate);
  if(!priceInBand)evidence.push('Preço fora da faixa declarada ou faixa de tarifa ausente.');
  const financial=roi>=goal?'ATINGE META':'ABAIXO DA META';
  return {complete:true,targetRoi:goal,issues:evidence,kits:q.kits,leftover:q.leftover,imported:imp.total,revenue,selling,profit,roi,minimum,minimumValid:minimumInBand,financial,evidence:evidence.length?'PARCIALMENTE VALIDADO':'VALIDADO POR DECLARAÇÃO HUMANA',status:roi<goal?'REPROVADO FINANCEIRAMENTE':evidence.length?'APROVAÇÃO PENDENTE':'APROVADO NO CENÁRIO',components:{commission:rateRevenue*num(c.commission)/100,ads:rateRevenue*num(c.ads)/100,losses:rateRevenue*num(c.losses)/100,saleTax:rateRevenue*num(c.saleTax)/100,das:config.includeDAS?rateRevenue*num(c.das)/100:0,inbound:config.includeInbound?q.kits*num(c.inbound):0,fixed:q.kits*num(c.fixed),logistics:q.kits*num(c.logistics),packaging:q.kits*num(c.packaging),other:q.kits*num(c.other),storage:num(c.storage),monthly:num(c.monthly)}};
}
export function overall(p,date,settings=DEFAULT_SETTINGS){
  const config=normaliseSettings(settings),results=Object.fromEntries(CHANNELS.map(c=>[c.id,calculate(p,c.id,date,config)]));
  const groups=[['mlFull','mlOwn'],['amazonFba','amazonOwn'],['shopee']];
  const approved=groups.every(g=>g.some(id=>results[id].status==='APROVADO NO CENÁRIO'));
  const failed=groups.some(g=>g.every(id=>results[id].complete&&results[id].roi<num(config.targetRoi)));
  return {results,status:approved?'APROVADO NOS 3 MARKETPLACES':failed?'REPROVADO NO CRITÉRIO CONJUNTO':'APROVAÇÃO PENDENTE'};
}
export function storageUniform(units,days,daily){
  if([units,days,daily].some(v=>!valid(v))||num(units)<=0||num(days)<=0)return null;
  return num(units)*num(days)*num(daily)/2;
}
export function emptyChannel(){return Object.fromEntries([...COST_FIELDS.map(k=>[k,'']),['das',''],['inbound',''],['rateBase','gross'],['bandMin',''],['bandMax',''],['source',''],['category',''],['plan',''],['checkedOn',''],['validFrom',''],['validUntil',''],['verified',false],['costsComplete',false]]);}
export function newProduct(id){return {id,name:'Novo produto',origin:'manual',stage:'Triagem',bundles:'',piecesPerBundle:'',piecesPerKit:'',costMode:'detail',merchandise:'',internationalFreight:'',insurance:'',ii:'',icms:'',expenses:'',checkoutTotal:'',supplierSource:'',importSource:'',regulatorySource:'',marketSource:'',logisticsSource:'',currency:'',exchangeSource:'',weightGrams:'',length:'',width:'',height:'',importVerified:false,regulatoryVerified:false,marketVerified:false,notes:'',channels:Object.fromEntries(CHANNELS.map(c=>[c.id,emptyChannel()]))};}
export function demoProduct(id){
  const p=newProduct(id);Object.assign(p,{name:'Kit demonstrativo · 5 peças',origin:'demo',stage:'Simulação',bundles:100,piecesPerBundle:10,piecesPerKit:5,costMode:'detail',merchandise:400,internationalFreight:100,insurance:0,ii:300,icms:800*.17/.83,expenses:0,notes:'DADOS FICTÍCIOS de teste. II 60% e ICMS 17% são hipóteses exclusivas deste exemplo, não legislação/tarifas atuais. Não é cotação.'});
  for(const c of CHANNELS){for(const k of COST_FIELDS)p.channels[c.id][k]=0;Object.assign(p.channels[c.id],{price:19.9,logistics:({mlFull:10.4,mlOwn:10,amazonFba:9,amazonOwn:8.5,shopee:12})[c.id],bandMin:0,bandMax:100,category:'Fictícia',plan:'Demonstração; tarifas não reais'});}
  return p;
}
export function normaliseProduct(raw,id){
  const p=newProduct(id);for(const key of Object.keys(p)){if(key==='channels'||key==='id')continue;const v=raw?.[key];if(typeof p[key]==='boolean')p[key]=v===true;else if(typeof v==='string'||typeof v==='number')p[key]=String(v).slice(0,12000);}
  for(const key of ['sku','description','variant','material','purpose','ncm','supplierName','supplierUrl','moq','incoterm','courier','quoteValidUntil','financialExchange','customsExchange','leadDays'])p[key]=typeof raw?.[key]==='string'||typeof raw?.[key]==='number'?String(raw[key]).slice(0,12000):'';
  if(!['manual','demo','historical'].includes(p.origin))p.origin='manual';
  if(!['Triagem','Cotação','Simulação','Revisão','Decisão'].includes(p.stage))p.stage='Triagem';
  for(const c of CHANNELS){for(const key of Object.keys(p.channels[c.id])){const v=raw?.channels?.[c.id]?.[key];if(typeof p.channels[c.id][key]==='boolean')p.channels[c.id][key]=v===true;else if(typeof v==='string'||typeof v==='number')p.channels[c.id][key]=String(v).slice(0,12000);}if(!['gross','product'].includes(p.channels[c.id].rateBase))p.channels[c.id].rateBase='gross';}
  return p;
}

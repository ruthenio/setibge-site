# Site SETIBGE-CE — situação

Site estático (HTML/CSS/JS, sem build step) refeito a partir dos protótipos
em `../arquivos_ref_site/` e do levantamento `funcionalidades-identificadas.md`.

## Páginas

- [x] `index.html` — carrossel, acesso rápido, notícias e comunicados, filiação, contato
- [x] `associacao.html` — abas Quem Somos / História / Diretoria e Equipe
- [x] `saude.html` — abas Unimed Fortaleza / Uniodonto, FAQ, fale conosco
- [x] `politica.html` — abas Cadernos / Manifestos / Multimídia, filtros e linha do tempo
- [x] `parcerias.html` — abas Serviços Diretos / Rede de Conveniados
- [x] `eventos.html` — abas Eventos Comemorativos / Mural e Memória
- [x] `noticias.html` — listagem com filtros por categoria
- [x] `intranet.html` — área restrita (tela de acesso, backend pendente)
- [x] `privacidade.html` e `404.html`

## Compartilhado

- [x] `style.css` — tokens de cor, espaçamento e raio; responsivo
- [x] `script.js` — carrossel, abas, filtros, FAQ, máscara de telefone,
      validação de formulário, revelação no scroll (IntersectionObserver)
- [x] `logo-mark.png` — logotipo oficial recortado com fundo transparente

## Pendente (depende do cliente)

- [ ] Fotos reais: slides do carrossel, notícias, eventos, diretoria e galerias
      (hoje há imagem única de apoio e espaços reservados)
- [ ] Endereço da sede: os protótipos divergem entre "Av. Pessoa Anta, 274"
      e "Av. Treze de Maio, 2901". Está publicado o primeiro
- [ ] Nome oficial da entidade (associação x sindicato) — ver seção 14 do levantamento
- [ ] Backend: envio dos formulários, login da intranet, busca e painel administrativo
      (hoje os formulários validam e dão retorno visual, sem persistência)

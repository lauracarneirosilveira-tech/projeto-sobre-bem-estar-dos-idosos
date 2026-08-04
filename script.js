JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Acessibilidade e Tema ---
    const btnTema = document.getElementById('btn-tema');
    const btnFonte = document.getElementById('btn-fonte');
    let fonteGrande = false;

    btnTema.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        btnTema.textContent = document.body.classList.contains('dark-mode') ? '☀️ Modo Claro' : '🌙 Modo Escuro';
    });

    btnFonte.addEventListener('click', () => {
        fonteGrande = !fonteGrande;
        document.documentElement.style.setProperty('--fonte-tamanho', fonteGrande ? '18px' : '16px');
    });

    // Botão Voltar ao topo
    document.getElementById('btn-topo').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 2. Portal de Escuta (Simulação) ---
    const formEscuta = document.getElementById('form-escuta');
    const respostaEscuta = document.getElementById('resposta-escuta');

    const frasesMotivacionais = [
        "Sua voz importa e você tem o direito de se sentir segura na escola.",
        "Procurar ajuda não é um sinal de fraqueza, mas sim de coragem.",
        "Nenhuma forma de violência deve ser tolerada. Você merece respeito!",
        "Existem pessoas dispostas a ouvir e ajudar você no seu dia a dia."
    ];

    formEscuta.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Sorteia uma frase motivacional
        const fraseAleatoria = frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)];
        
        respostaEscuta.innerHTML = `
            <strong>Obrigado por compartilhar!</strong><br>
            Sua mensagem foi ouvida. Lembre-se: <em>"${fraseAleatoria}"</em><br><br>
            <small>* Nenhuma informação enviada neste formulário foi armazenada.</small>
        `;
        respostaEscuta.classList.remove('escondido');
        formEscuta.reset();
    });

    // --- 3. Quiz Interativo (5 Perguntas) ---
    const perguntasQuiz = [
        {
            pergunta: "1. O que caracteriza a violência contra as mulheres no ambiente escolar?",
            opcoes: [
                "Qualquer ação ou conduta baseada no gênero que cause dano físico, psicológico ou moral.",
                "Apenas agressões físicas cometidas dentro da sala de aula.",
                "Discordâncias e debates de opiniões durante as aulas de filosofia.",
                "Trabalhos em grupo onde os alunos discordam do tema."
            ],
            correta: 0
        },
        {
            pergunta: "2. Quais são formas comuns de violência psicológica contra meninas na escola?",
            opcoes: [
                "Elogios ao desempenho acadêmico.",
                "Piadas ofensivas, comentários machistas, intimidação e espalhar boatos.",
                "Apoio dos professores durante os estudos.",
                "Participação em grêmios e atividades esportivas."
            ],
            correta: 1
        },
        {
            pergunta: "3. Como a comunidade escolar (estudantes e professores) pode prevenir essa violência?",
            opcoes: [
                "Ignorando os casos para não gerar brigas na escola.",
                "Rindo das piadas de mau gosto para não parecer chato.",
                "Promovendo conversas sobre respeito, igualdade e denunciando comportamentos inadequados.",
                "Culpando as vítimas por suas roupas ou atitudes."
            ],
            correta: 2
        },
        {
            pergunta: "4. Quais podem ser os impactos da violência na vida de uma estudante?",
            opcoes: [
                "Nenhum impacto, pois são apenas brincadeiras da juventude.",
                "Queda no rendimento escolar, ansiedade, isolamento e desistência dos estudos.",
                "Melhoria na autoestima e maior foco nos exames.",
                "Aumento na participação de eventos escolares."
            ],
            correta: 1
        },
        {
            pergunta: "5. O que fazer ao presenciar ou sofrer um caso de violência na escola?",
            opcoes: [
                "Guardar segredo para evitar problemas.",
                "Procurar orientação da direção, pedagogos, professores ou ligar para a Central 180.",
                "Resolver o problema sozinho com agressão verbal.",
                "Postar o ocorrido nas redes sociais e não avisar a escola."
            ],
            correta: 1
        }
    ];

    const containerQuiz = document.getElementById('container-quiz');

    function carregarQuiz() {
        containerQuiz.innerHTML = '';
        perguntasQuiz.forEach((q, index) => {
            const card = document.createElement('div');
            card.classList.add('pergunta-card');

            let opcoesHTML = '';
            q.opcoes.forEach((opcao, i) => {
                opcoesHTML += `
                    <label class="opcoes-label">
                        <input type="radio" name="pergunta${index}" value="${i}"> ${opcao}
                    </label>
                `;
            });

            card.innerHTML = `
                <h4>${q.pergunta}</h4>
                ${opcoesHTML}
            `;
            containerQuiz.appendChild(card);
        });
    }

    document.getElementById('btn-submeter-quiz').addEventListener('click', () => {
        let pontos = 0;
        
        perguntasQuiz.forEach((q, index) => {
            const opcaoSelecionada = document.querySelector(`input[name="pergunta${index}"]:checked`);
            if (opcaoSelecionada && parseInt(opcaoSelecionada.value) === q.correta) {
                pontos++;
            }
        });

        const resultadoDiv = document.getElementById('resultado-quiz');
        resultadoDiv.textContent = `Você acertou ${pontos} de ${perguntasQuiz.length} perguntas!`;
        resultadoDiv.style.color = pontos >= 3 ? '#2ed573' : '#ff4757';
    });

    // Inicializar o quiz
    carregarQuiz();
});
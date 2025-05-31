// Função para o menu hamburguer em ecrãs móveis
const mobileMenuButton = document.getElementById('mobile-menu');
const navList = document.querySelector('.navbar .nav-list');

if (mobileMenuButton && navList) {
    mobileMenuButton.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenuButton.classList.toggle('active'); // Para animar o botão para 'X'
    });

    // Fecha o menu se um link for clicado (útil para navegação na mesma página ou SPAs)
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuButton.classList.remove('active');
            }
        });
    });
}

// Lógica para o formulário de contato (exemplo com Formspree)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        
        const formData = new FormData(contactForm);
        formStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A enviar...';
        formStatus.className = 'form-status'; // Limpa classes anteriores

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Obrigado.';
                formStatus.classList.add('success');
                contactForm.reset(); // Limpa o formulário
            } else {
                // Tenta obter a mensagem de erro do Formspree
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${data["errors"].map(error => error["message"]).join(", ")}`;
                    } else {
                        formStatus.innerHTML = "<i class='fas fa-exclamation-triangle'></i> Oops! Houve um problema ao enviar a sua mensagem.";
                    }
                    formStatus.classList.add('error');
                })
            }
        } catch (error) {
            formStatus.innerHTML = "<i class='fas fa-exclamation-triangle'></i> Oops! Houve um problema ao enviar a sua mensagem.";
            formStatus.classList.add('error');
            console.error('Erro no formulário:', error);
        }
    });
}

// Pequeno efeito de scroll suave para links de âncora (se você adicionar algum)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hrefAttribute = this.getAttribute('href');
        // Verifica se é apenas "#" ou se o alvo existe
        if (hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
            e.preventDefault();
            document.querySelector(hrefAttribute).scrollIntoView({
                behavior: 'smooth'
            });
        } else if (hrefAttribute === '#') {
            e.preventDefault(); // Impede o salto para o topo se for apenas "#"
        }
    });
});


// Adiciona classe 'active' ao link de navegação correspondente à página atual
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar .nav-list a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
        link.classList.remove('active'); // Remove de todos primeiro
        
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Caso especial para a raiz (index.html)
    if (currentPage === 'index.html' || currentPage === '') {
        const homeLink = document.querySelector('.navbar .nav-list a[href="index.html"]');
        if (homeLink) homeLink.classList.add('active');
    }

    // Atualiza o ano no rodapé
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Lembre-se de definir seu nome nos arquivos HTML diretamente
    // Ex: <a href="index.html">Vitor Lemes</a>
    // Ex: <span class="highlight">Vitor Lemes</span>
    // Ex: <p>&copy; <span id="currentYear">2024</span> Vitor Lemes. Todos os direitos reservados.</p>
});

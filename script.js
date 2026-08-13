document.addEventListener('DOMContentLoaded', () => {
    /*
     * ==========================================
     * ANIMAÇÕES DE SCROLL
     * ==========================================
     */

    const revealElements = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add('active');

                    // Depois que a animação acontece,
                    // não precisamos mais observar o elemento.
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.1
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback para navegadores sem IntersectionObserver.
        revealElements.forEach((element) => {
            element.classList.add('active');
        });
    }


    /*
     * ==========================================
     * LAZY LOAD DOS VÍDEOS
     * ==========================================
     */

    const lazyVideos = document.querySelectorAll('video[data-src]');

    const loadVideo = (video) => {
        if (video.dataset.loaded === 'true') {
            return;
        }

        const source = document.createElement('source');

        source.src = video.dataset.src;
        source.type = 'video/mp4';

        video.appendChild(source);

        video.dataset.loaded = 'true';

        video.load();
    };


    if ('IntersectionObserver' in window) {

        const videoObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {

                    const video = entry.target;

                    if (entry.isIntersecting) {

                        // Carrega o vídeo somente quando
                        // estiver próximo da viewport.
                        loadVideo(video);

                        // Alguns navegadores podem bloquear
                        // autoplay. Por isso usamos catch().
                        video.play().catch(() => {});

                    } else if (video.dataset.loaded === 'true') {

                        // Para o vídeo quando ele sai da tela.
                        video.pause();
                    }
                });
            },
            {
                rootMargin: '200px 0px'
            }
        );

        lazyVideos.forEach((video) => {
            videoObserver.observe(video);
        });

    } else {

        // Fallback para navegadores antigos.
        lazyVideos.forEach((video) => {
            loadVideo(video);
        });
    }


    /*
     * ==========================================
     * NEWSLETTER
     * ==========================================
     */

    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {

        newsletterForm.addEventListener('submit', (event) => {

            // Impede o reload da página.
            event.preventDefault();

            const input = newsletterForm.querySelector(
                '.newsletter-input'
            );

            const button = newsletterForm.querySelector(
                '.newsletter-btn'
            );


            // Usa a validação nativa do HTML.
            if (!input.checkValidity()) {
                input.reportValidity();
                return;
            }


            const originalText = button.textContent;


            // Feedback visual.
            button.textContent = 'Cadastrado!';

            button.disabled = true;

            input.disabled = true;


            // Simulação de cadastro.
            setTimeout(() => {

                newsletterForm.reset();

                button.textContent = originalText;

                button.disabled = false;

                input.disabled = false;

            }, 2500);
        });
    }
});
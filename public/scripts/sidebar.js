document.addEventListener("DOMContentLoaded", function(event) {

    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
              nav = document.getElementById(navId),
              bodypd = document.getElementById(bodyId),
              headerpd = document.getElementById(headerId),
              logoNormal = document.querySelector('.nav_logo-icon:not(.logo_small)'),
              logoSmall = document.querySelector('.nav_logo-icon.logo_small');

        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('show_sidebar');
                toggle.classList.toggle('bx-x');
                bodypd.classList.toggle('body-pd');
                headerpd.classList.toggle('body-pd');

                // Verifique se a barra lateral está aberta ou fechada
                if (nav.classList.contains('show_sidebar')) {
                    // Se estiver aberta, esconde a logo small e mostra a logo normal
                    logoNormal.classList.remove('d-none');
                    logoSmall.classList.add('d-none');
                } else {
                    // Se estiver fechada, mostra a logo small e esconde a logo normal
                    logoNormal.classList.add('d-none');
                    logoSmall.classList.remove('d-none');
                }
            });
        }
    }
    
    showNavbar('header-toggle','nav-bar','body-pd','header');
    
    const linkColor = document.querySelectorAll('.nav_link');
    
    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    }
    
    linkColor.forEach(l => l.addEventListener('click', colorLink));
});

/**
 * LCVIAL - Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navigation ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // --- Close mobile menu on clicking a link ---
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Keep offset in mind for sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Function to attach observer to new elements
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --- Contact Form Integration with mailto ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const nombre = formData.get('nombre') || '';
            const empresa = formData.get('empresa') || 'No especificada';
            const email = formData.get('email') || '';
            const telefono = formData.get('telefono') || '';
            const servicio = formData.get('servicio') || '';
            const ubicacion = formData.get('ubicacion') || 'No especificada';
            const mensaje = formData.get('mensaje') || '';
            
            // Validate required fields
            if (!nombre || !email || !telefono || !servicio || !mensaje) {
                alert('Por favor, complete todos los campos requeridos (*)');
                return;
            }
            
            // Map service codes to readable names
            const servicios = {
                'demarcacion': 'Demarcación Vial',
                'senaletica': 'Señalética y Simbología', 
                'obras_menores': 'Instalaciones y Obras Menores',
                'mantenimiento': 'Mantenimiento Preventivo',
                'consulta': 'Consulta Técnica',
                'otro': 'Otro (ver detalles)'
            };
            
            const servicioNombre = servicios[servicio] || servicio;
            
            // Create professional email subject
            const subject = `Solicitud de Cotización - ${servicioNombre}`;
            
            // Create professional email body
            const body = `Estimado equipo de LCVIAL,

Mi información de contacto:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nombre: ${nombre}
• Empresa: ${empresa}
• Email: ${email}
• Teléfono: ${telefono}

DETALLES DEL PROYECTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Servicio solicitado: ${servicioNombre}
• Ubicación: ${ubicacion}

DESCRIPCIÓN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${mensaje}

INFORMACIÓN ADICIONAL NECESARIA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Extensión aproximada: ___________
• Fecha estimada de inicio: ___________
• Presupuesto aproximado: ___________
• Urgencia: ☐ Alta  ☐ Media  ☐ Baja
• Requiere visita técnica: ☐ Sí  ☐ No

Quedo atento a su respuesta y disponible para coordinar una reunión o visita técnica.

Saludos cordiales,
${nombre}
${email} | ${telefono}`;

            // Encode for URL
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(body);
            
            // Create mailto URL
            const mailtoURL = `mailto:contacto@lcvial.cl?subject=${encodedSubject}&body=${encodedBody}`;
            
            // Open mail client
            window.location.href = mailtoURL;
            
            // Show success message
            showFormSuccessMessage();
            
            // Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }
    
    // Show success message function
    function showFormSuccessMessage() {
        const button = document.querySelector('.btn-primary.full-width');
        const originalText = button.textContent;
        
        button.textContent = '✅ ¡Correo listo! Revisa tu cliente de correo';
        button.style.backgroundColor = 'hsl(134, 61%, 41%)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 3000);
    }
});

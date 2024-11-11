import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smashTasty';
  menuOpen: boolean = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    // Controlar la visibilidad de los navbar
    document.querySelectorAll('.nav-links a').forEach((anchor) => {
      const anchorElement = anchor as HTMLElement;

      anchorElement.addEventListener('click', (e) => {
        e.preventDefault();  // Evitar la acción por defecto de los enlaces

        const targetId = anchorElement.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId) as HTMLElement;

          if (targetElement) {
            const offsetTop = targetElement.offsetTop;
            const headerHeight = document.querySelector('.header')?.clientHeight || 0;
            const offsetScroll = offsetTop - headerHeight;

            window.scrollTo({
              top: offsetScroll,
              behavior: 'smooth'
            });

            // Cerrar el navbar móvil después de hacer clic en un enlace
            this.menuOpen = false;
          }
        }
      });
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

    // Detectar clics fuera del modal para cerrarlo
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const modal = this.el.nativeElement.querySelector('.modal');
    const navbarMobile = this.el.nativeElement.querySelector('.navbar-mobile');
    const toggleButton = this.el.nativeElement.querySelector('.navbar-mobile i'); // Icono de la hamburguesa

    // Si el clic es fuera del modal y navbar móvil, cerrar el menú
    if (this.menuOpen && !navbarMobile.contains(event.target as Node) && !toggleButton.contains(event.target as Node)) {
      this.closeMenu();
    }

    // Si el clic es sobre el icono de la hamburguesa, abrir/cerrar el menú
    if (!this.menuOpen && toggleButton.contains(event.target as Node)) {
      this.toggleMenu();
    }
  }
  
}

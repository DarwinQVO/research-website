# Research Website V3

Landing page minimalista para Eugenio - Personal Research Services

## Características

- **Diseño minimalista** con Playfair Display
- **Testimonios infinitos** con animación suave
- **Responsive design** optimizado para móvil y desktop
- **Call-to-action** prominente
- **Enlaces de contacto** en footer

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Construir para producción  
npm run build

# Preview de producción
npm run start
```

## Estructura del proyecto

```
/
├── app/
│   ├── page.tsx          # Página principal
│   ├── globals.css       # Estilos globales
│   └── layout.tsx        # Layout principal
├── components/
│   └── ui/
│       ├── button.tsx             # Componente Button
│       └── infinite-moving-cards.tsx  # Carrusel testimonios
├── lib/
│   └── utils.ts          # Utilidades
└── package.json
```

## Tecnologías

- **Next.js 15** - Framework React
- **Tailwind CSS** - Estilos
- **TypeScript** - Tipado estático  
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **Playfair Display** - Tipografía

## Personalización

### Testimonios
Edita el array `testimonials` en `app/page.tsx` para cambiar los testimonios.

### Estilos
Los colores y variables CSS están en `app/globals.css`.

### Links de contacto
Actualiza los enlaces en el footer de `app/page.tsx`.
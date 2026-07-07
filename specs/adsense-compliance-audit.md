# Reporte de auditoría AdSense — CoffeeCalc

> **Actualización (jul 2026):** La Fase 1 (páginas legales) está completada. Para el plan de acción vigente, ver [`adsense-remediation-plan.md`](./adsense-remediation-plan.md).

| Campo                  | Valor                                                |
| ---------------------- | ---------------------------------------------------- |
| **Sitio**              | [howmanycoffees.net](https://www.howmanycoffees.net) |
| **URL auditada**       | https://www.howmanycoffees.net/es                    |
| **Fecha**              | 17 de junio de 2026                                  |
| **Estado AdSense**     | Rechazado — revisión pendiente de correcciones       |
| **Cliente AdSense**    | `ca-pub-8195825937047934`                            |
| **Contexto adicional** | Mismo patrón de rechazo en `countries-time.info`     |

---

## 1. Resumen ejecutivo

Google AdSense rechazó la solicitud con el mensaje genérico de que el sitio _"isn't ready to show ads at this time"_. Este mensaje no especifica la causa exacta, pero la auditoría del código y del sitio en producción apunta a **dos bloqueadores principales**:

1. **Contenido de bajo valor** (_low value content_): sitio de una sola página con texto indexable insuficiente (~300–400 palabras).
2. **Falta de señales de confianza**: ausencia total de páginas legales (privacidad, términos), información del editor y contacto.

La base técnica SEO es sólida (metadata, hreflang, JSON-LD, sitemap, HTTPS, consent mode). El problema no es de infraestructura, sino de **cumplimiento de políticas de publicadores** y **profundidad de contenido**.

---

## 2. Alcance de la auditoría

### Revisado

- Sitio en producción: `/es` y estructura general
- Código fuente del repositorio `how_much_coffee_cost`
- Archivos clave: layout, página principal, footer, consentimiento, ads, sitemap, robots, traducciones
- `public/ads.txt`

### No revisado

- Panel de AdSense (motivo exacto del rechazo)
- Search Console (cobertura de indexación, Core Web Vitals)
- Sitio `countries-time.info` (fuera de este repositorio)

---

## 3. Hallazgos por severidad

### 3.1 Críticos — bloquean aprobación

| #   | Hallazgo                       | Evidencia                                                                             | Impacto                                                                     |
| --- | ------------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| C1  | **Sin política de privacidad** | Footer solo enlaza idiomas (`coffee-calc-footer.tsx`). No existe ruta `/privacy`.     | AdSense exige política accesible que mencione cookies, AdSense y analytics. |
| C2  | **Sin términos de uso**        | No existe ruta `/terms`.                                                              | Sitio percibido como incompleto o poco profesional.                         |
| C3  | **Sin página About**           | No hay identidad del editor ni propósito del proyecto.                                | Falta señal E-E-A-T (Experience, Expertise, Authoritativeness, Trust).      |
| C4  | **Sin página de contacto**     | No hay email, formulario ni canal de contacto.                                        | Revisor no puede verificar responsabilidad del sitio.                       |
| C5  | **Contenido fino**             | 1 párrafo SEO + 4 FAQs cortas. Calculadora es interactiva (poco texto para crawlers). | Causa #1 de rechazo en 2026: _low value content_.                           |

### 3.2 Alta prioridad

| #   | Hallazgo                                          | Evidencia                                                                 | Impacto                                                             |
| --- | ------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| H1  | **Banner de cookies sin enlace a privacidad**     | `consent-third-parties.tsx` menciona AdSense/GTM pero no enlaza política. | Incumplimiento de transparencia GDPR + expectativa de AdSense.      |
| H2  | **Script AdSense condicionado al consentimiento** | AdSense y GTM solo cargan si `consent === "accepted"`.                    | Revisor que rechaza cookies no ve integración publicitaria.         |
| H3  | **Sitemap con 9 URLs idénticas en estructura**    | `app/sitemap.ts` solo lista home por locale.                              | Sin profundidad de sitio ni enlazado interno significativo.         |
| H4  | **Slots de anuncio en sitio no aprobado**         | `coffee-calc-page.tsx` renderiza 2 unidades AdSense.                      | Huecos vacíos pueden reforzar percepción de "sitio hecho para ads". |

### 3.3 Prioridad media

| #   | Hallazgo                                    | Detalle                                                          |
| --- | ------------------------------------------- | ---------------------------------------------------------------- |
| M1  | Meta descriptions cortas en algunos idiomas | ES (~78 chars), FR (~74), DE (~62) — objetivo 150–160.           |
| M2  | Falta schema `HowTo`                        | Documentado en `patterns.md` pero no implementado.               |
| M3  | Bloque SEO expandible                       | Metodología de precios, fuentes y casos de uso no desarrollados. |

### 3.4 Lo que ya cumple

| Área                                       | Estado                                              |
| ------------------------------------------ | --------------------------------------------------- |
| HTTPS                                      | OK                                                  |
| Mobile-friendly                            | OK (diseño responsive)                              |
| `robots.txt`                               | OK — `allow: /`, sitemap declarado                  |
| `sitemap.xml`                              | OK — 9 locales con hreflang                         |
| `ads.txt`                                  | OK — `google.com, pub-8195825937047934, DIRECT`     |
| Metadata (title, description, OG, Twitter) | OK                                                  |
| Canonical + hreflang                       | OK en `layout.tsx`                                  |
| JSON-LD                                    | OK — WebSite, Organization, WebApplication, FAQPage |
| Search Console verification                | OK — meta tag en metadata                           |
| Consent Mode v2                            | OK — defaults en `denied`                           |
| Contenido original                         | OK — no parece scrapeado ni duplicado               |
| UX general                                 | OK — navegación clara, sin popups intrusivos        |

---

## 4. Análisis de contenido

### Inventario actual (página `/es`)

| Sección                   | Tipo                 | Palabras aprox. |
| ------------------------- | -------------------- | --------------- |
| Hero + calculadora        | Interactivo (client) | ~50 (labels)    |
| Dato curioso              | Rotativo             | ~20             |
| "¿Por qué medir en café?" | Texto indexable      | ~80             |
| FAQ (4 preguntas)         | Texto indexable      | ~150            |
| Footer                    | Texto mínimo         | ~30             |
| **Total indexable**       |                      | **~300–400**    |

### Umbral de referencia (industria / políticas AdSense)

- Páginas con menos de 300–500 palabras de valor único suelen clasificarse como _thin content_.
- Sitios herramienta necesitan **contenido editorial de apoyo** además de la utilidad.
- Recomendación: 5–10 artículos de 800+ palabras o ampliar significativamente el contenido existente.

---

## 5. Análisis técnico

### Arquitectura de rutas actual

```
/[locale]           → Landing (calculadora + SEO block)
/sitemap.xml        → 9 URLs
/robots.txt         → Allow all
/ads.txt            → AdSense publisher ID
```

### Rutas requeridas (no existen)

```
/[locale]/privacy
/[locale]/terms
/[locale]/about
/[locale]/contact
/[locale]/blog/*    → Recomendado para profundidad de contenido
```

### Flujo de consentimiento y ads

```
beforeInteractive → Consent Mode defaults (all denied)
       ↓
Usuario visita → Banner cookies (si no hay elección previa)
       ↓
Acepta → GTM + adsbygoogle.js cargan
Rechaza → Sin GTM ni AdSense (slots quedan vacíos)
```

### Archivos relevantes

| Archivo                                         | Rol                                  |
| ----------------------------------------------- | ------------------------------------ |
| `app/[locale]/layout.tsx`                       | Metadata global, consent mode script |
| `app/[locale]/page.tsx`                         | JSON-LD, página principal            |
| `components/coffee-calc/coffee-calc-footer.tsx` | Footer (solo idiomas)                |
| `components/consent/consent-third-parties.tsx`  | Banner + carga condicional de ads    |
| `components/coffee-calc/coffee-calc-ad.tsx`     | Unidades AdSense                     |
| `app/sitemap.ts`                                | Sitemap                              |
| `public/ads.txt`                                | Verificación de publisher            |
| `public/messages/*.json`                        | Traducciones (9 idiomas)             |

---

## 6. Paralelo con `countries-time.info`

Sin acceso al código de ese dominio, los sitios de utilidad (zonas horarias, conversores) comparten patrones de rechazo:

| Patrón                             | countries-time.info (probable) | howmanycoffees.net (confirmado) |
| ---------------------------------- | ------------------------------ | ------------------------------- |
| Páginas finas / plantilla          | Muchas URLs con mismo layout   | 9 locales, mismo contenido      |
| Sin páginas legales                | Probable                       | Confirmado                      |
| Sin identidad del editor           | Probable                       | Confirmado                      |
| Contenido generado automáticamente | Alta probabilidad              | No aplica (contenido manual)    |
| Dominio con poco historial         | Posible (.info)                | Dominio .net, más favorable     |

**Acción para countries-time.info:** aplicar el mismo checklist de páginas legales + enriquecer o reducir páginas programáticas finas.

---

## 7. Plan de remediación

### Fase 1 — Confianza y cumplimiento legal (1–2 días)

- [x] Crear `app/[locale]/privacy/page.tsx` con política completa
- [x] Crear `app/[locale]/terms/page.tsx`
- [x] Crear `app/[locale]/about/page.tsx`
- [x] Crear `app/[locale]/contact/page.tsx` _(sin correo público)_
- [x] Añadir namespace de traducciones `Legal` en los 9 JSON (`public/messages/`)
- [x] Enlazar las 4 páginas legales en `coffee-calc-footer.tsx`
- [x] Añadir enlace "Política de privacidad" en el banner de cookies
- [x] Actualizar `app/sitemap.ts` con las nuevas rutas

**Contenido mínimo de la política de privacidad:**

- Qué datos se recopilan (cookies, IP, analytics)
- Uso de Google AdSense y publicidad personalizada
- Uso de Google Tag Manager / Analytics
- Consent Mode y opción de rechazar
- Cómo contactar al responsable
- Fecha de última actualización

### Fase 2 — Profundidad de contenido (1–2 semanas)

- [ ] Ampliar bloque SEO en home (metodología, fuentes de precios, disclaimer)
- [ ] Publicar 5–10 artículos útiles, por ejemplo:
  - "¿Cuánto cuesta un café en [país]?"
  - "Cómo presupuestar tu gasto en café"
  - "Guía de precios de café por tipo de bebida"
  - "Comparar costos con la regla del café"
- [ ] Implementar schema `HowTo` en la página principal
- [ ] Ampliar meta descriptions en ES, FR, DE a ~150 caracteres

### Fase 3 — Optimización pre-revisión (antes de re-solicitar)

- [ ] Verificar indexación de nuevas páginas en Search Console
- [ ] Considerar ocultar slots de anuncio hasta aprobación (evitar huecos vacíos)
- [ ] Esperar **2–4 semanas** tras publicar cambios
- [ ] Solicitar nueva revisión desde el panel de AdSense → Sites

---

## 8. Criterios de aceptación

El sitio estará listo para re-solicitar AdSense cuando:

1. Footer de todas las páginas enlaza a Privacy, Terms, About y Contact
2. Política de privacidad menciona explícitamente Google AdSense y cookies publicitarias
3. Página About identifica quién opera CoffeeCalc y con qué propósito
4. Página Contact ofrece al menos un canal de comunicación
5. Contenido indexable total supera **2.000 palabras** (home ampliada + artículos o páginas legales sustanciales)
6. Banner de cookies enlaza a la política de privacidad
7. Sitemap incluye todas las URLs públicas
8. Search Console muestra las nuevas páginas indexadas

---

## 9. Riesgos y mitigaciones

| Riesgo                                   | Mitigación                                                          |
| ---------------------------------------- | ------------------------------------------------------------------- |
| Rechazo repetido tras cambios mínimos    | No re-solicitar hasta completar Fase 1 + parte de Fase 2            |
| Google cachea versión antigua            | Esperar 2–4 semanas; usar "Inspeccionar URL" en Search Console      |
| Traducciones legales incorrectas         | Redactar en EN, traducir con revisión humana; no usar IA sin editar |
| Slots de anuncio vacíos durante revisión | Ocultar componente `CoffeeCalcAd` hasta aprobación                  |

---

## 10. Fuentes y referencias

- [Most Common Reasons for Google AdSense Rejection in 2026](https://socialsparkagency.in/blog/most-common-reasons-for-google-adsense-rejection-2026)
- [AdSense Rejected for Low Value Content — Checklist](https://yerman.uk/adsense-rejected-low-value-content/)
- [How to Fix Google AdSense Low Value Content](https://adsenseaudit.net/guides/low-value-content-adsense)
- [Google AdSense Program policies](https://support.google.com/adsense/answer/48182)
- Memoria del agente: `.claude/agent-memory/seo-organic-expert/MEMORY.md`
- Patrones SEO del proyecto: `.claude/agent-memory/seo-organic-expert/patterns.md`

---

## 11. Próximo paso recomendado

Implementar **Fase 1** en este repositorio: las cuatro páginas legales con traducciones en 9 idiomas y enlaces en footer + banner de cookies. Es el cambio de mayor impacto con menor esfuerzo relativo.

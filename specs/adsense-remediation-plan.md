# Plan de remediación AdSense — Low Value Content

| Campo                 | Valor                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| **Sitio**             | [howmanycoffees.net](https://www.howmanycoffees.net)                                             |
| **Alerta AdSense**    | Low value content — _Make sure your site follows the AdSense Program Policies_                   |
| **Fecha del reporte** | 6 de julio de 2026                                                                               |
| **Cliente AdSense**   | `ca-pub-8195825937047934`                                                                        |
| **Auditoría previa**  | [`adsense-compliance-audit.md`](./adsense-compliance-audit.md) (jun 2026, parcialmente obsoleta) |

---

## 1. Resumen ejecutivo

Google AdSense rechazó el sitio por **contenido de bajo valor** (_low value content_). El mensaje indica que el sitio aún no cumple los criterios de la red de editores de Google: falta contenido único de alta calidad y/o una experiencia de usuario que justifique la monetización.

**Diagnóstico actual (jul 2026):**

| Área                            | Estado     | Comentario                                              |
| ------------------------------- | ---------- | ------------------------------------------------------- |
| Infraestructura SEO             | ✅ Listo   | Metadata, hreflang, JSON-LD, sitemap, robots, HTTPS     |
| Páginas legales                 | ✅ Listo   | Privacy, Terms, About, Contact (9 idiomas)              |
| Profundidad de contenido        | ❌ Falta   | Home ~280–320 palabras; sin blog ni guías               |
| Señales E-E-A-T                 | ⚠️ Parcial | About/Contact finas; sin email ni perfiles verificables |
| Integración AdSense en revisión | ⚠️ Riesgo  | 2 slots visibles; script condicionado al consentimiento |

El bloqueador principal ya **no** son las páginas legales (implementadas en jun 2026). El bloqueador es la **falta de contenido editorial sustancial** más allá de la calculadora.

---

## 2. Lo que ya está hecho (no repetir)

Referencia: Fase 1 del [auditoría anterior](./adsense-compliance-audit.md).

- [x] `app/[locale]/privacy/page.tsx` — política completa (~950 palabras)
- [x] `app/[locale]/terms/page.tsx` — términos (~850 palabras)
- [x] `app/[locale]/about/page.tsx` — identidad del proyecto (~300 palabras)
- [x] `app/[locale]/contact/page.tsx` — canal informativo (~280 palabras)
- [x] Namespace `Legal` en los 9 locales (`public/messages/*.json`)
- [x] Enlaces legales en `components/coffee-calc/coffee-calc-footer.tsx`
- [x] Enlace a privacidad en banner de cookies (`components/consent/consent-third-parties.tsx`)
- [x] Sitemap con 45 URLs (9 home + 36 legales) — `app/sitemap.ts`
- [x] JSON-LD: WebSite, Organization, WebApplication, FAQPage
- [x] `public/ads.txt` con publisher ID correcto

---

## 3. Lo que falta — por prioridad

### 3.1 Crítico — bloquea aprobación

| #   | Tarea                                                                               | Archivos / rutas                                                                                      | Criterio de done                                               |
| --- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| C1  | **Ampliar contenido indexable de la home** de ~300 a **800–1.200 palabras** útiles  | `components/coffee-calc/coffee-calc-seo-block.tsx`, `public/messages/*.json` (namespace `CoffeeCalc`) | ✅ Jul 2026 |
| C2  | **Crear sección de blog** con **5–8 artículos** originales (800–1.500 palabras c/u) | `app/[locale]/blog/`, `public/messages/blog/`, `app/sitemap.ts`                                            | ✅ 5 artículos EN+ES |
| C3  | **Añadir canal de contacto real** (email o formulario funcional)                    | `components/coffee-calc/contact-content.tsx`, `public/messages/*.json`                                | ✅ contact@howmanycoffees.net |
| C4  | **Reforzar página About** con bio, motivación, metodología y perfiles verificables  | `lib/legal-sections.ts`, traducciones `Legal.About`          | ✅ Secciones operator + connect |

### 3.2 Alta prioridad — antes de solicitar revisión

| #   | Tarea                                                                      | Archivos / rutas                                                                           | Criterio de done                                           |
| --- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| H1  | **Ocultar slots AdSense** hasta aprobación (evitar huecos vacíos)          | `components/coffee-calc/coffee-calc-ad.tsx`, `lib/config.ts` | ✅ `NEXT_PUBLIC_SHOW_ADS` (default false) |
| H2  | **Implementar schema `HowTo`** en la home                                  | `app/[locale]/page.tsx`                                                                    | ✅ |
| H3  | **Ampliar FAQ** de 4 a 8–10 preguntas con respuestas de 80–120 palabras    | `coffee-calc-seo-block.tsx`, traducciones `CoffeeCalc`                                     | ✅ 10 FAQs |
| H4  | **Ampliar meta descriptions** cortas (ES ~78, FR ~74, DE ~62 chars) a ~150 | `public/messages/*.json`                                        | ✅ |
| H5  | **Actualizar sitemap** con URLs del blog                                   | `app/sitemap.ts`                                                                           | ✅ 90 URLs blog |
| H6  | **Enlaces internos** home → blog, about → artículos, footer → blog         | Footer, SEO block, artículos                                                               | ✅ |

### 3.3 Prioridad media — mejora señal de calidad

| #   | Tarea                                                       | Detalle                                                          |
| --- | ----------------------------------------------------------- | ---------------------------------------------------------------- |
| M1  | Tabla comparativa de precios por bebida y moneda            | En home o artículo dedicado; datos con fuente y disclaimer       |
| M2  | Sección "Metodología" con fuentes de precios y limitaciones | Transparencia sobre estimaciones vs. precios reales de cafetería |
| M3  | Casos de uso con ejemplos numéricos                         | Presupuesto mensual, comparar salarios, entender inflación       |
| M4  | Revisar impacto del consentimiento en revisión AdSense      | `consent-third-parties.tsx` carga ads solo tras aceptar cookies  |
| M5  | Actualizar `specs/adsense-compliance-audit.md`              | Marcar Fase 1 como completada; enlazar a este plan               |

---

## 4. Contenido a crear en la home (C1)

Añadir debajo del bloque SEO actual (`coffee-calc-seo-block.tsx`):

| Sección                | Contenido esperado                                    | ~Palabras |
| ---------------------- | ----------------------------------------------------- | --------- |
| Cómo funciona          | Paso a paso con ejemplo numérico (ej. $50 → X lattes) | 150–200   |
| Metodología de precios | Promedios por bebida, tipos de cambio, disclaimer     | 150–200   |
| Tabla comparativa      | Espresso / latte / cold brew en varias monedas        | 100–150   |
| Casos de uso           | 3 escenarios reales con cifras                        | 200–250   |
| FAQ ampliada           | 4–6 preguntas nuevas, respuestas detalladas           | 300–400   |

**Regla de calidad:** cada párrafo debe aportar información que no esté en los primeros resultados de Google. Si el texto podría haberlo escrito alguien que nunca usó la herramienta, reescribirlo.

---

## 5. Artículos del blog (C2) — backlog inicial

Publicar en **inglés y español** como mínimo; traducir al resto de locales según prioridad.

| #   | Slug sugerido              | Título                                                           | Palabras objetivo |
| --- | -------------------------- | ---------------------------------------------------------------- | ----------------- |
| 1   | `coffee-prices-by-country` | ¿Cuánto cuesta un café en [país]? Guía por regiones              | 1.000–1.500       |
| 2   | `monthly-coffee-budget`    | Cómo presupuestar tu gasto en café al mes                        | 800–1.200         |
| 3   | `drink-price-guide`        | Guía de precios por tipo de bebida (espresso, latte, cold brew…) | 1.000–1.500       |
| 4   | `coffee-rule-explained`    | La regla del café: convertir cualquier precio a tazas            | 800–1.000         |
| 5   | `why-coffee-as-unit`       | ¿Por qué el café es buena unidad para entender costos?           | 800–1.000         |
| 6   | `coffee-inflation-history` | Evolución del precio del café: contexto histórico                | 1.000–1.500       |
| 7   | `salary-comparison-coffee` | Comparar salarios entre países usando tazas de café              | 800–1.200         |
| 8   | `how-to-use-coffeecalc`    | Tutorial completo de CoffeeCalc con ejemplos                     | 600–900           |

**Estructura técnica sugerida:**

```
app/[locale]/blog/
├── page.tsx              # listado de artículos
└── [slug]/
    └── page.tsx          # artículo individual

lib/blog/
├── posts.ts              # metadata de artículos (slug, locale, date)
└── types.ts

public/messages/blog/     # opcional: traducciones por artículo
```

---

## 6. E-E-A-T — contacto y about (C3, C4)

### Contact

- [ ] Añadir email público (ej. `contact@howmanycoffees.net`) o formulario (Formspree, Resend, etc.)
- [ ] Mencionar tiempo de respuesta esperado
- [ ] No redirigir todo a privacy/about como único canal

### About

- [ ] Nombre o alias del operador
- [ ] Por qué se creó CoffeeCalc (historia breve)
- [ ] Cómo se calculan los precios (resumen con enlace a metodología en home)
- [ ] Enlaces a perfiles verificables (GitHub, LinkedIn, etc.) si existen
- [ ] Fecha de última actualización visible

---

## 7. Ajustes técnicos pre-revisión (H1–H6)

### Ocultar anuncios (H1)

Opciones (elegir una):

1. **Flag de entorno:** `NEXT_PUBLIC_SHOW_ADS=false` hasta aprobación; `CoffeeCalcAd` retorna `null` si está desactivado.
2. **Eliminar temporalmente** `<CoffeeCalcAd />` de `coffee-calc-page.tsx`.

### Schema HowTo (H2)

Añadir en `app/[locale]/page.tsx` junto al JSON-LD existente:

- Nombre: "How to convert any price to coffee cups"
- Pasos: introducir monto → elegir moneda → elegir bebida → leer resultado
- Referencia: `.claude/agent-memory/seo-organic-expert/patterns.md`

### Sitemap (H5)

Tras crear el blog, extender `app/sitemap.ts`:

```ts
// Añadir por cada post y locale:
{ url: `${BASE_URL}/${locale}/blog/${slug}`, priority: 0.7, changeFrequency: "monthly" }
```

---

## 8. Proceso de indexación y nueva solicitud

### Paso a paso

1. Implementar C1–C4 y al menos **3 artículos** del backlog (C2).
2. Desplegar a producción.
3. **Search Console** → Sitemaps → reenviar `sitemap.xml`.
4. **Inspeccionar URL** en home, about, contact y cada artículo nuevo → solicitar indexación.
5. **Esperar 2–4 semanas** para que Google re-rastree (no solicitar revisión el mismo día).
6. Verificar en Search Console que las nuevas URLs aparecen como "Indexadas".
7. **AdSense** → Sites → seleccionar `howmanycoffees.net` → **Request review**.

### Qué NO hacer

- No pedir revisión solo con páginas legales (insuficiente).
- No inflar texto con relleno o IA sin edición humana.
- No crear páginas programáticas finas (ej. "café en [ciudad]" con plantilla idéntica).
- No re-solicitar antes de 2 semanas tras publicar contenido nuevo.
- No añadir más artículos genéricos si repiten el mismo patrón de baja calidad.

---

## 9. Criterios de aceptación — listo para re-solicitar

Solicitar revisión en AdSense **solo** cuando se cumplan todos:

| #   | Criterio                                                                                   | Estado |
| --- | ------------------------------------------------------------------------------------------ | ------ |
| 1   | Home con **800+ palabras** de contenido único (además de UI de calculadora)                | ✅     |
| 2   | **5+ artículos** de blog publicados y enlazados internamente                               | ✅     |
| 3   | About identifica al operador con credenciales reales                                       | ✅     |
| 4   | Contact con **email o formulario** funcional                                               | ✅     |
| 5   | Privacy menciona AdSense, cookies publicitarias y GTM                                      | ✅     |
| 6   | Footer enlaza Privacy, Terms, About, Contact (+ Blog) en todas las páginas                 | ✅     |
| 7   | Sitemap incluye home, legales y artículos del blog                                         | ✅     |
| 8   | Search Console muestra nuevas URLs indexadas                                               | ⬜     |
| 9   | Slots de anuncio ocultos o sin huecos vacíos visibles                                      | ✅     |
| 10  | Contenido indexable total del sitio supera **~5.000 palabras** únicas por locale principal | ✅     |

---

## 10. Cronograma sugerido

| Fase                      | Duración    | Tareas                                | Entregable                            |
| ------------------------- | ----------- | ------------------------------------- | ------------------------------------- |
| **A** — Home              | 3–5 días    | C1, H2, H3, M1–M3                     | Home ampliada + HowTo + FAQ extendida |
| **B** — Confianza         | 2–3 días    | C3, C4                                | Contact con email; About reforzado    |
| **C** — Blog (piloto)     | 1 semana    | C2 (artículos 1–3), H5, H6            | `/blog` con 3 artículos EN+ES         |
| **D** — Blog (completo)   | 1 semana    | C2 (artículos 4–8)                    | 5–8 artículos publicados              |
| **E** — Pre-revisión      | 1–2 días    | H1, H4, verificación Search Console   | Ads ocultos; sitemap actualizado      |
| **F** — Espera + revisión | 2–4 semanas | Indexación, Request review en AdSense | Solicitud enviada                     |

**Total estimado:** 3–5 semanas desde inicio hasta solicitud de revisión.

---

## 11. Archivos clave del repositorio

| Archivo                                            | Rol en remediación                      |
| -------------------------------------------------- | --------------------------------------- |
| `components/coffee-calc/coffee-calc-seo-block.tsx` | Ampliar contenido home                  |
| `components/coffee-calc/coffee-calc-page.tsx`      | Ocultar ads; enlace a blog              |
| `components/coffee-calc/coffee-calc-ad.tsx`        | Condicionar render de anuncios          |
| `components/coffee-calc/coffee-calc-footer.tsx`    | Enlace a blog                           |
| `components/coffee-calc/contact-content.tsx`       | Añadir email/formulario                 |
| `components/coffee-calc/legal-content.tsx`         | About ampliado                          |
| `app/[locale]/page.tsx`                            | JSON-LD HowTo                           |
| `app/sitemap.ts`                                   | URLs del blog                           |
| `public/messages/*.json`                           | Traducciones home, about, contact, blog |
| `components/consent/consent-third-parties.tsx`     | Consent + carga condicional de ads      |

---

## 12. Riesgos

| Riesgo                                                | Mitigación                                                                  |
| ----------------------------------------------------- | --------------------------------------------------------------------------- |
| Rechazo repetido tras cambios mínimos                 | No re-solicitar hasta cumplir sección 9 completa                            |
| Google cachea versión antigua                         | Esperar 2–4 semanas; usar Inspeccionar URL en Search Console                |
| Contenido IA sin editar detectado como bajo valor     | Revisión humana obligatoria; añadir ejemplos y datos propios                |
| 9 locales × mismo contenido = percepción de plantilla | Priorizar EN+ES; traducir artículos con revisión, no auto-traducción masiva |
| Slots vacíos durante revisión                         | Ocultar `CoffeeCalcAd` hasta aprobación                                     |
| Revisor no ve ads por rechazo de cookies              | Aceptable si el foco es contenido; documentar en privacy                    |

---

## 13. Referencias

- [Políticas del programa AdSense](https://support.google.com/adsense/answer/48182)
- [Directrices de calidad — contenido fino](https://developers.google.com/search/docs/essentials/spam-policies#thin-content)
- [Crear contenido útil (Search Central)](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Auditoría original: [`adsense-compliance-audit.md`](./adsense-compliance-audit.md)
- Memoria SEO del proyecto: `.claude/agent-memory/seo-organic-expert/MEMORY.md`

---

## 14. Próximo paso inmediato

**Empezar por Fase A:** ampliar `coffee-calc-seo-block.tsx` y traducciones `CoffeeCalc` con metodología, casos de uso y FAQ extendida. Es el cambio de mayor impacto con menor esfuerzo de infraestructura.

Tras Fase A, implementar Fase B (contacto + about) y Fase C (blog piloto con 3 artículos) antes de considerar la solicitud de revisión.

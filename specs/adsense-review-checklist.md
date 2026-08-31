# Checklist para solicitar revisión en AdSense

Usar **después de desplegar** los cambios de remediación (FAQ, meta AdSense, script siempre visible).

## 1. Search Console

- [ ] Reenviar `https://www.howmanycoffees.net/sitemap.xml`
- [ ] Inspeccionar y solicitar indexación de:
  - `https://www.howmanycoffees.net/en/faq`
  - `https://www.howmanycoffees.net/en/about`
  - `https://www.howmanycoffees.net/en/contact`
  - `https://www.howmanycoffees.net/en/privacy`
- [ ] Confirmar que `/en/blog` redirige a `/en/faq` (301)
- [ ] Verificar con `site:howmanycoffees.net faq` que Google indexa la nueva página

## 2. Verificación técnica en producción

- [ ] El HTML incluye `<meta name="google-adsense-account" content="ca-pub-8195825937047934">`
- [ ] El script `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js` carga sin aceptar cookies
- [ ] `ads.txt` accesible en `https://www.howmanycoffees.net/ads.txt`
- [ ] Footer enlaza a FAQ, Privacy, Terms, About, Contact

## 3. Esperar antes de solicitar revisión

- [ ] Han pasado **mínimo 2 semanas** desde el despliegue
- [ ] Las URLs nuevas aparecen como indexadas en Search Console

## 4. AdSense

- [ ] Ir a **Sitios** → `howmanycoffees.net` → **Solicitar revisión**
- [ ] Mensaje sugerido: _"We replaced the blog with a comprehensive FAQ page (20 questions), added AdSense verification meta and script with Consent Mode, strengthened the About page with verifiable author info, and set 301 redirects from old /blog URLs to /faq."_

## 5. Después de la aprobación

- [ ] Activar `NEXT_PUBLIC_SHOW_ADS=true` en producción
- [ ] Verificar que las unidades de anuncio se renderizan correctamente

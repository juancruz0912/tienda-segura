# tienda-segura

Laboratorio independiente del trabajo de Logs. Sigue `../caso_practico_ci.md`: una aplicación Express pequeña y un pipeline de GitHub Actions que se dispara al abrir o actualizar una pull request.

## Etapa actual: app y primer pipeline

La app exporta `total(precio, cant, desc)` y una ruta GET `/total`. Ejecutar desde esta carpeta:

```bash
npm ci
npm test
```

El workflow de `.github/workflows/pipeline.yml` actualmente solo ejecuta `npm ci` y `npm test` en cada PR, como pide el paso 2 del taller. Incluye `setup-node` con Node 22 para no depender de la versión preinstalada en `ubuntu-latest`. `CI/pipeline.yml` (un nivel arriba) es la referencia del profesor, no el workflow que ejecuta GitHub.

## Orden de publicación y demostración

1. **App inicial en `main`:** publicar `app.js`, `app.test.js`, `package.json`, `package-lock.json`, `.gitignore` y este README. El workflow ya está creado localmente, pero dejarlo **sin incluir en este primer commit** para preservar la PR del paso 2.

   ```bash
   git add .gitignore app.js app.test.js package.json package-lock.json README.md
   git commit -m "App inicial con un test"
   git push origin main
   ```

2. Desde `main` actualizado, crear la rama `paso-2-pipeline`, publicar el workflow inicial y abrir una PR. Confirmar el check `verificar` verde antes de fusionarla.

   ```bash
   git switch -c paso-2-pipeline
   git add .github/workflows/pipeline.yml
   git commit -m "Primer pipeline: solo tests"
   git push -u origin paso-2-pipeline
   ```

   En GitHub, abrir una PR de `paso-2-pipeline` hacia `main` y revisar la pestaña **Checks/Actions**. Fusionarla cuando `verificar` pase y actualizar `main` local antes de la siguiente rama.
3. En otra rama/PR `paso-3-puertas`, incorporar `npm audit --audit-level=high`, Semgrep y Gitleaks y verificar que la app sana siga verde. El ejemplo YAML del paso 3 en la guía tiene errores de sangría; partir del workflow válido del repositorio.
4. Habilitar una regla de `main` que exija el check `verificar`. Hacer cuatro PR independientes con fallas: token ficticio, `eval`, `lodash@4.17.15` y signo de descuento incorrecto. Verificar que el botón de fusión se bloquee ante un check rojo; corregir y fusionar tres PR y cerrar la del token sin fusionar.
5. Añadir y demostrar los retos Trivy (configuración Dockerfile) y ZAP (app ejecutándose) en PR posteriores. Para ZAP arrancar un servidor separado, sin hacer que `node --test` quede escuchando indefinidamente.

Todavía **no se han ejecutado checks en GitHub**, ni se configuró la regla de fusión, ni se crearon las PR de fallas. Las capturas y URLs de cada PR/check deben registrarse al realizarlas.

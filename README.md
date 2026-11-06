# tienda-segura

Laboratorio independiente del trabajo de Logs. Sigue `../caso_practico_ci.md`: una aplicación Express pequeña y un pipeline de GitHub Actions que se dispara al abrir o actualizar una pull request.

## Estado actual: paso 3 fusionado y fallas preparadas

La app exporta `total(precio, cant, desc)` y una ruta GET `/total`. Ejecutar desde esta carpeta:

```bash
npm ci
npm test
```

La PR #1 del paso 2 se fusionó en `main` (`e9cb4dd`). La PR #2 fusionó las puertas de seguridad (`8772892`): `npm audit --audit-level=high`, Semgrep (`p/javascript`) y Gitleaks, con Node 22 y Python 3.12. El check `verificar` terminó en verde. `CI/pipeline.yml` (un nivel arriba) es la referencia del profesor, no el workflow que ejecuta GitHub.

El `main` local quedó actualizado en `8772892`.

## Fallas preparadas

Se publicaron cuatro ramas independientes desde `main`, sin mezclar la documentación:

| Rama | Falla introducida | Puerta que debe fallar |
| --- | --- | --- |
| `falla-test` | `(1 + desc)` en el cálculo del descuento | `npm test` |
| `falla-secreto` | Token ficticio `ghp_...` en `app.js` | Gitleaks |
| `falla-codigo` | Ruta `/eval` que ejecuta `eval(expr)` | Semgrep |
| `falla-libreria` | `lodash` fijado en `4.17.15` | `npm audit` |

La falla de `falla-test` se comprobó localmente: `node --test app.test.js` devuelve `300 !== 100`. La de `falla-libreria` también: `npm audit --audit-level=high` termina con código 1 y una vulnerabilidad alta. Las puertas de las otras dos se deben confirmar en GitHub.

## Siguiente orden

1. Configurar una regla de `main` que exija el check `verificar` antes de fusionar. En GitHub: **Settings > Branches/Rules > New ruleset** (o **Add branch protection rule**), patrón `main`, opción **Require status checks to pass**, check `verificar`.
2. Abrir las cuatro PR hacia `main`:
   - https://github.com/juancruz0912/tienda-segura/pull/new/falla-test
   - https://github.com/juancruz0912/tienda-segura/pull/new/falla-secreto
   - https://github.com/juancruz0912/tienda-segura/pull/new/falla-codigo
   - https://github.com/juancruz0912/tienda-segura/pull/new/falla-libreria
3. Registrar la URL de cada PR y el paso que falla. Comprobar que el botón de fusión queda bloqueado mientras `verificar` está en rojo.
4. Corregir y fusionar las PR de test, código y librería. Cerrar la PR del token sin fusionarla y eliminar su rama.
5. Añadir y demostrar los retos Trivy (configuración de Dockerfile) y ZAP (app ejecutándose) en PR posteriores. Para ZAP arrancar un servidor separado, sin hacer que `node --test` quede escuchando indefinidamente.

La regla de fusión, la apertura de las cuatro PR, Trivy y ZAP siguen pendientes. Registrar las URLs de cada PR/check y sus evidencias al realizarlas.

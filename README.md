
<!-- markdownlint-disable MD033 MD041 -->
<div align="center">
    <img src="./public/botprofile.png" width=140 height=140 style="margin-right: 12px;"/>
    <h1>Fisibot</h1>
    <p align="center">
        El bot de Discord de la Facultad de Ingeniería de Sistemas e Informática, UNMSM
    </p>
    <p>
        <a href="https://discord.js.org/">
            <img src="https://img.shields.io/static/v1?label=Made%20with&message=Discord.js&color=5865F2&logo=Discord&logoColor=white&labelColor=black"/>
        </a>
        <a href="https://railway.app/">
            <img src="https://img.shields.io/static/v1?label=hosted by&message=railway.app&logo=Railway&logoColor=white&labelColor=black&color=755494"/>
        </a>
        <a href="https://github.com/fisibot/fisibot">
            <img src="https://img.shields.io/github/package-json/v/fisibot/fisibot?labelColor=black&color=8a4641"/>
        </a>
        <a href="https://discord.io/fisi">
            <img src="https://discordapp.com/api/guilds/1031664179993657375/widget.png?style=shield"/>
        </a>
    </p>
</div>
  
---

Fisibot es el encargado del registro, la moderación y la administración
del servidor de Discord de la FISI. Un proyecto de los estudiantes,
para los estudiantes.

## 📦️ Sobre el proyecto

Fisibot está hecho con [Discord.js](https://discord.js.org/),
_el módulo de [Node.js](https://nodejs.org/en/) que permite interactuar
con la [Discord API](https://discord.com/developers/docs/intro)_.

Usa [MongoDB](https://www.mongodb.com/) como base de datos y
[Google Forms](https://www.google.com/forms/about/) para integrar
el sistema de registros dentro de Discord.

Está desarrollado con [TypeScript](https://www.typescriptlang.org/) y
[ESLint](https://eslint.org/) para asegurar la calidad del código y
la mantenibilidad del proyecto a lo largo de toda la historia de La FISI.

## ✨ Contribuciones

Importante:

```md
Este proyecto se encuentra actualmente en una versión alpha

Hasta no conseguir una versión estable, las pull requests estarán desactivadas

Próximamente se creará una guía más detallada de cómo podrás contribuir con
el desarrollo de Fisibot, este proyecto se mantendrá vivo gracias a sus contribuidores

- Discord de la FISI
```

## ❓️ FAQ

Preguntas frecuentes sobre Fisibot y el servidor de la FISI

### ¿Cómo funciona el sistema de verificaciones?

Cada vez que un usuario envía un formulario, Fisibot recibe los
datos necesarios y empieza la validación

El nombre completo y el correo institucional del estudiante deben coincidir
de alguna forma, esto es:

> Sea el estudiante `Nombre1 Nombre2 Apellido1 Apellido2`, Fisibot espera
> que su correo tenga la forma `nombre1.apellido1@unmsm.edu.pe`
> 
> Sin embargo, este caso es muy básico. Fisibot revisa todas las posibles
> combinaciones de correos que se puedan generar a partir del nombre completo
> (puede fallar para combinaciones muy complejas)

Notar que Fisibot no recibe tu nombre directamente del formulario, sino que
lo obtiene a partir de tu código y la base de datos de estudiantes de la UNMSM.
Esto es muy útil a la hora de encontrar registros falsos.

Esto es gracias a la [Google Forms API](https://developers.google.com/forms)
y los [webhooks de Discord](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

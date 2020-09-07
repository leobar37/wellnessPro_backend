export const template = `
 <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <style>
       * {
         margin: 0;
         padding: 0;
       }
 
       body {
         box-sizing: border-box;
       }
 
       .text {
         background: #0756a2;
         background: linear-gradient(
           90deg,
           #606163 0%,
           #0756a2 35%,
           #00d4ff 97%
         );
         -webkit-background-clip: text;
         background-clip: text;
         -webkit-text-fill-color: transparent;
         text-transform: uppercase;
         font-size: 4.5em;
       }
       .text.litle {
         font-style: italic;
         font-size: 2rem !important;
       }
 
       header {
         min-height: 30vh;
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         font-style: italic;
       }
       header .parrafo {
         font-size: 1.2em;
       }
 
       main {
         background: #bdb2ff;
         height: 40vh;
         width: 100%;
         display: flex;
         justify-content: center;
         align-items: center;
         flex-direction: column;
       }
 
       ul {
         list-style: none;
       }
       ul li {
         font-size: 1.3rem;
         margin: 1.2rem 0.2rem;
       }
 
       /*# sourceMappingURL=mail.css.map */
     </style>
   </head>
   <body>
     <header>
       <h3 class="text">bienvenido</h3>
       <p class="parrafo">haz entrado al desafio</p>
     </header>
     <main>
       <ul>
         <li>Comunicate con tus asesores <a href="">aqui</a></li>
         <li>Encuentrate con los demas retadores<a href="">aqui</a></li>
         <li>consulta tus horarios aqui <a href="">aqui</a></li>
       </ul>
       <h3 class="text litle">suerte</h3>
     </main>
   </body>
 </html>
 `;

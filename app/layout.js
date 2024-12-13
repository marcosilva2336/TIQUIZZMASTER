// app/layout.js
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="T.I QUIZZMASTER - O melhor quiz de tecnologia da informação" />
        <meta name="keywords" content="quiz, tecnologia da informação, TI, perguntas, respostas" />
        <meta name="author" content="João Marcos Cosme da Silva" />
        <link rel="icon" href="/favicon.ico" />
        <title>T.I QUIZZMASTER</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
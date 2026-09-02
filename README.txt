MONITOR DE ÁGUA — VERSÃO INTEGRADA AO ESP32

O site agora busca os dados reais do ESP32 a cada 1 segundo.

IP configurado no site:
http://192.168.1.8

Se o ESP32 receber outro IP, altere em src/main.js a constante ESP32_IP.

IMPORTANTE:
- PC/celular e ESP32 precisam estar na mesma rede local.
- O código do ESP32 precisa ter o endpoint /dados e CORS habilitado.
- Para testar localmente, rode npm run dev.
- Uma publicação HTTPS (ex.: Vercel) pode bloquear uma chamada HTTP para o ESP32 por mixed content; primeiro teste localmente.

Calibração:
100% = 1,80 cm
0% = 13,20 cm

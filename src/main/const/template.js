export const filmTemplate = "<!DOCTYPE html>\n" +
    "<html lang='fr'>\n" +
    "<head>\n" +
    "    <meta charset='utf-8'/>\n" +
    "\n" +
    "    <meta http-equiv='cache-control' content='max-age=0'/>\n" +
    "    <meta http-equiv='cache-control' content='no-cache'/>\n" +
    "    <meta http-equiv='expires' content='0'/>\n" +
    "    <meta http-equiv='expires' content='Tue, 01 Jan 1980 1:00:00 GMT'/>\n" +
    "    <meta http-equiv='pragma' content='no-cache'/>\n" +
    "    <meta name='msapplication-TileColor' content='#da532c'>\n" +
    "    <meta name='theme-color' content='#ffffff'>\n" +
    "    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'>\n" +
    "    <script src='https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js'></script>\n" +
    "    <script type='application/javascript' src='https://unpkg.com/trees-draw-play@1.0.12/dist/play.min.js'></script>\n\n"+
    "    <script>\n" +
    "        const film = filmContentHere;\n" +
    "        window.onload = function () {\n" +
    "            Player.init('#app', film, function (player) {\n" +
    "                player.end(function () {\n" +
    "                    console.log('end');\n" +
    "                });\n" +
    "                player.start();\n" +
    "            });\n" +
    "        }\n" +
    "    </script>\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "<div id='film'>\n" +
    "    <div id='app'></div>\n" +
    "</div>\n" +
    "</body>\n" +
    "</html>";
# Digital. Aber verantwortlich.

Schulung zum Umgang mit Leih-Tablets und eigenen Geräten (BYOD) am Berufskolleg West Essen.

Aktuelle Website: https://digital-verantwortlich-bk-west.vercel.app/

## Funktionsumfang

- Name und Klasse vor Beginn festlegen; kein Benutzerkonto oder Passwort erforderlich.
- Sechs Lernmodule mit interaktiven Fällen und Lernspielen.
- Abschlusstest mit 15 Fragen; bestanden ab 12 richtigen Antworten.
- Alle 14 Regeln für alle Klassen und drei persönliche Erklärungen bestätigen.
- Persönliches PDF-Zertifikat mit Schullogo herunterladen und Matthias Albrecht vorzeigen.

Name, Klasse und Fortschritt bleiben im Sitzungsspeicher des Browsers. Es gibt keine zentrale Klassenübersicht und keinen Lehrerzugang. Das Zertifikat wird auf dem Gerät erstellt. Es erfolgt kein automatischer Versand.

## Lokal entwickeln

Node.js 22 oder neuer installieren. Es werden keine npm-Abhängigkeiten benötigt.

```sh
git clone https://github.com/agnesderhirte-dot/digital-verantwortlich-bk-west.git
cd digital-verantwortlich-bk-west
npm run dev
```

Danach http://127.0.0.1:4173 öffnen.

## Wichtige Dateien

| Datei | Inhalt |
| --- | --- |
| public/index.html | Grundgerüst und Navigation |
| public/style.css | Gestaltung und responsive Ansichten |
| public/content.js | Lernmodule, Fragen und Abschlusserklärungen |
| public/rules.js | Regeln und Regelfassung für alle Klassen |
| public/app.js | Anmeldung, Lernspiele, Test und Seitenansichten |
| public/core.js | Zustandsverwaltung und Bestehensbedingungen |
| public/certificate.js | PDF-Zertifikat |
| public/assets/ | Logo, Bilder, Schrift und PDF-Bibliotheken |

## Prüfen und unabhängige HTML erzeugen

```sh
npm test
npm run build:html
```

Die eigenständige Datei entsteht unter output/Digital-verantwortlich.html. Sie enthält die benötigten Bilder, Schriften und PDF-Bibliotheken und kann ohne Server im Browser geöffnet werden. Externe Rechtsquellen benötigen Internetzugang. Änderungen an public/ anschließend mit build:html in die Einzeldatei übernehmen.

## Vercel

Repository importieren, Framework „Other“, Root Directory „./“, Output Directory „public“. Kein Build oder Installationsschritt und keine Umgebungsvariablen erforderlich. vercel.json enthält die Auslieferungskonfiguration. Die bestehende Online-Seite wird durch den GitHub-Upload allein nicht verändert oder automatisch mit diesem Repository verbunden.

## Inhalt und Gestaltung

Rechtsinhalte beziehen sich auf Deutschland und NRW, Inhaltsstand 13. Oktober 2026. Vor Anpassungen und schulischem Regelbetrieb fachlich sowie schulorganisatorisch prüfen. Betreiber- und Datenschutzangaben sind an den tatsächlichen Einsatz anzupassen.

Das Schullogo und Bilder sind keine frei lizenzierten Projektbestandteile; die Berechtigung zur weiteren Nutzung ist gesondert zu beachten. Bibliotheks- und Schriftlizenzen liegen unter public/assets/. Für den übrigen Quellcode wird mit diesem Upload keine zusätzliche Open-Source-Lizenz erteilt.

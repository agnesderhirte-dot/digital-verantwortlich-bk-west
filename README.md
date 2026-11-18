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

Rechtsinhalte beziehen sich auf Deutschland und NRW, Fragenstand 17. November 2026 (VERSION 2026-11-17.1). Der Fragenpool enthält 30 Fragen, fünf pro Thema. 15 werden im Test verwendet. Änderungen, Quellen und Prüfgrenzen: [Fragenreview](FRAGEN-REVIEW.md). Alte Sitzungsstände werden bei diesem Versionswechsel verworfen, damit geänderte Antwortnummern nicht falsch ausgewertet werden.

Impressum und Datenschutz stehen in public/legal-pages.js. Die Texte sind Entwürfe mit Schuldaten aus den offiziellen Schulquellen und dienstlichem Projektkontakt. Die tatsächliche Anbieter-/Hostingzuordnung, Verträge, Rechtsgrundlagen und Log-Löschfristen sind vor verbindlichem Einsatz zu bestätigen: [offene rechtliche Prüfpunkte](RECHTLICHE-PRUEFPUNKTE.md). Eine schulische Freigabe wird nicht behauptet.

Das Schullogo und Bilder sind keine frei lizenzierten Projektbestandteile; die Berechtigung zur weiteren Nutzung ist gesondert zu beachten. Bibliotheks- und Schriftlizenzen liegen unter public/assets/. Für den übrigen Quellcode wird mit diesem Upload keine zusätzliche Open-Source-Lizenz erteilt.

## Qualitätsprüfung und Weiterentwicklung

Siehe [Prüfbericht](PRUEFBERICHT.md), [Audit vom 17.11.2026](AUDIT-2026-11-17.md) und [Megaprompt](MEGAPROMPT.md). Die persönliche Namensbestätigung, optional gezeichnete Schülerunterschrift und eingebundene Lehrkraftunterschrift sind keine kryptografische Signatur oder Identitätsprüfung. Der unabhängige Kurs erstellt einen Selbstlern-Nachweis und ist nicht fälschungssicher. PDF-Erzeugung, Sicherheitsregressionen, Fragenverteilung und Rechtshinweise sind mit 24 Tests geprüft; die echte Dateiablage auf iPad/Safari und Android ist weiterhin in der Geräteabnahme zu prüfen.

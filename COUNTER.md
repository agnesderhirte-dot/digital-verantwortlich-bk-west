# Kleiner gemeinsamer Testzähler

Auftrag vom 18.11.2026: kleine Anzeige mit Zahl abgeschlossener Tests und Bestehensquote. Der Auftraggeber hat ausdrücklich alle Versuche einschließlich Wiederholungen gewählt. Anzeige in der Fußzeile: `Tests: 128 · bestanden: 84 %`. Bei null Versuchen steht statt einer nicht berechenbaren Quote ein Gedankenstrich. Ein Fehler zeigt keine erfundene Null und sperrt weder Test noch Zertifikat.

## Daten und Zählung

- Gezählt wird erst nach gültiger lokaler Abgabe aller 15 Testantworten. Ein tatsächlicher neuer Wiederholungsversuch bekommt eine neue zufällige UUID. Alte Ergebnisse ohne Zählerkennung werden nicht nachträglich übermittelt.
- Übertragen werden ausschließlich `version`, `attemptId` und `passed`. Der Client stellt die Übermittlung aus einer festen Positivliste zusammen. Namen, Klassen, Punktzahlen, Einzelantworten und Unterschriften fehlen.
- Die Datenbank hält nur Gesamtsummen, Zufallskennungen bereits gezählter Versuche und einen aktuellen globalen Minuten-Zähler für die Begrenzung von Schreibanfragen. Ein Versuchsergebnis wird nicht mit der UUID gespeichert. Keine IP-/Gerätekennungen in der Anwendungsdatenbank.
- Summierung und Kennungsprüfung laufen in einer atomaren SQL-Anweisung. Wiederholtes Senden derselben UUID zählt nicht mehrfach. Die Speicherung ist persistent und geräteübergreifend.
- Produktions- und Vorschauzählung haben getrennte Namensräume. Prüfungen verwenden ausschließlich `preview`; der Browser darf den Namensraum nicht wählen.
- Die öffentliche Anzeige zählt Versuche, keine einzelnen Personen. Die Meldung des Browser-Ergebnisses ist bewusst kein kryptografischer Prüfungsnachweis. Absichtliche Manipulation durch direkte Anfragen ist nicht vollständig ausgeschlossen. Strikte Datenformate, erlaubte Browser-Ursprünge, 8-KB-Grenze und ein globales Limit von 600 Schreibanfragen pro Minute begrenzen gewöhnliche Fehlanfragen und versehentliche Mehrfachsendungen. Ohne Personen-/IP-Tracking ist keine sichere eindeutige Personenzählung möglich.

## Betrieb

API: GET/POST `/api/counter`, Node.js-Funktion in Frankfurt. Geschützte Servervariable: `COUNTER_DATABASE_URL`. Separates Neon-Free-Projekt `digital-verantwortlich-counter`, Region `aws-eu-central-1`; Vercel-Marketplace-Zugriff war mit der vorhandenen Verbindung nicht verfügbar (403), daher wurde das bereits verbundene Neon-Konto verwendet. Kein Tarifwechsel oder kostenpflichtiges Zusatzprodukt aktiviert. Die üblichen Plattform-Freikontingente gelten; eine erschöpfte Zählerquote lässt die Schulung weiterlaufen.

Schema: db/counter.sql. Keine zentrale Schülerverwaltung. Es wird keine vorhandene Schülerdatenbank verwendet. Der offizielle Treiber @neondatabase/serverless 1.2.1 ist eine begründete neue Serverabhängigkeit für parametrisierte HTTP-SQL-Abfragen; Version und Lockdatei sind festgeschrieben. Keine Ausführung von Paket-Installationsskripten.

Die Anzeige lädt beim Öffnen, nach Testabgabe sowie bei Rückkehr in den Tab und ungefähr einmal pro sichtbarer Minute neu. Öffentliche Abfragen dürfen kurz zwischengespeichert werden. Auch andere gleichzeitig offene Geräte können daher kurz den bisherigen Wert zeigen. Kein permanenter Personen-Identifier in localStorage oder Cookies. Eine Abgabekennung bleibt mit dem lokalen Ergebnis in sessionStorage, bis die Sitzung zurückgesetzt wird.

Offline: Die eigenständige HTML-Datei enthält den vollständigen Kurs und PDF-Download. Bei `file:` blendet sie den Zähler aus und sendet keine Zähleranfrage. Der lokale statische Entwicklungsserver stellt keine Online-API bereit; für API-Entwicklung Vercel oder die Handler-/Integrationstests verwenden.

## Datenschutzprüfung

Die bisherige Produktentscheidung „keine zentrale Schülerdatenbank“ bleibt bestehen. Der Auftrag ergänzt ausdrücklich eine kleine zentrale Zählfunktion und ändert damit die frühere Architektur „vollständig ohne Backend“. Abschnitt 6a der Datenschutzhinweise beschreibt die zusätzliche Verarbeitung. Schulleitung/Datenschutzbeauftragter müssen die Rechtsgrundlage, Neon-Vertragsbedingungen, technischen Protokolle, Aufbewahrung der zufälligen Abgabekennungen und das Hosting prüfen. Region Frankfurt ist keine Zusage, dass sämtliche Anbieter-Verarbeitung ausschließlich dort stattfindet. Keine bereits erfolgte schulische oder datenschutzrechtliche Freigabe behaupten.

## Prüfung

Automatisierte Prüfungen umfassen Datenminimierung, ungültige zusätzliche Felder, Übermittlungsgrenzen, Ursprungsprüfung, Fehlerbehandlung, Prozentrechnung, Wiederherstellung der Abgabekennung und offline vollständig ausbleibende Zähleranfragen. Zusätzlich Summierung und Doppelzählungsschutz gegen die echte getrennte Vorschauzählung prüfen. Produktionszähler nicht mit erfundenen Schülerabgaben füllen.

Am 18.11.2026 bestanden 32 automatisierte Prüfungen. Echte Datenbankprüfung im Namensraum preview: fünf unterschiedliche Abgaben ergaben fünf Versuche und drei bestandene Tests. Anschließend wurden acht identische neue Abgaben gleichzeitig gesendet; genau eine wurde gezählt. Ergebnis: sechs Versuche und vier bestanden. Der Namensraum production blieb bei null. Der Offline-Build wurde erzeugt und auf gültige Skriptsyntax geprüft. Browser-/Geräteabnahme wird durch diese Prüfungen nicht ersetzt.

Online-Prüfung am 18.11.2026: Vercel-Vorschau und Produktion READY. Vorschau-API liefert sechs Versuche, vier bestanden, 67 %. Produktions-API liefert initial null Versuche und keine berechenbare Quote. Startseite enthält das Fußzeilenelement; das ausgelieferte Zählmodul stimmt mit der geprüften Fassung überein. Alle Abrufe HTTP 200. Zwei absichtlich ungültige HTTP-Abgaben in Produktion wurden mit 403 (fremder Ursprung) bzw. 400 (falsche Version) abgewiesen, ohne den Zähler zu füllen. Der vollständige gültige HTTP-Schreibpfad durch die geschützte Vorschau konnte ohne zusätzliche CLI-Anmeldung nicht direkt geprüft werden (401); Handler und atomare Datenbankschreibung sind separat geprüft. Keine Schutzfunktion dafür abgeschaltet.

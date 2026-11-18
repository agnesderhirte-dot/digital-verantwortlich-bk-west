// Je Fall eine beste Antwort; Rückmeldungen erklären alle fünf Optionen.
// Rechtsbezüge: siehe FRAGEN-REVIEW.md. Laufzeit mischt die Antwortreihenfolge zusätzlich.
const cases=[
  [
    "l1",
    "leihgeraet",
    "Beim Einpacken fällt dein Leih-Tablet herunter. Das Display ist gerissen, der Akku unauffällig. Was ist der sinnvollste nächste Schritt?",
    [
      "Gerät sichern und Schaden samt Hergang der Ausgabestelle melden.",
      "Das Gerät weiter nutzen und den Schaden erst bei der Rückgabe melden.",
      "Eine Reparatur beauftragen und die Rechnung der Ausgabestelle geben.",
      "Vor der Schadensmeldung die Antwort der eigenen Versicherung abwarten.",
      "Das Tablet ohne Rücksprache zurücksetzen und mit einer Notiz abgeben."
    ],
    [
      "Die Meldung ermöglicht sichere Nutzung und eine sachliche Klärung.",
      "Abwarten verzögert Hilfe und kann Folgeschäden begünstigen.",
      "Reparaturen müssen mit dem Eigentümer abgestimmt werden.",
      "Versicherungsfragen dürfen die Schadensmeldung nicht verzögern.",
      "Ein Zurücksetzen ist ohne Abstimmung unnötig und kann wichtige Daten löschen."
    ]
  ],
  [
    "l2",
    "leihgeraet",
    "Nach einem Sturz soll geklärt werden, wer die Reparatur des Leihgeräts bezahlt. Bisher ist nur der Schaden bekannt. Welche Aussage ist zutreffend?",
    [
      "Für die Zahlungspflicht Hergang, Pflichten, Vertrag und Versicherung getrennt prüfen.",
      "Die Schulungsunterschrift als Zusage zur Kostenübernahme behandeln.",
      "Die letzte nutzende Person unabhängig vom Hergang zur Zahlung auffordern.",
      "Die Rechnung bei Minderjährigen ohne weitere Prüfung an die Eltern geben.",
      "Die Entscheidung der Versicherung mit der rechtlichen Haftung gleichsetzen."
    ],
    [
      "Ein Schaden allein beantwortet die Haftungsfrage nicht.",
      "Der Nachweis ist keine pauschale Haftungsübernahme.",
      "Die letzte Nutzung beweist keine schuldhafte Verursachung.",
      "Elternhaftung und Minderjährigenverantwortlichkeit sind gesondert zu prüfen.",
      "Versicherungsschutz und rechtliche Haftung sind unterschiedliche Fragen."
    ]
  ],
  [
    "l3",
    "leihgeraet",
    "Dein Freund möchte dein Schul-Tablet für ein Wochenende ausleihen. Der Leihvertrag erlaubt keine Weitergabe ohne Zustimmung. Wie gehst du vor?",
    [
      "Vor der Weitergabe die Zustimmung der zuständigen Ausgabestelle einholen.",
      "Vor der Übergabe eine schriftliche Schadenszusage des Freundes einholen.",
      "Den Freund das Gerät nach Abmeldung von deinem Schulaccount nutzen lassen.",
      "Die Weitergabe zusammen mit der späteren Rückgabe schriftlich melden.",
      "Das Gerät nur für die Nutzung zu Hause und ohne Zubehör weitergeben."
    ],
    [
      "Die Zustimmung muss vor der Weitergabe vorliegen.",
      "Eine Zusage des Freundes ersetzt die erforderliche Zustimmung nicht.",
      "Auch ohne Account bleibt es eine Weitergabe des Leihgeräts.",
      "Nachträgliche Dokumentation ersetzt keine vorherige Freigabe.",
      "Der Übergabeort ändert die Vertragsregel nicht."
    ]
  ],
  [
    "l4",
    "leihgeraet",
    "Bei der Rückgabe fallen leichte Gebrauchsspuren auf. Sie sind bei sorgfältiger, vertragsgemäßer Nutzung entstanden. Was ist rechtlich zu beachten?",
    [
      "Übliche Abnutzung und schuldhaft verursachten Schaden unterscheiden.",
      "Die Gebrauchsspuren wie einen durch Unachtsamkeit entstandenen Bruch behandeln.",
      "Die Schulungsbestätigung als Grundlage für den Ersatz der Gebrauchsspuren nutzen.",
      "Die Zahlungspflicht davon abhängig machen, ob die Herstellergarantie noch gilt.",
      "Aus den voraussichtlichen Reparaturkosten auf die persönliche Haftung schließen."
    ],
    [
      "§ 602 BGB betrifft Veränderungen durch vertragsgemäßen Gebrauch.",
      "Unterschiedliche Ursachen dürfen nicht gleichgesetzt werden.",
      "Die Schulung schafft keine zusätzliche pauschale Haftung.",
      "Garantie beantwortet nicht die Haftungsfrage.",
      "Auch bei geringen Kosten müssen die Anspruchsvoraussetzungen vorliegen."
    ]
  ],
  [
    "b1",
    "byod",
    "Die Lehrkraft erlaubt dein Smartphone nur für eine Unterrichtsrecherche. Es gibt keinen weiteren Arbeitsauftrag und keine Freigabe für Aufnahmen oder App-Käufe. Welche Nutzung hält sich an diese Freigabe?",
    [
      "Die freigegebene Recherche durchführen und private Benachrichtigungen stummschalten.",
      "Die Recherche bearbeiten und zwischendurch leise private Nachrichten beantworten.",
      "Die Recherche der Nachbargruppe als Video für die eigene Auswertung aufnehmen.",
      "Für die Recherche ohne Rücksprache eine kostenpflichtige Zusatz-App kaufen.",
      "Statt der Recherche eine selbst gewählte Aufgabe auf demselben Gerät bearbeiten."
    ],
    [
      "Die Freigabe gilt für den vereinbarten Unterrichtszweck.",
      "Eine Recherchefreigabe umfasst nicht zugleich private Kommunikation.",
      "Die Aufnahme anderer braucht eine gesonderte Klärung.",
      "Kosten und App-Nutzung sind vorher zu klären.",
      "Das eigene Gerät entbindet nicht vom Arbeitsauftrag."
    ]
  ],
  [
    "b2",
    "byod",
    "Für eine Klassenarbeit gilt die zuvor bekannt gegebene Regel: Smartwatches ausschalten und am vorgesehenen Ort ablegen. Eine Ausnahme ist für dich nicht vereinbart. Du möchtest nur die Uhrzeit sehen. Wie handelst du?",
    [
      "Die Uhr wie angekündigt ablegen und eine erlaubte Uhrzeitanzeige erfragen.",
      "Die Uhr im Flugmodus tragen und nur zum Ablesen der Uhrzeit verwenden.",
      "Die Nachrichtenfunktion abschalten und die Uhr während der Arbeit tragen.",
      "Die Uhr unter dem Ärmel tragen und während der Arbeit nicht antippen.",
      "Die Uhr einer Mitschülerin geben, die sie für dich auf ihren Tisch legt."
    ],
    [
      "Die konkrete Aufbewahrungsregel gilt auch bei einer harmlosen Nutzungsabsicht.",
      "Flugmodus ersetzt das angekündigte Ablegen nicht.",
      "Deaktivierte Nachrichten erfüllen die Aufbewahrungsregel nicht.",
      "Verdecktes Tragen ist keine regelkonforme Alternative.",
      "Auch die Weitergabe an eine andere Person ersetzt den vorgesehenen Ort nicht."
    ]
  ],
  [
    "b3",
    "byod",
    "Nach wiederholter Störung wird dein Smartphone vorübergehend sicher verwahrt. Eine Lehrkraft möchte nun deine privaten Chats ansehen. Was folgt allein aus der Wegnahme?",
    [
      "Die Wegnahme allein begründet noch keine Befugnis zum Lesen der privaten Chats.",
      "Die Wegnahme erlaubt das Lesen der während der Stunde empfangenen Chats.",
      "Die Wegnahme erlaubt das Lesen der Chats, wenn eine zweite Person zusieht.",
      "Die Wegnahme verpflichtet zur Herausgabe der PIN für die sichere Verwahrung.",
      "Die Wegnahme erlaubt das Lesen, sofern die Lehrkraft keine Nachrichten kopiert."
    ],
    [
      "Verwahrung und Zugriff auf private Daten sind getrennte Eingriffe.",
      "Der Empfangszeitpunkt schafft keine Zugriffsgrundlage.",
      "Eine anwesende Person ersetzt keine Rechtsgrundlage.",
      "Sichere Verwahrung benötigt nicht automatisch die PIN.",
      "Auch bloßes Lesen greift in private Inhalte ein."
    ]
  ],
  [
    "b4",
    "byod",
    "Für eine Aufgabe soll eine App genutzt werden. Dein Privatgerät unterstützt sie nicht; ein Kauf ist nicht vereinbart. Was klärst du zuerst?",
    [
      "Mit der Lehrkraft eine geeignete Alternative für die Lernaufgabe klären.",
      "Für die App den Account eines Mitschülers bis zum Ende der Stunde übernehmen.",
      "Ohne Rücksprache eine ähnliche kostenpflichtige App auf dem Privatgerät kaufen.",
      "Die Aufgabe ohne Rückmeldung auslassen und auf eine spätere Gelegenheit warten.",
      "Die App über eine ungeprüfte Downloadquelle auf dem eigenen Gerät installieren."
    ],
    [
      "Die Teilnahme am Lernen soll mit einer passenden Lösung ermöglicht werden.",
      "Fremde Zugänge schaffen Datenschutz- und Sicherheitsprobleme.",
      "Ein nicht vereinbarter Kauf ist nicht der erste Schritt.",
      "Die Alternative muss gemeinsam geklärt werden.",
      "Ungeprüfte Quellen sind keine angemessene Lösung."
    ]
  ],
  [
    "d1",
    "datenschutz",
    "Du meldest dich auf einem gemeinsam genutzten Schul-Tablet an. Dein Schulaccount bietet einen zweiten Faktor an. Welche Kombination schützt sowohl deine Anmeldung als auch die Zeit nach deiner Nutzung?",
    [
      "Ein eigenes langes Passwort und den zweiten Faktor nutzen; nach der Arbeit abmelden.",
      "Ein langes Passwort verwenden und es für Vertretungen mit einem Freund teilen.",
      "Den zweiten Faktor aktivieren und den Account für die nächste Person offen lassen.",
      "Das private Hauptpasswort auch in der Schule nutzen, um es leichter zu behalten.",
      "Die Zugangsdaten für die nächste Person auf dem gemeinsam genutzten Tablet speichern."
    ],
    [
      "Die Maßnahmen schützen sowohl Anmeldung als auch Sitzungsende.",
      "Auch ein langes geteiltes Passwort ist nicht mehr geheim.",
      "Der zweite Faktor schützt eine bereits offene Sitzung nicht.",
      "Wiederverwendung verbindet die Risiken verschiedener Dienste.",
      "Andere Personen sollen deinen Zugang nicht verwenden können."
    ]
  ],
  [
    "d2",
    "datenschutz",
    "Du möchtest eine Klassenliste zur Gruppeneinteilung in ein privates KI-Tool hochladen. Eine schulische Freigabe ist nicht bekannt. Was tust du?",
    [
      "Vor dem Hochladen mit der Lehrkraft das Verfahren und die erforderlichen Daten klären.",
      "Die Liste nach Entfernen der Nachnamen mit Vornamen und Leistungsangaben hochladen.",
      "Die Liste zuerst hochladen und erst die vom Tool erstellte Gruppeneinteilung anonymisieren.",
      "Das Tool in einem privaten Browserfenster öffnen und die unveränderte Liste hochladen.",
      "Die Klasse im Chat über das Hochladen informieren und ohne weitere Klärung beginnen."
    ],
    [
      "Zweck, Berechtigung und Werkzeug müssen vor der Übermittlung geklärt sein.",
      "Vornamen und Kontext können Personen weiter erkennbar machen.",
      "Nachträgliche Anonymisierung macht die vorherige Übermittlung nicht rückgängig.",
      "Ein privates Fenster schützt nicht vor der Datenübertragung an den Anbieter.",
      "Eine Information allein ersetzt keine erforderliche Rechtsgrundlage oder Freigabe."
    ]
  ],
  [
    "d3",
    "datenschutz",
    "Du hast versehentlich eine Datei mit Namen und Noten an die falsche Gruppe geschickt. Welche Reaktion hilft unmittelbar?",
    [
      "Weitere Verbreitung begrenzen und den Vorfall der zuständigen schulischen Stelle melden.",
      "Die Empfänger um Löschung bitten und auf eine Meldung an die Schule verzichten.",
      "Die Datei vorerst belassen und nur auf eine Beschwerde der Betroffenen reagieren.",
      "Einen Screenshot mit den Noten zur Warnung an die eigentlich vorgesehene Gruppe schicken.",
      "Die eigene Kopie löschen und damit den Versand an die falsche Gruppe als erledigt ansehen."
    ],
    [
      "Die Schule kann Schutzmaßnahmen prüfen, wenn sie rechtzeitig informiert ist.",
      "Eine Löschbitte kann helfen, ersetzt aber die Meldung nicht.",
      "Abwarten kann die Begrenzung des Vorfalls erschweren.",
      "Die Warnung würde die Daten erneut verbreiten.",
      "Die Empfängerkopien verschwinden dadurch nicht."
    ]
  ],
  [
    "d4",
    "datenschutz",
    "Auf einem ausgeliehenen Tablet ist noch das Schulpostfach einer anderen Person geöffnet. Wie gehst du damit um?",
    [
      "Keine Nachrichten lesen; das Gerät sichern und die Lehrkraft um Abmeldung bitten.",
      "Eine Nachricht öffnen und so herausfinden, wem das geöffnete Postfach gehört.",
      "Aus dem fremden Postfach eine kurze Nachricht an die vermeintlich richtige Person senden.",
      "Die offene Sitzung bis zum Ende der eigenen Unterrichtsaufgabe vorübergehend nutzen.",
      "Ein Bildschirmfoto des offenen Postfachs zur Suche nach der Person im Klassenchat teilen."
    ],
    [
      "Ein offenes Postfach ist keine Erlaubnis zur Nutzung.",
      "Auch die Suche nach dem Besitzer rechtfertigt hier kein Lesen.",
      "Versenden unter fremdem Namen ist kein geeigneter Hinweisweg.",
      "Eigene Aufgaben gehören nicht in einen fremden Account.",
      "Ein Screenshot kann zusätzliche personenbezogene Daten verbreiten."
    ]
  ],
  [
    "a1",
    "aufnahmen",
    "Sam hat ausschließlich einem Foto für eine Präsentation in der eigenen Lerngruppe zugestimmt. Du möchtest dieses Foto auf dem öffentlich zugänglichen Schulblog zeigen. Was musst du vor dieser neuen Nutzung klären?",
    [
      "Vor der Blog-Nutzung die Rechtsgrundlage und erforderliche Einwilligungen klären.",
      "Das Foto ohne Sams Namen posten und damit den Empfängerkreis öffentlich erweitern.",
      "Die Zustimmung zur Lerngruppe ohne erneute Klärung auf den öffentlichen Blog übertragen.",
      "Nur die Lehrkraft fragen und Sams Rechte bei der öffentlichen Nutzung nicht erneut prüfen.",
      "Das Bild zuerst öffentlich posten und erst bei einer Beschwerde über seine Entfernung sprechen."
    ],
    [
      "Der öffentliche Blog ist ein anderer Zweck und Empfängerkreis.",
      "Eine erkennbare Person bleibt auch ohne Namensangabe geschützt.",
      "Die beschriebene Zustimmung umfasst den neuen Zweck nicht.",
      "Eine Lehrkraft kann die Rechte Betroffener nicht ersetzen.",
      "Die Klärung muss vor der Veröffentlichung stattfinden."
    ]
  ],
  [
    "a2",
    "aufnahmen",
    "Du möchtest das nichtöffentliche Gespräch einer geschlossenen Unterrichtsgruppe heimlich mit Ton aufnehmen. Es gibt weder eine Einwilligung noch eine andere Aufnahmebefugnis. Welche Aussage trifft zu?",
    [
      "Schon die unbefugte Tonaufnahme kann strafbar sein, auch ohne Weitergabe oder Upload.",
      "Erst ein öffentlicher Upload macht die heimliche Aufnahme rechtlich relevant.",
      "Die eigene Gesprächsteilnahme erlaubt eine heimliche Aufnahme ohne weitere Befugnis.",
      "Eine private Lernabsicht erlaubt hier die heimliche Aufnahme auch ohne Einwilligung.",
      "Das Versprechen späterer Löschung macht die heimliche Aufnahme von Anfang an zulässig."
    ],
    [
      "§ 201 StGB schützt die Vertraulichkeit bereits bei der Aufnahme.",
      "Eine Veröffentlichung ist dafür nicht erforderlich.",
      "Gesprächsteilnahme bedeutet keine Aufnahmebefugnis.",
      "Der Lernzweck schafft hier keine Befugnis.",
      "Spätere Löschung beseitigt den ursprünglichen Eingriff nicht."
    ]
  ],
  [
    "a3",
    "aufnahmen",
    "Ein Clip zeigt Alex erkennbar bei einem missglückten Referat. Alex hat weder Aufnahme noch Weitergabe erlaubt. Du erhältst den Clip privat und sollst ihn in den Klassenchat schicken. Was ist der beste nächste Schritt?",
    [
      "Nicht weiterleiten; Alex unterstützen und Hilfe zur Begrenzung der Verbreitung holen.",
      "Den Clip ohne Alex’ Namen in den geschlossenen Klassenchat weiterleiten.",
      "Den Ton entfernen und den weiterhin erkennbaren Clip an die Klasse schicken.",
      "Die aufnehmende Person um Erlaubnis bitten und den Clip mit deren Zustimmung teilen.",
      "Den Clip zusammen mit einem Aufruf zu respektvollem Umgang in den Klassenchat stellen."
    ],
    [
      "So wird keine zusätzliche Reichweite geschaffen; Aufnahme und Weitergabe sind getrennt zu beurteilen.",
      "Alex bleibt erkennbar; der geschlossene Chat ist keine pauschale Erlaubnis.",
      "Auch ein stummes Video kann Persönlichkeitsrechte verletzen.",
      "Die aufnehmende Person kann Alex keine Rechte abnehmen.",
      "Ein Begleittext rechtfertigt die zusätzliche Verbreitung nicht."
    ]
  ],
  [
    "a4",
    "aufnahmen",
    "Ein Schüler fotografiert ohne Absprache eine Mitschülerin im normalen Klassenraum. Weitere Umstände sind nicht bekannt. Welche Bewertung ist sachgerecht?",
    [
      "Persönlichkeitsrechte und Schulregeln prüfen; Strafbarkeit gesondert klären.",
      "Die fehlende Absprache als ausreichenden Nachweis einer Straftat nach § 201a StGB werten.",
      "Aus dem normalen Klassenraum auf eine allgemeine Erlaubnis für diese Aufnahme schließen.",
      "Eine mögliche Verletzung von Persönlichkeitsrechten erst bei einer Veröffentlichung prüfen.",
      "Die rechtliche Bewertung ausschließlich davon abhängig machen, ob das Foto gelöscht wird."
    ],
    [
      "Nicht jedes unerlaubte Foto erfüllt einen Straftatbestand; andere Rechte gelten dennoch.",
      "§ 201a StGB hat zusätzliche konkrete Voraussetzungen.",
      "Der Aufnahmeort erteilt keine allgemeine Aufnahmeerlaubnis.",
      "Schon die Aufnahme kann Rechte berühren.",
      "Löschung kann helfen, ersetzt aber die Prüfung des Vorgangs nicht."
    ]
  ],
  [
    "f2",
    "folgen",
    "In einer schulbezogenen Chatgruppe wird eine Person wiederholt beleidigt und mit bloßstellenden Bildern angegriffen. Wie ist der Begriff Cybermobbing hier einzuordnen?",
    [
      "Die einzelnen Handlungen und möglichen Verletzungen von Rechten jeweils konkret prüfen.",
      "Aus dem Begriff Cybermobbing bereits eine bestimmte strafrechtliche Sanktion ableiten.",
      "Mit der rechtlichen Prüfung warten, bis die Beiträge öffentlich im Internet sichtbar sind.",
      "Die Vorgänge wegen der schulbezogenen Gruppe ausschließlich als schulische Frage behandeln.",
      "Nur das Erstellen der Beiträge betrachten und deren Weiterverbreitung außer Acht lassen."
    ],
    [
      "Beleidigung, Bildrechte und weitere Handlungen werden jeweils konkret geprüft.",
      "Cybermobbing ist kein einheitlicher Straf- oder Sanktionsautomatismus.",
      "Auch ein begrenzter Empfängerkreis kann rechtlich relevant sein.",
      "Schulischer Bezug schließt andere Rechtsbereiche nicht aus.",
      "Weiterverbreitung kann eine eigene Rechtsverletzung darstellen."
    ]
  ],
  [
    "f3",
    "folgen",
    "Du erhältst ungewollt eine intime Darstellung, die möglicherweise eine minderjährige Person zeigt. Du möchtest Hilfe, ohne die Verbreitung zu vergrößern. Was ist der geeignete nächste Schritt?",
    [
      "Nicht weiterleiten oder zusätzlich kopieren; den Umgang mit der Datei fachkundig klären.",
      "Die Darstellung an mehrere erwachsene Bezugspersonen zur gemeinsamen Einordnung schicken.",
      "Die Darstellung zur Beweissicherung auf mehreren eigenen Geräten zusätzlich speichern.",
      "Im Klassenchat nach Alter und Zustimmung der möglicherweise abgebildeten Person fragen.",
      "Das Gesicht verpixeln und die Darstellung dann zur Prüfung an eine befreundete Gruppe senden."
    ],
    [
      "Ungewollter Empfang bedeutet nicht automatisch eigene Strafbarkeit; Unterstützung geht ohne zusätzliche Verbreitung.",
      "Auch eine Hilfsabsicht rechtfertigt nicht pauschal das Versenden solcher Inhalte.",
      "Zusätzliche Kopien können die Situation verschärfen.",
      "Eine öffentliche Nachfrage kann die betroffene Person zusätzlich bloßstellen.",
      "Verpixelung macht eine Weitergabe nicht ohne Weiteres zulässig."
    ]
  ],
  [
    "f4",
    "folgen",
    "Nach einem Tablet-Schaden fordert der Verleiher Ersatz der Reparaturkosten. Welche rechtliche Frage betrifft diese Forderung zunächst?",
    [
      "Es geht zunächst darum, ob ein zivilrechtlicher Ersatzanspruch und dessen Voraussetzungen vorliegen.",
      "Es geht zunächst um die Höhe einer vom Verleiher festzusetzenden strafrechtlichen Geldstrafe.",
      "Es geht zunächst um eine schulische Ordnungsmaßnahme zur verbindlichen Festlegung der Kosten.",
      "Es geht zunächst darum, ob die Reparaturrechnung ein persönliches Schuldanerkenntnis ersetzt.",
      "Es geht zunächst darum, die Schulungsunterschrift ohne weitere Prüfung als Zahlungspflicht zu werten."
    ],
    [
      "Schadensersatz ist zivilrechtlich einzuordnen und im Einzelfall zu prüfen.",
      "Der Verleiher verhängt keine strafrechtliche Geldstrafe.",
      "Schulische Maßnahmen entscheiden nicht automatisch über Ersatzansprüche.",
      "Eine Rechnung allein beweist kein Schuldanerkenntnis.",
      "Die Schulung bestätigt keine konkrete Forderung."
    ]
  ],
  [
    "u1",
    "fairness",
    "Du findest ein Foto im Internet und möchtest es auf einer öffentlichen Projektseite verwenden. Eine Nutzungslizenz ist nicht angegeben. Wie gehst du vor?",
    [
      "Die Nutzungsrechte klären oder ein eigenes bzw. für diesen Zweck passend lizenziertes Bild wählen.",
      "Das Bild mit einem gut sichtbaren Quellenlink ohne weitere Klärung öffentlich nutzen.",
      "Das Bild in kleinerer Auflösung ohne zusätzliche Prüfung auf der Projektseite veröffentlichen.",
      "Das Bild mit einem Filter verändern und anschließend ohne Rechteklärung als eigene Fassung nutzen.",
      "Das Bild auf einer werbefreien Projektseite veröffentlichen und deshalb auf Rechteklärung verzichten."
    ],
    [
      "Eine passende Erlaubnis oder einschlägige gesetzliche Grundlage ist erforderlich.",
      "Ein Quellenlink ersetzt keine erforderlichen Nutzungsrechte.",
      "Verkleinerung beseitigt den Schutz nicht.",
      "Eine Bearbeitung schafft nicht automatisch das Recht zur Veröffentlichung.",
      "Auch nichtkommerzielle Nutzung benötigt eine passende Grundlage."
    ]
  ],
  [
    "u2",
    "fairness",
    "Eine Mitschülerin hat ihr Schulbuch vergessen. Du hast eine vollständige digitale Kopie. Eine Berechtigung zur Weitergabe des gesamten Buches liegt nicht vor. Wie findest du einen geeigneten Zugang für den Unterricht?",
    [
      "Mit der Lehrkraft einen zulässigen Auszug oder berechtigten Zugang klären.",
      "Das vollständige Buch für eine einzelne Stunde im geschlossenen Klassenchat bereitstellen.",
      "Die vollständige Kopie zusammen mit Verlag und Quellenangabe an die Mitschülerin senden.",
      "Die vollständige Kopie ohne Rechteklärung mit einem Passwort für die Mitschülerin schützen.",
      "Die vollständige Kopie senden und mit einer Bitte um Löschung nach der Stunde verbinden."
    ],
    [
      "Unterrichtszweck allein erlaubt keine beliebige vollständige Weitergabe eines Schulbuchs.",
      "Die kurze Verfügbarkeit löst das Rechteproblem nicht.",
      "Die Quellenangabe ersetzt keine Lizenz.",
      "Zugangsschutz ersetzt keine Nutzungsberechtigung.",
      "Eine Löschbitte erlaubt die vorherige Weitergabe nicht."
    ]
  ],
  [
    "u3",
    "fairness",
    "Ein Mitschüler wird in einem Chat mit einem bearbeiteten Bild verspottet. Du möchtest ihn unterstützen. Welche Reaktion hilft am besten?",
    [
      "Das Bild nicht teilen; Unterstützung anbieten und eine Vertrauensperson hinzuziehen.",
      "Das Bild in einer weiteren Gruppe zeigen und dort Unterstützung für den Mitschüler sammeln.",
      "Unter dem Bild ausführlich diskutieren und die dadurch entstehende Sichtbarkeit in Kauf nehmen.",
      "Das Bild auf dem eigenen Profil veröffentlichen und mit einer Solidaritätsbotschaft versehen.",
      "Den Mitschüler im Gruppenchat zu einer ausführlichen öffentlichen Erklärung seiner Sicht auffordern."
    ],
    [
      "Unterstützung braucht keine zusätzliche Verbreitung des Bildes.",
      "Eine andere Gruppe erhöht ebenfalls die Reichweite.",
      "Öffentliche Diskussion kann die Bloßstellung verstärken.",
      "Auch solidarisch gemeintes Wiederveröffentlichen kann verletzen.",
      "Die betroffene Person soll nicht zu einer öffentlichen Rechtfertigung gedrängt werden."
    ]
  ],
  [
    "u4",
    "fairness",
    "Ein fremdes Foto steht unter CC BY-ND 4.0. Du willst daraus eine kreative Collage mit neuen Bildelementen gestalten und diese öffentlich teilen. Eine zusätzliche Erlaubnis oder gesetzliche Ausnahme liegt nicht vor. Wie gehst du vor?",
    [
      "Eine zusätzliche Erlaubnis einholen oder ein passend lizenziertes Bild für die Collage wählen.",
      "Die Collage mit Namensnennung veröffentlichen und BY als ausreichende Erlaubnis ansehen.",
      "Die Collage ohne kommerzielle Absicht veröffentlichen und deshalb ND nicht berücksichtigen.",
      "Die Collage als öffentliches Schulprojekt teilen und auf eine zusätzliche Rechteklärung verzichten.",
      "Die Collage als eigene Bearbeitung kennzeichnen und daraus die Erlaubnis zum Teilen ableiten."
    ],
    [
      "Die kreative Collage ist hier eine Bearbeitung. CC BY-ND 4.0 erlaubt deren Teilen nicht; zusätzliche Rechte können die Nutzung ermöglichen. Eine reine Formatumwandlung wäre anders zu beurteilen.",
      "Namensnennung hebt die ND-Bedingung nicht auf.",
      "Nichtkommerzialität hebt die Bearbeitungsbedingung nicht auf.",
      "Ein öffentliches Schulprojekt ist keine pauschale Lizenzausnahme.",
      "Die Kennzeichnung als eigene Version ersetzt keine Erlaubnis."
    ]
  ],
  [
    "l5",
    "leihgeraet",
    "Dein Leih-Tablet wird auffällig heiß und der Akku wölbt sich. Du kannst es ohne Berührung der beschädigten Stelle sicher ablegen. Was hat jetzt Vorrang?",
    [
      "Die Nutzung beenden, Abstand halten und sofort die zuständige schulische Stelle informieren.",
      "Das Tablet zum Testen ans Ladegerät anschließen und die Temperatur beobachten.",
      "Das Tablet in die Schutzhülle packen und bis zur nächsten Stunde eingeschaltet lassen.",
      "Den Akku zur Entlastung selbst öffnen und anschließend die Ausgabestelle informieren.",
      "Das Tablet zurücksetzen und erst danach über eine weitere Nutzung entscheiden."
    ],
    [
      "Ein gewölbter Akku kann gefährlich sein. Nicht laden, öffnen oder weiter nutzen; hole Unterstützung.",
      "Laden kann das Risiko erhöhen. Eine eigene Funktionsprüfung ist hier nicht sinnvoll.",
      "Eine Hülle beseitigt die Gefahr nicht und kann Wärme stauen.",
      "Den Akku nicht selbst öffnen oder reparieren.",
      "Zurücksetzen behebt keinen beschädigten Akku und verzögert die sichere Reaktion."
    ]
  ],
  [
    "b5",
    "byod",
    "Die Lehrkraft beendet eine erlaubte Recherche und bittet alle, die Geräte wegzulegen. Du brauchst für deine Unterrichtsaufgabe noch einen Moment. Was passt zur Situation?",
    [
      "Mit der Lehrkraft kurz klären, ob du die Recherche noch beenden darfst; bis dahin das Gerät weglegen.",
      "Die Recherche still fortsetzen, weil der ursprüngliche Auftrag noch nicht fertig ist.",
      "Das Gerät unter den Tisch legen und die Recherche dort unauffällig fortführen.",
      "Auf ein zweites Privatgerät wechseln und den ursprünglichen Auftrag damit beenden.",
      "Das Gerät offen liegen lassen und nur die Bildschirmhelligkeit deutlich reduzieren."
    ],
    [
      "So lässt sich eine passende Lösung klären, ohne die neue Anweisung zu übergehen.",
      "Die ursprüngliche Freigabe gilt nicht automatisch trotz der neuen Anweisung weiter.",
      "Verdeckte Nutzung löst die Abstimmungsfrage nicht.",
      "Die Anweisung zum Weglegen betrifft nicht nur ein bestimmtes Gerät.",
      "Ein dunklerer Bildschirm ersetzt das Weglegen nicht."
    ]
  ],
  [
    "d5",
    "datenschutz",
    "Eine Nachricht fordert dich über einen unbekannten Link zur Eingabe deines Schulpassworts auf. Die Absenderadresse wirkt ungewöhnlich. Du hast den Link noch nicht geöffnet. Was tust du zuerst?",
    [
      "Den Link nicht nutzen und die Anfrage über den bekannten Schulkontakt prüfen.",
      "Den Link öffnen und vor der Passworteingabe nur auf das Aussehen der Seite achten.",
      "Das Passwort vorsichtshalber an die Absenderadresse schicken und um Bestätigung bitten.",
      "Den Link im Klassenchat teilen und die anderen um eine Anmeldung zum Testen bitten.",
      "Den Link im privaten Browserfenster öffnen und dort die Schulzugangsdaten eingeben."
    ],
    [
      "Ein bekannter, unabhängig erreichbarer Kontakt hilft, die Anfrage ohne Preisgabe der Daten zu prüfen.",
      "Eine täuschend ähnliche Seite kann Zugangsdaten abgreifen.",
      "Das Passwort gehört weder in eine Antwortmail noch an einen ungeprüften Absender.",
      "Weitere Personen sollen nicht zum Eingeben ihrer Zugangsdaten aufgefordert werden.",
      "Ein privates Browserfenster schützt nicht vor einer gefälschten Anmeldeseite."
    ]
  ],
  [
    "a5",
    "aufnahmen",
    "Für einen Unterrichtsclip sollen Mitschüler erkennbar aufgenommen werden. Die Lehrkraft bittet dich zunächst nur, eine Aufnahmeidee zu planen; eine Aufnahmefreigabe fehlt. Was ist jetzt sinnvoll?",
    [
      "Die Idee planen und vor einer Aufnahme Zweck, Beteiligte und erforderliche Erlaubnis klären.",
      "Einen Probeclip mit erkennbaren Mitschülern aufnehmen und ihn nur der Lehrkraft zeigen.",
      "Zunächst heimlich filmen und vor einem späteren Upload nach Zustimmung fragen.",
      "Den Clip ohne Ton aufnehmen und deshalb auf die Klärung der Bildrechte verzichten.",
      "Die Aufnahme im Klassenchat ankündigen und das Ausbleiben von Antworten als Zustimmung werten."
    ],
    [
      "Planung ist möglich; die konkrete Aufnahme und eine spätere Nutzung sind vorher gesondert zu klären.",
      "Auch ein Probeclip ist eine Aufnahme erkennbarer Personen.",
      "Eine spätere Frage rechtfertigt keine heimliche Aufnahme im Voraus.",
      "Auch ein stummes Video kann Persönlichkeitsrechte und Datenschutz berühren.",
      "Schweigen ist hier keine ausdrückliche Einwilligung."
    ]
  ],
  [
    "f5",
    "folgen",
    "Nach einer Störung durch ein Smartphone soll eine schulische Maßnahme gewählt werden. Es steht noch nicht fest, was genau passiert ist. Welche Vorgehensweise ist sachgerecht?",
    [
      "Sachverhalt und Einzelfall klären; eine verhältnismäßige Maßnahme prüfen.",
      "Aus der Teilnahme an der Schulung ohne weitere Klärung auf vorsätzliches Handeln schließen.",
      "Für jedes Smartphone-Verhalten ohne Unterscheidung dieselbe Ordnungsmaßnahme festlegen.",
      "Eine schulische Maßnahme allein nach dem Kaufpreis des verwendeten Smartphones bemessen.",
      "Eine mögliche Ordnungsmaßnahme unmittelbar mit einer strafrechtlichen Verurteilung gleichsetzen."
    ],
    [
      "§ 53 SchulG NRW sieht erzieherische Einwirkungen und Ordnungsmaßnahmen unter Beachtung der Verhältnismäßigkeit vor.",
      "Eine absolvierte Schulung beweist nicht die Umstände oder Absicht eines einzelnen Vorfalls.",
      "Art und Umstände des Verhaltens müssen berücksichtigt werden.",
      "Der Gerätepreis entscheidet nicht über die angemessene schulische Reaktion.",
      "Schulische Maßnahmen und Strafverfahren haben unterschiedliche Grundlagen und Zuständigkeiten."
    ]
  ],
  [
    "f6",
    "folgen",
    "Ein Freund sagt nach einem versehentlichen Tablet-Schaden: „Wenn du den Vorfall meldest, erkennst du damit jede Rechnung an.“ Du möchtest den Hergang sachlich melden. Welche Einordnung trifft zu?",
    [
      "Eine sachliche Schadensmeldung ist für sich genommen keine pauschale Haftungszusage.",
      "Die Schadensmeldung legt unabhängig vom Hergang fest, wer jede Reparatur bezahlen muss.",
      "Die Schadensmeldung ersetzt die Prüfung eines möglichen Anspruchs gegen die Eltern.",
      "Die Schadensmeldung verpflichtet zur Zahlung, sobald die Ausgabestelle eine Rechnung erhält.",
      "Die Schadensmeldung entscheidet ohne weitere Prüfung über den privaten Versicherungsschutz."
    ],
    [
      "Melde die bekannten Tatsachen. Ob ein Ersatzanspruch besteht, wird getrennt und anhand des Einzelfalls geprüft.",
      "Die Meldung allein beantwortet die rechtliche Haftungsfrage nicht.",
      "Ein Anspruch gegen Eltern setzt eine eigene rechtliche Grundlage voraus.",
      "Eine Rechnung und eine sachliche Meldung begründen allein keine pauschale Zahlungspflicht.",
      "Über Versicherungsschutz entscheidet nicht schon die Tatsache einer Meldung an die Schule."
    ]
  ],
  [
    "u5",
    "fairness",
    "Du hast ein geeignetes Bild für die öffentliche Projektseite unter CC BY 4.0 gefunden. Abgebildete Personen und sonstige Rechte sind bereits geklärt. Was gehört bei der Nutzung nach dieser Lizenz dazu?",
    [
      "Mit dem Bild angemessene Urheber- und Lizenzhinweise sowie nötige Änderungsangaben angeben.",
      "Nur die Suchmaschine nennen, über die du das Bild ursprünglich gefunden hast.",
      "Das Bild als eigene Aufnahme kennzeichnen, weil du es selbst heruntergeladen hast.",
      "Die Lizenzangabe durch den Hinweis „für schulische Zwecke“ auf der Projektseite ersetzen.",
      "Auf Urheber- und Lizenzhinweise verzichten, solange die Seite keine Werbung enthält."
    ],
    [
      "CC BY 4.0 verlangt unter anderem eine angemessene Namensnennung und einen Lizenzhinweis bzw. -link; Änderungen müssen kenntlich sein.",
      "Die Suchmaschine ist nicht die Urheber- oder Lizenzangabe des Bildes.",
      "Herunterladen macht dich nicht zur Urheberin oder zum Urheber.",
      "Ein Schulzweck ersetzt die Lizenzbedingungen nicht.",
      "Auch werbefreie Nutzung muss die Lizenzbedingungen einhalten."
    ]
  ]
];
export const examQuestions=cases.map(([id,module,text,options,feedback],index)=>{const offset=index%5;const order=options.map((_,i)=>(i+offset)%5);return {id,module,text,options:order.map(i=>options[i]),answer:order.indexOf(0),feedback:order.map(i=>feedback[i]),explain:feedback[0]};});

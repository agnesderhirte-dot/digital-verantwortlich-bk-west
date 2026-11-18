-- Nur Summen und zufällige Abgabe-IDs; keine Namen, Klassen oder Einzelantworten.
DO $schema$
BEGIN
 CREATE TABLE IF NOT EXISTS course_counter_totals (
  namespace text PRIMARY KEY CHECK(namespace IN ('production','preview')),
  attempts bigint NOT NULL DEFAULT 0 CHECK(attempts >= 0),
  passed bigint NOT NULL DEFAULT 0 CHECK(passed >= 0 AND passed <= attempts)
 );
 CREATE TABLE IF NOT EXISTS course_counter_receipts (
  namespace text NOT NULL CHECK(namespace IN ('production','preview')),
  attempt_id uuid NOT NULL,
  PRIMARY KEY(namespace, attempt_id)
 );
 CREATE TABLE IF NOT EXISTS course_counter_limits (
  namespace text PRIMARY KEY CHECK(namespace IN ('production','preview')),
  minute bigint NOT NULL,
  requests integer NOT NULL CHECK(requests > 0)
 );
 INSERT INTO course_counter_totals(namespace) VALUES ('production'),('preview') ON CONFLICT DO NOTHING;
END
$schema$;

INSERT INTO users (name, password_hash)
VALUES ('Alice', 'dummy_hash');

INSERT INTO memos (user_id, content, due_at)
VALUES (1, 'Finish assignment', '2026-08-15 23:59:00');
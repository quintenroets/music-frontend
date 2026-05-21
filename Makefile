install:
	bun install

serve:
	bun run dev

preview:
	bun run preview

lint:
	bun run lint

format:
	@bun run check-format || { code=$$?; bun run format; exit $$code; }

test:
	npx playwright install --with-deps
	bun run test

validate:
	make install
	make format
	make lint
	make build
	make test

build:
	bun run build

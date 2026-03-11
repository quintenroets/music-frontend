install:
	bun install

serve:
	bun run dev

preview:
	bun run preview

lint:
	bun run lint

format:
	bun run format

validate:
	bun install
	@bun run check-format || { code=$$?; bun run format; exit $$code; }
	bun run lint
	make build

build:
	bun run build

build:
	rm -rf dist && npm run build && chmod +x dist/index.js && npm link
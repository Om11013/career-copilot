lint:
	black --check .
	isort --check-only .
	flake8 .
	mypy . --ignore-missing-imports

lint-fix:
	black .
	isort .
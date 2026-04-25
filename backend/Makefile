lint:
	black --check .
	isort --check-only .
	flake8 api core services
	mypy api core services

lint-fix:
	black .
	isort .
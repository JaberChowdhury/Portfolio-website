# Testing GitHub Actions locally with `act`

This document explains how to install `act` and run your repository's GitHub Actions workflows locally.

Prerequisites

- Docker installed and running. On Linux, you might need to add your user to the `docker` group or use `sudo`.

Install `act`

- Option A (recommended/manual): Download the latest Linux binary from the releases page and install:

```bash
# replace VERSION and arch as appropriate; example for x86_64
curl -LO "https://github.com/nektos/act/releases/download/v0.2.48/act_linux_amd64.tar.gz"
sudo tar -C /usr/local/bin -xzf act_linux_amd64.tar.gz act
rm act_linux_amd64.tar.gz
act --version
```

- Option B (if you have Homebrew on Linux):

```bash
brew install act
```

Quick checks

```bash
# verify Docker
docker version
# verify act
act -l   # list supported events
```

Running workflows

- Run the default workflow(s):

```bash
# run the repository's default workflow(s)
act
```

- Run a specific job (replace `job_name` with the job id from your workflow):

```bash
act -j job_name
```

- Use a specific runner image mapping (useful if workflows expect `ubuntu-latest`):

```bash
act -P ubuntu-latest=nektos/act-environments-ubuntu:18.04
```

Using the provided npm convenience script

The repository includes an npm script `ci:local` that runs `act` with a recommended image mapping. From the repo root run:

```bash
npm run ci:local
```

Tips and troubleshooting

- If you see permission errors with Docker, run `sudo act ...` or add your user to the `docker` group and re-login.
- Some actions rely on runner images or services; use `-P` to map `ubuntu-latest` to a fuller image, or add `--container-architecture` if needed.
- To pass secrets or environment variables, use `-s NAME=value` or `--env-file .env`.

Examples

```bash
# run a single job with environment file and secrets from .env
act -j build --env-file .env
# run full workflow with a specific image mapping
act -P ubuntu-latest=nektos/act-environments-ubuntu:18.04
```

See `act` docs for more advanced usage: https://github.com/nektos/act

#!/bin/bash
REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"/store-api-server

# Note: this script expects
# - peppermint repo to be in repo-root/../peppermint

[ -z $DB_PORT ] && export DB_PORT=5432
[ -z $DB_PASSWORD ] && export DB_PASSWORD=dev_password
[ -z $DB_USERNAME ] && export DB_USERNAME=dev_user
[ -z $DB_DATABASE ] && export DB_DATABASE=dev_database
[ -z $DB_HOST ] && export DB_HOST=localhost

docker image pull ghcr.io/tzconnectberlin/que-pasa:1.0.7 >/dev/null || exit 1

BOOT_TIME=3
(
    sleep $BOOT_TIME;

    export PGUSER=$DB_USERNAME
    export PGPASSWORD=$DB_PASSWORD
    export PGHOST=$DB_HOST
    export PGPORT=$DB_PORT
    export PGDATABASE=$DB_DATABASE

    # to set up the database schema of onchain_kanvas:
    (
        source "$REPO_ROOT"/config/.env-kanvas
        export DATABASE_URL="host=$PGHOST dbname=$PGDATABASE user=$PGUSER password=$PGPASSWORD port=$PGPORT"
        docker run \
            --network host \
            -e NODE_URL=$NODE_URL \
            -e DATABASE_URL="$DATABASE_URL" \
            ghcr.io/tzconnectberlin/que-pasa:1.0.7 \
            --contracts onchain_kanvas=KT1D9iJmbwoDcJUTvRuktHXEMgEZscLMjtuR -l 0
    ) 2>&1 >/dev/null &

    psql < ../../peppermint/database/schema.sql

    ./script/shmig -t postgresql -d postgres://$DB_USERNAME:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_DATABASE up || exit 1

    psql < script/populate-testdb.sql
) >/dev/null &

[ -z $DOCKER_ARGS ] && export DOCKER_ARGS='-t'

docker run ${DOCKER_ARGS} \
    -p $DB_PORT:5432 \
    -e POSTGRES_PASSWORD=$DB_PASSWORD \
    -e POSTGRES_USER=$DB_USERNAME \
    -e POSTGRES_DB=$DB_DATABASE \
    postgres "$@"

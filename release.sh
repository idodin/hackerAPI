#!/usr/bin/env bash
set -e
# Variables
GCR=gcr.io
PROJECT=mchacks-api
IMAGE=hackboard
MODE=$1

BRANCH="$(git symbolic-ref HEAD 2>/dev/null)" || BRANCH="(unnamed branch)"     # detached HEAD
BRANCH=${BRANCH##refs/heads/}

echo "Welcome to HackMcGill's HackerAPI Deployment Script!"
echo "==================================================="

# Only allow release on master branch

if [ ! ${BRANCH} = "master" ]; then
    echo "Current branch: ${BRANCH}"
    echo "ERROR: Release operation is only available on master branch."
    echo "Deployment failed. Exiting."
    exit 1
fi
echo "Release modes:"
PS3='Please select one of the above release version modes:'
options=("Patch" "Minor" "Major" "Quit")
select opt in "${options[@]}"
do
    case ${opt} in
	"Patch")
	    MODE=patch
	    break
	    ;;
	"Minor")
	    MODE=minor
	    break
	    ;;
	"Major")
	    MODE=major
	    break
	    ;;
	"Quit")
	    echo "Deployment cancelled. Exiting."
	    exit 1
	    ;;
	*) echo "Invalid option";;
    esac
done

# Update current branch
git pull origin master

# bump version
docker run --rm -v "$PWD":/app treeder/bump ${MODE}
version=`cat VERSION`
echo "Version: ${version}"

echo "================"
echo "Build Docker img"
echo "================"
# Build Docker image
./build.sh

echo "=============="
echo "Tagging Github"
echo "=============="
# Tag Github
git add -A
git commit -m "version ${version}"
git tag -a "${version}" -m "version ${version}"
git push origin master
git push origin master --tags

echo "==============="
echo "Update img tags"
echo "==============="
# Update the image tags
docker tag ${GCR}/${PROJECT}/${IMAGE}:latest ${GCR}/${PROJECT}/${IMAGE}:${version}
echo "================"
echo "Push DCR to GCR"
echo "================"
# Push to Docker Container Registry on Google Cloud
docker push ${GCR}/${PROJECT}/${IMAGE}:latest
docker push ${GCR}/${PROJECT}/${IMAGE}:${version}

echo "==================="
echo "Update kube cluter"
echo "==================="
# Update deployment image on Kubernetes cluster
kubectl set image deployment/hackboard hackboard=${GCR}/${PROJECT}/${IMAGE}:${version}

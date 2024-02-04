default:
    @just --list

# format all the code in the repo
fmt:
    treefmt


# start cluster if not already running
cluster:
    @if minikube status | grep -q "Running"; then \
      echo "minikube is already running."; \
    else \
        echo "Starting minikube..."; \
        minikube start; \
        minikube addons enable ingress; \
    fi

# stop the cluster
stop:
  minikube stop
 
# reset the cluster
[confirm("Are you sure you want to complete reset your local dev environment?")]
reset:
  minikube stop; \
  minikube delete



# dashboard to monitor the minikube cluster
dashboard:
  minikube dashboard

# run nextjs locally
devjs:
  cd ./nextjs/uff_frontend/; \
  npm run dev

# apply kustomize to minikube
k8sapply:
  cd ./k8s; ./build.sh| kubectl apply -f -


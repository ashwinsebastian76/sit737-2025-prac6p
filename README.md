# sit737-2025-prac6p

**Docker File**
This Dockerfile sets up a container to run a Node.js app. It uses Node.js version 18, sets the
working folder to /app, installs the app's dependencies, and copies all the code into the container.
It makes port 4000 available and runs the app using node main.js when the container starts.

**Kubernetes files**
Deployment.yaml: This Kubernetes Deployment config creates and manages one replica
of a pod running a calculator app. It uses the image ashwinsebsatian76/calculator-
microservice:latest, labels it as calculator, and runs the app inside a container that listens
on port 4000.
Service.yaml: This Kubernetes Service exposes the calculator app to the outside world. It
uses type Node Port, which makes the app available on port 30080 of the node. Internally, it
forwards traLic from port 80 to the app running on port 4000 inside the container, using the
label app: calculator to find the correct pods.

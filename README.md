# LAB 1
## Deploying an App to a New Cloud Foundry Space
- Verify that a space called production has been created.
- Target the production space
- Deploy the app to Cloud Foundry

### Login to cloud foundry 
```
cf login -a api.run.pcfone.io -sso
```
### Create a new space 
```
cf create-space production
```
### Traget the new space 
```
cf target -s production
```
### push the app to the prod space
```
cf push lab1 --random-route -m 512m -k 512m
```
### open the app in a browser or curl it should show that you are in production target
```
curl https://lab1-timely-serval.apps.pcfone.io/
```
#### output
```
...
 <p>You are deployed to production</p>
 <p>you are in the correct space</p>
...
```

# LAB 2
## Generating a Manifest From a Running App
- Generate a manifest file from the cf command
- Validate the manifest file was created
- Push app using manifest.yml

### Ensure you are still loged in 
```
cf target
```
#### output:
```
api endpoint:   https://api.run.pcfone.io
api version:    2.135.0
user:           <your user name>
org:            <your org>
space:          production
```
### use the cli to create a manifest for the app 
```
cf create-app-manifest lab1
```
### edit the file and increase the memory to 1G
``` yml
...
  instances: 1
  memory: 1G
  routes:
...
```
### push the app using the manifest 
```
cf push -f ./lab1_manifest.yml
```
### open the app in a browser or curl it should show that you now at 1024M
```
curl https://lab1-timely-serval.apps.pcfone.io/
```
#### output
```HTML
...
  <h1>Lab 2</h1>
  <p>You set the memory deployed to 1024</p>
...
```
# LAB 3
## Creating a Manifest
- Generate a manifest file from scratch
- Validate the manifest file was created
- Push app using manifest.yml

### create a manifest file
```
vi manifest.yml
```
### add entries to the file 
```YML
applications:
- name: lab3
  disk_quota: 1G
  instances: 1
  memory: 512M
  random-route: true
```
### push the app
```
cf push
```

#### output:
name:                lab3  
requested state:     started  
isolation segment:   iso-01  
**routes:**               lab3-balanced-baboon.apps.pcfone.io  
last uploaded:       Tue 20 Aug 12:57:30 EDT 2019  
stack:               cflinuxfs3   
buildpacks:          node.js 1.6.52 (no decorators apply)  

### open the app (url from **routes** above) in a browser or curl it should show that you now at 1024M
```
curl https://lab3-balanced-baboon.apps.pcfone.io/
```
#### output
```HTML
...
 <h1>Lab 3</h1>
 <p>You set the disk size to 1024</p>
...
```
# LAB 4
## Using SSH to Access Your App in Cloud Foundry
- Save the data from the key file.
- The key file should have data.

### ensure that the lab app is running 
```
cf apps
```
### use ssh to get the key file
```
cf ssh lab3 -c 'cat /app/security.key' > security.key
```
### list out the file 
```
cat security.key
```
#### output( will be different for each deploy)
``` 
education noise near goose system
```
### open the app (url from **routes** above) in a browser or curl it should show that you now at 1024M
```
curl https://lab3-balanced-baboon.apps.pcfone.io/
```
#### output
```HTML
...
  <h1>Lab 4</h1>
  <p>Key file should look like:</p>
  <p>education noise near goose system<p>
...
```

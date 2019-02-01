Requirements
------------

Google Cloud's CLI gcloud (OS specific install)

The project ID I am using is "calculus-d7a63"

Run unit tests
-----------------
    npm test

Deploy Google Cloud Function (GCF) Endpoint to prod
-----------------------

    gcloud --project=calculus-d7a63 functions deploy calculus --trigger-http --source=functions/calculus

You can call it with 

    curl https://us-central1-calculus-d7a63.cloudfunctions.net/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk


Manual Intergration Testing Locally (preflight)
-----------------------------------------------

Run emulator locally (see https://cloud.google.com/functions/docs/emulator)

    functions start

Deploy function to emulator

   functions --project=calculus-d7a63 deploy calculus --trigger-http  --source=functions/calculus

Run query against emulator hosted function

   curl http://localhost:8010/calculus-d7a63/us-central1/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk




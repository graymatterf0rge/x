<template>
  <q-btn
    fab
    color="primary"
    icon="mdi-camera-enhance" padding="sm"
    class="absolute"
    style="top: 0; right: 12px; transform: translateY(-50%);"
    @click="captureImage" 
  />
</template>
  
  <script setup>
    import { useQuasar } from 'quasar'
    import { Camera, CameraResultType } from '@capacitor/camera'
    import { firebase, functions, storage, httpsCallable } from 'boot/firebase'
    const props = defineProps({"uid": String})
    const storageRef = storage.ref()
    const $q = useQuasar()
    const addPetPhoto = httpsCallable(functions,'addPetPhoto')
    const captureImage = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        width: 300,
        height: 300,
        resultType: CameraResultType.DataUrl
      })
      const data = image.dataUrl
      const filename = 'pets/'+props.uid+'.jpeg'
      // TODO: name the file based on the pets uid
      var uploadPhoto = storageRef.child(filename).putString(data, 'data_url')
      var progress = 0
      const upload_notification = $q.notify({
        group: false, // required to be updatable
        timeout: 0, // we want to be in control when it gets dismissed
        spinner: true,
        message: 'Uploading file...',
        caption: '0%'
      })
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadPhoto.on('state_changed', 
        (snapshot) => {
           // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          
          if(snapshot.state == firebase.storage.TaskState.RUNNING) upload_notification({caption: `${progress}%`})
          if(progress === 100){
            upload_notification({
              caption: 'Upload complete',
              spinner: false,
            })
          }
        
        }, 
        (error) => {
          console.error('Error during upload:', error)
        }, 
        () => {
          console.log('Upload is complete')
          storageRef.child(filename).getDownloadURL()
            .then((url) => {
              addPetPhoto({
                uid: props.uid,
                photoURL: url,
              })
              upload_notification({
                caption: 'Success!',
                color: 'positive',
                timeout: 3000,
              })
            })
            .catch((error) => {
              upload_notification({
                caption: 'Error!',
                color: 'primary',
                timeout: 3000,
              })
            })
        }
      )
    }
   
  </script>
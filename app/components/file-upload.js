import Ember from 'ember';
import ENV from '../config/environment';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  ajaxSettings: {
    headers: {
      'X-Application-Name': 'Uploader Test'
    }
  },
  signingUrl: '',

  filesDidChange (files) {
    const uploader = EmberUploader.S3Uploader.create({
      signingUrl: ENV.apiBaseURL + '/sign'
    });

    uploader.on('didUpload', response => {
      // S3 will return XML with url
      console.log(response);
      let uploadedUrl = Ember.$(response).find('Location')[0].textContent;
      // http://yourbucket.s3.amazonaws.com/file.png
      uploadedUrl = decodeURIComponent(uploadedUrl);
    });

    if (!Ember.isEmpty(files)) {
      // Send a sign request then upload to S3
      // this second argument is optional and can to be sent as extra data with the upload
      uploader.upload(files[0], {  });
    }
  }
});
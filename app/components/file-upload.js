import Ember from 'ember';
import ENV from '../config/environment';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.currentUser'),
  ajaxSettings: {
    headers: {
      'X-Application-Name': 'Uploader Test'
    }
  },
  signingUrl: '',

  filesDidChange (files) {
    const uploader = EmberUploader.Uploader.create({
      url: ENV.apiBaseURL + '/upload'
    });

    uploader.on('didUpload', response => {
      // S3 will return XML with url
      console.log(response);
      // should refresh user
      // let uploadedUrl = Ember.$(response).find('Location')[0].textContent;
      // http://yourbucket.s3.amazonaws.com/file.png
      // uploadedUrl = decodeURIComponent(uploadedUrl);
      this.get('refreshAction')();
    });

    if (!Ember.isEmpty(files)) {
      // Send a sign request then upload to S3
      // this second argument is optional and can to be sent as extra data with the upload
      uploader.upload(files[0], { });
    }
  }
});
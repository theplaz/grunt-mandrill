'use strict';

module.exports = function(grunt) {
  //Default config
  grunt.initConfig({
    mandrill: {
      mailer: {
        options: {
          key: '', // Enter your Mailgun API key here
          sender: '', // sender email address
          recipient: [''], // recipient email address
          subject: 'This is a test email'//,
          body: 'body of text email' //Use if you want to send text
        },
        // src: []//Location of file to use as html template
      }
    }

    mandrilltemplate: {
      server: {
          src: ['output/*.html'],
          filter: 'isFile',
          options: {
              key: '',
              from_email: '',
              from_name: '',
              subject: '',
              text: '',
              publish: true,
              labels: ['autogen']
          }
      }
  })
  //
  grunt.loadTasks('tasks');
};

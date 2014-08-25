var mandrill = require('node-mandrill'),
    _        = require('lodash');



module.exports = function(grunt){
  grunt.registerMultiTask('mandrill','Send email using mandrill', function(){
    var done = this.async();
    var options = _.pick(this.data.options,['sender', 'recipient', 'subject', 'body']);
    // Setup node-mandrill with the api
    mandrill = mandrill(this.data.options.key);
    var to = [];
    if(typeof options.recipient === "string"){
      to = [options.recipient];
    }else{
      _.map(options.recipient, function(email){ to.push(email); });
    }

    // If file is present
    if(this.filesSrc.length > 0){
      _.each(this.filesSrc,function(path){
        _.each(to, function(recp){
          if(!options.body){
            options.body = grunt.file.read(path);
          }
          mandrill(
            '/messages/send',{
              message:{
                to: [{email: recp}],
                from_email: options.sender,
                subject: options.subject,
                html: options.body
              }
            },
            function(err, response){
              if(err) grunt.log.writeln("Could not send email to " + recp);
              grunt.log.writeln('Sent email msg to ' + options.recipient);
            });
        });
      });
    }else{
        _.each(to, function(recp){
          if(!options.body){
            options.body = grunt.file.read(path);
          }
          mandrill(
            '/messages/send',{
            message: {
                to: [{email: recp}],
                from_email: options.sender,
                subject: options.subject,
                html: options.body
              }
            },
            function(err,response){
              if(err) grunt.log.writeln("Could not send email to " + recp);
              grunt.log.writeln('Sent email msg to ' + options.recipient);
            });
        });
    }
  },
  grunt.registerMultiTask('mandrilltemplate','Add email template to mandrill', function(){
    var done = this.async();
    var options = _.pick(this.data.options,['template_name', 'from_email', 'from_name', 'subject', 'code', 'text', 'publish', 'labels']);
    // Setup node-mandrill with the api
    mandrill = mandrill(this.data.options.key);
    var to = [];

    if(this.filesSrc.length > 0){
      _.each(this.filesSrc,function(path){
        _.each(to, function(recp){
          if(!options.code){
            options.code = grunt.file.read(path);
            console.log(path);
          }
          if(!options.template_name){
            options.template_name = path;
          }
          mandrill_client.templates.add({"name": options.template_name, "from_email": options.from_email, "from_name": options.from_name, "subject": options.subject, "code": options.code, "text": options.text, "publish": options.publish, "labels": options.labels}, function(result) {
              grunt.log.writeln(result);
              console.log(result);
          }, function(e) {
            // Mandrill returns the error as an object with name and message keys
              grunt.log.writeln('A mandrill error occurred: ' + e.name + ' - ' + e.message);
              console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
          });
        });
      });
    }
  });
}

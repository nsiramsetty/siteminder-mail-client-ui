import ApiService from "../../../../_services/Api.service";
import {MAIL_CLIENT_CONFIG} from "./MailClient.config";
import {URL_CONFIG} from "../../../../_config/URLConfig";
import {CONSTANTS_CONFIG} from "../../../../_config/Constants.config";

export default {
  name: 'mail-client',
  props: [],
  data: function () {
    return {
      alert : null,
      buildNumber: process.env.BUILD_NO,
      api: new ApiService(),
      emailFormState: {},
      defaultEmailForm: {...MAIL_CLIENT_CONFIG.defaultEmailForm},
      fieldsConfig: {...MAIL_CLIENT_CONFIG.fieldsConfig},
      emailForm: {...MAIL_CLIENT_CONFIG.defaultEmailForm},
      isSending : false
    };
  },
  created: function () {
  },
  methods: {
    submitEmailForm : function() {
      this.isSending = true;
      let body = {...this.emailForm};
      body.to = body.to.split(",");
      if(body.cc && body.cc !== ''){
        body.cc = body.cc.split(",");
      }
      if(body.bcc && body.bcc !== ''){
        body.bcc = body.bcc.split(",");
      }
      this.sendUsingMailGun(body);
    },

    sendUsingMailGun : function(body){
      this.api.doApiRequest(URL_CONFIG['mailgun'].method, URL_CONFIG['mailgun'].url+'/send',body).then((response) => {
        console.log(response);
        if (response && response.statusCode && response.statusCode.toString().toLowerCase() === "200") {
          this.alert= {
            class: CONSTANTS_CONFIG.SUCCESS_CLASS,
            heading: CONSTANTS_CONFIG.SUCCESS_HEADING,
            text: "Email Sent Successfully [ Mail Gun ].",
            icon  : 'fa-check'
          };
          this.$toastr.s(this.alert.text, this.alert.heading);
          this.isSending = false;
        } else{
          this.sendUsingSendGrid(body);
        }
      }).catch((err) => {
        this.sendUsingSendGrid(body);
      });
    },

    sendUsingSendGrid : function(body){
      this.api.doApiRequest(URL_CONFIG['sendgrid'].method, URL_CONFIG['sendgrid'].url+"/send",body).then((response) => {
        this.isSending = false;
        if (response && response.statusCode &&response.statusCode.toString().toLowerCase() === "200") {
          this.alert= {
            class: CONSTANTS_CONFIG.SUCCESS_CLASS,
            heading: CONSTANTS_CONFIG.SUCCESS_HEADING,
            text: "Email Sent Successfully [ SendGrid ].",
            icon  : 'fa-check-circle'
          };
          this.$toastr.s(this.alert.text, this.alert.heading);
        } else{
          this.alert= {
            class: CONSTANTS_CONFIG.ERROR_CLASS,
            heading: CONSTANTS_CONFIG.ERROR_HEADING,
            text: "Email Sending Failed.",
            icon  : 'fa-info-circle'
          };
          this.$toastr.e(this.alert.text, this.alert.heading);
        }
      }).catch((err) => {
        this.isSending = false;
        this.alert= {
          class: CONSTANTS_CONFIG.ERROR_CLASS,
          heading: CONSTANTS_CONFIG.ERROR_HEADING,
          text: "Email Sending Failed.",
          icon  : 'fa-info-circle'
        };
        this.$toastr.e(this.alert.text, this.alert.heading);
      });
    },

    isValidEmail : function(val) {
      if (val && val !== "") {
        let emailSplit = val.split(",");
        let isValid = true;
        emailSplit.forEach((email)=>{
          if(!this.validateEmail(email)){
            isValid = false;
          }
        });
        return isValid;
      } else{
        return true;
      }
    },

    validateEmail : function(email){
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    resetEmailForm : function(){
      this.clearAlert();
      this.emailForm = {...MAIL_CLIENT_CONFIG.defaultEmailForm};
      this.emailFormState._reset();
    },

    clearAlert : function(){
      this.alert = null;
      this.isSending = false
    }
  },
  computed: {},
  watch: {},
  components: {
  }
}

export const MAIL_CLIENT_CONFIG = {
    defaultEmailForm: {
      to: 'naresh.siramsetty@gmail.com',
      cc: '',
      bcc: '',
      subject: "Test",
      text: "Test"
    },
    fieldsConfig: {
      to: {
        label: "To",
        isRequired: true,
        placeholder: "Enter To Address (Comma Separated)",
        messages: {
          required: "Please enter To Address.",
          invalid : "Please enter valid email address."
        }
      },
      cc: {
        label: "Cc",
        placeholder: "Enter Cc (Comma Separated)",
        messages: {
          invalid : "Please enter valid email address."
        }
      },
      bcc: {
        label: "Bcc",
        placeholder: "Enter Bcc (Comma Separated)",
        messages: {
          invalid : "Please enter valid email address."
        }
      },
      subject: {
        label: "Subject",
        isRequired: true,
        placeholder: "Enter Subject",
        maxlength: 1000,
        messages: {
          required: "Please enter Subject.",
          maxlength: "First Name must be no longer than 1000 characters.",
        }
      },
      text: {
        label: "Body",
        isRequired: true,
        placeholder: "Enter Email Body",
        messages: {
          required: "Please enter Subject."
        }
      }
    }
  }
;

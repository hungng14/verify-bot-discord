const styles = `<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap');
html,
body {
    /* font-family: 'Poppins', sans-serif; */
    font-family: 'Rajdhani', sans-serif;
    width: 100%;
    height: 100vh;
    padding: 0;
    margin: 0;
}

.font-casual {
    font-family: 'Poppins', sans-serif
}

body {
    background: #15171e;
}

.page {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
}

.content {
    text-align: center;
    padding: 0px 20px;
}

.content .image {
    display: grid;
    place-items: center;
}

.content h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 34px;
    margin-bottom: 12px;
    text-align: center;
    text-transform: uppercase;
    color: #FFFFFF;
}

.content h4 {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: #D4D7E1;
    margin-bottom: 4px;
}

.small-text {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 150%;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 24px;
}

.captcha {
    margin-bottom: 8px;
}

.green-text {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 150%;
    color: #6CDB00;
    margin-bottom: 8px;
}

.danger-text {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    color: #ca4305;
    margin-top: 8px;
}

.error {
    display: none;
}

.error.open {
    display: block;
}

.wrapper-submit {
  display: grid;
  justify-content: center;
}

.btn {
    max-width: 303px;
    width: 303px;
    height: 38px;
    background: #6CDB00;
    border-radius: 2px;
    margin: 0px 0px;
    border: none;
    outline: none;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 13px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
    -webkit-clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
}

#btn-submit {
  display: grid;
  place-items: center;
}

#btn-submit span {
  display: flex;
  grid-template-columns: auto auto;
  align-items: center;
  gap: 4px;
}

#btn-submit span img {
  display: none;
}

#btn-submit.loading span img {
  display: block;
}

.btn.disabled {
  background: #424242;
  color: #383838;
  cursor: not-allowed;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    display: none;
}

.modal.open {
    display: grid;
    place-items: center;
}

.modal-content {
    max-width: 350px;
    width: 100%;
    /* height: 310px; */
    background: #28282E;
    position: relative;
    display: grid;
    clip-path: polygon(14px 0, 50px 0, 50px 4px, 78px 4px, 78px 0, 100% 0%, 100% 100%, 0 100%, 0% 14px);
    -webkit-clip-path: polygon(14px 0, 50px 0, 50px 4px, 78px 4px, 78px 0, 100% 0%, 100% 100%, 0 100%, 00% 14px);
    padding: 30px;
}

.btn-close-modal {
    position: absolute;
    top: 12px;
    right: 12px;
    outline: none;
    background: transparent;
    border: none;
    cursor: pointer;
}

.modal-body {
    padding-top: 20px;
    text-align: center;
}

.modal-body .icon {
    display: grid;
    place-content: center;
}

.modal-body h3 {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 24px;
    text-transform: uppercase;
    color: #FFFFFF;
}

.modal-body h5 {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 150%;
    color: #D4D7E1;
    margin-bottom: 32px;
}
</style>`

const getTemplate = ({
    username,
    userid,
    sitekey
}) => {

    return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GameFi Verification</title>
      <link rel="icon" href="/assets/images/GF.png" type="image/x-icon">
      ${styles}
  </head>
  
  <body>
      <div class="modal">
          <div class="modal-content">
              <button class="btn-close-modal" onclick="onCloseModal()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 1L4 4L7 7M13 13L10 10" stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
              <div class="modal-body">
                  <div class="icon">
                      <img src="/assets/images/success.png" alt="">
                  </div>
                  <h3>
                      congratulations!
                  </h3>
                  <h5 class="font-casual">You have successfully verified the server membership</h5>
                  <button class="btn" type="button" onclick="onCloseModal()">OK</button>
              </div>
          </div>
      </div>
      <div class="page">
          <div class="content">
              <div class="image">
                  <img src="/assets/images/GF.png" alt="">
              </div>
              <h1>Verify your account</h1>
              <h4 class="font-casual">This server requires you to pass a captcha to gain access to their server</h4>
              <div class="small-text font-casual">
                  Logged in as <span class="green-text">${username || ''}</span>. Not you?
              </div>
              <div class="captcha">
                  <div id='captcha' data-error-callback="onError" data-callback="onChange"></div>
              </div>
              <div class="font-casual green-text">By verifying you agree to our terms of service and privacy policy</div>
              <div class="wrapper-submit">
                  <button class="btn disabled" type="button" id="btn-submit" disabled onclick="onSubmit()">
                    <span>
                      <img src="/assets/images/loading.svg" width="25px" height="25px" />
                      Submit
                    </span>
                  </button>
              </div>
              <div class="error danger-text font-casual"></div>
          </div>
      </div>
  
      <script src="https://js.hcaptcha.com/1/api.js?onload=onLoadCaptcha&render=explicit" async defer></script>
      <script type="text/javascript">
          let mytoken = '';
          let captchaid;
          var onLoadCaptcha = function(){
            const params = {
              "sitekey": ${sitekey},
            };
            captchaid = hcaptcha.render("captcha", params);            
          }

          function onResetCaptcha() {
            hcaptcha.reset(captchaid)
            const submitBtn = document.querySelector('#btn-submit')
            submitBtn.disabled = true;
            submitBtn.classList.add('disabled')
          }
          function onError(err) {
              console.log('err', err)
          }
  
          async function onChange(token) {
              try {
                  mytoken = token;
                  const submitBtn = document.querySelector('#btn-submit')
                  submitBtn.disabled = false;
                  submitBtn.classList.remove('disabled')
              } catch (error) {
                  console.log('error', error)
              }
          }
  
          async function onSubmit() {
              const errorElm = document.querySelector('.error')
              const submitBtn = document.querySelector('#btn-submit')
              submitBtn.classList.add('loading')
              try {
                  onResetCaptcha()
                  const body = JSON.stringify({
                      token: mytoken,
                      userid: ${userid}
                  })
                  const res = await fetch('/verify', {
                      method: 'POST',
                      body,
                      headers: {
                          'Content-Type': 'application/json'
                      },
                  })
                  const result = await res.json()
                  if (result.status === 200) {
                      const modalElm = document.querySelector('.modal')
                      modalElm.classList.add('open')
                      errorElm.classList.remove('open')
                  } else {
                      errorElm.innerHTML = 'Oops. Something went wrong!'
                      errorElm.classList.add('open')
                  }
                  console.log(result)
              } catch (error) {
                  console.debug('error', error)
                  errorElm.innerHTML = 'Oops. Something went wrong!'
                  errorElm.classList.add('open')
              } finally {
                submitBtn.classList.remove('loading')
              }
          }
  
          function onCloseModal() {
              const modalElm = document.querySelector('.modal')
              modalElm.classList.remove('open')
          }
      </script>
  </body>
  
  </html>`
}

module.exports = getTemplate
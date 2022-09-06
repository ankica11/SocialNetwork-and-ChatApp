
export const checkConfirmPassword = (input) => {
  const password = document.querySelector('#password');
  const button = document.querySelector('#submit_button');
  let disabled = true;

  //@ts-ignore
  const form_field = input.parentElement;
  const form_group = input.parentElement.parentElement;
  const err = form_group.querySelector('#confirm_err').children[0];
  let message = '';
  //@ts-ignore
  if (password.value != input.value && input.value != '') {
    message = 'Password and confirm password are different.';
    form_field.classList.add('form-field-custom-errors');
  } else if (input.value != '') {
    form_field.classList.remove('form-field-custom-errors');
    disabled = false;
  }

  err.textContent = message;
  return disabled;
};

export const checkPasswordStrength = (input) => {
  const strongPass = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  const mediumPass = new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
  );

  const form_group = input.parentElement.parentElement;
  const form_field = input.parentElement;
  const strength_checker = form_group.querySelector('#strength_checker');
  const progress = strength_checker.querySelector('#progress');
  const err = strength_checker.querySelector('#pass_err').children[0];
  progress.setAttribute('style', 'height: 3px; flex: 3');
  const progress_bar = progress.children[0];
  let message = '';
  let pass_strength_class = '';
  let progress_value = 0;
  let pass_back = '';
  if (strongPass.test(input.value)) {
    message = 'Very good!';
    progress_bar.classList.remove('bg-danger');
    progress_bar.classList.remove('bg-warning');
    progress_bar.classList.add('bg-success');
    progress_bar.classList.remove('medium_pass_back');
    progress_bar.classList.remove('weak_pass_back');
    progress_bar.classList.add('strong_pass_back');
    pass_strength_class = 'strong_pass';
    pass_back = 'strong_pass_back';
    progress_value = 100;
  } else if (mediumPass.test(input.value)) {
    message = 'Not so bad!';
    progress_bar.classList.remove('bg-danger');
    progress_bar.classList.remove('bg-success');
    progress_bar.classList.add('bg-warning');
    progress_bar.classList.remove('weak_pass_back');
    progress_bar.classList.remove('strong_pass_back');
    progress_bar.classList.add('medium_pass_back');
    pass_strength_class = 'medium_pass';
    pass_back = 'medium_pass_back';
    progress_value = 75;
  } else if (input.value != '') {
    message = 'Terrible.';
    progress_bar.classList.remove('bg-success');
    progress_bar.classList.remove('bg-warning');
    progress_bar.classList.add('bg-danger');
    progress_bar.classList.remove('medium_pass_back');
    progress_bar.classList.remove('strong_pass_back');
    progress_bar.classList.add('weak_pass_back');
    pass_strength_class = 'weak_pass';
    pass_back = 'weak_pass_back';
    progress_value = 10;
  } else {
    progress.setAttribute('style', 'display: none');
  }

  err.textContent = message;
  err.setAttribute('class', pass_strength_class);

  progress_bar.setAttribute('style', `width: ${progress_value}%; `);
  progress_bar.setAttribute('aria-valuenow', progress_value);
};

export const showError = (id, message, status) => {
  const input = document.querySelector(`#${id}`);
  const form_group = input.parentElement.parentElement;
  const form_field = input.parentElement;
  let err = form_group.children[1].children[0];
  var mess = message;
  if (id == 'password') {
    err = form_group.children[2].children[0];
    mess = 'Password server validation error.';
  } else if (id == 'confirmPassword') {
    mess = 'Confirm password server validation error.';
  } else if (id == 'email') {
    mess = 'Email server validation error.';
  }
   else if (id == 'username' && status != 405) {
    mess = 'Username server validation error.';
  } else if (id == 'firstName') {
    mess = 'First name server validation error.';
  } else if (id == 'lastName') {
    mess = 'Last name server validation error.';
  }

  err.textContent = mess;
  form_field.classList.add('form-field-custom-errors');
  //console.log(input)
};

export const removeError = (id) => {
  const input = document.querySelector(`#${id}`);
  const form_group = input.parentElement.parentElement;
  const form_field = input.parentElement;
  const err = form_group.children[1].children[0];
  err.textContent = '';
  form_field.classList.remove('form-field-custom-errors');
};

export const successSignup = () => {
  const formCustom =document.querySelector('#form-custom')
  const form = document.querySelector('#signupForm')
  const successSignup = document.querySelector('#success-signup')
  form.setAttribute('style', 'display: none !important')
  successSignup.classList.remove('no-signup')
  successSignup.classList.add('success-signup')
  
  formCustom.classList.remove('form-custom')
  formCustom.classList.add('form-custom-success-signup')
}



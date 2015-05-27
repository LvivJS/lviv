'use strict';

function regist() {
  var form = document.getElementById('regForm');
  var inputs = document.getElementsByClassName('registration__input');

  form.addEventListener('submit', submitForm);
  Array.prototype.forEach.call(inputs, function(input) {
    input.addEventListener('change', checkValidation);
  });

  function submitForm(e) {
    e.preventDefault();

    var formInputStates = [];
    var formData = {};

    //collect states of all inputs in formInputStates array
    Array.prototype.forEach.call(inputs, function(input) {
      var state = checkValidation(input);
      formInputStates.push(state);
      //collect values to formData object
      formData[convertType(input.type)] = input.value;
    });

    //if every input is valid - set general formState equals true
    var formState = Array.prototype.every.call(formInputStates, function(item) {
      return item == true;
    });

    //send formData if all items are valid
    if (formState) {
      pushData(formData);
      clearInputs(inputs);
    }
  }

  function pushData(data) {
    var regWrap = document.getElementById('registration');
    var json = JSON.stringify(data);
    var request = new XMLHttpRequest();
    request.open('post', '/', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        regWrap.innerHTML = '<div class="regist-resp">' + request.responseText + '</div>';
      }
      if (request.status == 500) {
        regWrap.innerHTML = '<div class="regist-resp">Registration failed...</div>';
      }
    }
    request.send(json);
  }

  function clearInputs(items) {
    Array.prototype.forEach.call(items, function(item) {
      item.value = '';
    });
  }

  //collector of existing error messages
  var errors = {};

  function checkValidation(e) {
    var input = e.target || e;

    var label = input.nextSibling;
    var errorSpan = label.nextSibling;
    var emptyInpErr = 'This field is required';
    //store original
    if (errorSpan.innerHTML !== emptyInpErr) {
      errors[input.id] = errorSpan.innerHTML;
    }

    var bool = isValid(input);

    if (bool) {
      errorSpan.classList.add('invisible');
      input.classList.remove('registration__input--invalid');
      label.classList.remove('registration__input--invalid');
    } else {
      if (!input.value) {
        errorSpan.innerHTML = emptyInpErr;
      } else {
        errorSpan.innerHTML = errors[input.id];
      }
      errorSpan.classList.remove('invisible');
      input.classList.add('registration__input--invalid');
      label.classList.add('registration__input--invalid');
    }
    return bool;
  }

  function isValid(input) {
    var type = input.getAttribute('type');
    var patterns = {
      tel:/^([0-9\(\)\/\+ \-]{3,20})$/,
      email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*([,;]\s*\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*/,
      text: /^[a-zA-Z_ -]{3,50}$/
    };
    var isValid = new RegExp(patterns[type]).test(input.value);
    return isValid;
  }

  function convertType(type) {
    var convert = {
      tel: 'Phone',
      email: 'E-mail',
      text: 'Name'
    }
    return convert[type];
  }
}

module.exports = regist;

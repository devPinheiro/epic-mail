import Validator from 'validatorjs';


export default {
  signupValidate(body) {
    const value = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
    };
    const rules = {
      firstName: 'required|alpha',
      lastName: 'required|alpha',
      email: 'required|email',
      password: 'required|min:6',
    };
    const validation = new Validator(value, rules);
    return {
      success: validation.passes(),
      error: validation.errors.all(),
    };
  },
  loginValidate(body) {
    const value = {
      email: body.email,
      password: body.password,
    };
    const rules = {
      email: 'required|email',
      password: 'required|min:6',
    };
    const validation = new Validator(value, rules);
    return {
      success: validation.passes(),
      error: validation.errors.all(),
    };
  },
  resetValidate(body) {
    const value = {
      email: body.email,
    };
    const rules = {
      email: 'required|email',
    };
    const validation = new Validator(value, rules);
    return {
      success: validation.passes(),
      error: validation.errors.all(),
    };
  },
  messageValidate(body) {
    const value = {
      subject: body.subject,
      message: body.message,
      email: body.email,
    };
    const rules = {
      subject: 'required',
      message: 'required',
      email: 'required|email',
    };
    const validation = new Validator(value, rules);
    return {
      success: validation.passes(),
      error: validation.errors.all(),
    };
  },
  groupMessageValidate(body) {
    const value = {
      subject: body.subject,
      message: body.message,
    };
    const rules = {
      subject: 'required',
      message: 'required',
    };
    const validation = new Validator(value, rules);
    return {
      success: validation.passes(),
      error: validation.errors.all(),
    };
  },
  paramsValidate(body) {
    const value = {
      id: body,
    };
    const rules = {
      id: 'required|numeric',
    };
    const validation = new Validator(value, rules);
    return {
      success: validation.passes(),
      error: validation.errors.all(),
    };
  },
  groupNameValidate(body) {
    const value = {
      name: body,
    };
    const rules = {
      name: 'required|min:3',
    };
    const validation = new Validator(value, rules);
    return {
      success: validation.passes(),
      error: validation.errors.all(),
    };
  },

  groupParamsValidate(body, groupId) {
    const value = {
      id: groupId,
      name: body,
    };
    const rules = {
      id: 'required|numeric',
      name: 'required|string',
    };
    const validation = new Validator(value, rules);
    return {
      success: validation.passes(),
      error: validation.errors.all(),
    };
  },

  groupBodyValidate(body) {
    const value = {
      name: body.name,
    };
    const rules = {
      name: 'required|min:3',
    };
    const validation = new Validator(value, rules);
    return {
      success: validation.passes(),
      error: validation.errors.all(),
    };
  },


  groupValidate(id, body) {
    const value = {
      id,
      email: body,
    };
    const rules = {
      id: 'required|numeric',
      email: 'required|email',
    };
    const validation = new Validator(value, rules);
    return {
      success: validation.passes(),
      error: validation.errors.all(),
    };
  },
};

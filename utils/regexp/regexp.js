const email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

const birthday = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19\d\d|20\d\d)$/;

const phone = /^\+38\(0\d{2}\)\d{3}-\d{2}-\d{2}$/;

const city = /^[A-Z][A-Za-z\s]*$/;

module.exports = {
  email,
  password,
  birthday,
  phone,
  city,
};

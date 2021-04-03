import User from 'entities/User';

function generateRandomString(length: number) {
  if (length <= 0) throw Error("");

  return new Array<string>(length)
    .fill("")
    .map(() => String.fromCharCode(Math.round(Math.random() * 2^16)))
    .join("");
}

it("should create a User correctly", () => {
  const newUser = User.create({
    id: 123,
    username: "clebersondev",
    password: "supersafepass",
    email: "myemail@gmail.com",
    presentationName: "Cleberson Junior"
  });

  expect(newUser.id).toEqual(123);
  expect(newUser.username).toEqual("clebersondev");
  expect(newUser.password).toEqual("supersafepass");
  expect(newUser.email).toEqual("myemail@gmail.com");
  expect(newUser.presentationName).toEqual("Cleberson Junior");
});

it("should throw if the username doesn't have between 8 and 16 characters", () => {
  const usernameHavingLessThan8Characters = "cj";
  const usernameHavingMoreThan16Characters = "clebersoncleberson";

  const expectedErrorMessage = 'Username should have between 8 and 16 characters';

  expect(() => {
    User.create({
      username: usernameHavingLessThan8Characters,
      password: "mypassword"
    });
  }).toThrow(expectedErrorMessage);

  expect(() => {
    User.create({
      username: usernameHavingMoreThan16Characters,
      password: "mypassword"
    });
  }).toThrow(expectedErrorMessage);
});

it("should throw if the password have more than 72 characters", () => {
  const randomPassword = generateRandomString(73);
  
  expect(() => {
    User.create({
      username: "clebersondev",
      password: randomPassword
    })
  }).toThrow('Password should have at most 72 characters.')
})

it("should throw an error for invalid email addresses", () => {
  const username = "clebersondev";
  const password = "secureandsafepassword";

  const invalidEmails = [
   "invalidemail", "email@", "12311519"
  ];
  
  const expectedErrorMessage = 'It should be a valid email';

  invalidEmails.forEach(invalidEmail => {
    expect(() => {
      User.create({
        username, password,
        email: invalidEmail
      })
    }).toThrow(expectedErrorMessage);
  })
});

it("should throw an error for empty email address", () => {
  const expectedErrorMessage = 'Email should not be an empty string';

  expect(() => {
    User.create({
      username: "clebersondev", 
      password: "secureandsafepassword",
      email: ""
    })
  }).toThrow(expectedErrorMessage);
});
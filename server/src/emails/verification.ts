const verificationEmailTem = (name: string, url: string) => {
  return `
    <div
    style="background-color: #F0F2F5; padding: 1rem; border-radius: 1rem; text-align: center; width: 600px; max-width: 90%; margin: 0 auto;"
    >
    <div style="border-bottom: 1px solid #d5dbe0; padding-bottom: 1rem;">
      <img
        src="https://i.ibb.co/X4bZp3f/1.png"
        alt="logo"
        width="35px"
        height="35px"
        style="display: inline-block; vertical-align: middle;"
      />
      <h3 style="color: #1877F2; margin: 0; display: inline-block; vertical-align: middle; margin-left: .5rem;">
        Action require: activate your METUP account
      </h3>
    </div>
    <h2>Hello ${name}</h2>
    <p style="width: 400px; max-width: 90%; margin: 1rem auto;">
      You recently create an account on <strong style="color: #1877F2;">METUP</strong>. To complete your registration,
      please confirm your account.
    </p>
    <a
      href="${url}"
      style="background-color: #1877F2; color: #fff; border: none; padding: 1rem ; border-radius: .3rem; font-weight: bold; cursor: pointer; display: block; text-decoration: none;"
    >
      Counfirm your account
    </a>
    <br />
    <p style="color: gray; margin: 0;"><strong>Note:</strong> this confirmation account link will be expired in 1h</p>
  </div>
  `;
};

export default verificationEmailTem;
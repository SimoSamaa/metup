const verificationEmailTem = (name: string, url: string) => {
  return `
  <div>
    <h1 style="padding: 1rem; background-color: blue;">Verify your email ${name}</h1>
    <p>Please verify your email by clicking the link below.</p>
    <span>
      <h1></h1>
    </span>
    <a href="${url}">Verify email</a>
  </div>
  `;
};

export default verificationEmailTem;
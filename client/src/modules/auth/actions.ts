interface loginPayload {
  email: string;
  password: string;
}

interface registerPayload extends loginPayload {
  firstName: string;
  lastName: string;
  date: string;
  gender: string;
}

export default {
  async register(payload: registerPayload) {

    const registerData = {
      ...payload,
      bYear: new Date(payload.date).getFullYear(),
      bMonth: new Date(payload.date).getMonth() + 1,
      bDay: new Date(payload.date).getDate(),
    };

    const req = await fetch(`${import.meta.env.VITE_SERVER_URL}/register`, {
      method: 'POST',
      body: JSON.stringify(registerData),
      headers: { 'Content-Type': 'application/json', },
    });

    const res = await req.json();

    if (!req.ok) {
      throw new Error(res.message || 'Something went wrong');
    }
  },
  async login(payload: loginPayload) {
    const req = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', },
    });

    const res = await req.json();
    console.log('zaba', res);


    if (!req.ok) {
      throw new Error(res.message || 'Something went wrong');
    }
  },
};
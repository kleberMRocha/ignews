// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let cep = await fetch('https://viacep.com.br/ws/01001000/json/');

  if (cep.status === 200) {
    cep = await cep.json();
    return res.status(200).json(cep);
  }

}

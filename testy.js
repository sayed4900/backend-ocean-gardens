const dotenv = require('dotenv');
dotenv.config({path:'./config.env'}); // Load environment variables from a .env file if present

const apiKey = process.env.OPEN_API_Key;
if (!apiKey) {
  console.error('Error: OPEN_API_Key environment variable is not set.');
  process.exit(1); // Exit the script with an error code
}

const {OpenAI} = require('openai')

const openai = new OpenAI({
  apiKey: apiKey // defaults to process.env["OPENAI_API_KEY"]
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'How many numbers of oceans' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion.choices);
}

main();

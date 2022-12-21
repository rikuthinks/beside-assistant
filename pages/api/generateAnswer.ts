import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type Data = {
  result: string;
};

type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  const completion = await openai.createCompletion({
    // Latest GPT-3 models: https://beta.openai.com/docs/models
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.question),
    temperature: 0.6,
    max_tokens: 35,
  });
  res.status(200).json({ result: completion.data.choices[0].text! });
}

type Props = {
  question: string;
};

function generatePrompt(question: Props) {
  return `Q: A waiter had 14 customers to wait on. If 3 customers left and he got another 39 customers, how many customers would he have? 
  A: Let’s think step by step. The waiter had 14 customers to wait on. If 3 customers left, that means he would have 11 customers left. If he got another 39 customers, that means he would have 50 customers in total. The answer is 50.
  Q: Bianca was organizing her book case making sure each of the shelves had exactly 8 books on it. If she had 5 shelves of mystery books and 4 shelves of picture books, how many books did she have total?
  A: Let’s think step by step. There are 5 shelves of mystery books. Each shelf has 8 books. So that’s 40 mystery books. There are 4 shelves of picture books. Each shelf has 8 books. So that’s 32 picture books. 40 + 32 = 72 books. The answer is 72.
  Q: Wendy uploaded 45 pictures to Facebook. She put 27 pics into one album and put the rest into 9 different albums. How many pictures were in each album?
  A: Let’s think step by step. First, we know that Wendy uploaded 45 pictures in total. Second, we know that Wendy put 27 pictures into one album. That means that Wendy put the remaining 18 pictures into 9 different albums. That means that each album would have 2 pictures. The answer is 2.
  Q: A trivia team had 7 members total, but during a game 2 members didn’t show up. If each member that did show up scored 4 points, how many points were scored total? A: Let’s think step by step. There were 7 members on the team, but 2 members didn’t show up. That means that there were 5 members that did show up. Each member that showed up scored 4 points. So if 5 members each scored 4 points, then the total number of points scored would be 5*4=20. The answer is 20.
  Q: For Halloween Katie and her sister combined the candy they received. Katie had 8 pieces of candy while her sister had 23. If they ate 8 pieces the first night, how many pieces do they have left? A: Let’s think step by step. Katie and her sister have a total of 8 + 23 = 31 pieces of candy. If they eat 8 pieces the first night, they have 31 - 8 = 23 pieces left. The answer is 23.
  Q: A pet store had 78 puppies. In one day they sold 30 of them and put the rest into cages with 8 in each cage. How many cages did they use?
  A: Let’s think step by step. There are 78 puppies. 30 are sold, so that means there are 48 left. 48 divided by 8 is 6, so that means there are 6 cages with 8 puppies in each. The answer is 6.
  Q: ${question} 
  A:`;
}
